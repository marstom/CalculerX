"""
App alow cros site requests


Manual tests:
http post http://127.0.0.1:5000/calculer formula='2+22+89889'
http patch http://127.0.0.1:5000/calculer/2 formula='2+22+333'
http patch http://127.0.0.1:5000/calculer/1 formula='22+22'
http delete http://127.0.0.1:5000/calculer/1

"""
from flask import Flask, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
# from models import Formula
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy.orm import sessionmaker


calc = [
        {
            'id':1,
            'formula':'2+3+4',
        },
        {
            'id':2,
            'formula':'3+4+5',
        },
]

id_ = 3

app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={r'/user': {'origins':'*'}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)



class Formula(db.Model):
    __tablename__ = 'formulas'
    id = db.Column(db.Integer, primary_key=True)
    formula = db.Column(db.String)

    def __repr__(self):
        return '{} {}'.format(self.id, self.formula)


class Calculer(Resource):
    def get(self):
        calculs = []
        for formula in Formula.query.all():
            calculs.append(
                {
                    'id': formula.id,
                    'formula': formula.formula
                }
            )
        return calculs, 200

    def post(self):
        global id_
        parser = reqparse.RequestParser()
        parser.add_argument('formula')
        args = parser.parse_args()
        print(args)

        calc.append(
            {
                'id':id_,
                'formula': args['formula']
            
            })
        id_+=1
        formula = Formula(formula=args['formula'])
        db.session.add(formula)
        db.session.commit()


        return {'id': formula.id, 'formula': formula.formula}, 201

class CalculerOne(Resource):
    def delete(self, id):
        print(id)
        self.pop_from_list(calc, int(id))
        formula = Formula.query.get(int(id))
        print(formula)
        db.session.delete(formula)
        db.session.commit()
        return calc, 201

    def patch(self, id):
        parser = reqparse.RequestParser()
        parser.add_argument('formula')
        args = parser.parse_args()
        print('patch -> ', id)
        self.changeEl(calc, int(id), new=args['formula'])

        return calc, 201

    @staticmethod
    def pop_from_list(lis, id):
        for i, e in enumerate(lis):
            if e['id'] == id:
                lis.pop(i)
                return i
        return -1

    @staticmethod
    def changeEl(lis, id, new):
        for i, e in enumerate(lis):
            if e['id'] == id:
                temp = lis[i]
                temp['formula'] = new
                lis[i] = temp
                return i
        return -1

api.add_resource(Calculer, '/calculer', endpoint='calculer')
api.add_resource(CalculerOne, '/calculer/<id>', endpoint='calculerone')

if __name__ == '__main__':
    app.run(debug=True)

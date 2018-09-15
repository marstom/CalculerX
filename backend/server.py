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
from models import Base, Formula

from sqlalchemy.orm import sessionmaker, Session, scoped_session
from sqlalchemy import create_engine


engine = create_engine('sqlite:///baz.sql', echo=False)
# must be scoped session otherwise not working
session = scoped_session(sessionmaker(bind=engine))


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

@app.teardown_request
def remove_session(ex=None):
    session.remove()

class Calculer(Resource):
    def get(self):
        calculus = []
        for e in session.query(Formula).all():
            calculus.append(
                {
                    'id': e.id,
                    'formula': e.formula
                }
            )
        return calculus, 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('formula')
        args = parser.parse_args()
        print(args)

        new_formula = Formula(formula=args['formula'])
        session.add(new_formula)
        session.commit()


        f=[{
                'id':new_formula.id,
                'formula': new_formula.formula
            }]

        return f, 201

class CalculerOne(Resource):
    def delete(self, id):
        print(id)
        # self.pop_from_list(calc, int(id))
        d = session.query(Formula).get(id)
        session.delete(d)
        session.commit()
        print(d.formula)
        return {'id':d.id, 'formula':d.formula}, 201

    def patch(self, id):
        parser = reqparse.RequestParser()
        parser.add_argument('formula')
        args = parser.parse_args()

        to_change = session.query(Formula).get(id)
        to_change.formula = args['formula']
        session.commit()

        return {}, 201


api.add_resource(Calculer, '/calculer', endpoint='calculer')
api.add_resource(CalculerOne, '/calculer/<id>', endpoint='calculerone')

if __name__ == '__main__':
    app.run(debug=True)

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
from models import *

from sqlalchemy.orm import sessionmaker

Base.metadata.create_all(engine)

Session = sessionmaker()
Session.configure(bind=engine)
session = Session()


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


class Calculer(Resource):
    def get(self):
        return calc, 200

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

        return calc, 201

class CalculerOne(Resource):
    def delete(self, id):
        print(id)
        self.pop_from_list(calc, int(id))
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

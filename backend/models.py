from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)


class Formula(db.Model):
    __tablename__ = 'formulas'
    id = db.Column(db.Integer, primary_key=True)
    formula = db.Column(db.String)

    def __repr__(self):
        return '{} {}'.format(self.id, self.formula)


if __name__ == '__main__':
    db.create_all()


    f1 = Formula(formula='2+2')
    f2 = Formula(formula='4+4')

    db.session.add(f1)
    db.session.add(f2)
    db.session.commit()

    for ins in Formula.query.all():
        print(ins.formula, ins.id)

import sqlalchemy
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Formula(Base):
    __tablename__ = 'formulas'
    id = Column(Integer, primary_key=True)
    formula = Column(String)

    def __repr__(self):
        return '{} {}'.format(self.id, self.formula)


def initialize(name):
    
    from sqlalchemy.orm import sessionmaker
    engine = create_engine(name, echo=False)
    Base.metadata.create_all(engine)

    Session = sessionmaker()
    Session.configure(bind=engine)
    session = Session()

    f1 = Formula(formula='2+2')
    f2 = Formula(formula='4+4')
    session.add(f1)
    session.add(f2)
    session.commit()

    for ins in session.query(Formula):
        print(ins.formula, ins.id)

def clear(name):
    from sqlalchemy.orm import sessionmaker
    engine = create_engine(name, echo=False)
    Base.metadata.create_all(engine)

    Session = sessionmaker()
    Session.configure(bind=engine)
    session = Session()

    Base.metadata.drop_all(engine)
    Base.metadata.drop_all(engine)Base.metadata.create_all(engine)


if __name__ == '__main__':
    initialize('sqlite:///baz.db')
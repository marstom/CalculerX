from .models import *
from unittest import mock
import pytest

engine = create_engine('sqlite:///:memory:', echo=False)

def test_db_create():
    from sqlalchemy.orm import sessionmaker
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

    print(session.query(Formula).get(1).formula)

    Base.metadata.drop_all(engine)

def test_db_create2():
    from sqlalchemy.orm import sessionmaker
    Base.metadata.create_all(engine)

    Session = sessionmaker()
    Session.configure(bind=engine)
    session = Session()

    session.add_all([
        Formula(formula='234+333'),
        Formula(formula='4+3'),
        Formula(formula='411+31113'),
    ])

    # second = session.query(Formula).filter_by(id=2).one()
    second = session.query(Formula).get(2)
    session.delete(second)
    session.commit()
    cnt = session.query(Formula).count()
    # print(second)
    assert cnt == 2


    Base.metadata.drop_all(engine)


from .models import Base, Formula, Workbook
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from unittest import mock
import pytest

engine = create_engine('sqlite:///:memory:', echo=False)

@pytest.fixture
def database_create_and_utilize():
    Base.metadata.create_all(engine)
    session = scoped_session(sessionmaker(bind=engine))
    yield session
    Base.metadata.drop_all(engine)
    session.remove()

def test_db_create(database_create_and_utilize):
    session = database_create_and_utilize

    f1 = Formula(formula='2+2')
    f2 = Formula(formula='4+4')
    session.add(f1)
    session.add(f2)
    session.commit()

    for ins in session.query(Formula):
        print(ins.formula, ins.id)

    print(session.query(Formula).get(1).formula)


def test_db_create2(database_create_and_utilize):
    session = database_create_and_utilize

    session.add_all([
        Formula(formula='234+333'),
        Formula(formula='4+3'),
        Formula(formula='411+31113'),
    ])

    second = session.query(Formula).get(2)
    session.delete(second)
    session.commit()
    cnt = session.query(Formula).count()
    assert cnt == 2


def test_db_relation(database_create_and_utilize):
    session = database_create_and_utilize
    
    # create workbook
    wb = Workbook(name='Pierwszy')
    session.add(wb)
    session.commit()
    print(wb.id)
    del wb

    wb = session.query(Workbook).get(1)
    wb.formulas.append(Formula(formula='22+11+3'))
    wb.formulas.append(Formula(formula='41+21+35'))
    wb.formulas.append(Formula(formula='21+21+25'))
    session.commit()

    print(wb.formulas)


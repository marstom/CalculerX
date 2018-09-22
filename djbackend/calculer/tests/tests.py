"""

http --form post http://127.0.0.1:8000/calculer/ formula="22+11"
http delete http://127.0.0.1:8000/calculer/2/
http --form patch http://127.0.0.1:8000/calculer/1/ formula="777"


get list of actual workbooks pk's:
http GET http://127.0.0.1:8000/calculer/workbook/ 

create new wb:
http --form post http://127.0.0.1:8000/calculer/workbook/create name=zeszyt2

show wb:
http http://127.0.0.1:8000/calculer/workbook/edit/1/

add new formula to wb:
http --form post  http://127.0.0.1:8000/calculer/workbook/edit/1/ formula="222"

delete whole workbook:
http delete  http://127.0.0.1:8000/calculer/workbook/edit/2/

delete formula from book:
http delete http://127.0.0.1:8000/calculer/workbook/edit/1/1/

change formula on book:
http PATCH http://127.0.0.1:8000/calculer/workbook/edit/1/7/ formula="12345"
"""
from django.test import TestCase

# Create your tests here.

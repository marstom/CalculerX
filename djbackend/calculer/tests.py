"""

http --form post http://127.0.0.1:8000/calculer/ formula="22+11"
http delete http://127.0.0.1:8000/calculer/2/
http --form patch http://127.0.0.1:8000/calculer/1/ formula="777"

"""
from django.test import TestCase

# Create your tests here.

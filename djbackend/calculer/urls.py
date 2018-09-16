"""
urls
"""
from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('', calculer, name='calculer'),
    path('<id>/', calculer_del, name='calculer_del'),

    path('workbook/create', workbook_create, name='wb_get'),
    path('workbook/edit/<id>/', workbook_edit, name='wb_edit'),
    path('workbook/edit/<id_workbook>/<id_formula>/', workbook_edit_formula, name='wb_edit_formula'),
]

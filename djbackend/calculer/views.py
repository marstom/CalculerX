from django.http import HttpResponse, JsonResponse, QueryDict
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import json

# Create your views here.
from calculer.models import Formula, Workbook
from .serializers import *


def workbook_create(request):
    """ New empty workbook creation """
    if request.method == 'POST':
        name = request.POST.get('name')
        Workbook.objects.create(name=name)
        return JsonResponse(status.HTTP_201_CREATED, safe=False)
    return HttpResponse(status.HTTP_400_BAD_REQUEST)

def workbook_edit(request, id):
    """
    get - display all formulas from workbook
    post -add formula to workbook
    delete -dlelete whole workbook
    :param id - workbook id
    """
    if request.method == 'GET':
        workbook = Workbook.objects.get(pk=id)
        formulas = workbook.formula_set.all()
        serializer = FormulaSerializer(formulas, many=True)
        return JsonResponse(serializer.data, safe=False)
    if request.method == 'POST':
        workbook = Workbook.objects.get(pk=id)
        # formula_text = request.POST.get('formula')
        # formula_text = request.body.decode('utf-8')
        formula_text = json.loads(request.body).get('formula')
        print(formula_text)
        formula = Formula.objects.create(formula=formula_text,
                                         workbook=workbook)
        return HttpResponse(status.HTTP_201_CREATED)
    if request.method == 'DELETE':
        workbook = Workbook.objects.get(pk=id)
        workbook.delete()
        return HttpResponse(status.HTTP_204_NO_CONTENT)

    return HttpResponse(status.HTTP_400_BAD_REQUEST)

def workbook_edit_formula(request, id_workbook, id_formula):
    """
    get - show particular formula
    patch -change fomula
    delete -delete particular formula

    :param request:
    :param id_workbook: workbook number
    :param id_formula:  formula number
    :return: status
    """
    workbook = Workbook.objects.get(pk=id_workbook)
    formula = workbook.formula_set.get(pk=id_formula)

    if request.method == 'GET':
        serializer = FormulaSerializer(formula, many=False)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'PATCH':
        # requestdata = QueryDict(request.body)
        requestdata = json.loads(request.body)
        # import ipdb;ipdb.set_trace()
        formula.formula = requestdata.get('formula')
        formula.save()
        return HttpResponse(status.HTTP_200_OK)

    if request.method == 'DELETE':
        formula.delete()
        return HttpResponse(status.HTTP_200_OK)
    return HttpResponse(status.HTTP_400_BAD_REQUEST)

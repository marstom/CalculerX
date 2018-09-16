from django.http import HttpResponse, JsonResponse, QueryDict
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

# Create your views here.
from calculer.models import Formula, Workbook
from .serializers import *


def calculer(request):
    if request.method == 'GET':
        formulas = Formula.objects.all()
        serializer = FormulaSerializer(formulas, many=True)
        return JsonResponse(serializer.data, safe=False)
    if request.method == 'POST':
        if Workbook.objects.count() == 0:
            Workbook.objects.create(name="default")
        wb = Workbook.objects.first()

        formula = request.POST.get('formula')
        fm = Formula.objects.create(formula=formula, workbook=wb)
        print(fm)
        serializer = FormulaSerializer(fm, many=False)
        return JsonResponse(status.HTTP_201_CREATED, safe=False)
    return HttpResponse('tomek')

def calculer_del(request, id):
    if request.method == 'DELETE':
        formula = Formula.objects.get(pk=id)
        formula.delete()
        serializer = FormulaSerializer(formula, many=False)
        return HttpResponse(status.HTTP_204_NO_CONTENT)
    if request.method == 'PATCH':
        formula = Formula.objects.get(pk=id)
        requestdata = QueryDict(request.body)
        formula.formula = requestdata.get('formula')
        formula.save()
        serializer = FormulaSerializer(formula, many=False)
        return HttpResponse(status.HTTP_200_OK)

    return HttpResponse(status.HTTP_400_BAD_REQUEST)


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
        formula_text = request.POST.get('formula')
        formula = Formula.objects.create(formula=formula_text,
                                         workbook=workbook)
        return HttpResponse(status.HTTP_201_CREATED)
    if request.method == 'DELETE':
        workbook = Workbook.objects.get(pk=id)
        workbook.delete()
        return HttpResponse(status.HTTP_204_NO_CONTENT)

    return HttpResponse(status.HTTP_400_BAD_REQUEST)

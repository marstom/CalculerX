from rest_framework import routers, serializers, viewsets

from calculer.models import Formula, Workbook


class FormulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formula
        fields = ('id', 'formula')

class WorkbookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workbook
        fields = ('name', )
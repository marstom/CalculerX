from rest_framework import routers, serializers, viewsets

from calculer.models import Formula


class FormulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formula
        fields = ('id', 'formula')
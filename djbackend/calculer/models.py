from django.db import models

# Create your models here.

class ApplicationState(models.Model):
    """ application state keep in this table """
    active_workbook = models.IntegerField()

class Workbook(models.Model):
    name = models.CharField(max_length=50)

class Formula(models.Model):
    formula = models.CharField(max_length=50)
    workbook = models.ForeignKey(Workbook, on_delete=models.CASCADE)



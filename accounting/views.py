from rest_framework import viewsets

from accounting import models
from accounting import serializers


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = models.Transaction.objects.all()
    serializer_class = serializers.TransactionSerializer


class AccountViewSet(viewsets.ModelViewSet):
    queryset = models.Account.objects.all()
    serializer_class = serializers.AccountSerializer

class CurrencyViewSet(viewsets.ModelViewSet):
    queryset = models.Currency.objects.all()
    serializer_class = serializers.CurrencySerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer

class SubcategoryViewSet(viewsets.ModelViewSet):
    queryset = models.Subcategory.objects.all()
    serializer_class = serializers.SubcategorySerializer

class PlaceViewSet(viewsets.ModelViewSet):
    queryset = models.Place.objects.all()
    serializer_class = serializers.PlaceSerializer
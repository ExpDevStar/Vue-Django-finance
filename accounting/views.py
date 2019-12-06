from rest_framework import viewsets

from accounting import models
from accounting import serializers


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = models.Transaction.objects.all()
    serializer_class = serializers.TransactionSerializer
    serializer_action_class = {
        'list': serializers.RetrieveTransactionSerializer,
    }

    def get_serializer_class(self):
        try:
            return self.serializer_action_class[self.action]
        except (KeyError, AttributeError):
            return super().get_serializer_class()


class AccountViewSet(viewsets.ModelViewSet):
    queryset = models.Account.objects.all()
    serializer_class = serializers.AccountSerializer
    serializer_action_class = {
        'list': serializers.RetrieveAccountSerializer,
    }

    def get_serializer_class(self):
        try:
            return self.serializer_action_class[self.action]
        except (KeyError, AttributeError):
            return super().get_serializer_class()

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
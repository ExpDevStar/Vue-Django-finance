from decimal import Decimal

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from accounting import models
from accounting import serializers
from accounting import filters


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = models.Transaction.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = filters.TransactionFilterSet
    search_fields = ['notes',]
    serializer_class = serializers.TransactionSerializer
    serializer_action_class = {
        'list': serializers.RetrieveTransactionSerializer,
    }

    def get_serializer_class(self):
        try:
            return self.serializer_action_class[self.action]
        except (KeyError, AttributeError):
            return super().get_serializer_class()


    def create(self, request):
        amount = Decimal(request.data['amount'])
        currency = request.data['currency']
        trans_type = request.data['trans_type']
        if trans_type == 'INC':
            on_account = models.Account.objects.get(pk=request.data['on_account'])
            try:
                on_account.increase(amount, currency)
            except Exception as error:
                return Response(str(error), status=status.HTTP_400_BAD_REQUEST)
            else:
                on_account.save()
        if trans_type == 'EXP':
            from_account = models.Account.objects.get(pk=request.data['from_account'])
            try:
                from_account.decrease(amount, currency)
            except Exception as error:
                return Response(str(error), status=status.HTTP_400_BAD_REQUEST)
            else:
                from_account.save()
        if trans_type == 'TEC':
            from_account = models.Account.objects.get(pk=request.data['from_account'])
            on_account = models.Account.objects.get(pk=request.data['on_account'])
            try:
                from_account.decrease(amount, currency)
            except Exception as error:
                return Response(str(error), status=status.HTTP_400_BAD_REQUEST)
            else:
                try:
                    on_account.increase(amount, currency)
                except Exception as error:
                    return Response(str(error), status=status.HTTP_400_BAD_REQUEST)
                else:
                    from_account.save()
                    on_account.save()
        
        return super().create(request)
                


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
from rest_framework import serializers

from accounting import models

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Transaction
        fields = '__all__'

class AccountSerializer(serializers.ModelSerializer):
    transactions_from_account = serializers.PrimaryKeyRelatedField(many=True, queryset=models.Transaction.objects.all())
    transactions_on_account = serializers.PrimaryKeyRelatedField(many=True, queryset=models.Transaction.objects.all())
    class Meta:
        model = models.Account
        fields = ['id', 'title', 'amount', 'currency', 'notes', 'create_datetime', 'transactions_from_account', 'transactions_on_account']

class CurrencySerializer(serializers.ModelSerializer):
    transactions = serializers.PrimaryKeyRelatedField(many=True, queryset=models.Transaction.objects.all())
    accounts = serializers.PrimaryKeyRelatedField(many=True, queryset=models.Account.objects.all())
    class Meta:
        model = models.Currency
        fields = ['id', 'name', 'full_name', 'transactions', 'accounts']


class CategorySerializer(serializers.ModelSerializer):
    subcategories = serializers.PrimaryKeyRelatedField(many=True, queryset=models.Category.objects.all())
    class Meta:
        model = models.Category
        fields = ['id', 'name', 'cat_type', 'subcategories']

class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Subcategory
        fields = '__all__'


class PlaceSerializer(serializers.ModelSerializer):
    transactions = serializers.PrimaryKeyRelatedField(many=True, queryset=models.Transaction.objects.all())
    class Meta:
        model = models.Place
        fields = ['id', 'name', 'transactions']
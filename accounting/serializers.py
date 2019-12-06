from rest_framework import serializers

from accounting import models

class AccoutRepresentationField(serializers.RelatedField):
    def to_representation(self, value):
        return {'id': value.id, 'string_repr': '{}, {} {}'.format(value.title, value.amount, value.currency.name)}

class ObjectRepresentationField(serializers.RelatedField):
    def to_representation(self, value):
        return {'id': value.id, 'string_repr': '{}'.format(value.name)}

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Transaction
        fields = '__all__'


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Account
        fields = '__all__'

class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Currency
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = '__all__'

class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Subcategory
        fields = '__all__'


class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Place
        fields = '__all__'


class RetrieveTransactionSerializer(serializers.ModelSerializer):
    currency = ObjectRepresentationField(read_only='True')
    category = ObjectRepresentationField(read_only='True')
    subcategory = ObjectRepresentationField(read_only='True')
    from_account = AccoutRepresentationField(read_only='True')
    on_account = AccoutRepresentationField(read_only='True')
    place = ObjectRepresentationField(read_only='True')
    class Meta:
        model = models.Transaction
        fields = ('id', 'amount', 'currency', 'trans_type', 
                'category', 'subcategory', 'from_account',
                'on_account', 'create_datetime', 'place', 'notes')

class RetrieveAccountSerializer(serializers.ModelSerializer):
    currency = serializers.StringRelatedField()
    class Meta:
        model = models.Account
        fields = ('id', 'title', 'amount', 'currency',
                 'notes', 'create_datetime')


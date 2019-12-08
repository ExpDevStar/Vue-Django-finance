from django_filters import rest_framework as filters

from accounting import models


class TransactionFilterSet(filters.FilterSet):
    from_amount = filters.NumberFilter(field_name="amount", lookup_expr='gte')
    to_amount = filters.NumberFilter(field_name="amount", lookup_expr='lte')

    class Meta:
        model = models.Transaction
        fields = ['from_amount', 'to_amount', 'currency', 'trans_type', 'category',
                'subcategory', 'on_account', 'from_account', 'place']
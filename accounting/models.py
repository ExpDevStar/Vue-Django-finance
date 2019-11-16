from django.db import models
from django.utils import timezone


"""Transaction model will be a core of homefinance application
    Now it has many CharField attributes, which will become ForeignKey
    in future.
"""
class Transaction(models.Model):
    amount = models.DecimalField(max_digits=7, decimal_places=2)
    currency = models.CharField(max_length=3)
    trans_type = models.CharField(max_length=10)
    category = models.CharField(max_length=10)
    subcategory = models.CharField(max_length=10)
    from_account = models.CharField(max_length=10)
    on_account = models.CharField(max_length=10)
    create_datetime = models.DateTimeField(default=timezone.now)
    place = models.CharField(max_length=10)
    notes = models.TextField()

    def __str__(self):
        return '{}, {} {}, {}'.format(self.notes, 
                                        self.amount, 
                                        self.currency, 
                                        self.create_datetime
                                        )

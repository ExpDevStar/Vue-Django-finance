from django.db import models
from django.utils import timezone


TRANSACTION_TYPES = [
        ('INC', 'Income'),
        ('EXP', 'Expences'),
        ('TEC', 'Technical')
    ]

class Transaction(models.Model):
    amount = models.DecimalField(max_digits=7, decimal_places=2)
    currency = models.ForeignKey('Currency', on_delete=models.CASCADE)
    trans_type = models.CharField(max_length=3, choices=TRANSACTION_TYPES)
    category = models.ForeignKey('Category', 
        on_delete=models.CASCADE, 
        blank=True, null=True)
    subcategory = models.ForeignKey('Subcategory', 
        on_delete=models.CASCADE, 
        blank=True, null=True)
    from_account = models.ForeignKey('Account', 
        related_name="transactions_from_account", 
        on_delete=models.CASCADE, 
        blank=True, null=True)
    on_account = models.ForeignKey('Account', 
        related_name="transactions_on_account", 
        on_delete=models.CASCADE, 
        blank=True, null=True)
    create_datetime = models.DateTimeField(default=timezone.now)
    place = models.ForeignKey('Place', 
        on_delete=models.CASCADE, 
        blank=True, null=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return '{}, {} {}, {}'.format(self.notes, 
                                        self.amount, 
                                        self.currency, 
                                        self.create_datetime
                                        )


class Account(models.Model):
    title = models.CharField(max_length=20)
    amount = models.DecimalField(max_digits=7, decimal_places=2)
    currency = models.ForeignKey('Currency', on_delete=models.CASCADE)
    notes = models.TextField(blank=True)
    create_datetime = models.DateTimeField(default=timezone.now)

    def increase(self, sum, currency):
        if self.currency.id == currency:
            self.amount += sum
        else:
            raise Exception('Account currency must match transaction currency')

    def decrease(self, sum, currency):
        if self.amount < sum:
            raise Exception('There is not enough money on the account. Replenish the account first')
        elif self.currency.id != currency:
            raise Exception('Account currency must match transaction currency')
        else:
            self.amount -= sum

    def __str__(self):
        return '{}, {} {}'.format(self.title, self.amount, self.currency)


class AccountJournal(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=7, decimal_places=2)
    timestamp = models.DateTimeField(default=timezone.now)


class Currency(models.Model):
    name = models.CharField(max_length=3)
    full_name = models.CharField(max_length=20)

    def __str__(self):
        return '{}'.format(self.name)


class Category(models.Model):
    name = models.CharField(max_length=20)
    cat_type = models.CharField(max_length=3, choices=TRANSACTION_TYPES)

    def __str__(self):
        return '{}'.format(self.name)

class Subcategory(models.Model):
    name = models.CharField(max_length=20)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return '{}'.format(self.name)


class Place(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return '{}'.format(self.name)

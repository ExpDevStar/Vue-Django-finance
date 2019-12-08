from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from .models import Account, AccountJournal


@receiver(post_save, sender=Account)
def create_account_journal_entry(sender, instance, **kwargs):
    AccountJournal.objects.create(account=instance, amount=instance.amount)
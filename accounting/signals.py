from django.db.models.signals import post_save
from django.dispatch import receiver

from accounting import models

@receiver(post_save, sender=models.Transaction)
def add_transaction_to_account_journal_entry(sender, instance, **kwargs):
    if instance.trans_type == 'INC':
        entry = models.AccountJournal.objects.latest('timestamp')
        entry.transaction = instance
        entry.save()
    if instance.trans_type == 'EXP':
        entry = models.AccountJournal.objects.latest('timestamp')
        entry.transaction = instance
        entry.save()
    if instance.trans_type == 'TEC':
        from_entry = models.AccountJournal.objects.all()[1]
        on_entry = models.AccountJournal.objects.latest('timestamp')
        from_entry.transaction = instance
        on_entry.transaction = instance
        from_entry.save()
        on_entry.save()
        
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse

from .models import Transaction

def transaction_list(request):
    transactions = Transaction.objects.all()
    data = {"results": list(transactions.values())}
    return JsonResponse(data)

def transaction_detail(request, pk):
    transaction = get_object_or_404(Transaction, pk=pk)
    data = {"results": {
        "amount": transaction.amount,
        "currency": transaction.currency,
        "trans_type": transaction.trans_type,
        "category": transaction.category,
        "subcategory": transaction.subcategory,
        "from_account": transaction.from_account,
        "on_account": transaction.on_account,
        "create_datetime": transaction.create_datetime,
        "place": transaction.place,
        "notes": transaction.notes
    }}
    return JsonResponse(data)

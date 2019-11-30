from django.contrib import admin
from accounting import models

admin.site.register(models.Transaction)
admin.site.register(models.Account)
admin.site.register(models.Currency)
admin.site.register(models.Category)
admin.site.register(models.Subcategory)
admin.site.register(models.Place)

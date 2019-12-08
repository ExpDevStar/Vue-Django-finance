from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from accounting import views

router = routers.DefaultRouter()
router.register(r'transactions', views.TransactionViewSet, 'Transaction')
router.register(r'accounts', views.AccountViewSet)
router.register(r'currencies', views.CurrencyViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'subcategories', views.SubcategoryViewSet)
router.register(r'places', views.PlaceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
]

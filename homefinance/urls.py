from django.urls import path, include
from rest_framework import routers
from homefiance.accounting import views

router = routers.DefaultRouter()
router.register(r'transactions', views.TransactionViewSet)


urlpatterns = [
    path('', include('router.urls')),
]

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from accounting import views

router = routers.DefaultRouter()
router.register(r'transactions', views.TransactionViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
]

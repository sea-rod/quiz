from django.urls import path
from .views import CalculateResultViewAPI


urlpatterns = [
    path("", CalculateResultViewAPI.as_view()),
]

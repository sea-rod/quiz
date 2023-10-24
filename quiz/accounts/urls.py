from django.urls import path
from .views import CreateUserApi


urlpatterns = [
    path("signup/", CreateUserApi.as_view()),
]

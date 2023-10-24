from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView
from .serializers import UserSerializer


class CreateUserApi(CreateAPIView):
    serializer_class = UserSerializer
    queryset = None

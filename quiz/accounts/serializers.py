from rest_framework import serializers
from django.contrib.auth import get_user_model
from .validators import password_mismatch, password_validationAPI


class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = get_user_model()
        fields = ("username", "email", "password", "password2", "is_quizer")
        extra_kwargs = {
            "password": {"write_only": True},
            "is_quizer": {"required": True},
        }

    def validate(self, attrs):
        password2 = attrs.pop("password2")
        password = attrs.get("password")
        user = get_user_model()(**attrs)

        password_mismatch(password, password2)
        password_validationAPI(password, user)
        return super().validate(attrs)

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user

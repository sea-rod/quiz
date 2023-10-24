from rest_framework import serializers
from .models import Result, ResultDetails


class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Result


class ResultDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = ResultDetails

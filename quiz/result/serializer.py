from rest_framework import serializers
from .models import Result, ResultDetails


class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Result


class ResultDetailsSerializer(serializers.ModelSerializer):
    question = serializers.CharField()
    class Meta:
        fields = ("result","question","answer","option_chosed","correct")
        model = ResultDetails

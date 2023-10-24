from django.db import models
from django.contrib.auth import get_user_model
from questions.models import Question


class Result(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    score = models.IntegerField(default=0)


class ResultDetails(models.Model):
    result = models.ForeignKey(Result, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.CharField(max_length=255)
    option_chosed = models.CharField(max_length=255)
    correct = models.BooleanField()

from django.db import models
from django.contrib.auth import get_user_model
from questions.models import Question,QuestionBank


class Result(models.Model):
    question = models.ForeignKey(QuestionBank,on_delete=models.DO_NOTHING)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    total_questions = models.IntegerField(default=0)


class ResultDetails(models.Model):
    result = models.ForeignKey(Result, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.CharField(max_length=255)
    option_chosed = models.CharField(max_length=255)
    correct = models.BooleanField()

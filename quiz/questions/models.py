from django.db import models
from django.contrib.auth import get_user_model


class QuestionBank(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name + " " + str(self.pk)


class Question(models.Model):
    question_bank = models.ForeignKey(QuestionBank, on_delete=models.CASCADE)
    question = models.TextField()

    def __str__(self):
        return self.question + " " + str(self.pk)


class Options(models.Model):
    question = models.OneToOneField(Question, on_delete=models.CASCADE)
    answer = models.CharField(max_length=255)
    option_a = models.CharField(max_length=255)
    option_b = models.CharField(max_length=255)
    option_c = models.CharField(max_length=255)

    def __str__(self):
        return self.question.question

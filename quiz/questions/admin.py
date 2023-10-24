from django.contrib import admin
from .models import Question, QuestionBank, Options

admin.site.register(Question)
admin.site.register(QuestionBank)
admin.site.register(Options)

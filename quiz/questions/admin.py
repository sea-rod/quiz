from django.contrib import admin
from .models import Question, QuestionBank, Options


class QuestionInline(admin.StackedInline):
    model = Question


class QuestionBankAdmin(admin.ModelAdmin):
    inlines = [
        QuestionInline,
    ]


admin.site.register(Question)
admin.site.register(QuestionBank, QuestionBankAdmin)
admin.site.register(Options)

from django.urls import path
from .views import (
    QuestionsListAPIView,
    QuestionBankCreateListAPIView,
    QuestionBankUpdateDelete,
    QuestionCreateViewAPI,
    QuestionUpdate,
)

urlpatterns = [
    path("questionsbank/", QuestionBankCreateListAPIView.as_view()),
    path("<int:pk>/questionsbank/", QuestionBankUpdateDelete.as_view()),
    path("<int:pk>/questions/", QuestionsListAPIView.as_view()),
    path("add_question/", QuestionCreateViewAPI.as_view()),
    path("<int:pk>/update_question/", QuestionUpdate.as_view()),
]

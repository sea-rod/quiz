from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import QuestionSerializer, QuestionBankSerializer
from .models import Question, QuestionBank
from .permissions import IsUser, IsQuizer


class QuestionsListAPIView(generics.GenericAPIView):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()

    def get(self, request, *args, **kwargs):
        pk = kwargs["pk"]
        serializer = self.serializer_class(
            Question.objects.filter(question_bank=pk), many=True
        )
        return Response(serializer.data)


class QuestionCreateViewAPI(generics.CreateAPIView):
    permission_classes = (IsAuthenticated, IsUser)
    serializer_class = QuestionSerializer
    queryset = None


class QuestionUpdate(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated, IsUser)
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()


class QuestionBankCreateListAPIView(generics.ListCreateAPIView):
    permission_classes = (IsQuizer,)
    serializer_class = QuestionBankSerializer
    queryset = QuestionBank.objects.all()


class QuestionBankUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated, IsQuizer)
    serializer_class = QuestionBankSerializer
    queryset = QuestionBank.objects.all()

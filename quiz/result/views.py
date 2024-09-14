from django.db.models import Sum
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from questions.models import Question, Options
from rest_framework import status
from .models import Result, ResultDetails
from .serializer import ResultSerializer, ResultDetailsSerializer
from questions.models import QuestionBank, Question


class CalculateResultViewAPI(APIView):
    def post(self, request, *args, **kwargs):
        score = 0
        print(request.data)
        question_bank = QuestionBank.objects.get(pk=request.data["question_bank"])
        result = Result.objects.create(
            user=request.user,
            question=question_bank,
            total_questions=len(Question.objects.filter(question_bank=question_bank)),
        )
        result.save()
        result_details_list = []
        try:
            for i in request.data["solved"]:
                quest_id = i["question"]
                chose_ans = i["chose_ans"]
                correct = False
                quest = Question.objects.get(
                    id=quest_id, question_bank=question_bank.pk
                )
                option = Options.objects.get(question=quest)
                if chose_ans == option.answer:
                    correct = True
                    score += 1
                result_details = ResultDetails.objects.create(
                    result=result,
                    question=quest,
                    answer=option.answer,
                    option_chosed=chose_ans,
                    correct=correct,
                )
                result_details.save()

                result_details_serializer = ResultDetailsSerializer(result_details)
                result_details_list.append(result_details_serializer.data)
            result.score = score
            result.save()

            result_serializer = ResultSerializer(result)
            response_data = {
                "result": result_serializer.data,
                "detail": result_details_list,
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            raise ValidationError("Question Bank Does not exit",e)

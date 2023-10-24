from django.db.models import Sum
from rest_framework.views import APIView
from rest_framework.response import Response
from questions.models import Question, Options
from rest_framework import status
from .models import Result, ResultDetails
from .serializer import ResultSerializer, ResultDetailsSerializer


class CalculateResultViewAPI(APIView):
    def post(self, request, *args, **kwargs):
        score = 0
        result = Result.objects.create(user=request.user)
        result.save()
        result_details_list = []
        for i in request.data:
            quest_id = i["question"]
            chose_ans = i["chose_ans"]
            correct = False
            quest = Question.objects.get(id=quest_id)
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

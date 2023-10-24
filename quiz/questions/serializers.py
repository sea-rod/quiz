# serializers.py
from rest_framework import serializers
from .models import Question, QuestionBank, Options


class OptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Options
        fields = ("answer", "option_a", "option_b", "option_c")


class QuestionSerializer(serializers.ModelSerializer):
    options = OptionsSerializer()

    class Meta:
        model = Question
        fields = ("id", "question_bank", "question", "options")

    def create(self, validated_data):
        options = validated_data.pop("options")
        question = Question.objects.create(**validated_data)
        question.save()

        options = Options.objects.create(**options, question=question)
        options.save()
        return question

    def update(self, instance, validated_data):
        instance.question = validated_data["question"]
        opt = validated_data.pop("options")
        options = Options.objects.get(question=instance)
        options.answer = opt.get("answer")
        options.option_a = opt.get("option_a")
        options.option_b = opt.get("option_b")
        options.option_c = opt.get("option_c")
        options.save()
        instance.save()

        return instance


class QuestionBankSerializer(serializers.ModelSerializer):
    user = serializers.CharField()

    class Meta:
        model = QuestionBank
        fields = ("id", "user", "name")
        extra_kwargs = {"user": {"required": False}}

    def validate(self, attrs):
        user = self.context["request"].user
        attrs["user"] = user
        return super().validate(attrs)

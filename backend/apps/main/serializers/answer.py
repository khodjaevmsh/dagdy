from rest_framework import serializers

from core.utils.serializers import ValidatorSerializer
from main.models import Quiz, Question, Answer
from main.serializers.question import QuestionSerializer
from main.serializers.quiz import QuizSerializer


class AnswerSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['question'] = QuestionSerializer(instance.question).data
        return data

    class Meta:
        model = Answer
        fields = ('id', 'text', 'correct', 'ball')


class AnswerFilterSerializer(ValidatorSerializer):
    page = serializers.IntegerField(default=1)
    question = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all(), required=False)

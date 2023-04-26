from rest_framework import serializers

from core.utils.serializers import ValidatorSerializer
from main.models import Quiz, Question
from main.serializers.quiz import QuizSerializer


class QuestionSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['quiz'] = QuizSerializer(instance.quiz).data
        return data

    class Meta:
        model = Question
        fields = ('id', 'text', 'type', 'help_text')


class QuestionFilterSerializer(ValidatorSerializer):
    page = serializers.IntegerField(default=1)
    quiz = serializers.PrimaryKeyRelatedField(queryset=Quiz.objects.all(), required=False)

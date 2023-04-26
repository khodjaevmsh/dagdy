from rest_framework import serializers

from core.utils.serializers import ValidatorSerializer
from main.models import Quiz, Question, Result
from main.serializers.quiz import QuizSerializer


class ResultSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['quiz'] = QuizSerializer(instance.quiz).data
        return data

    class Meta:
        model = Result
        fields = ('id', 'easy_score', 'medium_score', 'hard_score', 'quiz', 'easy_description', 'medium_description',
                  'hard_description',)


class ResultFilterSerializer(ValidatorSerializer):
    page = serializers.IntegerField(default=1)
    quiz = serializers.PrimaryKeyRelatedField(queryset=Quiz.objects.all(), required=False)

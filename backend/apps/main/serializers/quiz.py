from rest_framework import serializers

from core.utils.serializers import ValidatorSerializer
from main.models import Quiz


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ('id', 'name', 'cover', 'description',)


class QuizFilterSerializer(ValidatorSerializer):
    page = serializers.IntegerField(default=1)

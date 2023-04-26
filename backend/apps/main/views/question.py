from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

from core.utils.pagination import pagination
from main.models import Quiz, Question
from main.serializers.question import QuestionSerializer, QuestionFilterSerializer
from main.serializers.quiz import QuizSerializer, QuizFilterSerializer
from django.utils import translation


class QuestionListView(APIView):
    def get(self, request):
        if 'HTTP_ACCEPT_LANGUAGE' in self.request.META:
            lang = self.request.META['HTTP_ACCEPT_LANGUAGE']
            translation.activate(lang)
        params = QuestionFilterSerializer.check(request.GET)
        queryset = Question.objects.list(quiz=params.get('quiz'))
        serializer = QuestionSerializer(many=True)
        data = pagination(queryset, serializer, params.get('page'))
        return Response(data)

    def post(self, request):
        serializer = QuizSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, 201)


class QuestionDetailView(APIView):
    def get(self, request, pk):
        if 'HTTP_ACCEPT_LANGUAGE' in self.request.META:
            lang = self.request.META['HTTP_ACCEPT_LANGUAGE']
            translation.activate(lang)
        instance = get_object_or_404(Question, id=pk)
        serializer = QuestionSerializer(instance)
        return Response(serializer.data)

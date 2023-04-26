from rest_framework.views import APIView
from rest_framework.response import Response

from core.utils.pagination import pagination
from rest_framework.generics import get_object_or_404
from main.models import Quiz
from main.serializers.quiz import QuizSerializer, QuizFilterSerializer
from django.utils import translation


class QuizListView(APIView):
    def get(self, request):
        if 'HTTP_ACCEPT_LANGUAGE' in self.request.META:
            lang = self.request.META['HTTP_ACCEPT_LANGUAGE']
            translation.activate(lang)
        params = QuizFilterSerializer.check(request.GET)
        queryset = Quiz.objects.all()
        serializer = QuizSerializer(many=True)
        data = pagination(queryset, serializer, params.get('page'))
        return Response(data)

    def post(self, request):
        serializer = QuizSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, 201)


class QuizDetailView(APIView):
    def get(self, request, pk):
        if 'HTTP_ACCEPT_LANGUAGE' in self.request.META:
            lang = self.request.META['HTTP_ACCEPT_LANGUAGE']
            translation.activate(lang)
        instance = get_object_or_404(Quiz, id=pk)
        serializer = QuizSerializer(instance)
        return Response(serializer.data)

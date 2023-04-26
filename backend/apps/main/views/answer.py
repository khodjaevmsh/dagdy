from rest_framework.views import APIView
from rest_framework.response import Response

from core.utils.pagination import pagination
from main.models import Quiz, Question, Answer
from main.serializers.answer import AnswerFilterSerializer, AnswerSerializer
from django.utils import translation
from rest_framework.generics import get_object_or_404


class AnswerListView(APIView):
    def get(self, request):
        if 'HTTP_ACCEPT_LANGUAGE' in self.request.META:
            lang = self.request.META['HTTP_ACCEPT_LANGUAGE']
            translation.activate(lang)
        params = AnswerFilterSerializer.check(request.GET)
        queryset = Answer.objects.list(question=params.get('question'))
        serializer = AnswerSerializer(many=True)
        data = pagination(queryset, serializer, params.get('page'))
        return Response(data)

    def post(self, request):
        serializer = AnswerSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, 201)


class AnswerDetailView(APIView):
    def get(self, request, pk):
        if 'HTTP_ACCEPT_LANGUAGE' in self.request.META:
            lang = self.request.META['HTTP_ACCEPT_LANGUAGE']
            translation.activate(lang)
        instance = get_object_or_404(Answer, id=pk)
        print(instance)
        serializer = AnswerSerializer(instance)
        return Response(serializer.data)

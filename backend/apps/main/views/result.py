from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404

from core.utils.pagination import pagination
from main.models import Result
from django.utils import translation

from main.serializers.result import ResultFilterSerializer, ResultSerializer


class ResultListView(APIView):
    def get(self, request):
        if 'HTTP_ACCEPT_LANGUAGE' in self.request.META:
            lang = self.request.META['HTTP_ACCEPT_LANGUAGE']
            translation.activate(lang)
        params = ResultFilterSerializer.check(request.GET)
        queryset = Result.objects.list(quiz=params.get('quiz'))
        serializer = ResultSerializer(many=True)
        data = pagination(queryset, serializer, params.get('page'))
        return Response(data)

    def post(self, request):
        serializer = ResultSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, 201)


class ResultDetailView(APIView):
    def get(self, request, pk):
        if 'HTTP_ACCEPT_LANGUAGE' in self.request.META:
            lang = self.request.META['HTTP_ACCEPT_LANGUAGE']
            translation.activate(lang)
        instance = get_object_or_404(Result, id=pk)
        serializer = ResultSerializer(instance)
        return Response(serializer.data)

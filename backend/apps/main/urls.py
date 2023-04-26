from django.urls import path

from main.views.answer import AnswerListView, AnswerDetailView
from main.views.question import QuestionListView, QuestionDetailView
from main.views.quiz import QuizListView, QuizDetailView
from main.views.result import ResultListView, ResultDetailView

urlpatterns = [
    path('quiz', QuizListView.as_view(), name='quiz-list'),
    path('quiz/<int:pk>', QuizDetailView.as_view(), name='quiz-detail'),
    path('question', QuestionListView.as_view(), name='question-list'),
    path('question/<int:pk>', QuestionDetailView.as_view(), name='question-detail'),
    path('answer', AnswerListView.as_view(), name='answer-list'),
    path('answer/<int:pk>', AnswerDetailView.as_view(), name='answer-detail'),
    path('result', ResultListView.as_view(), name='result-list'),
    path('result/<int:pk>', ResultDetailView.as_view(), name='result-detail'),
]

from django.contrib.auth.models import User
from django.db import models

from core.models import BaseModel
from main.querysets.answer import AnswerQuerySet
from main.querysets.question import QuestionQuerySet
from main.querysets.result import ResultQuerySet


class Quiz(BaseModel):
    name = models.CharField(verbose_name='Наименование', max_length=120)
    description = models.TextField(verbose_name='Описание')
    cover = models.ImageField(verbose_name='Обложка', upload_to='files/uploads', null=True, blank=True)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = 'Опросник'
        verbose_name_plural = 'Опросники'


class Question(BaseModel):
    CHECKBOX = 'is_checkbox'
    STAR = 'is_start_rating'
    RANGE = 'is_range'
    PICKER = 'is_image_picker'

    TYPE_OF_QUESTION = (
        (CHECKBOX, 'Чекбокс'),
        (STAR, 'Звездный рейтинг'),
        (RANGE, 'Диапазон'),
        (PICKER, 'Пикер'),
    )
    text = models.CharField(verbose_name='Вопрос', max_length=255)
    help_text = models.CharField(verbose_name='Подсказга', max_length=255, null=True, blank=True)
    quiz = models.ForeignKey('main.Quiz', verbose_name='Опросник', on_delete=models.CASCADE)
    type = models.CharField(verbose_name='Тип вопроса', max_length=25, null=True, blank=True, choices=TYPE_OF_QUESTION)

    objects = QuestionQuerySet.as_manager()

    def __str__(self):
        return self.text

    class Meta:
        verbose_name = 'Вопрос'
        verbose_name_plural = 'Вопросы'


class Answer(BaseModel):
    text = models.CharField(verbose_name='Ответ', max_length=255)
    correct = models.BooleanField(verbose_name='Правильно', default=False)
    question = models.ForeignKey('main.Question', verbose_name='Вопрос', on_delete=models.CASCADE)
    ball = models.FloatField(verbose_name='Балл за ответ')

    objects = AnswerQuerySet.as_manager()

    def __str__(self):
        return f"вопрос: {self.question}, ответ: {self.text}, правильный ответ: {self.correct}"

    class Meta:
        verbose_name = 'Ответ'
        verbose_name_plural = 'Ответы'


class Result(models.Model):
    quiz = models.ForeignKey('main.Quiz', verbose_name='Опросник', on_delete=models.CASCADE)
    user = models.ForeignKey(User, verbose_name='Пользователь', null=True, blank=True, on_delete=models.CASCADE)
    easy_score = models.FloatField(verbose_name='Балл для легкого уровня')
    medium_score = models.FloatField(verbose_name='Балл для среднего уровня')
    hard_score = models.FloatField(verbose_name='Балл для высокого уровня')
    easy_description = models.TextField(verbose_name='Описание для легково уровня')
    medium_description = models.TextField(verbose_name='Описание для среднего уровня')
    hard_description = models.TextField(verbose_name='Описание для высокого уровня')

    objects = ResultQuerySet.as_manager()

    def __str__(self):
        return str(self.quiz)

    class Meta:
        verbose_name = 'Результат'
        verbose_name_plural = 'Результаты'

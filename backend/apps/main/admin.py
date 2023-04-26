from django.contrib import admin
from .models import Question, Answer, Quiz, Result


class QuizAdmin(admin.ModelAdmin):
    inlines = [Quiz]
    exclude = ['created_at', 'updated_at', ]


class AnswerInline(admin.StackedInline):
    model = Answer
    exclude = ['created_by', 'updated_by']


class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerInline]
    exclude = ['created_by', 'updated_by']


class ResultAdmin(admin.ModelAdmin):
    model = Result
    exclude = ['user', 'created_by', 'updated_by']


admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer)
admin.site.register(Quiz)
admin.site.register(Result, ResultAdmin)

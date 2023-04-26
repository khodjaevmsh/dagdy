from modeltranslation.translator import translator, TranslationOptions
from .models import Quiz, Question, Answer


# for Person model
class QuizTranslationOptions(TranslationOptions):
    fields = ('name', 'description',)


class QuestionTranslationOptions(TranslationOptions):
    fields = ('text', 'help_text',)


class AnswerTranslationOptions(TranslationOptions):
    fields = ('text',)


translator.register(Quiz, QuizTranslationOptions)
translator.register(Question, QuestionTranslationOptions)
translator.register(Answer, AnswerTranslationOptions)

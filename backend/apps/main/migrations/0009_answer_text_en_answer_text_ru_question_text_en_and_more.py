# Generated by Django 4.2 on 2023-04-20 08:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0008_quiz_difficulty_en_quiz_difficulty_ru_quiz_name_en_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='answer',
            name='text_en',
            field=models.CharField(max_length=255, null=True, verbose_name='Ответ'),
        ),
        migrations.AddField(
            model_name='answer',
            name='text_ru',
            field=models.CharField(max_length=255, null=True, verbose_name='Ответ'),
        ),
        migrations.AddField(
            model_name='question',
            name='text_en',
            field=models.CharField(max_length=255, null=True, verbose_name='Вопрос'),
        ),
        migrations.AddField(
            model_name='question',
            name='text_ru',
            field=models.CharField(max_length=255, null=True, verbose_name='Вопрос'),
        ),
    ]
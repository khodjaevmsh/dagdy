# Generated by Django 4.2 on 2023-04-18 13:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_alter_quiz_required_score_to_pass'),
    ]

    operations = [
        migrations.AddField(
            model_name='answer',
            name='ball',
            field=models.FloatField(default=1, verbose_name='Балл за ответ'),
            preserve_default=False,
        ),
    ]
# Generated by Django 4.2 on 2023-04-26 10:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0022_rename_description_result_easy_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='result',
            name='easy_description',
            field=models.TextField(verbose_name='Описание для легково уровня'),
        ),
        migrations.AlterField(
            model_name='result',
            name='easy_score',
            field=models.FloatField(verbose_name='Балл для легкого уровня'),
        ),
        migrations.AlterField(
            model_name='result',
            name='hard_description',
            field=models.TextField(verbose_name='Описание для высокого уровня'),
        ),
        migrations.AlterField(
            model_name='result',
            name='hard_score',
            field=models.FloatField(verbose_name='Балл для высокого уровня'),
        ),
        migrations.AlterField(
            model_name='result',
            name='medium_description',
            field=models.TextField(verbose_name='Описание для среднего уровня'),
        ),
        migrations.AlterField(
            model_name='result',
            name='medium_score',
            field=models.FloatField(verbose_name='Балл для среднего уровня'),
        ),
    ]

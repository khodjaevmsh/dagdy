# Generated by Django 4.2 on 2023-04-21 20:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0015_result_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='result',
            name='difficulty',
            field=models.CharField(choices=[('easy', 'Легкий'), ('medium', 'Средний'), ('hard', 'Сложный')], default=1, max_length=6, verbose_name='Сложность'),
            preserve_default=False,
        ),
    ]

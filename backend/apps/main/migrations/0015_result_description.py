# Generated by Django 4.2 on 2023-04-21 16:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0014_alter_result_options_alter_result_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='result',
            name='description',
            field=models.TextField(default=1, verbose_name='Описание'),
            preserve_default=False,
        ),
    ]

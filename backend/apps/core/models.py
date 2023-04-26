from django.db import models
from django.db.models import SET_NULL
from django.contrib.auth.models import User


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, editable=False, null=True)
    updated_at = models.DateTimeField(auto_now=True, editable=False, null=True)
    created_by = models.ForeignKey(User, SET_NULL, null=True, blank=True,
                                   related_name='created_%(model_name)ss')
    updated_by = models.ForeignKey(User, SET_NULL, null=True, blank=True,
                                   related_name='updated_%(model_name)ss')

    class Meta:
        abstract = True
        ordering = ('id',)


class SmsToken(BaseModel):
    token = models.TextField()
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'core_sms_tokens'

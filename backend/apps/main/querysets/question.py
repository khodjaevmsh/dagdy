from core.querysets.base_queryset import BaseQuerySet


class QuestionQuerySet(BaseQuerySet):
    def list(self, quiz, search=None):
        query = self.filter(name__icontains=search) if search else self
        query = query.filter(quiz=quiz).order_by('-created_at') if quiz else query
        return query

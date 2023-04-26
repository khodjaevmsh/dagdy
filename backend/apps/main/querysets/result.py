from core.querysets.base_queryset import BaseQuerySet


class ResultQuerySet(BaseQuerySet):
    def list(self, quiz, search=None):
        query = self.filter(name__icontains=search) if search else self
        query = query.filter(quiz=quiz) if quiz else query
        return query

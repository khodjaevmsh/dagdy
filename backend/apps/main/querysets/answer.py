from core.querysets.base_queryset import BaseQuerySet


class AnswerQuerySet(BaseQuerySet):
    def list(self, question, search=None):
        query = self.filter(name__icontains=search) if search else self
        query = query.filter(question=question) if question else query
        return query

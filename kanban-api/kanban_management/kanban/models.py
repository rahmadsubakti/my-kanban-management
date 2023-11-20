from django.db import models
from django.contrib.auth.models import User
import uuid
# Create your models here.

class Board(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=60)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='boards')

    def __str__(self):
        return self.name

class Column(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=60)
    color = models.CharField(max_length=7, default="#808080") # replace max_length with 7
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name="columns")

    def __str__(self):
        return self.name

status_choices = [
    ('todo', 'Todo'),
    ('doing', 'Doing'),
    ('done', 'Done')
]

class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    column = models.ForeignKey(Column, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=60)
    description = models.TextField()
    status = models.CharField(choices=status_choices, max_length=5, default='todo')

    def __str__(self):
        return self.title

class SubTask(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='subtasks')
    title = models.CharField(max_length=60)
    is_done = models.BooleanField(default=False)

    def __str__(self):
        return self.title
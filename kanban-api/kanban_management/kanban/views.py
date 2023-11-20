from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, \
    DestroyModelMixin, UpdateModelMixin
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from kanban.models import Board, Column, Task, SubTask
from kanban.serializers import BoardSerializer, ColumnSerializer, TaskSerializer, SubTaskSerializer
from kanban.mixins import SubCreateMixin, SubUpdateMixin

class BoardList(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Board.objects.all()
    serializer_class = BoardSerializer

    def get_queryset(self):
        user = self.request.user
        queryset = self.queryset.filter(user=user)
        return queryset
    
class BoardCreate(GenericAPIView, SubCreateMixin):
    permission_classes = [IsAuthenticated]
    queryset = Board.objects.all()
    main_model = Board
    serializer_class = BoardSerializer
    sub_serializer_class = ColumnSerializer
    main_rel_field = 'board'
    sub_field = 'columns'

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
class BoardDetail(generics.RetrieveDestroyAPIView, SubUpdateMixin):
    permission_classes = [IsAuthenticated]
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    lookup_field = 'id'

    sub_model = Column
    sub_serializer_class = ColumnSerializer
    main_rel_field = 'board'
    sub_field = 'columns'
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
class ColumnCreate(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer
    
class ColumnDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer
    lookup_field = 'id'
    
class TaskCreate(GenericAPIView, SubCreateMixin):
    permission_classes = [IsAuthenticated]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    sub_serializer_class = SubTaskSerializer
    main_rel_field = 'task'
    sub_field = 'subtasks'

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
class TaskDetail(generics.RetrieveDestroyAPIView, SubUpdateMixin):
    permission_classes = [IsAuthenticated]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    lookup_field = 'id'

    sub_model = SubTask
    sub_serializer_class = SubTaskSerializer
    main_rel_field = 'task'
    sub_field = 'subtasks'

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
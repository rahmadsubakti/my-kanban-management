from rest_framework import serializers
import re
from kanban.models import Board, Column, Task, SubTask

class SubTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubTask
        fields = ['id', 'task', 'title', 'is_done']

class TaskSerializer(serializers.ModelSerializer):
    subtasks = SubTaskSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = ['id', 'column', 'title', 'description', 'status', 'subtasks']

class ColumnSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Column
        fields = '__all__'

    def validate_color(self, value):
        """
        Solution source: https://www.geeksforgeeks.org/how-to-validate-hexadecimal-color-code-using-regular-expression/
        """
        pattern = r"^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
        result = re.search(pattern, value)
        if result is None:
            raise serializers.ValidationError("Please input the correct format of hex color")
        return value

class BoardSerializer(serializers.ModelSerializer):
    columns = ColumnSerializer(many=True, read_only=True)

    class Meta:
        model = Board
        fields = ['user', 'id', 'name', 'columns']
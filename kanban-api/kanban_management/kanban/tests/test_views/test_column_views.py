from django.contrib.auth.models import User
from django.urls import reverse, reverse_lazy
from rest_framework import status
from rest_framework.test import APITestCase
import json
from kanban.models import Board, Column, Task
from kanban.tests.mixins import LoginMixin

user_data = {'username': 'user', 'password': 'passwduser'}

class ColumnTests(APITestCase, LoginMixin):
    def setUp(self):
        self.user = User.objects.create_user(**user_data)
        self.key = self.login(**user_data)
        self.kwargs = {'format': 'json', 'HTTP_AUTHORIZATION': f'Token {self.key}'}
        self.url_create = reverse('column-create')
        self.board1 = Board.objects.create(name='board1', user=self.user)
        self.column1 = Column.objects.create(board= self.board1, name= 'column1', color= '#fffff')
        self.task1 = Task.objects.create(column=self.column1, title="task1", description="task1", status="todo")
        self.url_column1 = reverse('column-detail', kwargs={'id': self.column1.id})

    def test_create_column(self):
        board = Board.objects.create(name='board', user=self.user)
        data = {'board': board.id, 'name': 'column', 'color': '#fff'}
        response = self.client.post(self.url_create, data=data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_column_and_has_tasks(self):
        response = self.client.get(self.url_column1, **self.kwargs)
        response.render()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        content = json.loads(response.content)
        self.assertTrue(len(content.get('tasks')) != 0)

    def test_column_color_is_valid(self):
        valid_data = {'board': self.board1.id, 'name': 'valid column', 'color': '#ffffff'}
        response = self.client.post(self.url_create, data=valid_data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_column_color_is_invalid(self):
        invalid_data= {'board': self.board1.id, 'name': 'invalid column', 'color': '#ggggg'}
        response = self.client.post(self.url_create, data=invalid_data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_column_update(self):
        data = {'board': self.board1.id, 'name': 'column1 updated!', 'color': '#000'}
        response = self.client.put(self.url_column1, data=data, **self.kwargs)
        response.render()
        content = json.loads(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(content.get('name'), 'column1 updated!')
        self.assertEqual(content.get('color'), '#000')
        self.assertEqual(content.get('board'), str(self.board1.id))

    def test_column_delete(self):
        response = self.client.delete(self.url_column1, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


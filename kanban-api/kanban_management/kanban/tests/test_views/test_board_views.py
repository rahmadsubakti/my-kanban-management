from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
import json
from kanban.models import Board, Column

from kanban.tests.mixins import LoginMixin

from functools import partial

# Generic user data
user_data = {'username': 'user', 'password': 'passwduser'}

class BoardCreateTests(APITestCase, LoginMixin):
    def setUp(self):
        self.user = User.objects.create_user(**user_data)
        self.key = self.login(**user_data)
        self.kwargs = {'format': 'json', 'HTTP_AUTHORIZATION': f'Token {self.key}'}
        self.url = reverse('board-create')

    def test_create_board_no_columns(self):
        data = {'name': 'board'}
        response = self.client.post(self.url, data=data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_board_with_valid_columns(self):
        data = {
            'name': 'board',
            'columns': [
                {'name': 'column1', 'color': '#fff'},
                {'name': 'column2', 'color': '#fff'}
            ]
        }
        response = self.client.post(self.url, data=data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_board_with_invalid_columns(self):
        data = {
            'name': 'board',
            'columns': [
                {'name': 'column1', 'color': '#f'},
                {'name': 'column2', 'color': '#fff'}
            ]
        }
        response = self.client.post(self.url, data=data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class BoardGetTest(APITestCase, LoginMixin):
    def setUp(self):
        self.user_data1 = {'username': 'user1', 'password': 'passwduser1'}
        self.user1 = User.objects.create_user(**self.user_data1)
        self.board1 = Board.objects.create(name='board1', user=self.user1)
        self.column1 = Column.objects.create(board=self.board1, name='column1')
        self.column2 = Column.objects.create(board=self.board1, name='column2')

        self.user_data2 = {'username': 'user2', 'password': 'passwduser2'}
        self.user2 = User.objects.create_user(**self.user_data2)
        self.board2 = Board.objects.create(name='board2', user=self.user2)
        self.column3 = Column.objects.create(board=self.board2, name='column3')

        self.get_url = partial(reverse, 'board-detail')

    def test_get_board_for_user1(self):
        key = self.login(**self.user_data1)
        url = self.get_url(kwargs={'id': self.board1.id})
        response = self.client.get(url, format='json', HTTP_AUTHORIZATION=f'Token {key}')
        response.render()
        content = json.loads(response.content)
        board_name = content.get('name')
        column1_name = content.get('columns')[0].get('name')
        column2_name = content.get('columns')[1].get('name')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(board_name, self.board1.name)
        self.assertEqual(len(content.get('columns')), 2)
        self.assertEqual(column1_name, self.column1.name)
        self.assertEqual(column2_name, self.column2.name)
    
    def test_get_board_for_user2(self):
        key = self.login(**self.user_data2)
        url = self.get_url(kwargs={'id': self.board2.id})
        response = self.client.get(url, format='json', HTTP_AUTHORIZATION=f'Token {key}')
        response.render()
        content = json.loads(response.content)
        board_name = content.get('name')
        columns = content.get('columns')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(board_name, self.board2.name)
        self.assertEqual(len(columns), 1)
        self.assertEqual(columns[0].get('name'), self.column3.name)

    def test_get_nonexistent_board(self):
        import uuid
        while True:
            id = uuid.uuid4()
            if id != self.board1.id:
                break
        
        key = self.login(**self.user_data1)
        url = self.get_url(kwargs={'id': id})
        response = self.client.get(url, format='json', HTTP_AUTHORIZATION=f'Token {key}')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class BoardDeleteTest(APITestCase, LoginMixin):
    def setUp(self):
        self.user = User.objects.create_user(**user_data)
        self.key = self.login(**user_data)
        self.kwargs = {'format': 'json', 'HTTP_AUTHORIZATION': f'Token {self.key}'}
        self.board = Board.objects.create(name='board', user=self.user)
        self.column1 = Column.objects.create(board=self.board, name='column1')
        self.column2 = Column.objects.create(board=self.board, name='column2')
        self.get_url = partial(reverse, 'board-detail')

    def test_delete_board(self):
        url = self.get_url(kwargs={'id': self.board.id})
        response = self.client.delete(url, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

class BoardUpdateTest(APITestCase, LoginMixin):
    def setUp(self):
        self.user = User.objects.create_user(**user_data)
        self.key = self.login(**user_data)
        self.board_no_column = Board.objects.create(name='board-only', user=self.user)
        self.board = Board.objects.create(name='board with columns', user=self.user)
        self.column1 = Column.objects.create(board=self.board, name='column1')
        self.column2 = Column.objects.create(board=self.board, name='column2')
        self.get_url = partial(reverse, 'board-detail')
        self.kwargs = {'format': 'json', 'HTTP_AUTHORIZATION': f'Token {self.key}'}
        self.data = {
            'name': self.board.name,
            'columns': [
                {
                    'id': self.column1.id,
                    'name': self.column1.name,
                    'board': self.board.id
                },
                {
                    'id': self.column2.id,
                    'name': self.column2.name,
                    'board': self.board.id
                },
            ]
        }

    def test_update_board_no_column(self):
        data = {'name': 'board-only updated'}
        url = self.get_url(kwargs={'id': self.board_no_column.id})
        response = self.client.put(url, data=data, **self.kwargs)
        response.render()
        content = json.loads(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        obj = Board.objects.get(id=self.board_no_column.id)
        self.assertEqual(obj.name, data['name'])

        response_get = self.client.get(url, **self.kwargs)
        response_get.render()
        content = json.loads(response_get.content)
        self.assertEqual(content.get('name'), data['name'])

    def test_update_board_name_with_column(self):
        data = {'name': 'board updated'}
        url = self.get_url(kwargs={'id': self.board.id})
        response = self.client.put(url, data=data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        obj = Board.objects.get(id=self.board.id)
        self.assertEqual(obj.name, data['name'])

        column = Column.objects.get(id=self.column1.id)
        self.assertEqual(column.name, self.column1.name)

        response_get = self.client.get(url,**self.kwargs)
        response_get.render()
        content = json.loads(response_get.content)
        self.assertEqual(content.get('name'), data['name'])

    def test_update_board_change_column_name(self):
        self.data['columns'][0]['name'] = 'column1 updated'
        url = self.get_url(kwargs={'id': self.board.id})
        response = self.client.put(url, data=self.data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        column1 = Column.objects.get(id=self.column1.id)
        self.assertEqual(column1.name, 'column1 updated')

    def test_update_board_change_column_invalid_color(self):
        self.data['columns'][0]['color'] = 'green'
        url = self.get_url(kwargs={'id': self.board.id})
        response = self.client.put(url, data=self.data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_board_add_new_column(self):
        self.data['columns'].append({'name': 'column3'})
        url = self.get_url(kwargs={'id': self.board.id})
        response = self.client.put(url, data=self.data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        columns = Column.objects.all()
        self.assertEqual(len(columns), 3)
        self.assertEqual(columns[2].name, 'column3')

    def test_update_board_add_new_column_and_change_column_name(self):
        self.data['columns'][0]['name'] = 'column1 updated'
        self.data['columns'].append({'name': 'column3'})
        url = self.get_url(kwargs={'id': self.board.id})
        response = self.client.put(url, data=self.data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        columns = Column.objects.all()
        column1 = columns[0]
        column3 = columns[2]
        self.assertEqual(len(columns), 3)
        self.assertEqual(column1.name, 'column1 updated')
        self.assertEqual(column3.name, 'column3')

    def test_update_board_change_column_color(self):
        color = '#FFFFFF'
        self.data['columns'][0]['color'] = color
        url = self.get_url(kwargs={'id': self.board.id})
        response = self.client.put(url, data=self.data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_board_delete_column_and_change_column_color(self):
        color = '#FFFFFF'
        removed_column = self.data['columns'].pop()
        self.data['columns'][0]['color'] = color
        url = self.get_url(kwargs={'id': self.board.id})
        response = self.client.put(url, data=self.data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        columns = Column.objects.all()
        column1 = columns[0]
        self.assertEqual(len(columns), 1)
        self.assertEqual(column1.color, color)

    def test_update_board_delete_column(self):
        removed_column = self.data['columns'].pop()
        url = self.get_url(kwargs={'id': self.board.id})
        response = self.client.put(url, data=self.data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class BoardListTests(APITestCase, LoginMixin):
    def setUp(self):
        self.url = reverse('board-list')
        self.user1 = User.objects.create_user(username='user1', password='passwd1')
        self.user2 = User.objects.create_user(username='user2', password='passwd2')
        self.board1 = Board.objects.create(name='board1', user=self.user1)
        self.board2 = Board.objects.create(name='board2', user=self.user1)
        self.board3 = Board.objects.create(name='board3', user=self.user2)

    def test_get_boards_list(self):
        # get list of boards of user1
        user1_data = {'username': 'user1', 'password': 'passwd1'}
        key1 = self.login(**user1_data)
        response = self.client.get(self.url, format='json', HTTP_AUTHORIZATION=f'Token {key1}')
        response.render()
        content = json.loads(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(content), 2)

        # get list of boards of user2
        user2_data = {'username': 'user2', 'password': 'passwd2'}
        key2 = self.login(**user2_data)
        response = self.client.get(self.url, format='json', HTTP_AUTHORIZATION=f'Token {key2}')
        response.render()
        content = json.loads(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(content), 1)
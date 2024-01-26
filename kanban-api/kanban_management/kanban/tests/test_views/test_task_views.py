from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
import json
from kanban.models import Board, Column, Task, SubTask
from kanban.tests.mixins import LoginMixin

user_data = {'username': 'user', 'password': 'passwduser'}

class CreateTaskTest(APITestCase, LoginMixin):
    def setUp(self):
        self.user = User.objects.create_user(**user_data)
        self.key = self.login(**user_data)
        self.kwargs = {'format': 'json', 'HTTP_AUTHORIZATION': f'Token {self.key}'}
        self.url = reverse('task-create')
        self.board = Board.objects.create(name='board', user=self.user)
        self.column = Column.objects.create(board=self.board, name='column')

    def test_task_create_without_subtasks(self):
        data = {
            'column': self.column.id, 
            'title': 'task', 
            'description': 'task', 
            }
        
        response = self.client.post(self.url, data=data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_task(self):
        data = {
            'column': self.column.id,
            'title': 'task',
            'description': 'task',
            'status': 'doh'
        } # since status has 3 choices: ['todo', 'doing', 'done'], we'll try with value outside of choices

        response = self.client.post(self.url, data=data, **self.kwargs)
        response.render()
        content = json.loads(response.content)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(content.get('status')[0], '"doh" is not a valid choice.')

    def test_task_create_with_valid_subtasks(self):
        data = {
            'column': self.column.id, 
            'title': 'task', 
            'description': 'task', 
            'status': 'todo',
            'subtasks': [
                {'title': 'subtask1'},
                {'title': 'subtask2'}
                ]
            }

        response = self.client.post(self.url, data=data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Check if task is created
        task = Task.objects.all()[0]
        self.assertEqual(task.column.id, self.column.id)
        self.assertEqual(task.title, 'task')
        self.assertEqual(task.description, 'task')
        self.assertEqual(task.status, 'todo')

        # check subtasks are truly created
        subtasks = SubTask.objects.all()
        self.assertEqual(len(subtasks), 2)

    def test_create_task_with_invalid_subtasks(self):
        """
        This test should return 400 bad request.
        """
        data = {
            'column': self.column.id, 
            'title': 'task', 
            'description': 'task', 
            'status': 'todo',
            'subtasks': [
                {'title': 'subtask1', 'is_done': 'dah'},
                {'title': 'subtask2'}
                ]
            }
        response = self.client.post(self.url, data=data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class GetTaskTests(APITestCase, LoginMixin):
    def setUp(self):
        self.user = User.objects.create_user(**user_data)
        self.key = self.login(**user_data)
        self.kwargs = {'format': 'json', 'HTTP_AUTHORIZATION': f'Token {self.key}'}
        self.board = Board.objects.create(name='board', user=self.user)
        self.column = Column.objects.create(board=self.board, name='column')
        self.task = Task.objects.create(column=self.column, title='task', description='task')
        self.subtask1 = SubTask.objects.create(task=self.task, title='subtask1')
        self.subtask2 = SubTask.objects.create(task=self.task, title='subtask2')
        self.url = reverse('task-detail', kwargs={'id': self.task.id})

    def test_get_task(self):
        response = self.client.get(self.url, **self.kwargs)
        response.render()
        content = json.loads(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(content.get('title'), self.task.title)
        self.assertEqual(content.get('description'), self.task.description)

    def test_get_404_task(self):
        import uuid
        id = uuid.uuid4()
        url = reverse('task-detail', kwargs={'id': id})
        response = self.client.get(url, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class DeleteTaskTests(APITestCase, LoginMixin):
    def setUp(self):
        self.user = User.objects.create_user(**user_data)
        self.key = self.login(**user_data)
        self.kwargs = {'format': 'json', 'HTTP_AUTHORIZATION': f'Token {self.key}'}
        self.board = Board.objects.create(name='board', user=self.user)
        self.column = Column.objects.create(board=self.board, name='column')
        self.task = Task.objects.create(column=self.column, title='task', description='task')
        self.subtask1 = SubTask.objects.create(task=self.task, title='subtask1')
        self.subtask2 = SubTask.objects.create(task=self.task, title='subtask2')
        self.url = reverse('task-detail', kwargs={'id': self.task.id})

    def test_delete_task(self):
        response = self.client.delete(self.url, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        boards = Board.objects.all()
        columns = Column.objects.all()
        tasks = Task.objects.all()
        subtasks = SubTask.objects.all()
        self.assertEqual(len(boards), 1)
        self.assertEqual(len(columns), 1)
        self.assertEqual(len(tasks), 0)
        self.assertEqual(len(subtasks), 0)

class UpdateTaskTests(APITestCase, LoginMixin):
    def setUp(self):
        self.user = User.objects.create_user(**user_data)
        self.key = self.login(**user_data)
        self.kwargs = {'format': 'json', 'HTTP_AUTHORIZATION': f'Token {self.key}'}
        self.board = Board.objects.create(name='board', user=self.user)
        self.column = Column.objects.create(board=self.board, name='column')
        self.task = Task.objects.create(column=self.column, title='task', description='task')
        self.subtask1 = SubTask.objects.create(task=self.task, title='subtask1')
        self.subtask2 = SubTask.objects.create(task=self.task, title='subtask2')
        self.url = reverse('task-detail', kwargs={'id': self.task.id})

        self.column1 = Column.objects.create(board=self.board, name='column1')
        self.task1 = Task.objects.create(column=self.column1, title='task1', description='task1')
        self.subtask3 = SubTask.objects.create(task=self.task1, title='subtask3')
        self.subtask4 = SubTask.objects.create(task=self.task1, title='subtask4')

        # for update
        self.data = {
            'column': self.column.id,
            'title': self.task.title,
            'description': self.task.description,
            'status': self.task.status,
            'subtasks': [
                {
                    'task': self.task.id,
                    'title': self.subtask1.title
                },
                {
                    'task': self.task.id,
                    'title': self.subtask2.title
                }
            ]
        }

    def test_update_only_task_description(self):
        updated_description = 'this description has been updated'
        self.data['description'] = updated_description
        response = self.client.put(self.url, data=self.data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        task = Task.objects.get(id=self.task.id)
        self.assertEqual(task.description, updated_description)

    def test_update_status_task(self):
        self.data['status'] = 'done'
        response = self.client.put(self.url, data=self.data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        task = Task.objects.get(id=self.task.id)
        self.assertEqual(task.status, 'done')

    def test_update_invalid_status_task(self):
        self.data['status'] = 'doh'
        response = self.client.put(self.url, data=self.data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_task_create_new_subtask(self):
        new_subtask = {'title': 'new subtask'}
        self.data['subtasks'].append(new_subtask)
        response = self.client.put(self.url, data=self.data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        subtasks = SubTask.objects.filter(task=self.task)
        subtasks3 = subtasks[2]
        self.assertEqual(len(subtasks), 3)
        self.assertEqual(subtasks3.title, new_subtask['title'])

    def test_update_task_change_and_delete_subtask(self):
        removed_data = self.data['subtasks'].pop()
        self.data['subtasks'][0]['is_done'] = True
        response = self.client.put(self.url, data=self.data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        subtasks = SubTask.objects.filter(task=self.task)
        subtask1 = subtasks[0]
        self.assertEqual(len(subtasks), 1)
        self.assertTrue(subtask1.is_done)

    def test_update_move_task_to_another_column(self):
        """
        This will test if moving task to another column does not cause side effect (all subtasks are deleted other than the moved task)
        """
        self.data['column'] = self.column1.id
        response = self.client.put(self.url, data=self.data, **self.kwargs)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        task = Task.objects.get(id=self.task.id)
        self.assertEqual(task.column.id, self.column1.id)

        task1 = Task.objects.get(id=self.task1.id)
        self.assertTrue(len(task1.subtasks.all()) != 0)
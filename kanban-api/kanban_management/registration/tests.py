import json

from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status

class RegisterTests(APITestCase):
    def test_register_successfully(self):
        url = reverse('my-rest-register')
        data = {'username': 'testuser', 'password1': 'passwdtest', 'password2': 'passwdtest'}
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        user = User.objects.get(username=data['username'])
        self.assertIsNotNone(user)
        self.assertEqual(user.username, data['username'])

        # try to login to see if there is session token
        url = reverse('rest_login')
        data = {'username': 'testuser', 'password': 'passwdtest'}
        response = self.client.post(url, data=data, format='json')
        response.render()
        content = json.loads(response.content)
        self.assertIsNotNone(content['key'])
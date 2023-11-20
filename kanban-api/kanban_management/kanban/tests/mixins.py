import json

from django.urls import reverse

class LoginMixin:   
    def login(self, username, password):
        login_url = reverse('rest_login')
        data = {'username': username, 'password': password}
        response = self.client.post(login_url, data=data, format='json')
        response.render()
        key = json.loads(response.content)['key']
        return key
from django.urls import path
from registration.views import RegisterView

urlpatterns = [
    path('', RegisterView.as_view(), name='my-rest-register'),
]
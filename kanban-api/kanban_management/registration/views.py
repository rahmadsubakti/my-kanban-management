from rest_framework.generics import CreateAPIView
from rest_framework import status
from rest_framework.response import Response
from dj_rest_auth.models import TokenModel
from dj_rest_auth.app_settings import api_settings
from dj_rest_auth.utils import jwt_encode

from registration.serializers import RegisterSerializer

class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
    token_model = TokenModel
    throttle_scope = 'dj_rest_auth'

    def get_response_data(self, user):
        if api_settings.USE_JWT:
            data = {
                'user': user,
                'access': self.access_token,
                'refresh': self.refresh_token
            }
            return api_settings.JWT_SERIALIZER(data, context=self.get_serializer_context()).data
        elif api_settings.SESSION_LOGIN:
            return None

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        data = self.get_response_data(user)

        if data:
            response = Response(
                data,
                status=status.HTTP_201_CREATED,
                headers=headers
            )
        else:
            response = Response(status=status.HTTP_204_NO_CONTENT, headers=headers)
        return response

    def perform_create(self, serializer):
        user = serializer.save()
        if api_settings.USE_JWT:
            self.access_token, self.refresh_token = jwt_encode(user)
        return user

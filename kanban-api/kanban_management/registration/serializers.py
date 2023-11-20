from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(min_length=1, required=True)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError(_("The two password fields didn't match."))
        return data
    
    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', '')
        }
    
    def save(self):
        user = get_user_model()()
        data = self.get_cleaned_data()
        setattr(user, 'username', data['username'])
        user.set_password(data['password1'])
        user.save()
        return user

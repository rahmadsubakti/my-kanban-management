from datetime import timedelta, datetime
from django.contrib.auth.models import User

def schedule_delete_user():
    expiry_period = timedelta(days=3)
    expired_date = datetime.now() - expiry_period
    User.objects.filter(date_joined__lt=expired_date).delete()
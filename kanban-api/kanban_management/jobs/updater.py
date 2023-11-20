from apscheduler.schedulers.background import BackgroundScheduler
from .jobs import schedule_delete_user

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(schedule_delete_user, 'interval', days=1)
    scheduler.start()
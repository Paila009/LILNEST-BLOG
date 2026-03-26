"""Enhanced Celery configuration for LILNEST."""
import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lilnest.settings')

app = Celery('lilnest')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

# ─── Beat Schedule ───────────────────────────────────────────
app.conf.beat_schedule = {
    'check-capsule-unlocks': {
        'task': 'apps.timecapsule.tasks.check_capsule_unlocks',
        'schedule': crontab(minute=0, hour='*/1'),  # Every hour
    },
    'send-medication-reminders': {
        'task': 'apps.medical.tasks.send_medication_reminders',
        'schedule': crontab(minute='*/30'),  # Every 30 min
    },
    'check-vital-alerts': {
        'task': 'apps.medical.tasks.check_vital_alerts',
        'schedule': crontab(minute=0, hour='*/6'),  # Every 6 hours
    },
}

"""
LILNEST Notification System — MongoEngine Models + Utilities.
"""
import datetime
from mongoengine import (
    Document, StringField, DateTimeField, ReferenceField, BooleanField
)
from apps.users.models import User


class Notification(Document):
    """In-app notification system."""
    TYPES = (
        'capsule_unlocked', 'medication_reminder', 'appointment_reminder',
        'risk_alert', 'booking_confirmed', 'review_received',
        'sos_triggered', 'milestone_reached', 'general',
    )
    PRIORITY = ('low', 'normal', 'high', 'urgent')

    user = ReferenceField(User, required=True)
    title = StringField(required=True, max_length=200)
    message = StringField(required=True, max_length=500)
    notification_type = StringField(choices=TYPES, default='general')
    priority = StringField(choices=PRIORITY, default='normal')
    is_read = BooleanField(default=False)
    action_url = StringField(max_length=500)  # Frontend route to navigate to
    created_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {
        'collection': 'notifications',
        'indexes': ['user', 'is_read', '-created_at'],
        'ordering': ['-created_at'],
    }

    def __str__(self):
        return f"[{self.notification_type}] {self.title} → {self.user.full_name}"


def create_notification(user, title, message, notif_type='general', priority='normal', action_url=''):
    """Helper to create and save a notification."""
    notif = Notification(
        user=user, title=title, message=message,
        notification_type=notif_type, priority=priority,
        action_url=action_url,
    )
    notif.save()
    return notif

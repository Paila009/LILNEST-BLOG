"""
TimeCapsule — MongoEngine Models.

Collection: time_capsules
"""
import datetime
from mongoengine import (
    Document, StringField, DateTimeField, ListField,
    ReferenceField, BooleanField, DateField
)
from apps.users.models import User


class TimeCapsule(Document):
    """Digital time capsule — letters, photos, videos locked until a future date."""
    CAPSULE_TYPES = ('letter', 'photo', 'video', 'mixed')

    creator = ReferenceField(User, required=True)
    recipient_name = StringField(required=True, max_length=200)
    title = StringField(required=True, max_length=300)
    message = StringField()  # Text content / letter
    capsule_type = StringField(choices=CAPSULE_TYPES, default='letter')
    media_urls = ListField(StringField())  # Uploaded files
    tags = ListField(StringField(max_length=50))
    unlock_date = DateField(required=True)
    is_unlocked = BooleanField(default=False)
    unlocked_at = DateTimeField()
    is_encrypted = BooleanField(default=True)
    created_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {
        'collection': 'time_capsules',
        'indexes': ['creator', 'unlock_date', 'is_unlocked'],
        'ordering': ['unlock_date'],
    }

    def __str__(self):
        return f"Capsule: {self.title} → {self.recipient_name} (unlock: {self.unlock_date})"

    @property
    def is_ready_to_unlock(self):
        return datetime.date.today() >= self.unlock_date and not self.is_unlocked

    def unlock(self):
        self.is_unlocked = True
        self.unlocked_at = datetime.datetime.utcnow()
        self.save()

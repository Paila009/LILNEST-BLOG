"""
Dashboard — MongoEngine Models.

Collections: health_logs, fetal_updates
"""
import datetime
from mongoengine import (
    Document, EmbeddedDocument, StringField, DateTimeField,
    ListField, ReferenceField, EmbeddedDocumentField,
    IntField, FloatField, DateField
)
from apps.users.models import User


class Symptom(EmbeddedDocument):
    name = StringField(required=True, max_length=100)
    severity = StringField(choices=('mild', 'moderate', 'severe'), default='mild')
    notes = StringField(max_length=500)


class HealthLog(Document):
    """Daily health tracking for mothers."""
    user = ReferenceField(User, required=True)
    date = DateField(required=True)
    water_intake_ml = IntField(default=0)
    sleep_hours = FloatField(default=0)
    steps = IntField(default=0)
    mood = StringField(choices=('great', 'good', 'okay', 'low', 'bad'), default='okay')
    symptoms = ListField(EmbeddedDocumentField(Symptom))
    notes = StringField(max_length=1000)
    created_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {
        'collection': 'health_logs',
        'indexes': [('user', 'date')],
        'ordering': ['-date'],
    }


class FetalDevelopment(EmbeddedDocument):
    """Weekly developmental milestone."""
    system = StringField(required=True)  # e.g., "nervous", "respiratory"
    description = StringField(required=True)


class FetalUpdate(Document):
    """Weekly fetal growth data — pre-seeded reference data."""
    week = IntField(required=True, min_value=4, max_value=42, unique=True)
    size_comparison = StringField(max_length=100)   # e.g., "Lemon", "Avocado"
    weight_grams = FloatField()
    length_cm = FloatField()
    developments = ListField(EmbeddedDocumentField(FetalDevelopment))
    tips = ListField(StringField(max_length=300))
    model_scale = FloatField(default=1.0)  # For 3D viewer scaling

    meta = {
        'collection': 'fetal_updates',
        'ordering': ['week'],
    }

    def __str__(self):
        return f"Week {self.week} — {self.size_comparison}"

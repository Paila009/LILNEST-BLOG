"""
Medical — MongoEngine Models.

Collections: vitals, medications, scan_records, emergency_logs
"""
import datetime
from mongoengine import (
    Document, EmbeddedDocument, StringField, DateTimeField,
    ListField, ReferenceField, EmbeddedDocumentField,
    IntField, FloatField, BooleanField, DateField
)
from apps.users.models import User


class ReminderTime(EmbeddedDocument):
    time = StringField(required=True)  # "08:00", "20:00"
    label = StringField(max_length=50)  # "Morning", "Night"


class VitalLog(Document):
    """Vitals tracking for pregnant mothers."""
    user = ReferenceField(User, required=True)
    date = DateField(required=True)
    systolic_bp = IntField()     # mmHg
    diastolic_bp = IntField()    # mmHg
    heart_rate = IntField()      # bpm
    temperature = FloatField()   # °C
    weight_kg = FloatField()
    blood_sugar = FloatField()    # mg/dL
    oxygen_level = IntField()    # SpO2 %
    notes = StringField(max_length=500)
    created_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {
        'collection': 'vitals',
        'indexes': [('user', 'date')],
        'ordering': ['-date'],
    }


class Medication(Document):
    """Medication tracking with reminders."""
    user = ReferenceField(User, required=True)
    name = StringField(required=True, max_length=200)
    dosage = StringField(max_length=100)    # "500mg"
    frequency = StringField(max_length=100)  # "Twice daily"
    start_date = DateField(required=True)
    end_date = DateField()
    prescribing_doctor = StringField(max_length=200)
    reminders = ListField(EmbeddedDocumentField(ReminderTime))
    is_active = BooleanField(default=True)
    notes = StringField(max_length=500)
    created_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {
        'collection': 'medications',
        'indexes': ['user', 'is_active'],
        'ordering': ['-created_at'],
    }


class ScanRecord(Document):
    """Medical scan/report uploads."""
    SCAN_TYPES = ('ultrasound', 'blood_test', 'urine_test', 'glucose_test',
                  'thyroid', 'anomaly_scan', 'growth_scan', 'other')

    user = ReferenceField(User, required=True)
    scan_type = StringField(required=True, choices=SCAN_TYPES)
    title = StringField(max_length=200)
    date = DateField(required=True)
    file_url = StringField()  # Path or URL to uploaded file
    file_name = StringField(max_length=200)
    doctor = StringField(max_length=200)
    hospital = StringField(max_length=200)
    notes = StringField(max_length=1000)
    results_summary = StringField(max_length=500)
    created_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {
        'collection': 'scan_records',
        'indexes': ['user', 'scan_type'],
        'ordering': ['-date'],
    }


class EmergencyLog(Document):
    """SOS emergency trigger log."""
    user = ReferenceField(User, required=True)
    latitude = FloatField()
    longitude = FloatField()
    address = StringField(max_length=500)
    contacts_notified = ListField(StringField(max_length=20))  # Phone numbers
    trigger_time = DateTimeField(default=datetime.datetime.utcnow)
    resolved = BooleanField(default=False)
    notes = StringField(max_length=500)

    meta = {
        'collection': 'emergency_logs',
        'indexes': ['user'],
        'ordering': ['-trigger_time'],
    }

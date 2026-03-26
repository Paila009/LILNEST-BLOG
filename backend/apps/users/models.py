"""
LILNEST Users — MongoEngine Document Models.

Collections: users, mother_profiles, child_profiles, doctor_profiles
"""
import datetime
from mongoengine import (
    Document, EmbeddedDocument, StringField, EmailField,
    DateTimeField, ListField, ReferenceField, EmbeddedDocumentField,
    BooleanField, IntField, FloatField, DateField
)
from django.contrib.auth.hashers import make_password, check_password


# ─── Embedded Docs ───────────────────────────────────────────────
class EmergencyContact(EmbeddedDocument):
    name = StringField(required=True, max_length=100)
    phone = StringField(required=True, max_length=20)
    relation = StringField(max_length=50)


# ─── User ────────────────────────────────────────────────────────
class User(Document):
    """Core user document — supports all roles."""
    ROLE_CHOICES = ('mother', 'child', 'doctor', 'caregiver')

    email = EmailField(required=True, unique=True)
    password_hash = StringField(required=True)
    full_name = StringField(required=True, max_length=150)
    role = StringField(required=True, choices=ROLE_CHOICES)
    phone = StringField(max_length=20)
    avatar = StringField()  # URL or path
    is_active = BooleanField(default=True)
    created_at = DateTimeField(default=datetime.datetime.utcnow)
    updated_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {
        'collection': 'users',
        'indexes': ['email', 'role'],
        'ordering': ['-created_at'],
    }

    def set_password(self, raw_password):
        self.password_hash = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password_hash)

    def __str__(self):
        return f"{self.full_name} ({self.role})"


# ─── Mother Profile ─────────────────────────────────────────────
class MotherProfile(Document):
    user = ReferenceField(User, required=True, unique=True)
    due_date = DateField()
    trimester = IntField(min_value=1, max_value=3)
    blood_group = StringField(max_length=5)
    height_cm = FloatField()
    pre_pregnancy_weight = FloatField()
    current_weight = FloatField()
    allergies = ListField(StringField(max_length=100))
    medical_conditions = ListField(StringField(max_length=200))
    emergency_contacts = ListField(EmbeddedDocumentField(EmergencyContact))
    is_postpartum = BooleanField(default=False)
    delivery_date = DateField()

    meta = {'collection': 'mother_profiles'}

    def __str__(self):
        return f"MotherProfile({self.user.full_name})"


# ─── Child Profile ──────────────────────────────────────────────
class ChildProfile(Document):
    parent = ReferenceField(User, required=True)
    name = StringField(required=True, max_length=100)
    date_of_birth = DateField(required=True)
    gender = StringField(choices=('male', 'female', 'other'))
    birth_weight_kg = FloatField()
    birth_height_cm = FloatField()
    blood_group = StringField(max_length=5)
    allergies = ListField(StringField(max_length=100))
    created_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {
        'collection': 'child_profiles',
        'indexes': ['parent'],
    }

    def __str__(self):
        return f"ChildProfile({self.name})"


# ─── Doctor Profile ─────────────────────────────────────────────
class DoctorProfile(Document):
    user = ReferenceField(User, required=True, unique=True)
    specialization = StringField(required=True, max_length=100)
    license_number = StringField(required=True, max_length=50)
    hospital = StringField(max_length=200)
    years_experience = IntField()
    patients = ListField(ReferenceField(User))
    available_slots = ListField(StringField())  # e.g. ["Mon 9-12", "Wed 14-17"]
    is_verified = BooleanField(default=False)

    meta = {'collection': 'doctor_profiles'}

    def __str__(self):
        return f"Dr. {self.user.full_name} ({self.specialization})"

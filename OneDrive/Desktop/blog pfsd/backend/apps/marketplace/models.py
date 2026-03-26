"""
Marketplace — MongoEngine Models.

Collections: marketplace_providers, bookings, reviews, transactions
"""
import datetime
from mongoengine import (
    Document, EmbeddedDocument, StringField, DateTimeField,
    ListField, ReferenceField, EmbeddedDocumentField,
    IntField, FloatField, BooleanField, DateField
)
from apps.users.models import User


class ServiceSlot(EmbeddedDocument):
    day = StringField(required=True)  # "Monday", "Tuesday", ...
    start_time = StringField(required=True)  # "09:00"
    end_time = StringField(required=True)    # "17:00"


class Provider(Document):
    """Verified service provider in marketplace."""
    CATEGORY_CHOICES = (
        'lactation_consultant', 'doula', 'babysitter',
        'nutritionist', 'pediatrician', 'yoga_instructor',
    )

    user = ReferenceField(User)  # Optional — provider may not be a platform user
    name = StringField(required=True, max_length=200)
    category = StringField(required=True, choices=CATEGORY_CHOICES)
    bio = StringField(max_length=1000)
    avatar = StringField()
    phone = StringField(max_length=20)
    email = StringField(max_length=200)
    location = StringField(max_length=300)
    city = StringField(max_length=100)
    experience_years = IntField(default=0)
    qualifications = ListField(StringField(max_length=200))
    available_slots = ListField(EmbeddedDocumentField(ServiceSlot))
    price_per_session = FloatField(default=0)
    currency = StringField(default='INR', max_length=5)
    rating = FloatField(default=0)
    total_reviews = IntField(default=0)
    is_verified = BooleanField(default=False)
    is_active = BooleanField(default=True)
    created_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {
        'collection': 'marketplace_providers',
        'indexes': ['category', 'city', 'is_verified', 'rating'],
        'ordering': ['-rating'],
    }

    def __str__(self):
        return f"{self.name} ({self.category})"


class Booking(Document):
    """Booking between user and service provider."""
    STATUS_CHOICES = ('pending', 'confirmed', 'completed', 'cancelled')
    PAYMENT_STATUS = ('unpaid', 'paid', 'refunded')

    provider = ReferenceField(Provider, required=True)
    user = ReferenceField(User, required=True)
    date = DateField(required=True)
    time_slot = StringField(max_length=50)  # "09:00-10:00"
    status = StringField(choices=STATUS_CHOICES, default='pending')
    payment_status = StringField(choices=PAYMENT_STATUS, default='unpaid')
    amount = FloatField(default=0)
    notes = StringField(max_length=500)
    created_at = DateTimeField(default=datetime.datetime.utcnow)
    updated_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {
        'collection': 'bookings',
        'indexes': ['provider', 'user', 'date', 'status'],
        'ordering': ['-created_at'],
    }


class Review(Document):
    """Review for a service provider."""
    provider = ReferenceField(Provider, required=True)
    user = ReferenceField(User, required=True)
    booking = ReferenceField(Booking)
    rating = IntField(required=True, min_value=1, max_value=5)
    title = StringField(max_length=200)
    comment = StringField(max_length=1000)
    created_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {
        'collection': 'reviews',
        'indexes': ['provider', 'user'],
        'ordering': ['-created_at'],
    }


class Transaction(Document):
    """Payment transaction record."""
    STATUS_CHOICES = ('initiated', 'success', 'failed', 'refunded')

    booking = ReferenceField(Booking, required=True)
    user = ReferenceField(User, required=True)
    amount = FloatField(required=True)
    currency = StringField(default='INR', max_length=5)
    payment_gateway = StringField(max_length=50)  # "razorpay", "stripe"
    gateway_transaction_id = StringField(max_length=200)
    status = StringField(choices=STATUS_CHOICES, default='initiated')
    created_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {
        'collection': 'transactions',
        'indexes': ['booking', 'user', 'status'],
    }

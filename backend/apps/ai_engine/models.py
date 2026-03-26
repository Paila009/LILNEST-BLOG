"""
AI Engine — MongoEngine Models.

Collections: diet_plans, workout_plans
"""
import datetime
from mongoengine import (
    Document, EmbeddedDocument, StringField, DateTimeField,
    ListField, ReferenceField, EmbeddedDocumentField,
    IntField, FloatField, BooleanField
)
from apps.users.models import User


class MealItem(EmbeddedDocument):
    name = StringField(required=True, max_length=200)
    calories = IntField(default=0)
    protein_g = FloatField(default=0)
    is_vegetarian = BooleanField(default=False)
    tags = ListField(StringField(max_length=50))  # e.g., "iron-rich", "calcium"


class Meal(EmbeddedDocument):
    meal_type = StringField(required=True, choices=('breakfast', 'lunch', 'dinner', 'snack'))
    items = ListField(EmbeddedDocumentField(MealItem))
    total_calories = IntField(default=0)


class DietPlan(Document):
    user = ReferenceField(User, required=True)
    trimester = IntField(min_value=1, max_value=3)
    week = IntField()
    meals = ListField(EmbeddedDocumentField(Meal))
    total_daily_calories = IntField(default=0)
    notes = StringField(max_length=500)
    allergens_avoided = ListField(StringField(max_length=100))
    created_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {
        'collection': 'diet_plans',
        'indexes': ['user', 'trimester'],
        'ordering': ['-created_at'],
    }


class Exercise(EmbeddedDocument):
    name = StringField(required=True, max_length=200)
    duration_min = IntField(default=10)
    intensity = StringField(choices=('low', 'moderate', 'high'), default='low')
    is_safe = BooleanField(default=True)
    category = StringField(max_length=50)  # "yoga", "cardio", "strength"
    instructions = StringField(max_length=500)


class WorkoutPlan(Document):
    user = ReferenceField(User, required=True)
    trimester = IntField(min_value=1, max_value=3)
    week = IntField()
    exercises = ListField(EmbeddedDocumentField(Exercise))
    total_duration_min = IntField(default=0)
    emergency_stop_note = StringField(
        default="Stop immediately if you feel dizzy, short of breath, or experience any pain."
    )
    created_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {
        'collection': 'workout_plans',
        'indexes': ['user', 'trimester'],
        'ordering': ['-created_at'],
    }

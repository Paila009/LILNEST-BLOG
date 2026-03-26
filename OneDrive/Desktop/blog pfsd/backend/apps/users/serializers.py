"""
Serializers for Users app — manual serialization for MongoEngine documents.
"""
from rest_framework import serializers


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, write_only=True)
    full_name = serializers.CharField(max_length=150)
    role = serializers.ChoiceField(choices=['mother', 'child', 'doctor', 'caregiver'])
    phone = serializers.CharField(max_length=20, required=False)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class UserSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    email = serializers.EmailField(read_only=True)
    full_name = serializers.CharField()
    role = serializers.CharField(read_only=True)
    phone = serializers.CharField(required=False)
    avatar = serializers.CharField(required=False)
    is_active = serializers.BooleanField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)


class MotherProfileSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    due_date = serializers.DateField(required=False)
    trimester = serializers.IntegerField(required=False)
    blood_group = serializers.CharField(required=False)
    height_cm = serializers.FloatField(required=False)
    pre_pregnancy_weight = serializers.FloatField(required=False)
    current_weight = serializers.FloatField(required=False)
    allergies = serializers.ListField(child=serializers.CharField(), required=False)
    medical_conditions = serializers.ListField(child=serializers.CharField(), required=False)
    is_postpartum = serializers.BooleanField(required=False)
    delivery_date = serializers.DateField(required=False)


class ChildProfileSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=100)
    date_of_birth = serializers.DateField()
    gender = serializers.ChoiceField(choices=['male', 'female', 'other'], required=False)
    birth_weight_kg = serializers.FloatField(required=False)
    birth_height_cm = serializers.FloatField(required=False)
    blood_group = serializers.CharField(required=False)
    allergies = serializers.ListField(child=serializers.CharField(), required=False)


class DoctorProfileSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    specialization = serializers.CharField(max_length=100)
    license_number = serializers.CharField(max_length=50)
    hospital = serializers.CharField(required=False)
    years_experience = serializers.IntegerField(required=False)
    available_slots = serializers.ListField(child=serializers.CharField(), required=False)
    is_verified = serializers.BooleanField(read_only=True)


class EmergencyContactSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    phone = serializers.CharField(max_length=20)
    relation = serializers.CharField(max_length=50, required=False)


class TokenRefreshSerializer(serializers.Serializer):
    refresh = serializers.CharField()

"""Medical serializers."""
from rest_framework import serializers


class ReminderTimeSerializer(serializers.Serializer):
    time = serializers.CharField()
    label = serializers.CharField(required=False)


class VitalLogSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    date = serializers.DateField()
    systolic_bp = serializers.IntegerField(required=False)
    diastolic_bp = serializers.IntegerField(required=False)
    heart_rate = serializers.IntegerField(required=False)
    temperature = serializers.FloatField(required=False)
    weight_kg = serializers.FloatField(required=False)
    blood_sugar = serializers.FloatField(required=False)
    oxygen_level = serializers.IntegerField(required=False)
    notes = serializers.CharField(required=False)
    created_at = serializers.DateTimeField(read_only=True)


class MedicationSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=200)
    dosage = serializers.CharField(required=False)
    frequency = serializers.CharField(required=False)
    start_date = serializers.DateField()
    end_date = serializers.DateField(required=False)
    prescribing_doctor = serializers.CharField(required=False)
    reminders = ReminderTimeSerializer(many=True, required=False)
    is_active = serializers.BooleanField(read_only=True)
    notes = serializers.CharField(required=False)
    created_at = serializers.DateTimeField(read_only=True)


class ScanRecordSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    scan_type = serializers.ChoiceField(choices=[
        'ultrasound', 'blood_test', 'urine_test', 'glucose_test',
        'thyroid', 'anomaly_scan', 'growth_scan', 'other',
    ])
    title = serializers.CharField(required=False)
    date = serializers.DateField()
    file_url = serializers.CharField(required=False)
    file_name = serializers.CharField(required=False)
    doctor = serializers.CharField(required=False)
    hospital = serializers.CharField(required=False)
    notes = serializers.CharField(required=False)
    results_summary = serializers.CharField(required=False)
    created_at = serializers.DateTimeField(read_only=True)


class EmergencySOSSerializer(serializers.Serializer):
    latitude = serializers.FloatField(required=False)
    longitude = serializers.FloatField(required=False)
    address = serializers.CharField(required=False)

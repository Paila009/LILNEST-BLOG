"""Dashboard serializers."""
from rest_framework import serializers


class SymptomSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    severity = serializers.ChoiceField(
        choices=['mild', 'moderate', 'severe'], default='mild'
    )
    notes = serializers.CharField(max_length=500, required=False)


class HealthLogSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    date = serializers.DateField()
    water_intake_ml = serializers.IntegerField(default=0)
    sleep_hours = serializers.FloatField(default=0)
    steps = serializers.IntegerField(default=0)
    mood = serializers.ChoiceField(
        choices=['great', 'good', 'okay', 'low', 'bad'], default='okay'
    )
    symptoms = SymptomSerializer(many=True, required=False)
    notes = serializers.CharField(max_length=1000, required=False)
    created_at = serializers.DateTimeField(read_only=True)


class FetalDevelopmentSerializer(serializers.Serializer):
    system = serializers.CharField()
    description = serializers.CharField()


class FetalUpdateSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    week = serializers.IntegerField()
    size_comparison = serializers.CharField()
    weight_grams = serializers.FloatField()
    length_cm = serializers.FloatField()
    developments = FetalDevelopmentSerializer(many=True)
    tips = serializers.ListField(child=serializers.CharField())
    model_scale = serializers.FloatField()

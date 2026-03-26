"""Marketplace serializers."""
from rest_framework import serializers


class ServiceSlotSerializer(serializers.Serializer):
    day = serializers.CharField()
    start_time = serializers.CharField()
    end_time = serializers.CharField()


class ProviderSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=200)
    category = serializers.ChoiceField(choices=[
        'lactation_consultant', 'doula', 'babysitter',
        'nutritionist', 'pediatrician', 'yoga_instructor',
    ])
    bio = serializers.CharField(max_length=1000, required=False)
    avatar = serializers.CharField(required=False)
    phone = serializers.CharField(required=False)
    email = serializers.CharField(required=False)
    location = serializers.CharField(required=False)
    city = serializers.CharField(required=False)
    experience_years = serializers.IntegerField(required=False)
    qualifications = serializers.ListField(child=serializers.CharField(), required=False)
    available_slots = ServiceSlotSerializer(many=True, required=False)
    price_per_session = serializers.FloatField(required=False)
    currency = serializers.CharField(default='INR', required=False)
    rating = serializers.FloatField(read_only=True)
    total_reviews = serializers.IntegerField(read_only=True)
    is_verified = serializers.BooleanField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)


class BookingSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    provider_id = serializers.CharField(write_only=True)
    provider_name = serializers.SerializerMethodField()
    date = serializers.DateField()
    time_slot = serializers.CharField(required=False)
    status = serializers.CharField(read_only=True)
    payment_status = serializers.CharField(read_only=True)
    amount = serializers.FloatField(read_only=True)
    notes = serializers.CharField(required=False)
    created_at = serializers.DateTimeField(read_only=True)

    def get_provider_name(self, obj):
        return obj.provider.name if hasattr(obj, 'provider') and obj.provider else ''


class ReviewSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    provider_id = serializers.CharField(write_only=True)
    rating = serializers.IntegerField(min_value=1, max_value=5)
    title = serializers.CharField(max_length=200, required=False)
    comment = serializers.CharField(max_length=1000, required=False)
    user_name = serializers.SerializerMethodField()
    created_at = serializers.DateTimeField(read_only=True)

    def get_user_name(self, obj):
        return obj.user.full_name if hasattr(obj, 'user') and obj.user else ''

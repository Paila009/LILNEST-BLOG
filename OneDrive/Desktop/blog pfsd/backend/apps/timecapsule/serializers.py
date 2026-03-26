"""TimeCapsule serializers."""
from rest_framework import serializers


class TimeCapsuleSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    recipient_name = serializers.CharField(max_length=200)
    title = serializers.CharField(max_length=300)
    message = serializers.CharField(required=False, allow_blank=True)
    capsule_type = serializers.ChoiceField(
        choices=['letter', 'photo', 'video', 'mixed'],
        default='letter',
    )
    media_urls = serializers.ListField(child=serializers.CharField(), required=False)
    tags = serializers.ListField(child=serializers.CharField(), required=False)
    unlock_date = serializers.DateField()
    is_unlocked = serializers.BooleanField(read_only=True)
    unlocked_at = serializers.DateTimeField(read_only=True)
    is_encrypted = serializers.BooleanField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)


class TimeCapsuleListSerializer(serializers.Serializer):
    """Abbreviated serializer for lists — hides content until unlocked."""
    id = serializers.CharField(read_only=True)
    recipient_name = serializers.CharField()
    title = serializers.CharField()
    capsule_type = serializers.CharField()
    unlock_date = serializers.DateField()
    is_unlocked = serializers.BooleanField()
    created_at = serializers.DateTimeField()

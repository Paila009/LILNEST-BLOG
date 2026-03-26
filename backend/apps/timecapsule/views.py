"""TimeCapsule API Views."""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from apps.timecapsule.models import TimeCapsule
from apps.timecapsule.serializers import TimeCapsuleSerializer, TimeCapsuleListSerializer


class TimeCapsuleListView(APIView):
    """GET/POST /api/timecapsule/"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        capsules = TimeCapsule.objects(creator=request.user)
        return Response(TimeCapsuleListSerializer(capsules, many=True).data)

    def post(self, request):
        serializer = TimeCapsuleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        d = serializer.validated_data

        capsule = TimeCapsule(
            creator=request.user,
            recipient_name=d['recipient_name'],
            title=d['title'],
            message=d.get('message', ''),
            capsule_type=d.get('capsule_type', 'letter'),
            media_urls=d.get('media_urls', []),
            tags=d.get('tags', []),
            unlock_date=d['unlock_date'],
        )
        capsule.save()
        return Response(TimeCapsuleSerializer(capsule).data, status=status.HTTP_201_CREATED)


class TimeCapsuleDetailView(APIView):
    """GET /api/timecapsule/<id>/ — View a capsule (only if unlocked)."""
    permission_classes = [IsAuthenticated]

    def get(self, request, capsule_id):
        try:
            capsule = TimeCapsule.objects.get(id=capsule_id, creator=request.user)
        except TimeCapsule.DoesNotExist:
            return Response({'error': 'Time capsule not found.'}, status=404)

        # Check if it should be unlocked
        if capsule.is_ready_to_unlock:
            capsule.unlock()

        if not capsule.is_unlocked:
            return Response({
                'id': str(capsule.id),
                'title': capsule.title,
                'recipient_name': capsule.recipient_name,
                'unlock_date': str(capsule.unlock_date),
                'is_unlocked': False,
                'message': '🔒 This time capsule is locked until its unlock date.',
            })

        return Response(TimeCapsuleSerializer(capsule).data)

    def delete(self, request, capsule_id):
        try:
            capsule = TimeCapsule.objects.get(id=capsule_id, creator=request.user)
        except TimeCapsule.DoesNotExist:
            return Response({'error': 'Time capsule not found.'}, status=404)

        capsule.delete()
        return Response({'message': 'Time capsule deleted.'}, status=status.HTTP_204_NO_CONTENT)

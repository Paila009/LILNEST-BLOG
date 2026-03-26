"""
Notification API Views.
"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from apps.users.notifications import Notification


class NotificationListView(APIView):
    """GET /api/auth/notifications/ — List user notifications."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        unread_only = request.query_params.get('unread', 'false') == 'true'
        filters = {'user': request.user}
        if unread_only:
            filters['is_read'] = False

        notifs = Notification.objects(**filters).order_by('-created_at')[:50]
        data = [{
            'id': str(n.id),
            'title': n.title,
            'message': n.message,
            'type': n.notification_type,
            'priority': n.priority,
            'is_read': n.is_read,
            'action_url': n.action_url,
            'created_at': str(n.created_at),
        } for n in notifs]

        return Response({
            'notifications': data,
            'unread_count': Notification.objects(user=request.user, is_read=False).count(),
        })


class NotificationMarkReadView(APIView):
    """PATCH /api/auth/notifications/<id>/read/ — Mark single as read."""
    permission_classes = [IsAuthenticated]

    def patch(self, request, notif_id):
        try:
            notif = Notification.objects.get(id=notif_id, user=request.user)
        except Notification.DoesNotExist:
            return Response({'error': 'Not found.'}, status=404)

        notif.is_read = True
        notif.save()
        return Response({'status': 'marked as read'})


class NotificationMarkAllReadView(APIView):
    """PATCH /api/auth/notifications/mark-all-read/ — Mark all as read."""
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        Notification.objects(user=request.user, is_read=False).update(set__is_read=True)
        return Response({'status': 'all marked as read'})

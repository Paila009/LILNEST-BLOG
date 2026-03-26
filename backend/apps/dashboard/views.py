"""Dashboard API Views."""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from apps.dashboard.models import HealthLog, FetalUpdate, Symptom
from apps.dashboard.serializers import HealthLogSerializer, FetalUpdateSerializer


class HealthLogListView(APIView):
    """GET/POST /api/dashboard/health-logs/"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logs = HealthLog.objects(user=request.user).order_by('-date')[:30]
        return Response(HealthLogSerializer(logs, many=True).data)

    def post(self, request):
        serializer = HealthLogSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        d = serializer.validated_data

        # Build embedded symptoms
        symptoms = []
        for s in d.get('symptoms', []):
            symptoms.append(Symptom(**s))

        log = HealthLog(
            user=request.user,
            date=d['date'],
            water_intake_ml=d.get('water_intake_ml', 0),
            sleep_hours=d.get('sleep_hours', 0),
            steps=d.get('steps', 0),
            mood=d.get('mood', 'okay'),
            symptoms=symptoms,
            notes=d.get('notes', ''),
        )
        log.save()
        return Response(HealthLogSerializer(log).data, status=status.HTTP_201_CREATED)


class FetalUpdateListView(APIView):
    """GET /api/dashboard/fetal-updates/ — all weekly fetal data."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        week = request.query_params.get('week')
        if week:
            updates = FetalUpdate.objects(week=int(week))
        else:
            updates = FetalUpdate.objects.all()
        return Response(FetalUpdateSerializer(updates, many=True).data)


class DashboardSummaryView(APIView):
    """GET /api/dashboard/summary/ — aggregated dashboard data."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        latest_log = HealthLog.objects(user=user).order_by('-date').first()

        summary = {
            'user_name': user.full_name,
            'role': user.role,
            'latest_health': HealthLogSerializer(latest_log).data if latest_log else None,
            'total_logs': HealthLog.objects(user=user).count(),
        }

        # If mother, add fetal info
        if user.role == 'mother':
            from apps.users.models import MotherProfile
            profile = MotherProfile.objects(user=user).first()
            if profile and profile.trimester:
                summary['trimester'] = profile.trimester
                summary['due_date'] = str(profile.due_date) if profile.due_date else None

        return Response(summary)

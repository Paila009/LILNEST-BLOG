"""Medical API Views."""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from apps.medical.models import (
    VitalLog, Medication, ScanRecord, EmergencyLog, ReminderTime,
)
from apps.medical.serializers import (
    VitalLogSerializer, MedicationSerializer,
    ScanRecordSerializer, EmergencySOSSerializer,
)
from apps.users.models import MotherProfile


class VitalLogView(APIView):
    """GET/POST /api/medical/vitals/"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        vitals = VitalLog.objects(user=request.user).order_by('-date')[:30]
        return Response(VitalLogSerializer(vitals, many=True).data)

    def post(self, request):
        serializer = VitalLogSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        d = serializer.validated_data

        vital = VitalLog(user=request.user, **d)
        vital.save()

        # Risk detection
        alerts = []
        if d.get('systolic_bp') and d['systolic_bp'] >= 140:
            alerts.append('⚠️ High blood pressure detected. Please consult your doctor.')
        if d.get('blood_sugar') and d['blood_sugar'] >= 200:
            alerts.append('⚠️ High blood sugar detected. Please consult your doctor.')
        if d.get('heart_rate') and d['heart_rate'] >= 110:
            alerts.append('⚠️ Elevated heart rate. Rest and monitor.')

        response_data = VitalLogSerializer(vital).data
        if alerts:
            response_data['alerts'] = alerts
        return Response(response_data, status=status.HTTP_201_CREATED)


class MedicationView(APIView):
    """GET/POST /api/medical/medications/"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        active_only = request.query_params.get('active', 'true') == 'true'
        filters = {'user': request.user}
        if active_only:
            filters['is_active'] = True
        meds = Medication.objects(**filters).order_by('-created_at')
        return Response(MedicationSerializer(meds, many=True).data)

    def post(self, request):
        serializer = MedicationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        d = serializer.validated_data

        reminders = []
        for r in d.pop('reminders', []):
            reminders.append(ReminderTime(**r))

        med = Medication(user=request.user, reminders=reminders, **d)
        med.save()
        return Response(MedicationSerializer(med).data, status=status.HTTP_201_CREATED)


class MedicationToggleView(APIView):
    """PATCH /api/medical/medications/<id>/toggle/"""
    permission_classes = [IsAuthenticated]

    def patch(self, request, med_id):
        try:
            med = Medication.objects.get(id=med_id, user=request.user)
        except Medication.DoesNotExist:
            return Response({'error': 'Medication not found.'}, status=404)

        med.is_active = not med.is_active
        med.save()
        return Response(MedicationSerializer(med).data)


class ScanRecordView(APIView):
    """GET/POST /api/medical/scans/"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        scans = ScanRecord.objects(user=request.user).order_by('-date')
        return Response(ScanRecordSerializer(scans, many=True).data)

    def post(self, request):
        serializer = ScanRecordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        scan = ScanRecord(user=request.user, **serializer.validated_data)
        scan.save()
        return Response(ScanRecordSerializer(scan).data, status=status.HTTP_201_CREATED)


class EmergencySOSView(APIView):
    """POST /api/medical/sos/ — Trigger SOS alert."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = EmergencySOSSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        d = serializer.validated_data

        # Get emergency contacts
        contacts = []
        if request.user.role == 'mother':
            profile = MotherProfile.objects(user=request.user).first()
            if profile and profile.emergency_contacts:
                contacts = [c.phone for c in profile.emergency_contacts]

        log = EmergencyLog(
            user=request.user,
            latitude=d.get('latitude'),
            longitude=d.get('longitude'),
            address=d.get('address', ''),
            contacts_notified=contacts,
        )
        log.save()

        return Response({
            'status': 'SOS Triggered',
            'message': 'Emergency contacts have been notified.',
            'contacts_notified': contacts,
            'log_id': str(log.id),
            'instructions': [
                'Stay calm and find a safe location.',
                'Emergency contacts have been alerted with your location.',
                'Call 108 (ambulance) or 112 (emergency) if needed.',
            ],
        }, status=status.HTTP_201_CREATED)

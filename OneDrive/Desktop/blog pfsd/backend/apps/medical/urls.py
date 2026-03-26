"""Medical URL configuration."""
from django.urls import path
from apps.medical.views import (
    VitalLogView, MedicationView, MedicationToggleView,
    ScanRecordView, EmergencySOSView,
)

urlpatterns = [
    path('vitals/', VitalLogView.as_view(), name='vitals'),
    path('medications/', MedicationView.as_view(), name='medications'),
    path('medications/<str:med_id>/toggle/', MedicationToggleView.as_view(), name='medication-toggle'),
    path('scans/', ScanRecordView.as_view(), name='scans'),
    path('sos/', EmergencySOSView.as_view(), name='emergency-sos'),
]

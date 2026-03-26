"""Dashboard URL configuration."""
from django.urls import path
from apps.dashboard.views import (
    HealthLogListView, FetalUpdateListView, DashboardSummaryView,
)

urlpatterns = [
    path('health-logs/', HealthLogListView.as_view(), name='health-logs'),
    path('fetal-updates/', FetalUpdateListView.as_view(), name='fetal-updates'),
    path('summary/', DashboardSummaryView.as_view(), name='dashboard-summary'),
]

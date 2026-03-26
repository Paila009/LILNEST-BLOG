"""TimeCapsule URL configuration."""
from django.urls import path
from apps.timecapsule.views import TimeCapsuleListView, TimeCapsuleDetailView

urlpatterns = [
    path('', TimeCapsuleListView.as_view(), name='timecapsule-list'),
    path('<str:capsule_id>/', TimeCapsuleDetailView.as_view(), name='timecapsule-detail'),
]

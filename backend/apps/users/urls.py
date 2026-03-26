"""Users app URL configuration — with notifications."""
from django.urls import path
from apps.users.views import (
    RegisterView, LoginView, TokenRefreshView, MeView,
    MotherProfileView, ChildProfileView, DoctorProfileView,
)
from apps.users.notification_views import (
    NotificationListView, NotificationMarkReadView, NotificationMarkAllReadView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('me/', MeView.as_view(), name='me'),
    path('mother-profile/', MotherProfileView.as_view(), name='mother-profile'),
    path('children/', ChildProfileView.as_view(), name='children'),
    path('doctor-profile/', DoctorProfileView.as_view(), name='doctor-profile'),
    # Notifications
    path('notifications/', NotificationListView.as_view(), name='notifications'),
    path('notifications/<str:notif_id>/read/', NotificationMarkReadView.as_view(), name='notification-read'),
    path('notifications/mark-all-read/', NotificationMarkAllReadView.as_view(), name='notifications-mark-all'),
]

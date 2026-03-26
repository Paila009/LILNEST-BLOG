"""Marketplace URL configuration — with payments."""
from django.urls import path
from apps.marketplace.views import (
    ProviderListView, ProviderDetailView,
    BookingListView, BookingActionView,
    ReviewListView,
)
from apps.marketplace.payment_views import (
    CreatePaymentOrderView, VerifyPaymentView, RefundPaymentView,
)

urlpatterns = [
    path('providers/', ProviderListView.as_view(), name='provider-list'),
    path('providers/<str:provider_id>/', ProviderDetailView.as_view(), name='provider-detail'),
    path('bookings/', BookingListView.as_view(), name='booking-list'),
    path('bookings/<str:booking_id>/action/', BookingActionView.as_view(), name='booking-action'),
    path('reviews/', ReviewListView.as_view(), name='review-list'),
    # Payments
    path('payments/create-order/', CreatePaymentOrderView.as_view(), name='payment-create'),
    path('payments/verify/', VerifyPaymentView.as_view(), name='payment-verify'),
    path('payments/refund/', RefundPaymentView.as_view(), name='payment-refund'),
]

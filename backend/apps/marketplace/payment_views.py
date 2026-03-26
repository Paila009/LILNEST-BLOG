"""
Payment API Views for Marketplace.
"""
import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from apps.marketplace.models import Booking, Transaction
from apps.marketplace.payments import (
    create_razorpay_order, verify_payment_signature, process_refund,
)
from apps.users.notifications import create_notification


class CreatePaymentOrderView(APIView):
    """POST /api/marketplace/payments/create-order/ — Initiate payment."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        booking_id = request.data.get('booking_id')
        if not booking_id:
            return Response({'error': 'booking_id required.'}, status=400)

        try:
            booking = Booking.objects.get(id=booking_id, user=request.user)
        except Booking.DoesNotExist:
            return Response({'error': 'Booking not found.'}, status=404)

        if booking.payment_status == 'paid':
            return Response({'error': 'Already paid.'}, status=400)

        # Create Razorpay order
        order_data = create_razorpay_order(
            amount_inr=booking.amount,
            booking_id=str(booking.id),
            user_email=request.user.email,
        )

        # Create transaction record
        txn = Transaction(
            booking=booking,
            user=request.user,
            amount=booking.amount,
            payment_gateway='razorpay',
            gateway_transaction_id=order_data['order_id'],
            status='initiated',
        )
        txn.save()

        return Response(order_data)


class VerifyPaymentView(APIView):
    """POST /api/marketplace/payments/verify/ — Verify payment after checkout."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        order_id = request.data.get('razorpay_order_id')
        payment_id = request.data.get('razorpay_payment_id')
        signature = request.data.get('razorpay_signature')
        booking_id = request.data.get('booking_id')

        if not all([order_id, payment_id, signature, booking_id]):
            return Response({'error': 'Missing payment data.'}, status=400)

        # Verify signature
        is_valid = verify_payment_signature(order_id, payment_id, signature)
        if not is_valid:
            return Response({'error': 'Payment verification failed.'}, status=400)

        # Update booking
        try:
            booking = Booking.objects.get(id=booking_id)
        except Booking.DoesNotExist:
            return Response({'error': 'Booking not found.'}, status=404)

        booking.payment_status = 'paid'
        booking.status = 'confirmed'
        booking.updated_at = datetime.datetime.utcnow()
        booking.save()

        # Update transaction
        txn = Transaction.objects(gateway_transaction_id=order_id).first()
        if txn:
            txn.status = 'success'
            txn.gateway_transaction_id = payment_id
            txn.save()

        # Notify user
        create_notification(
            user=request.user,
            title='✅ Payment Successful',
            message=f'Your booking with {booking.provider.name} has been confirmed!',
            notif_type='booking_confirmed',
            priority='normal',
            action_url='/marketplace',
        )

        return Response({
            'status': 'success',
            'message': 'Payment verified and booking confirmed.',
            'booking_status': 'confirmed',
        })


class RefundPaymentView(APIView):
    """POST /api/marketplace/payments/refund/ — Request refund."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        booking_id = request.data.get('booking_id')
        try:
            booking = Booking.objects.get(id=booking_id, user=request.user)
        except Booking.DoesNotExist:
            return Response({'error': 'Booking not found.'}, status=404)

        if booking.payment_status != 'paid':
            return Response({'error': 'Cannot refund unpaid booking.'}, status=400)

        txn = Transaction.objects(booking=booking, status='success').first()
        if not txn:
            return Response({'error': 'No successful transaction found.'}, status=400)

        # Process refund
        refund_result = process_refund(txn.gateway_transaction_id)

        booking.payment_status = 'refunded'
        booking.status = 'cancelled'
        booking.updated_at = datetime.datetime.utcnow()
        booking.save()

        txn.status = 'refunded'
        txn.save()

        create_notification(
            user=request.user,
            title='💰 Refund Processed',
            message=f'Your refund of ₹{booking.amount} has been initiated.',
            notif_type='general',
            priority='normal',
            action_url='/marketplace',
        )

        return Response({
            'status': 'refund_initiated',
            'refund': refund_result,
        })

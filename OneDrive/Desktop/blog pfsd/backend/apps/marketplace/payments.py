"""
Razorpay Payment Integration for LILNEST Marketplace.

Handles payment order creation, verification, and refunds.
"""
import os
import hmac
import hashlib


# ─── Configuration ───────────────────────────────────────────
RAZORPAY_KEY_ID = os.getenv('RAZORPAY_KEY_ID', '')
RAZORPAY_KEY_SECRET = os.getenv('RAZORPAY_KEY_SECRET', '')


def create_razorpay_order(amount_inr, booking_id, user_email):
    """
    Create a Razorpay payment order.

    In production, this would call Razorpay's API:
    POST https://api.razorpay.com/v1/orders

    Returns order data for frontend checkout.
    """
    amount_paise = int(amount_inr * 100)

    # Simulate order creation (replace with actual Razorpay SDK call)
    order_data = {
        'id': f'order_{booking_id}',
        'amount': amount_paise,
        'currency': 'INR',
        'receipt': f'lilnest_booking_{booking_id}',
        'status': 'created',
        'notes': {
            'booking_id': str(booking_id),
            'user_email': user_email,
        },
    }

    # In production:
    # import razorpay
    # client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
    # order_data = client.order.create({
    #     'amount': amount_paise,
    #     'currency': 'INR',
    #     'receipt': f'lilnest_booking_{booking_id}',
    #     'notes': {'booking_id': str(booking_id), 'user_email': user_email},
    # })

    return {
        'order_id': order_data['id'],
        'amount': amount_paise,
        'currency': 'INR',
        'key_id': RAZORPAY_KEY_ID,
        'name': 'LILNEST',
        'description': f'Booking #{booking_id}',
        'prefill': {'email': user_email},
    }


def verify_payment_signature(order_id, payment_id, signature):
    """
    Verify Razorpay payment signature using HMAC SHA256.
    """
    if not RAZORPAY_KEY_SECRET:
        # Dev mode — accept all payments
        return True

    message = f'{order_id}|{payment_id}'.encode()
    expected = hmac.new(
        RAZORPAY_KEY_SECRET.encode(),
        message,
        hashlib.sha256,
    ).hexdigest()

    return hmac.compare_digest(expected, signature)


def process_refund(payment_id, amount_paise=None):
    """
    Process a refund via Razorpay.
    """
    # In production:
    # client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
    # refund = client.payment.refund(payment_id, {'amount': amount_paise})
    # return refund

    return {
        'id': f'refund_{payment_id}',
        'payment_id': payment_id,
        'amount': amount_paise,
        'status': 'processed',
    }

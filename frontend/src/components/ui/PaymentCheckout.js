'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Razorpay Checkout Component.
 *
 * Usage:
 *   <PaymentCheckout
 *     bookingId="..."
 *     amount={1500}
 *     providerName="Dr. Priya Sharma"
 *     onSuccess={(data) => console.log('Paid!', data)}
 *     onError={(err) => console.error(err)}
 *   />
 */
export default function PaymentCheckout({ bookingId, amount, providerName, onSuccess, onError }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'

  const handlePayment = async () => {
    setLoading(true);
    setStatus(null);

    try {
      const token = localStorage.getItem('lilnest_token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

      // 1. Create order
      const orderRes = await fetch(`${apiUrl}/marketplace/payments/create-order/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ booking_id: bookingId }),
      });

      if (!orderRes.ok) throw new Error('Failed to create payment order');
      const orderData = await orderRes.json();

      // 2. Open Razorpay checkout
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || orderData.key_id;

      if (!razorpayKey) {
        // Dev mode — simulate payment
        const verifyRes = await fetch(`${apiUrl}/marketplace/payments/verify/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            razorpay_order_id: orderData.order_id,
            razorpay_payment_id: `pay_dev_${Date.now()}`,
            razorpay_signature: 'dev_signature',
            booking_id: bookingId,
          }),
        });

        if (verifyRes.ok) {
          setStatus('success');
          onSuccess?.({ order_id: orderData.order_id });
        } else {
          throw new Error('Payment verification failed');
        }
        return;
      }

      // Production Razorpay flow
      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'LILNEST',
        description: orderData.description,
        order_id: orderData.order_id,
        prefill: orderData.prefill,
        theme: { color: '#ec6d98' },
        handler: async (response) => {
          // 3. Verify payment on backend
          const verifyRes = await fetch(`${apiUrl}/marketplace/payments/verify/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              booking_id: bookingId,
            }),
          });

          if (verifyRes.ok) {
            setStatus('success');
            onSuccess?.(response);
          } else {
            setStatus('error');
            onError?.('Verification failed');
          }
        },
        modal: {
          ondismiss: () => { setLoading(false); },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setStatus('error');
      onError?.(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        style={{
          background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 16,
          padding: 24, textAlign: 'center',
        }}>
        <span style={{ fontSize: '2rem' }}>✅</span>
        <p style={{ fontWeight: 700, color: '#059669', marginTop: 8 }}>Payment Successful!</p>
        <p style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: 4 }}>
          Your booking with {providerName} has been confirmed.
        </p>
      </motion.div>
    );
  }

  return (
    <div style={{
      background: 'white', border: '1px solid #e5e7eb', borderRadius: 16,
      padding: 24,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#374151' }}>Payment</h3>
          <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>Booking with {providerName}</p>
        </div>
        <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ec6d98' }}>₹{amount}</span>
      </div>

      {status === 'error' && (
        <div style={{
          background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12,
          padding: 12, marginBottom: 12, color: '#dc2626', fontSize: '0.85rem',
        }}>
          Payment failed. Please try again.
        </div>
      )}

      <button className="btn-primary" onClick={handlePayment} disabled={loading}
        style={{ width: '100%' }}>
        {loading ? '⏳ Processing...' : `Pay ₹${amount}`}
      </button>

      <p style={{ fontSize: '0.7rem', color: '#9ca3af', textAlign: 'center', marginTop: 8 }}>
        🔒 Secured by Razorpay
      </p>
    </div>
  );
}

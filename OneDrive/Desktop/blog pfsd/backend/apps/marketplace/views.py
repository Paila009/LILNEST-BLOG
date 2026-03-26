"""Marketplace API Views."""
import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

from apps.marketplace.models import Provider, Booking, Review, ServiceSlot
from apps.marketplace.serializers import (
    ProviderSerializer, BookingSerializer, ReviewSerializer,
)


class ProviderListView(APIView):
    """GET/POST /api/marketplace/providers/"""
    permission_classes = [AllowAny]

    def get(self, request):
        category = request.query_params.get('category')
        city = request.query_params.get('city')
        verified_only = request.query_params.get('verified', 'false') == 'true'

        filters = {'is_active': True}
        if category:
            filters['category'] = category
        if city:
            filters['city__icontains'] = city
        if verified_only:
            filters['is_verified'] = True

        providers = Provider.objects(**filters).order_by('-rating')[:50]
        return Response(ProviderSerializer(providers, many=True).data)

    def post(self, request):
        serializer = ProviderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        d = serializer.validated_data

        slots = []
        for s in d.get('available_slots', []):
            slots.append(ServiceSlot(**s))

        provider = Provider(
            name=d['name'],
            category=d['category'],
            bio=d.get('bio', ''),
            phone=d.get('phone', ''),
            email=d.get('email', ''),
            location=d.get('location', ''),
            city=d.get('city', ''),
            experience_years=d.get('experience_years', 0),
            qualifications=d.get('qualifications', []),
            available_slots=slots,
            price_per_session=d.get('price_per_session', 0),
            currency=d.get('currency', 'INR'),
        )
        provider.save()
        return Response(ProviderSerializer(provider).data, status=status.HTTP_201_CREATED)


class ProviderDetailView(APIView):
    """GET /api/marketplace/providers/<id>/"""
    permission_classes = [AllowAny]

    def get(self, request, provider_id):
        try:
            provider = Provider.objects.get(id=provider_id)
        except Provider.DoesNotExist:
            return Response({'error': 'Provider not found.'}, status=404)

        data = ProviderSerializer(provider).data
        reviews = Review.objects(provider=provider).order_by('-created_at')[:10]
        data['recent_reviews'] = ReviewSerializer(reviews, many=True).data
        return Response(data)


class BookingListView(APIView):
    """GET/POST /api/marketplace/bookings/"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        bookings = Booking.objects(user=request.user).order_by('-created_at')
        return Response(BookingSerializer(bookings, many=True).data)

    def post(self, request):
        serializer = BookingSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        d = serializer.validated_data

        try:
            provider = Provider.objects.get(id=d['provider_id'])
        except Provider.DoesNotExist:
            return Response({'error': 'Provider not found.'}, status=404)

        booking = Booking(
            provider=provider,
            user=request.user,
            date=d['date'],
            time_slot=d.get('time_slot', ''),
            amount=provider.price_per_session,
            notes=d.get('notes', ''),
        )
        booking.save()
        return Response(BookingSerializer(booking).data, status=status.HTTP_201_CREATED)


class BookingActionView(APIView):
    """PATCH /api/marketplace/bookings/<id>/action/ — confirm/cancel."""
    permission_classes = [IsAuthenticated]

    def patch(self, request, booking_id):
        action = request.data.get('action')  # 'confirm', 'cancel', 'complete'

        try:
            booking = Booking.objects.get(id=booking_id)
        except Booking.DoesNotExist:
            return Response({'error': 'Booking not found.'}, status=404)

        if action == 'confirm':
            booking.status = 'confirmed'
        elif action == 'cancel':
            booking.status = 'cancelled'
        elif action == 'complete':
            booking.status = 'completed'
        else:
            return Response({'error': 'Invalid action.'}, status=400)

        booking.updated_at = datetime.datetime.utcnow()
        booking.save()
        return Response(BookingSerializer(booking).data)


class ReviewListView(APIView):
    """GET/POST /api/marketplace/reviews/"""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        provider_id = request.query_params.get('provider_id')
        if provider_id:
            reviews = Review.objects(provider=provider_id).order_by('-created_at')
        else:
            reviews = Review.objects(user=request.user).order_by('-created_at')
        return Response(ReviewSerializer(reviews, many=True).data)

    def post(self, request):
        serializer = ReviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        d = serializer.validated_data

        try:
            provider = Provider.objects.get(id=d['provider_id'])
        except Provider.DoesNotExist:
            return Response({'error': 'Provider not found.'}, status=404)

        review = Review(
            provider=provider,
            user=request.user,
            rating=d['rating'],
            title=d.get('title', ''),
            comment=d.get('comment', ''),
        )
        review.save()

        # Update provider rating
        all_reviews = Review.objects(provider=provider)
        total = all_reviews.count()
        avg = sum(r.rating for r in all_reviews) / total if total else 0
        provider.rating = round(avg, 1)
        provider.total_reviews = total
        provider.save()

        return Response(ReviewSerializer(review).data, status=status.HTTP_201_CREATED)

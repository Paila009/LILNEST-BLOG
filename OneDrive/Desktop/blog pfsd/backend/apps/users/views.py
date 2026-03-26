"""
Users app — API Views for auth and profile management.
"""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from apps.users.models import User, MotherProfile, ChildProfile, DoctorProfile
from apps.users.serializers import (
    RegisterSerializer, LoginSerializer, UserSerializer,
    MotherProfileSerializer, ChildProfileSerializer,
    DoctorProfileSerializer, TokenRefreshSerializer,
)
from apps.users.authentication import generate_tokens, decode_refresh_token


class RegisterView(APIView):
    """POST /api/auth/register/ — Create new user account."""
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        # Check if user already exists
        if User.objects(email=data['email']).first():
            return Response(
                {'error': 'Email already registered.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User(
            email=data['email'],
            full_name=data['full_name'],
            role=data['role'],
            phone=data.get('phone', ''),
        )
        user.set_password(data['password'])
        user.save()

        # Auto-create role profile
        if data['role'] == 'mother':
            MotherProfile(user=user).save()
        elif data['role'] == 'doctor':
            DoctorProfile(
                user=user,
                specialization='General',
                license_number='PENDING',
            ).save()

        tokens = generate_tokens(user)
        return Response({
            'user': UserSerializer(user).data,
            'tokens': tokens,
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """POST /api/auth/login/ — JWT login."""
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        user = User.objects(email=data['email']).first()
        if not user or not user.check_password(data['password']):
            return Response(
                {'error': 'Invalid email or password.'},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not user.is_active:
            return Response(
                {'error': 'Account is disabled.'},
                status=status.HTTP_403_FORBIDDEN,
            )

        tokens = generate_tokens(user)
        return Response({
            'user': UserSerializer(user).data,
            'tokens': tokens,
        })


class TokenRefreshView(APIView):
    """POST /api/auth/refresh/ — Refresh JWT token."""
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = TokenRefreshSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_id = decode_refresh_token(serializer.validated_data['refresh'])
        user = User.objects.get(id=user_id)
        tokens = generate_tokens(user)

        return Response({'tokens': tokens})


class MeView(APIView):
    """GET /api/auth/me/ — Get current user info."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = UserSerializer(user).data

        # Attach role-specific profile
        if user.role == 'mother':
            profile = MotherProfile.objects(user=user).first()
            if profile:
                data['mother_profile'] = MotherProfileSerializer(profile).data
        elif user.role == 'doctor':
            profile = DoctorProfile.objects(user=user).first()
            if profile:
                data['doctor_profile'] = DoctorProfileSerializer(profile).data

        return Response(data)

    def patch(self, request):
        """Update current user fields."""
        user = request.user
        allowed = ['full_name', 'phone', 'avatar']
        for field in allowed:
            if field in request.data:
                setattr(user, field, request.data[field])
        user.save()
        return Response(UserSerializer(user).data)


class MotherProfileView(APIView):
    """GET/PUT /api/auth/mother-profile/ — Manage mother profile."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = MotherProfile.objects(user=request.user).first()
        if not profile:
            return Response({'error': 'No mother profile found.'}, status=404)
        return Response(MotherProfileSerializer(profile).data)

    def put(self, request):
        profile = MotherProfile.objects(user=request.user).first()
        if not profile:
            profile = MotherProfile(user=request.user)

        serializer = MotherProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        for key, value in serializer.validated_data.items():
            setattr(profile, key, value)
        profile.save()

        return Response(MotherProfileSerializer(profile).data)


class ChildProfileView(APIView):
    """GET/POST /api/auth/children/ — Manage child profiles."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        children = ChildProfile.objects(parent=request.user)
        return Response(ChildProfileSerializer(children, many=True).data)

    def post(self, request):
        serializer = ChildProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        child = ChildProfile(parent=request.user, **serializer.validated_data)
        child.save()
        return Response(
            ChildProfileSerializer(child).data,
            status=status.HTTP_201_CREATED,
        )


class DoctorProfileView(APIView):
    """GET/PUT /api/auth/doctor-profile/ — Manage doctor profile."""
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = DoctorProfile.objects(user=request.user).first()
        if not profile:
            return Response({'error': 'No doctor profile found.'}, status=404)
        return Response(DoctorProfileSerializer(profile).data)

    def put(self, request):
        profile = DoctorProfile.objects(user=request.user).first()
        if not profile:
            return Response({'error': 'No doctor profile found.'}, status=404)

        serializer = DoctorProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        for key, value in serializer.validated_data.items():
            setattr(profile, key, value)
        profile.save()

        return Response(DoctorProfileSerializer(profile).data)

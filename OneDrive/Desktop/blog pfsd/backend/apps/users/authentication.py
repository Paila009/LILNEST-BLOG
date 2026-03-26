"""
Custom JWT Authentication for MongoEngine User documents.
"""
import jwt
import datetime
from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from apps.users.models import User


class MongoJWTAuthentication(BaseAuthentication):
    """JWT auth that works with MongoEngine User documents."""

    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return None

        token = auth_header.split(' ')[1]
        try:
            payload = jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=[settings.SIMPLE_JWT.get('ALGORITHM', 'HS256')],
            )
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Token has expired.')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Invalid token.')

        try:
            user = User.objects.get(id=payload['user_id'])
        except User.DoesNotExist:
            raise AuthenticationFailed('User not found.')

        if not user.is_active:
            raise AuthenticationFailed('User account is disabled.')

        return (user, token)


def generate_tokens(user):
    """Generate access + refresh JWT tokens for a User document."""
    now = datetime.datetime.utcnow()
    access_lifetime = settings.SIMPLE_JWT.get(
        'ACCESS_TOKEN_LIFETIME', datetime.timedelta(hours=6)
    )
    refresh_lifetime = settings.SIMPLE_JWT.get(
        'REFRESH_TOKEN_LIFETIME', datetime.timedelta(days=7)
    )

    access_payload = {
        'user_id': str(user.id),
        'email': user.email,
        'role': user.role,
        'exp': now + access_lifetime,
        'iat': now,
        'type': 'access',
    }

    refresh_payload = {
        'user_id': str(user.id),
        'exp': now + refresh_lifetime,
        'iat': now,
        'type': 'refresh',
    }

    access_token = jwt.encode(access_payload, settings.SECRET_KEY, algorithm='HS256')
    refresh_token = jwt.encode(refresh_payload, settings.SECRET_KEY, algorithm='HS256')

    return {
        'access': access_token,
        'refresh': refresh_token,
    }


def decode_refresh_token(token):
    """Decode and validate a refresh token, return user_id."""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        if payload.get('type') != 'refresh':
            raise AuthenticationFailed('Invalid token type.')
        return payload['user_id']
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Refresh token has expired.')
    except jwt.InvalidTokenError:
        raise AuthenticationFailed('Invalid refresh token.')

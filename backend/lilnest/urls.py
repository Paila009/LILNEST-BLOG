"""LILNEST URL Configuration."""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    # ─── API Routes ──────────────────────────────────────────
    path('api/auth/', include('apps.users.urls')),
    path('api/dashboard/', include('apps.dashboard.urls')),
    path('api/ai/', include('apps.ai_engine.urls')),
    path('api/marketplace/', include('apps.marketplace.urls')),
    path('api/medical/', include('apps.medical.urls')),
    path('api/timecapsule/', include('apps.timecapsule.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

"""AI Engine URL configuration."""
from django.urls import path
from apps.ai_engine.views import (
    DietPlanView, FitnessPlanView, SymptomCheckView,
    FoodSafetyView, GrowthPredictionView,
)

urlpatterns = [
    path('diet-plan/', DietPlanView.as_view(), name='diet-plan'),
    path('fitness-plan/', FitnessPlanView.as_view(), name='fitness-plan'),
    path('symptom-check/', SymptomCheckView.as_view(), name='symptom-check'),
    path('food-safety/', FoodSafetyView.as_view(), name='food-safety'),
    path('growth-predict/', GrowthPredictionView.as_view(), name='growth-predict'),
]

"""AI Engine API Views."""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from apps.ai_engine.models import DietPlan, WorkoutPlan, Meal, MealItem, Exercise
from apps.ai_engine.rules import (
    generate_diet_plan, generate_workout_plan,
    triage_symptoms, check_food_safety, predict_child_growth,
)
from apps.users.models import MotherProfile


class DietPlanView(APIView):
    """POST /api/ai/diet-plan/ — Generate AI diet plan."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        trimester = request.data.get('trimester')
        allergies = request.data.get('allergies', [])

        if not trimester:
            # Try to auto-detect from mother profile
            profile = MotherProfile.objects(user=request.user).first()
            trimester = profile.trimester if profile else 2

        plan_data = generate_diet_plan(int(trimester), allergies)

        # Persist to MongoDB
        meals = []
        for meal_data in plan_data['meals']:
            items = [MealItem(**item) for item in meal_data['items']]
            meals.append(Meal(
                meal_type=meal_data['meal_type'],
                items=items,
                total_calories=meal_data['total_calories'],
            ))

        diet_plan = DietPlan(
            user=request.user,
            trimester=int(trimester),
            meals=meals,
            total_daily_calories=plan_data['total_daily_calories'],
            notes=plan_data['notes'],
            allergens_avoided=plan_data['allergens_avoided'],
        )
        diet_plan.save()

        return Response(plan_data, status=status.HTTP_201_CREATED)

    def get(self, request):
        """Get latest diet plan for user."""
        plan = DietPlan.objects(user=request.user).order_by('-created_at').first()
        if not plan:
            return Response({'message': 'No diet plan found. Generate one first.'}, status=404)

        return Response({
            'id': str(plan.id),
            'trimester': plan.trimester,
            'total_daily_calories': plan.total_daily_calories,
            'meals': [
                {
                    'meal_type': m.meal_type,
                    'total_calories': m.total_calories,
                    'items': [
                        {'name': i.name, 'calories': i.calories, 'protein_g': i.protein_g,
                         'is_vegetarian': i.is_vegetarian, 'tags': i.tags}
                        for i in m.items
                    ],
                }
                for m in plan.meals
            ],
            'notes': plan.notes,
            'allergens_avoided': plan.allergens_avoided,
            'created_at': str(plan.created_at),
        })


class FitnessPlanView(APIView):
    """POST /api/ai/fitness-plan/ — Generate workout plan."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        trimester = request.data.get('trimester')

        if not trimester:
            profile = MotherProfile.objects(user=request.user).first()
            trimester = profile.trimester if profile else 2

        plan_data = generate_workout_plan(int(trimester))

        # Persist
        exercises = [Exercise(**e) for e in plan_data['exercises']]
        workout = WorkoutPlan(
            user=request.user,
            trimester=int(trimester),
            exercises=exercises,
            total_duration_min=plan_data['total_duration_min'],
            emergency_stop_note=plan_data['emergency_stop_note'],
        )
        workout.save()

        return Response(plan_data, status=status.HTTP_201_CREATED)

    def get(self, request):
        """Get latest workout plan."""
        plan = WorkoutPlan.objects(user=request.user).order_by('-created_at').first()
        if not plan:
            return Response({'message': 'No workout plan found.'}, status=404)

        return Response({
            'id': str(plan.id),
            'trimester': plan.trimester,
            'total_duration_min': plan.total_duration_min,
            'exercises': [
                {'name': e.name, 'duration_min': e.duration_min, 'intensity': e.intensity,
                 'category': e.category, 'is_safe': e.is_safe, 'instructions': e.instructions}
                for e in plan.exercises
            ],
            'emergency_stop_note': plan.emergency_stop_note,
            'created_at': str(plan.created_at),
        })


class SymptomCheckView(APIView):
    """POST /api/ai/symptom-check/ — AI symptom triage."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        symptoms = request.data.get('symptoms', [])
        if not symptoms:
            return Response(
                {'error': 'Please provide a list of symptoms.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        result = triage_symptoms(symptoms)
        return Response(result)


class FoodSafetyView(APIView):
    """POST /api/ai/food-safety/ — Check if food is pregnancy-safe."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        food_name = request.data.get('food', '')
        if not food_name:
            return Response(
                {'error': 'Please provide a food name.'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        result = check_food_safety(food_name)
        return Response(result)


class GrowthPredictionView(APIView):
    """POST /api/ai/growth-predict/ — Child growth prediction."""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        weight = request.data.get('weight_kg')
        age_months = request.data.get('age_months')
        gender = request.data.get('gender', 'male')

        if weight is None or age_months is None:
            return Response(
                {'error': 'Please provide weight_kg and age_months.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        result = predict_child_growth(float(weight), int(age_months), gender)
        return Response(result)

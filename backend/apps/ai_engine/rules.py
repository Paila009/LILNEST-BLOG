"""
AI Engine — Rule-based logic for diet/fitness/symptom/growth.

These are hybrid rule-based stubs with clear interfaces for future ML model plugging.
"""

# ─── Diet Engine ─────────────────────────────────────────────────
INDIAN_MEALS = {
    1: {  # Trimester 1
        'breakfast': [
            {'name': 'Idli with Coconut Chutney', 'calories': 250, 'protein_g': 6, 'is_vegetarian': True, 'tags': ['iron-rich']},
            {'name': 'Poha with Peanuts', 'calories': 280, 'protein_g': 8, 'is_vegetarian': True, 'tags': ['folate']},
            {'name': 'Moong Dal Cheela', 'calories': 200, 'protein_g': 12, 'is_vegetarian': True, 'tags': ['protein']},
        ],
        'lunch': [
            {'name': 'Rajma Chawal with Raita', 'calories': 450, 'protein_g': 18, 'is_vegetarian': True, 'tags': ['protein', 'iron-rich']},
            {'name': 'Palak Paneer with Roti', 'calories': 420, 'protein_g': 16, 'is_vegetarian': True, 'tags': ['calcium', 'iron-rich']},
        ],
        'dinner': [
            {'name': 'Dal Khichdi with Ghee', 'calories': 380, 'protein_g': 14, 'is_vegetarian': True, 'tags': ['easy-digest']},
            {'name': 'Methi Paratha with Curd', 'calories': 350, 'protein_g': 10, 'is_vegetarian': True, 'tags': ['folate']},
        ],
        'snack': [
            {'name': 'Dry Fruits Mix (30g)', 'calories': 170, 'protein_g': 5, 'is_vegetarian': True, 'tags': ['omega-3']},
            {'name': 'Banana Milkshake', 'calories': 200, 'protein_g': 6, 'is_vegetarian': True, 'tags': ['potassium']},
        ],
    },
    2: {  # Trimester 2
        'breakfast': [
            {'name': 'Ragi Dosa with Sambar', 'calories': 300, 'protein_g': 10, 'is_vegetarian': True, 'tags': ['calcium']},
            {'name': 'Oats Upma with Vegetables', 'calories': 260, 'protein_g': 8, 'is_vegetarian': True, 'tags': ['fiber']},
        ],
        'lunch': [
            {'name': 'Chole with Brown Rice', 'calories': 480, 'protein_g': 20, 'is_vegetarian': True, 'tags': ['protein', 'fiber']},
            {'name': 'Fish Curry with Rice', 'calories': 500, 'protein_g': 28, 'is_vegetarian': False, 'tags': ['omega-3', 'protein']},
        ],
        'dinner': [
            {'name': 'Paneer Tikka with Salad', 'calories': 350, 'protein_g': 22, 'is_vegetarian': True, 'tags': ['protein', 'calcium']},
            {'name': 'Egg Bhurji with Roti', 'calories': 380, 'protein_g': 18, 'is_vegetarian': False, 'tags': ['protein']},
        ],
        'snack': [
            {'name': 'Sprouts Chaat', 'calories': 150, 'protein_g': 8, 'is_vegetarian': True, 'tags': ['folate', 'protein']},
            {'name': 'Coconut Ladoo', 'calories': 180, 'protein_g': 3, 'is_vegetarian': True, 'tags': ['energy']},
        ],
    },
    3: {  # Trimester 3
        'breakfast': [
            {'name': 'Besan Cheela with Mint Chutney', 'calories': 240, 'protein_g': 10, 'is_vegetarian': True, 'tags': ['protein']},
            {'name': 'Muesli with Warm Milk', 'calories': 300, 'protein_g': 10, 'is_vegetarian': True, 'tags': ['calcium', 'fiber']},
        ],
        'lunch': [
            {'name': 'Dal Tadka with Jeera Rice', 'calories': 430, 'protein_g': 16, 'is_vegetarian': True, 'tags': ['protein', 'iron-rich']},
            {'name': 'Chicken Stew with Appam', 'calories': 480, 'protein_g': 30, 'is_vegetarian': False, 'tags': ['protein']},
        ],
        'dinner': [
            {'name': 'Vegetable Khichdi with Papad', 'calories': 350, 'protein_g': 12, 'is_vegetarian': True, 'tags': ['easy-digest']},
            {'name': 'Mushroom Curry with Roti', 'calories': 320, 'protein_g': 10, 'is_vegetarian': True, 'tags': ['vitamin-d']},
        ],
        'snack': [
            {'name': 'Dates with Almond Milk', 'calories': 200, 'protein_g': 4, 'is_vegetarian': True, 'tags': ['iron-rich', 'energy']},
            {'name': 'Roasted Makhana', 'calories': 120, 'protein_g': 4, 'is_vegetarian': True, 'tags': ['calcium']},
        ],
    },
}

UNSAFE_FOODS = [
    'raw fish', 'sushi', 'unpasteurized cheese', 'raw eggs',
    'deli meat', 'raw papaya', 'pineapple', 'excess caffeine',
    'raw sprouts', 'shark', 'swordfish', 'king mackerel',
]


def generate_diet_plan(trimester, allergies=None):
    """Rule-based diet plan generator for Indian meals."""
    import random
    allergies = [a.lower() for a in (allergies or [])]
    meals_db = INDIAN_MEALS.get(trimester, INDIAN_MEALS[2])

    plan = []
    for meal_type, options in meals_db.items():
        # Filter out allergens
        safe_options = [
            m for m in options
            if not any(a in m['name'].lower() for a in allergies)
        ]
        if safe_options:
            choice = random.choice(safe_options)
            plan.append({
                'meal_type': meal_type,
                'items': [choice],
                'total_calories': choice['calories'],
            })

    return {
        'meals': plan,
        'total_daily_calories': sum(m['total_calories'] for m in plan),
        'allergens_avoided': allergies,
        'notes': f'Trimester {trimester} Indian meal plan. Stay hydrated!',
    }


def check_food_safety(food_name):
    """Check if a food is safe during pregnancy."""
    food_lower = food_name.lower()
    unsafe = [f for f in UNSAFE_FOODS if f in food_lower]
    return {
        'food': food_name,
        'is_safe': len(unsafe) == 0,
        'warnings': unsafe,
        'recommendation': 'Avoid this food during pregnancy.' if unsafe else 'This food is safe to consume.',
    }


# ─── Fitness Engine ──────────────────────────────────────────────
TRIMESTER_EXERCISES = {
    1: [
        {'name': 'Prenatal Yoga - Sun Salutation (Modified)', 'duration_min': 15, 'intensity': 'low', 'category': 'yoga', 'is_safe': True,
         'instructions': 'Gentle flow, avoid deep twists. Focus on breathing.'},
        {'name': 'Walking', 'duration_min': 20, 'intensity': 'low', 'category': 'cardio', 'is_safe': True,
         'instructions': 'Moderate pace walk. Stay hydrated.'},
        {'name': 'Kegel Exercises', 'duration_min': 10, 'intensity': 'low', 'category': 'pelvic', 'is_safe': True,
         'instructions': 'Contract pelvic floor for 5 seconds, release. 10 reps x 3 sets.'},
    ],
    2: [
        {'name': 'Prenatal Pilates', 'duration_min': 20, 'intensity': 'moderate', 'category': 'strength', 'is_safe': True,
         'instructions': 'Focus on core stability. Avoid lying flat on back.'},
        {'name': 'Swimming', 'duration_min': 25, 'intensity': 'moderate', 'category': 'cardio', 'is_safe': True,
         'instructions': 'Gentle laps. Excellent for reducing joint pressure.'},
        {'name': 'Prenatal Stretching', 'duration_min': 15, 'intensity': 'low', 'category': 'flexibility', 'is_safe': True,
         'instructions': 'Hip openers, cat-cow, side stretches.'},
    ],
    3: [
        {'name': 'Gentle Walking', 'duration_min': 15, 'intensity': 'low', 'category': 'cardio', 'is_safe': True,
         'instructions': 'Short walks. Rest when needed.'},
        {'name': 'Birthing Ball Exercises', 'duration_min': 15, 'intensity': 'low', 'category': 'pelvic', 'is_safe': True,
         'instructions': 'Pelvic circles, gentle bouncing for labor preparation.'},
        {'name': 'Deep Breathing & Relaxation', 'duration_min': 10, 'intensity': 'low', 'category': 'breathing', 'is_safe': True,
         'instructions': 'Practice labor breathing techniques.'},
    ],
}


def generate_workout_plan(trimester):
    """Generate trimester-appropriate workout plan."""
    exercises = TRIMESTER_EXERCISES.get(trimester, TRIMESTER_EXERCISES[2])
    return {
        'exercises': exercises,
        'total_duration_min': sum(e['duration_min'] for e in exercises),
        'emergency_stop_note': (
            '⚠️ STOP IMMEDIATELY if you experience: dizziness, headache, '
            'chest pain, shortness of breath, vaginal bleeding, contractions, '
            'or fluid leakage. Contact your doctor right away.'
        ),
    }


# ─── Symptom Triage ──────────────────────────────────────────────
SYMPTOM_RULES = {
    'headache': {'severity': 'low', 'advice': 'Rest in a dark room. Stay hydrated. If persistent, consult your doctor.', 'emergency': False},
    'nausea': {'severity': 'low', 'advice': 'Eat small frequent meals. Ginger tea may help. Common in first trimester.', 'emergency': False},
    'bleeding': {'severity': 'high', 'advice': 'Contact your doctor immediately. Go to the nearest hospital.', 'emergency': True},
    'severe abdominal pain': {'severity': 'high', 'advice': 'Seek emergency medical attention immediately.', 'emergency': True},
    'swelling': {'severity': 'medium', 'advice': 'Elevate your feet. Monitor for sudden swelling which could indicate preeclampsia.', 'emergency': False},
    'back pain': {'severity': 'low', 'advice': 'Use a pregnancy pillow. Gentle stretching may help. Avoid heavy lifting.', 'emergency': False},
    'fatigue': {'severity': 'low', 'advice': 'Rest when possible. Ensure adequate iron intake. Very common during pregnancy.', 'emergency': False},
    'high blood pressure': {'severity': 'high', 'advice': 'Contact your doctor immediately. Could indicate preeclampsia.', 'emergency': True},
    'reduced fetal movement': {'severity': 'high', 'advice': 'Count kicks. If fewer than 10 in 2 hours, contact your doctor immediately.', 'emergency': True},
    'fever': {'severity': 'medium', 'advice': 'Take paracetamol (as prescribed). If above 38°C, consult your doctor.', 'emergency': False},
    'constipation': {'severity': 'low', 'advice': 'Increase fiber intake. Drink plenty of water. Prunes and isabgol may help.', 'emergency': False},
    'heartburn': {'severity': 'low', 'advice': 'Avoid spicy food. Eat small meals. Sleep with head elevated.', 'emergency': False},
}


def triage_symptoms(symptoms_list):
    """Rule-based symptom triage engine."""
    results = []
    is_emergency = False

    for symptom in symptoms_list:
        symptom_lower = symptom.lower().strip()
        # Find best match
        matched = None
        for key, info in SYMPTOM_RULES.items():
            if key in symptom_lower or symptom_lower in key:
                matched = info
                break

        if matched:
            results.append({
                'symptom': symptom,
                'severity': matched['severity'],
                'advice': matched['advice'],
                'emergency': matched['emergency'],
            })
            if matched['emergency']:
                is_emergency = True
        else:
            results.append({
                'symptom': symptom,
                'severity': 'unknown',
                'advice': 'Please consult your healthcare provider for personalized advice.',
                'emergency': False,
            })

    return {
        'results': results,
        'is_emergency': is_emergency,
        'overall_advice': 'SEEK IMMEDIATE MEDICAL ATTENTION' if is_emergency else 'Monitor your symptoms and consult your doctor if they worsen.',
    }


# ─── Child Growth Prediction ────────────────────────────────────
WHO_GROWTH_PERCENTILES = {
    # age_months: (p5_weight_kg, p50_weight_kg, p95_weight_kg)
    0: (2.5, 3.3, 4.2),
    1: (3.4, 4.5, 5.8),
    3: (4.7, 6.1, 7.9),
    6: (6.1, 7.9, 10.0),
    9: (7.1, 9.2, 11.5),
    12: (7.8, 10.0, 12.5),
    18: (8.9, 11.3, 14.0),
    24: (9.8, 12.4, 15.5),
    36: (11.3, 14.3, 18.0),
}


def predict_child_growth(current_weight_kg, age_months, gender='male'):
    """Predict growth percentile based on WHO standards."""
    # Find closest reference age
    ref_ages = sorted(WHO_GROWTH_PERCENTILES.keys())
    closest_age = min(ref_ages, key=lambda x: abs(x - age_months))
    p5, p50, p95 = WHO_GROWTH_PERCENTILES[closest_age]

    if current_weight_kg < p5:
        percentile = 'Below 5th'
        status = 'Underweight — consult pediatrician'
    elif current_weight_kg < p50:
        percentile = '5th-50th'
        status = 'Normal range — healthy growth'
    elif current_weight_kg < p95:
        percentile = '50th-95th'
        status = 'Normal range — healthy growth'
    else:
        percentile = 'Above 95th'
        status = 'Overweight — consult pediatrician'

    return {
        'age_months': age_months,
        'current_weight_kg': current_weight_kg,
        'percentile_range': percentile,
        'status': status,
        'reference': {
            'reference_age': closest_age,
            'p5': p5,
            'p50': p50,
            'p95': p95,
        },
        'note': 'Based on WHO Child Growth Standards. Consult your pediatrician for personalized assessment.',
    }

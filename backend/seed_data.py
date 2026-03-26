"""
LILNEST Seed Data — Run with: python manage.py seed_data

Seeds fetal updates and sample marketplace providers.
"""
import os
import sys
import django

# Setup Django
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lilnest.settings')
django.setup()

from apps.dashboard.models import FetalUpdate, FetalDevelopment
from apps.marketplace.models import Provider, ServiceSlot


def seed_fetal_updates():
    """Seed weekly fetal growth data (weeks 4-42)."""
    if FetalUpdate.objects.count() > 0:
        print("Fetal updates already seeded. Skipping...")
        return

    data = [
        {'week': 4, 'size_comparison': 'Poppy Seed', 'weight_grams': 0.04, 'length_cm': 0.1, 'model_scale': 0.1,
         'developments': [
             {'system': 'neural', 'description': 'Neural tube forming'},
             {'system': 'circulatory', 'description': 'Heart begins to form'},
         ], 'tips': ['Start taking folic acid', 'Avoid alcohol and smoking']},
        {'week': 6, 'size_comparison': 'Sweet Pea', 'weight_grams': 0.5, 'length_cm': 0.6, 'model_scale': 0.15,
         'developments': [
             {'system': 'nervous', 'description': 'Brain developing rapidly'},
             {'system': 'circulatory', 'description': 'Heart starts beating'},
         ], 'tips': ['Schedule your first prenatal visit', 'Stay hydrated']},
        {'week': 8, 'size_comparison': 'Raspberry', 'weight_grams': 1.0, 'length_cm': 1.6, 'model_scale': 0.2,
         'developments': [
             {'system': 'musculoskeletal', 'description': 'Fingers and toes forming'},
             {'system': 'sensory', 'description': 'Eyes and ears developing'},
         ], 'tips': ['Morning sickness is common', 'Eat small frequent meals']},
        {'week': 10, 'size_comparison': 'Kumquat', 'weight_grams': 4.0, 'length_cm': 3.1, 'model_scale': 0.25,
         'developments': [
             {'system': 'musculoskeletal', 'description': 'Bones hardening'},
             {'system': 'digestive', 'description': 'Intestines forming'},
         ], 'tips': ['First trimester screening available', 'Gentle exercise recommended']},
        {'week': 12, 'size_comparison': 'Lime', 'weight_grams': 14.0, 'length_cm': 5.4, 'model_scale': 0.3,
         'developments': [
             {'system': 'nervous', 'description': 'Reflexes developing'},
             {'system': 'renal', 'description': 'Kidneys producing urine'},
         ], 'tips': ['Nausea often eases after this week', 'Nuchal translucency scan may be done']},
        {'week': 16, 'size_comparison': 'Avocado', 'weight_grams': 100.0, 'length_cm': 11.6, 'model_scale': 0.45,
         'developments': [
             {'system': 'musculoskeletal', 'description': 'Can make facial expressions'},
             {'system': 'sensory', 'description': 'Taste buds forming'},
         ], 'tips': ['You may start feeling movement', 'Anomaly scan at 18-20 weeks']},
        {'week': 20, 'size_comparison': 'Banana', 'weight_grams': 300.0, 'length_cm': 16.4, 'model_scale': 0.6,
         'developments': [
             {'system': 'sensory', 'description': 'Can hear sounds'},
             {'system': 'integumentary', 'description': 'Hair growing on head'},
         ], 'tips': ['Halfway point!', 'Talk and sing to your baby']},
        {'week': 24, 'size_comparison': 'Corn', 'weight_grams': 600.0, 'length_cm': 21.0, 'model_scale': 0.75,
         'developments': [
             {'system': 'respiratory', 'description': 'Lungs developing branches'},
             {'system': 'sensory', 'description': 'Taste buds fully formed'},
         ], 'tips': ['Glucose tolerance test usually done now', 'Practice pelvic floor exercises']},
        {'week': 28, 'size_comparison': 'Eggplant', 'weight_grams': 1000.0, 'length_cm': 25.0, 'model_scale': 0.9,
         'developments': [
             {'system': 'sensory', 'description': 'Eyes can open and close'},
             {'system': 'nervous', 'description': 'Brain growing rapidly'},
         ], 'tips': ['Third trimester begins', 'Start monitoring fetal movements']},
        {'week': 32, 'size_comparison': 'Jicama', 'weight_grams': 1700.0, 'length_cm': 28.0, 'model_scale': 1.1,
         'developments': [
             {'system': 'musculoskeletal', 'description': 'Bones fully developed but still soft'},
             {'system': 'respiratory', 'description': 'Practicing breathing movements'},
         ], 'tips': ['Start preparing hospital bag', 'Practice breathing exercises']},
        {'week': 36, 'size_comparison': 'Papaya', 'weight_grams': 2600.0, 'length_cm': 32.0, 'model_scale': 1.3,
         'developments': [
             {'system': 'respiratory', 'description': 'Lungs nearly mature'},
             {'system': 'integumentary', 'description': 'Gaining fat layer'},
         ], 'tips': ['Baby may drop into pelvis', 'Weekly checkups recommended']},
        {'week': 40, 'size_comparison': 'Watermelon', 'weight_grams': 3400.0, 'length_cm': 36.0, 'model_scale': 1.5,
         'developments': [
             {'system': 'all', 'description': 'Fully developed and ready to be born'},
             {'system': 'immune', 'description': 'Receiving antibodies from mother'},
         ], 'tips': ['Due date! Baby could arrive any day', 'Stay close to hospital']},
    ]

    for item in data:
        devs = [FetalDevelopment(**d) for d in item.pop('developments')]
        FetalUpdate(developments=devs, **item).save()

    print(f"✅ Seeded {len(data)} fetal update records.")


def seed_providers():
    """Seed sample marketplace providers."""
    if Provider.objects.count() > 0:
        print("Providers already seeded. Skipping...")
        return

    providers = [
        {
            'name': 'Dr. Priya Sharma',
            'category': 'lactation_consultant',
            'bio': 'IBCLC certified lactation consultant with 12 years experience. Specializing in breastfeeding challenges, tongue-tie assessment, and pumping support.',
            'city': 'Mumbai',
            'location': 'Bandra West, Mumbai',
            'experience_years': 12,
            'qualifications': ['IBCLC', 'MD Pediatrics', 'CLE'],
            'price_per_session': 1500,
            'is_verified': True,
            'rating': 4.8,
            'total_reviews': 156,
            'available_slots': [
                {'day': 'Monday', 'start_time': '09:00', 'end_time': '13:00'},
                {'day': 'Wednesday', 'start_time': '14:00', 'end_time': '18:00'},
                {'day': 'Friday', 'start_time': '09:00', 'end_time': '13:00'},
            ],
        },
        {
            'name': 'Ananya Menon',
            'category': 'doula',
            'bio': 'Birth and postpartum doula providing emotional, physical, and informational support. DONA International certified.',
            'city': 'Bangalore',
            'location': 'Koramangala, Bangalore',
            'experience_years': 8,
            'qualifications': ['DONA Certified', 'Childbirth Educator'],
            'price_per_session': 2000,
            'is_verified': True,
            'rating': 4.9,
            'total_reviews': 89,
            'available_slots': [
                {'day': 'Tuesday', 'start_time': '10:00', 'end_time': '16:00'},
                {'day': 'Thursday', 'start_time': '10:00', 'end_time': '16:00'},
            ],
        },
        {
            'name': 'Kavitha Reddy',
            'category': 'nutritionist',
            'bio': 'Clinical nutritionist specializing in prenatal and postnatal nutrition. Customized Indian diet plans for all trimesters.',
            'city': 'Hyderabad',
            'location': 'Jubilee Hills, Hyderabad',
            'experience_years': 10,
            'qualifications': ['MSc Nutrition', 'Certified Prenatal Nutritionist'],
            'price_per_session': 1200,
            'is_verified': True,
            'rating': 4.7,
            'total_reviews': 210,
            'available_slots': [
                {'day': 'Monday', 'start_time': '09:00', 'end_time': '17:00'},
                {'day': 'Wednesday', 'start_time': '09:00', 'end_time': '17:00'},
                {'day': 'Saturday', 'start_time': '10:00', 'end_time': '14:00'},
            ],
        },
        {
            'name': 'Meera Joshi',
            'category': 'babysitter',
            'bio': 'Experienced and certified babysitter with infant CPR training. Available for daytime and overnight care.',
            'city': 'Pune',
            'location': 'Kothrud, Pune',
            'experience_years': 5,
            'qualifications': ['Infant CPR Certified', 'Early Childhood Education Diploma'],
            'price_per_session': 800,
            'is_verified': True,
            'rating': 4.6,
            'total_reviews': 73,
            'available_slots': [
                {'day': 'Monday', 'start_time': '08:00', 'end_time': '20:00'},
                {'day': 'Tuesday', 'start_time': '08:00', 'end_time': '20:00'},
                {'day': 'Thursday', 'start_time': '08:00', 'end_time': '20:00'},
            ],
        },
        {
            'name': 'Dr. Arjun Nair',
            'category': 'pediatrician',
            'bio': 'Senior pediatrician with expertise in neonatal care, vaccination schedules, and childhood developmental assessments.',
            'city': 'Chennai',
            'location': 'T Nagar, Chennai',
            'experience_years': 15,
            'qualifications': ['MD Pediatrics', 'DNB', 'IAP Fellow'],
            'price_per_session': 1800,
            'is_verified': True,
            'rating': 4.9,
            'total_reviews': 312,
            'available_slots': [
                {'day': 'Monday', 'start_time': '09:00', 'end_time': '13:00'},
                {'day': 'Wednesday', 'start_time': '09:00', 'end_time': '13:00'},
                {'day': 'Friday', 'start_time': '14:00', 'end_time': '18:00'},
            ],
        },
        {
            'name': 'Shruti Kapoor',
            'category': 'yoga_instructor',
            'bio': 'Certified prenatal yoga instructor. Gentle yoga sessions designed for all trimesters focusing on breathing, flexibility, and labor preparation.',
            'city': 'Delhi',
            'location': 'South Delhi',
            'experience_years': 7,
            'qualifications': ['RYT-500', 'Prenatal Yoga Certified', 'Lamaze Educator'],
            'price_per_session': 1000,
            'is_verified': True,
            'rating': 4.8,
            'total_reviews': 145,
            'available_slots': [
                {'day': 'Tuesday', 'start_time': '07:00', 'end_time': '11:00'},
                {'day': 'Thursday', 'start_time': '07:00', 'end_time': '11:00'},
                {'day': 'Saturday', 'start_time': '08:00', 'end_time': '12:00'},
            ],
        },
    ]

    for prov in providers:
        slots = [ServiceSlot(**s) for s in prov.pop('available_slots', [])]
        Provider(available_slots=slots, **prov).save()

    print(f"✅ Seeded {len(providers)} marketplace providers.")


if __name__ == '__main__':
    print("🌸 LILNEST Seed Data Script\n")
    seed_fetal_updates()
    seed_providers()
    print("\n✅ All seed data loaded successfully!")

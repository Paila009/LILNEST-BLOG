"""
Enhanced Medical Celery Tasks — medication reminders with notifications.
"""
import datetime
from celery import shared_task


@shared_task
def send_medication_reminders():
    """
    Periodic task: Check active medications and send reminder notifications.
    Runs every 30 minutes via Celery Beat.
    """
    from apps.medical.models import Medication
    from apps.users.notifications import create_notification

    now = datetime.datetime.utcnow()
    current_hour = now.strftime('%H')
    current_minute = int(now.strftime('%M'))

    active_meds = Medication.objects(is_active=True)
    sent_count = 0

    for med in active_meds:
        # Check if end_date has passed
        if med.end_date and med.end_date < datetime.date.today():
            med.is_active = False
            med.save()
            continue

        # Check reminders
        for reminder in med.reminders:
            reminder_hour = reminder.time.split(':')[0] if ':' in reminder.time else None
            if reminder_hour and reminder_hour == current_hour and current_minute < 30:
                create_notification(
                    user=med.user,
                    title=f'💊 Medication Reminder',
                    message=f'Time to take {med.name} ({med.dosage}). {reminder.label or ""}',
                    notif_type='medication_reminder',
                    priority='high',
                    action_url='/medical',
                )
                sent_count += 1

    return f"Sent {sent_count} medication reminder(s)."


@shared_task
def check_vital_alerts():
    """
    Periodic task: Check recent vitals for risk conditions.
    """
    from apps.medical.models import VitalLog
    from apps.users.notifications import create_notification

    today = datetime.date.today()
    recent_vitals = VitalLog.objects(date=today)

    alert_count = 0
    for vital in recent_vitals:
        alerts = []
        if vital.systolic_bp and vital.systolic_bp >= 140:
            alerts.append(f'High BP: {vital.systolic_bp}/{vital.diastolic_bp} mmHg')
        if vital.blood_sugar and vital.blood_sugar >= 200:
            alerts.append(f'High blood sugar: {vital.blood_sugar} mg/dL')
        if vital.heart_rate and vital.heart_rate >= 120:
            alerts.append(f'High heart rate: {vital.heart_rate} bpm')
        if vital.temperature and vital.temperature >= 38.0:
            alerts.append(f'Fever detected: {vital.temperature}°C')

        for alert in alerts:
            create_notification(
                user=vital.user,
                title='⚠️ Health Alert',
                message=f'{alert}. Please consult your doctor.',
                notif_type='risk_alert',
                priority='urgent',
                action_url='/medical',
            )
            alert_count += 1

    return f"Generated {alert_count} vital alert(s)."

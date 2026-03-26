"""
Enhanced TimeCapsule Celery Tasks — with notifications.
"""
import datetime
from celery import shared_task


@shared_task
def check_capsule_unlocks():
    """
    Periodic task: Check for capsules that have reached their unlock date.
    Runs every hour via Celery Beat. Sends notifications on unlock.
    """
    from apps.timecapsule.models import TimeCapsule
    from apps.users.notifications import create_notification

    today = datetime.date.today()
    ready_capsules = TimeCapsule.objects(
        unlock_date__lte=today,
        is_unlocked=False,
    )

    unlocked_count = 0
    for capsule in ready_capsules:
        capsule.unlock()
        unlocked_count += 1

        # Send notification
        create_notification(
            user=capsule.creator,
            title='🔓 Time Capsule Unlocked!',
            message=f'Your time capsule "{capsule.title}" for {capsule.recipient_name} has been unlocked!',
            notif_type='capsule_unlocked',
            priority='high',
            action_url=f'/timecapsule/{str(capsule.id)}',
        )

    return f"Unlocked {unlocked_count} capsule(s)."


@shared_task
def send_capsule_reminder(capsule_id):
    """Send a reminder that a capsule is approaching its unlock date."""
    from apps.timecapsule.models import TimeCapsule
    from apps.users.notifications import create_notification

    try:
        capsule = TimeCapsule.objects.get(id=capsule_id)
    except TimeCapsule.DoesNotExist:
        return "Capsule not found."

    days_until = (capsule.unlock_date - datetime.date.today()).days
    if days_until > 0 and not capsule.is_unlocked:
        create_notification(
            user=capsule.creator,
            title='📦 Capsule Unlocking Soon!',
            message=f'"{capsule.title}" will unlock in {days_until} day(s)!',
            notif_type='capsule_unlocked',
            priority='normal',
            action_url='/timecapsule',
        )
        return f"Reminder sent for capsule '{capsule.title}'."
    return "No reminder needed."

from sqlalchemy.orm import Session
from app.models.admin_model import UserActivityLog
from typing import Optional

class ActivityLogger:
    @staticmethod
    def log(
        db: Session,
        user_id: str,
        activity_type: str,
        description: Optional[str] = None,
        device: Optional[str] = None,
        ip_address: Optional[str] = None
    ):
        """
        Log a user activity to the database.
        """
        log_entry = UserActivityLog(
            user_id=user_id,
            activity_type=activity_type,
            description=description,
            device=device,
            ip_address=ip_address
        )
        db.add(log_entry)
        db.commit()

activity_service = ActivityLogger()

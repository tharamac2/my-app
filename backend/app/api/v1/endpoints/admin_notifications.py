from typing import Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api import deps
from app.models.admin_model import Admin
from app.models.user import User
from app.models.notification import Notification
from app.models.billing import Subscription
from pydantic import BaseModel

router = APIRouter()

class BroadcastNotification(BaseModel):
    title: str
    message: str
    type: str # announcement, offer, system
    target: str # all, premium, free

@router.post("/broadcast")
def send_broadcast_notification(
    *,
    db: Session = Depends(deps.get_db),
    notification_in: BroadcastNotification,
    admin_user: Admin = Depends(deps.get_current_admin),
) -> Any:
    """
    Send a notification to a group of users.
    """
    query = db.query(User)
    
    if notification_in.target == "premium":
        query = query.join(Subscription).filter(Subscription.tier != "free")
    elif notification_in.target == "free":
        # Note: Users without subscription entry or with 'free' tier
        query = query.outerjoin(Subscription).filter((Subscription.id == None) | (Subscription.tier == "free"))
    
    users = query.all()
    
    notifications = []
    for user in users:
        notif = Notification(
            user_id=user.id,
            title=notification_in.title,
            message=notification_in.message,
            type=notification_in.type,
            is_read=False
        )
        db.add(notif)
        notifications.append(notif)
    
    db.commit()
    return {"message": f"Broadcast sent to {len(notifications)} users"}

@router.get("/history", response_model=List[Any])
def get_broadcast_history(
    db: Session = Depends(deps.get_db),
    admin_user: Admin = Depends(deps.get_current_admin),
) -> Any:
    # Just a placeholder for now as we don't have a broadcast history table
    # We could theoretically query distinct title/message from Notifications table
    return []

from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api import deps
from app.models.user import User
from app.models.admin_model import UserActivityLog
from app.models.billing import Subscription, Payment
from app.models.social import Match, Message, Report
from app.schemas.user import UserOut
from app.schemas.admin_schemas import AdminRole
from sqlalchemy import func
from datetime import datetime

router = APIRouter()

@router.get("/users", response_model=List[UserOut])
def list_users(
    db: Session = Depends(deps.get_db),
    admin_user: User = Depends(deps.get_current_admin),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve users.
    """
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@router.post("/users/{user_id}/verify", response_model=UserOut)
def verify_user(
    *,
    db: Session = Depends(deps.get_db),
    user_id: str,
    admin_user: User = Depends(deps.get_current_admin),
) -> Any:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.is_verified = True
    db.commit()
    db.refresh(user)
    return user

@router.post("/users/{user_id}/block", response_model=UserOut)
def block_user(
    *,
    db: Session = Depends(deps.get_db),
    user_id: str,
    admin_user: User = Depends(deps.get_current_admin),
) -> Any:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.is_active = False
    db.commit()
    db.refresh(user)
    return user

@router.get("/stats", response_model=Any)
def get_stats(
    db: Session = Depends(deps.get_db),
    admin_user: User = Depends(deps.get_current_admin),
) -> Any:
    from datetime import timedelta
    
    total_users = db.query(User).count()
    premium_users = db.query(Subscription).filter(Subscription.tier.in_(["lite", "pro", "elite"])).count()
    active_matches = db.query(Match).filter(Match.status == "matched").count()
    
    # Revenue calculations
    now = datetime.utcnow()
    month_start = datetime(now.year, now.month, 1)
    revenue_mtd = db.query(func.sum(Payment.amount)).filter(Payment.created_at >= month_start).scalar() or 0
    total_revenue = db.query(func.sum(Payment.amount)).scalar() or 0
    
    # Real-time activity counts (Today)
    today_start = datetime(now.year, now.month, now.day)
    active_users_today = db.query(func.count(func.distinct(UserActivityLog.user_id))).filter(UserActivityLog.created_at >= today_start).scalar()
    new_registrations_today = db.query(User).filter(User.created_at >= today_start).count()
    
    interests_sent_today = db.query(Match).filter(Match.created_at >= today_start).count()
    messages_sent_today = db.query(Message).filter(Message.created_at >= today_start).count()
    
    pending_verifications = db.query(User).filter(User.is_verified == False).count()
    unresolved_reports = db.query(Report).filter(Report.status == "pending").count()
    
    # Trends (Last 14 days)
    registration_trends = []
    revenue_trends = []
    for i in range(14):
        date = (now - timedelta(days=i)).date()
        
        reg_count = db.query(User).filter(func.date(User.created_at) == date).count()
        registration_trends.append({"date": date.strftime("%Y-%m-%d"), "count": reg_count})
        
        rev_count = db.query(func.sum(Payment.amount)).filter(func.date(Payment.created_at) == date).scalar() or 0
        revenue_trends.append({"date": date.strftime("%Y-%m-%d"), "revenue": float(rev_count)})
        
    registration_trends.reverse()
    revenue_trends.reverse()

    # Recent Users
    recent_users = db.query(User).order_by(User.created_at.desc()).limit(5).all()
    recent_users_data = [
        {
            "id": u.id,
            "full_name": u.full_name,
            "email": u.email,
            "created_at": u.created_at.strftime("%Y-%m-%d %H:%M"),
            "is_verified": u.is_verified
        } for u in recent_users
    ]
    
    return {
        "total_users": total_users,
        "premium_users": premium_users,
        "active_matches": active_matches,
        "active_users_today": active_users_today,
        "new_registrations_today": new_registrations_today,
        "interests_sent_today": interests_sent_today,
        "messages_sent_today": messages_sent_today,
        "revenue_mtd": float(revenue_mtd),
        "total_revenue": float(total_revenue),
        "pending_verifications": pending_verifications,
        "unresolved_reports": unresolved_reports,
        "registration_trends": registration_trends,
        "revenue_trends": revenue_trends,
        "recent_users": recent_users_data
    }

@router.get("/reports", response_model=Any)
def list_reports(
    db: Session = Depends(deps.get_db),
    admin_user: User = Depends(deps.get_current_admin),
) -> Any:
    return db.query(Report).all()

@router.get("/activity-logs", response_model=List[Any])
def list_activity_logs(
    db: Session = Depends(deps.get_db),
    admin_user: User = Depends(deps.get_current_admin),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    logs = db.query(UserActivityLog).join(User).order_by(UserActivityLog.created_at.desc()).offset(skip).limit(limit).all()
    return [
        {
            "id": log.id,
            "user_name": log.user.full_name,
            "activity_type": log.activity_type,
            "description": log.description,
            "device": log.device,
            "ip_address": log.ip_address,
            "created_at": log.created_at
        } for log in logs
    ]

@router.get("/users/{user_id}", response_model=Any)
def get_user_full_profile(
    user_id: str,
    db: Session = Depends(deps.get_db),
    admin_user: User = Depends(deps.get_current_admin),
) -> Any:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    def to_dict(obj):
        if not obj:
            return None
        return {k: v for k, v in obj.__dict__.items() if not k.startswith('_')}

    return {
        "id": user.id,
        "email": user.email,
        "full_name": user.full_name,
        "phone": user.phone,
        "is_active": user.is_active,
        "is_verified": user.is_verified,
        "created_at": user.created_at,
        "last_login": user.last_login,
        "profile": to_dict(user.profile),
        "details": to_dict(user.details),
        "family": to_dict(user.family),
        "location": to_dict(user.location),
        "photos": [to_dict(p) for p in user.photos] if user.photos else [],
        "subscription": to_dict(user.subscription)
    }

@router.post("/users/{user_id}/reset-password")
def reset_user_password(
    user_id: str,
    new_password: str,
    db: Session = Depends(deps.get_db),
    admin_user: User = Depends(deps.get_current_admin),
) -> Any:
    from app.core.security import get_password_hash
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.password_hash = get_password_hash(new_password)
    db.add(user)
    db.commit()
    return {"message": "Password reset successfully"}

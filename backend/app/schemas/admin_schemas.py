from typing import Optional, List
from pydantic import BaseModel, EmailStr
from datetime import datetime
from enum import Enum

class AdminRole(str, Enum):
    SUPER_ADMIN = "super_admin"
    ADMIN = "admin"
    MODERATOR = "moderator"

class AdminBase(BaseModel):
    email: EmailStr
    full_name: str
    role: AdminRole = AdminRole.ADMIN
    is_active: Optional[int] = 1

class AdminCreate(AdminBase):
    password: str

class AdminUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    password: Optional[str] = None
    role: Optional[AdminRole] = None
    is_active: Optional[int] = None

class AdminOut(AdminBase):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: Optional[str] = None
    role: Optional[str] = None

class UserActivityLogBase(BaseModel):
    user_id: str
    activity_type: str
    description: Optional[str] = None
    device: Optional[str] = None
    ip_address: Optional[str] = None

class UserActivityLogCreate(UserActivityLogBase):
    pass

class UserActivityLogOut(UserActivityLogBase):
    id: int
    created_at: datetime
    user_name: Optional[str] = None # For joining with User model

    class Config:
        from_attributes = True

class DashboardStats(BaseModel):
    total_users: int
    active_users_today: int
    new_registrations_today: int
    profiles_completed_today: int
    interests_sent_today: int
    messages_sent_today: int
    payments_received_total: float
    reported_profiles_count: int
    registration_trends: List[dict]
    revenue_trends: List[dict]

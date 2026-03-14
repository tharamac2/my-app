from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime

class NotificationOut(BaseModel):
    id: int
    user_id: str
    title: str
    message: str
    type: str # interest, message, view, subscription
    is_read: bool
    created_at: datetime
    class Config:
        from_attributes = True

class NotificationSummaryOut(BaseModel):
    unread_count: int

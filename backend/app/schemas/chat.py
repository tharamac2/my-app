from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime

class MessageCreate(BaseModel):
    receiver_id: str
    text: str
    type: Optional[str] = "text"
    media_url: Optional[str] = None

class MessageOut(BaseModel):
    id: int
    sender_id: str
    receiver_id: str
    text: str
    type: str
    media_url: Optional[str] = None
    is_read: bool
    created_at: datetime
    class Config:
        from_attributes = True

class ConversationOut(BaseModel):
    with_user_id: str
    with_user_name: str
    last_message: str
    last_message_time: datetime
    unread_count: int

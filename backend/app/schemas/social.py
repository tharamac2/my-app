from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime

class MatchAction(BaseModel):
    target_user_id: str
    action: str # 'like', 'pass'

class MatchOut(BaseModel):
    id: int
    source_user_id: str
    target_user_id: str
    status: str
    created_at: datetime
    class Config:
        from_attributes = True

class FavoriteCreate(BaseModel):
    target_id: str

class ReportCreate(BaseModel):
    reported_id: str
    reason: str

class BlockCreate(BaseModel):
    blocked_id: str

class SocialSummaryOut(BaseModel):
    likes_sent: int
    likes_received: int
    mutual_matches: int
    favorites_count: int

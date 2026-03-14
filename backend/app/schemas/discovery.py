from typing import Optional, List
from pydantic import BaseModel
from datetime import date

class DiscoveryProfileOut(BaseModel):
    id: str
    full_name: str
    age: int
    height: Optional[str] = None
    location: Optional[str] = None
    religion: Optional[str] = None
    caste: Optional[str] = None
    profession: Optional[str] = None
    photo_url: Optional[str] = None
    compatibility_score: Optional[int] = None
    is_premium: bool = False
    bioSnippet: Optional[str] = None

class FeedOut(BaseModel):
    recommended: List[DiscoveryProfileOut]
    nearby: List[DiscoveryProfileOut]
    recently_joined: List[DiscoveryProfileOut]
    premium: List[DiscoveryProfileOut]

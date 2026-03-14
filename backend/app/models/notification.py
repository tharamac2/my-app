from sqlalchemy import Column, String, Integer, DateTime, Text, Boolean, ForeignKey
from datetime import datetime
from app.db.base_class import Base

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(100), nullable=False)
    message = Column(Text, nullable=False)
    type = Column(String(50)) # interest, message, view, subscription
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

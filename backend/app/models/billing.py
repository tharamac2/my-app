from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Enum, Numeric
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.base_class import Base

class Subscription(Base):
    __tablename__ = "subscriptions"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    tier = Column(Enum("free", "lite", "pro", "elite", name="sub_tier_enum"), default="free")
    status = Column(Enum("active", "expired", "cancelled", name="sub_status_enum"), default="active")
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=True)
    
    user = relationship("User", back_populates="subscription")

class Payment(Base):
    __tablename__ = "payments"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"))
    amount = Column(Numeric(10, 2), nullable=False)
    currency = Column(String(3), default="INR")
    razorpay_order_id = Column(String(255), unique=True)
    razorpay_payment_id = Column(String(255), unique=True)
    razorpay_signature = Column(String(255))
    status = Column(String(50), default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)

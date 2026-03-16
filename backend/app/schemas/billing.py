from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal

class SubscriptionOut(BaseModel):
    tier: str
    status: str
    expires_at: Optional[datetime] = None
    class Config:
        from_attributes = True

class RazorpayOrderCreate(BaseModel):
    plan_tier: str # 'lite', 'pro', 'elite'

class RazorpayOrderOut(BaseModel):
    id: str
    amount: int
    currency: str
    plan_tier: str

class PaymentVerify(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    plan_tier: str

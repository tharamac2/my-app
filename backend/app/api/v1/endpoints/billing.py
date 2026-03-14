from typing import Any, List
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api import deps
from app.models.user import User
from app.models.billing import Subscription, Payment
from app.schemas.billing import SubscriptionOut, RazorpayOrderCreate, RazorpayOrderOut, PaymentVerify
from app.services import razorpay as razorpay_service

router = APIRouter()

PLAN_PRICES = {
    "lite": 49900,  # 499 INR in paise
    "pro": 99900,   # 999 INR in paise
    "elite": 199900 # 1999 INR in paise
}

@router.get("/status", response_model=SubscriptionOut)
def get_subscription_status(
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    if not current_user.subscription:
        return {"tier": "free", "status": "active"}
    return current_user.subscription

@router.post("/order", response_model=RazorpayOrderOut)
def create_subscription_order(
    *,
    db: Session = Depends(deps.get_db),
    order_in: RazorpayOrderCreate,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    amount = PLAN_PRICES.get(order_in.plan_tier)
    if not amount:
        raise HTTPException(status_code=400, detail="Invalid plan tier")
        
    order = razorpay_service.create_order(amount)
    
    # Track payment attempt
    db_payment = Payment(
        user_id=current_user.id,
        amount=amount / 100,
        razorpay_order_id=order["id"],
        status="created"
    )
    db.add(db_payment)
    db.commit()
    
    return {
        "id": order["id"],
        "amount": amount,
        "currency": "INR",
        "plan_tier": order_in.plan_tier
    }

@router.post("/verify", response_model=SubscriptionOut)
def verify_subscription_payment(
    *,
    db: Session = Depends(deps.get_db),
    verify_in: PaymentVerify,
    current_user: User = Depends(deps.get_current_user)
) -> Any:
    valid = razorpay_service.verify_payment(
        verify_in.razorpay_order_id,
        verify_in.razorpay_payment_id,
        verify_in.razorpay_signature
    )
    
    if not valid:
        raise HTTPException(status_code=400, detail="Payment verification failed")
        
    # Update payment record
    payment = db.query(Payment).filter(Payment.razorpay_order_id == verify_in.razorpay_order_id).first()
    if payment:
        payment.razorpay_payment_id = verify_in.razorpay_payment_id
        payment.razorpay_signature = verify_in.razorpay_signature
        payment.status = "captured"
        
    # Update or create subscription
    sub = current_user.subscription
    if not sub:
        sub = Subscription(user_id=current_user.id)
        db.add(sub)
        
    sub.tier = verify_in.plan_tier
    sub.status = "active"
    sub.expires_at = datetime.utcnow() + timedelta(days=30)
    
    db.commit()
    db.refresh(sub)
    return sub

import razorpay
from app.core.config import settings

client = None
if settings.RAZORPAY_KEY_ID and settings.RAZORPAY_KEY_SECRET:
    client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

def create_order(amount, currency="INR"):
    if not client:
        # Mock for development if keys missing
        return {"id": "mock_order_id", "amount": amount, "currency": currency}
    
    data = {
        "amount": amount, # amount in the smallest currency unit (paise for INR)
        "currency": currency,
    }
    return client.order.create(data=data)

def verify_payment(order_id, payment_id, signature):
    if not client:
        return True # Mock success
    
    params_dict = {
        'razorpay_order_id': order_id,
        'razorpay_payment_id': payment_id,
        'razorpay_signature': signature
    }
    try:
        client.utility.verify_payment_signature(params_dict)
        return True
    except:
        return False

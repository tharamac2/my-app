import sys
import os

# Add backend to path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from app.db.session import SessionLocal
from app.models.user import User
from app.models.billing import Subscription
from app.models.social import Match, Report

def check_user():
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == "admin@ratan.com").first()
        if user:
            print(f"User: {user.email}")
            print(f"Role: {user.role}")
            print(f"Is Active: {user.is_active}")
            print(f"Is Verified: {user.is_verified}")
        else:
            print("User not found.")
    finally:
        db.close()

if __name__ == "__main__":
    check_user()

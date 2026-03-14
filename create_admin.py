import sys
import os

# Add backend to path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from app.db.session import SessionLocal, engine
from app.db.base_class import Base
from app.models.user import User
from app.models.billing import Subscription
from app.models.social import Match, Report
from app.core import security

def create_admin():
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        email = "admin@ratan.com"
        password = "Admin@1234"
        
        user = db.query(User).filter(User.email == email).first()
        if user:
            print(f"User {email} already exists. Updating role to admin.")
            user.role = "admin"
            user.password_hash = security.get_password_hash(password)
        else:
            print(f"Creating new admin user: {email}")
            user = User(
                email=email,
                password_hash=security.get_password_hash(password),
                full_name="Super Admin",
                role="admin",
                is_active=True,
                is_verified=True
            )
            db.add(user)
        
        db.commit()
        print("Admin user created/updated successfully!")
        print(f"Email: {email}")
        print(f"Password: {password}")
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()

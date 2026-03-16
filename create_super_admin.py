import sys
import os

# Add the backend directory to the sys.path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from app.db.session import SessionLocal
from app.models.user import User, UserProfile, UserDetail, FamilyDetail, LocationDetail, UserPhoto
from app.models.billing import Subscription, Payment
from app.models.social import Match, Favorite, Message, Report, Block
from app.models.notification import Notification
from app.models.admin_model import Admin, UserActivityLog
from app.db.base_class import Base
from app.core.security import get_password_hash

# Force configure mappers to resolve string references
Base.registry.configure()

def create_super_admin():
    db = SessionLocal()
    try:
        email = "superadmin@ratan.com"
        password = "SuperAdmin@1234"
        full_name = "System Super Admin"
        
        admin = db.query(Admin).filter(Admin.email == email).first()
        if admin:
            print(f"Admin {email} already exists. Updating password.")
            admin.password_hash = get_password_hash(password)
            admin.role = "super_admin"
        else:
            print(f"Creating Super Admin: {email}")
            admin = Admin(
                email=email,
                password_hash=get_password_hash(password),
                full_name=full_name,
                role="super_admin",
                is_active=1
            )
            db.add(admin)
        
        db.commit()
        print("Super Admin created/updated successfully!")
        print(f"Email: {email}")
        print(f"Password: {password}")
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_super_admin()

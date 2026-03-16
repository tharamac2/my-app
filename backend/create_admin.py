from app.db.session import SessionLocal
from app.models.user import User, UserProfile, UserDetail, FamilyDetail, LocationDetail, UserPhoto
from app.models.social import Match, Favorite, Message, Report, Block
from app.models.billing import Subscription, Payment
from app.models.notification import Notification
from app.core.security import get_password_hash
import uuid

def create_first_admin():
    db = SessionLocal()
    admin_email = "admin@ratanmatrimony.com"
    user = db.query(User).filter(User.email == admin_email).first()
    if not user:
        user = User(
            id=str(uuid.uuid4()),
            email=admin_email,
            password_hash=get_password_hash("admin123"),
            full_name="System Admin",
            role="admin",
            is_active=True,
            is_verified=True
        )
        db.add(user)
        db.commit()
        print(f"Admin user created: {admin_email} / admin123")
    else:
        # Update to make sure it is admin
        user.role = "admin"
        user.password_hash = get_password_hash("admin123")
        db.commit()
        print(f"Admin user updated: {admin_email} / admin123")

if __name__ == "__main__":
    create_first_admin()

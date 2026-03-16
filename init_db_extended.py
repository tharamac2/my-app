import sys
import os

# Add the backend directory to the sys.path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from app.db.session import engine
from app.db.base_class import Base
# Import all models to ensure they are registered with Base
from app.models.user import User, UserProfile, UserDetail, FamilyDetail, LocationDetail, UserPhoto
from app.models.billing import Subscription, Payment
from app.models.social import Match, Favorite, Message, Report, Block
from app.models.notification import Notification
from app.models.admin_model import Admin, UserActivityLog

def init_db():
    print("Initializing database with new tables...")
    try:
        Base.metadata.create_all(bind=engine)
        print("Database tables created successfully!")
    except Exception as e:
        print(f"Error creating tables: {e}")

if __name__ == "__main__":
    init_db()

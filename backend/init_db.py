from app.db.session import engine
from app.db.base_class import Base
from app.models.user import User, UserProfile, UserDetail, FamilyDetail, LocationDetail, UserPhoto
from app.models.admin_model import Admin, UserActivityLog

# Create all tables
Base.metadata.create_all(bind=engine)
print("Tables created successfully.")

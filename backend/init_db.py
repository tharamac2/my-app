<<<<<<< HEAD
from app.db.session import engine
from app.db.base_class import Base
from app.models.user import User, UserProfile, UserDetail, FamilyDetail, LocationDetail, UserPhoto
from app.models.admin_model import Admin, UserActivityLog

# Create all tables
Base.metadata.create_all(bind=engine)
print("Tables created successfully.")
=======
import logging
logging.basicConfig(level=logging.DEBUG)
from app.db.base_class import Base
from app.db.session import engine
from app.models import user, admin_model
print('Starting creation')
Base.metadata.create_all(bind=engine)
print('Finished creation')
>>>>>>> 792b4a3eb2f025a37316251387dd7e9d5b5cfdf7

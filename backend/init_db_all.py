from app.db.session import engine
from app.db.base_class import Base
from app.models.user import User, UserProfile, UserDetail, FamilyDetail, LocationDetail, UserPhoto
from app.models.admin_model import Admin, UserActivityLog
from app.models.billing import Subscription, Payment
from app.models.social import Match, Message, Report
import logging
logging.basicConfig(level=logging.INFO)
print('Creating all tables...')
Base.metadata.create_all(bind=engine)
print('Done!')

import logging
logging.basicConfig(level=logging.DEBUG)
from app.db.base_class import Base
from app.db.session import engine
from app.models import user, admin_model
print('Starting creation')
Base.metadata.create_all(bind=engine)
print('Finished creation')

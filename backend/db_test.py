from app.db.session import SessionLocal
from app.models.user import User
db = SessionLocal()
user = db.query(User).filter(User.full_name == 'Sans edits').first()
def to_dict(obj):
    if not obj:
        return None
    return {k: v for k, v in obj.__dict__.items() if not k.startswith('_')}
print('Profile:', to_dict(user.profile))
print('Details:', to_dict(user.details))
print('Family:', to_dict(user.family))
print('Location:', to_dict(user.location))

from app.db.session import SessionLocal
from app.models.user import User
from app.models.billing import Subscription
from app.models.admin_model import Admin
from app.core.security import get_password_hash
db = SessionLocal()
email = 'admin@ratanmatrimony.com'
password = 'AdminPassword123!'
admin_user = db.query(User).filter(User.email == email).first()
if not admin_user:
    admin_user = User(email=email, password_hash=get_password_hash(password), full_name='Super Admin', role='admin', is_verified=True, is_active=True)
    db.add(admin_user)
    db.commit()
    print('Admin created successfully.')
else:
    admin_user.password_hash = get_password_hash(password)
    admin_user.role = 'admin'
    admin_user.is_verified = True
    admin_user.is_active = True
    db.commit()
    print('Admin updated successfully.')

from app.db.session import SessionLocal
from app.api.v1.endpoints.admin import get_stats
from app.models.admin_model import Admin
import json

db = SessionLocal()
# Mock an admin user
mock_admin = db.query(Admin).first()

try:
    stats = get_stats(db=db, admin_user=mock_admin)
    print(json.dumps(stats, indent=2))
except Exception as e:
    import traceback
    traceback.print_exc()
finally:
    db.close()

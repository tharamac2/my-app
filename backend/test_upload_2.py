import sys
import os
import io
import requests

# Add current dir to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.session import SessionLocal
from app.models.user import User
from app.core.security import create_access_token
from datetime import timedelta

db = SessionLocal()
user = db.query(User).first()
if not user:
    print("No user found")
    sys.exit(1)

# The token is generated with `subject=user.id` or `user.email`?
# In Fastapi usually it's user.id or user.email mapped to subject (sub).
# Let's check crud/security.py or just use the token!
token = create_access_token(subject=user.id, expires_delta=timedelta(minutes=60))

url='http://127.0.0.1:8000/api/v1/profile/me/photos'
res2 = requests.post(url, headers={'Authorization': 'Bearer '+token}, files={'file': ('a.jpg', io.BytesIO(b'aaa'), 'image/jpeg')})
print('Upload Status:', res2.status_code, flush=True)
print('Upload Body:', res2.text, flush=True)

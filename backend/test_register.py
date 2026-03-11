from app import create_app
from models import db, User
import sys
import traceback

app = create_app()

try:
    with app.app_context():
        user = User(email="fail_test_123@example.com", full_name="Test Fail")
        user.set_password("Password123!")
        db.session.add(user)
        db.session.commit()
        print("Success! User created with ID:", user.id)
except Exception as e:
    print("Error during insertion:")
    traceback.print_exc()

import requests
import uuid

BASE_URL = "http://127.0.0.1:8000/api/v1"

def test_register():
    email = f"test_{uuid.uuid4().hex[:6]}@example.com"
    payload = {
        "email": email,
        "password": "Password@123",
        "full_name": "Test User",
        "phone": "9876543210"
    }
    
    print(f"Testing registration with email: {email}")
    try:
        response = requests.post(f"{BASE_URL}/auth/register", json=payload, timeout=10)
        print(f"Status Code: {response.status_code}")
        data = response.json()
        if response.status_code == 200:
            print("Successfully registered!")
            if "token" in data and "user" in data:
                print("Token and User object found in response.")
                print(f"Token: {data['token'][:20]}...")
                return True
            else:
                print("FAILED: Token or User object missing in response.")
                print(data)
        else:
            print(f"FAILED: {data.get('detail', 'Unknown error')}")
    except Exception as e:
        print(f"Error: {e}")
    return False

if __name__ == "__main__":
    test_register()

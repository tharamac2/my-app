import requests

url = "http://localhost:8000/api/v1/auth/register"
data = {
    "email": "test88@example.com",
    "password": "Password123!",
    "full_name": "Test User"
}

try:
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response Body: {response.text}")
except Exception as e:
    print(f"Error: {e}")

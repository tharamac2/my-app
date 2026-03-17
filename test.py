import requests; print(requests.post('http://127.0.0.1:8000/api/v1/auth/register', json={'email':'test4@example.com', 'password':'Password123!', 'full_name':'Test User'}, timeout=2).text)

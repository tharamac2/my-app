import requests, json
base_url = 'http://localhost:8000/api/v1'
login_data = {'username': 'admin@ratanmatrimony.com', 'password': 'AdminPassword123!'}
r = requests.post(f'{base_url}/admin/auth/login', data=login_data)
token = r.json().get('access_token')
headers = {'Authorization': f'Bearer {token}'}
r2 = requests.get(f'{base_url}/admin/users/edac922f-f6e4-4fa5-abd5-c53c99cce391', headers=headers)
print(json.dumps(r2.json(), indent=2))

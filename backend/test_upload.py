import requests
import io
import sys

login_url='http://127.0.0.1:8000/api/v1/auth/login'
res=requests.post(login_url, json={'email':'tharamac2@gmail.com', 'password':'password'})
print('Login:', res.status_code, flush=True)

if res.status_code == 200:
    token = res.json().get('access_token')
    url='http://127.0.0.1:8000/api/v1/profile/me/photos'
    res2 = requests.post(url, headers={'Authorization': 'Bearer '+token}, files={'file': ('a.jpg', io.BytesIO(b'aaa'), 'image/jpeg')})
    print('Upload Status:', res2.status_code, flush=True)
    print('Upload Body:', res2.text, flush=True)
else:
    print('Login Response:', res.text, flush=True)

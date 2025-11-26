import requests
import time

# Wait for server to be ready
time.sleep(3)

# Test login
url = "http://127.0.0.1:8000/api/auth/token"
data = {
    "username": "admin",
    "password": "admin",
    "scope": ""
}

try:
    response = requests.post(url, data=data)
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        print("✓ Login successful!")
        print(f"Token: {response.json()['access_token'][:30]}...")
    else:
        print(f"✗ Login failed: {response.text}")
except Exception as e:
    print(f"✗ Error: {e}")

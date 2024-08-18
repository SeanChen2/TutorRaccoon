import requests

# URL of your Flask route
url = 'http://127.0.0.1:8080/api/init_db'

# Sending a POST request to the Flask route
response = requests.post(url)

# Printing the response from the server
print(response.json())

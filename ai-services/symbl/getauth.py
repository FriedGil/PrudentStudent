import requests

app_id = "344956633062516b6165636861707a6e347862496565644d6847774b6a71554f"
app_secret = "5049594d42766d47644e6f312d645f542d5350735a56716b546143594d314d3368682d43427456546d52664f6d4434426f34654a5a49775a464f6277795f4a41"

url = "https://api.symbl.ai/oauth2/token:generate"

headers = {
  "Content-Type": "application/json"
}

request_body = {
  "type": "application",
  "appId": app_id,
  "appSecret": app_secret
}

response = requests.post(url, headers=headers, json=request_body)

print(response.json())


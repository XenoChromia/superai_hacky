import requests

# The URL where your FastAPI app is hosted
API_URL = "http://127.0.0.1:8000/predict"

# Sample input wrapped in <json> tags
sample_input = """
<json>
{
    "gender": "male",
    "age": 25,
    "symptom": ["cough", "fever", "runny nose"]
}
</json>
"""

def get_prediction(input_text):
    payload = {"input_text": input_text}
    try:
        response = requests.post(API_URL, json=payload)
        response.raise_for_status()  # Raise error for bad responses (4xx/5xx)

        data = response.json()
        print("Prediction:", data["result"])
    except requests.exceptions.HTTPError as http_err:
        print("HTTP error:", response.status_code, response.json())
    except Exception as err:
        print("Error:", err)

if name == "main":
    get_prediction(sample_input)
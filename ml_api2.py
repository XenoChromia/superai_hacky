from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
import uvicorn
import re
import json
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from random import randint
from typing import Any

def process_model_output(string_value):
    
    def extract_json(text):
        """Extracts the JSON content from between <json> tags."""
        pattern = r'<json>(.*?)</json>'
        match = re.search(pattern, text, re.DOTALL)
        if match:
            return match.group(1).strip()
        return None

    def validate_and_route(string_value):
        """
        Validates the input JSON and routes a response for special cases 
        like greetings or profanity.
        """
        json_str = extract_json(string_value)
        if not json_str:
            raise ValueError("Input format error: Missing <json> tags.")
            
        extracted_json = json.loads(json_str)

        # --- Safeguard Logic ---

        # 1. Profanity Check
        profanity_list = ['fuck', 'shit', 'bitch', 'cunt', 'asshole', 'damn', 'hell']
        symptoms = extracted_json.get('symptom', [])
        if any(p_word in str(s).lower() for s in symptoms for p_word in profanity_list):
            lecture = "Please refrain from using profane language. To ensure a productive and respectful environment, this conversation cannot proceed if such language is used. Please restate your symptoms professionally."
            return [False, lecture]

        # 2. Greeting/Vague Input Check (handles inputs like "hi")
        is_gender_null = extracted_json.get('gender') in ('null', None)
        is_age_null = extracted_json.get('age') in ('null', None)
        no_symptoms = not symptoms

        if is_gender_null and is_age_null and no_symptoms:
            greeting = "Hello there! To help me understand your condition, please provide your symptoms, age, and gender."
            return [False, greeting]
        
        # --- End of Safeguard Logic ---

        # Original validation checks
        if is_gender_null or is_age_null:
            return [False, "It looks like some information is missing. Age and gender are required to make an assessment."]
        
        registered_symptoms = [
            'cough', 'runny nose', 'fever', 'sore throat', 'headache', 'fatigue',
            'body aches', 'congestion', 'wheezing', 'facial pressure', 'chills',
            'high fever', 'shortness of breath', 'sneezing', 'mild fever',
            'severe cough', 'dry cough', 'ear pressure or pain', 'stuffy nose', 
            'postnasal drip', 'bad breath', 'tiredness', 'vomiting',
            'swollen lymph nodes', 'pressure or pain in teeth', 'severe headache',
            'muscle aches', 'diarrhea', 'bad taste in mouth', 'loss of appetite'
        ]
        
        approved_count = sum(1 for s in symptoms if str(s).lower() in registered_symptoms)
        
        if approved_count < 2:
            return [False, "Based on your input, there are not enough recognizable symptoms for an assessment. Please provide at least two symptoms."]
        
        return [True, None] # Validation passed
    
    # --- Main function logic starts here ---
    try:
        is_valid, message = validate_and_route(string_value)
        if not is_valid:
            # If validation fails, return the specific message from the validator
            return [False, message]
    except (ValueError, json.JSONDecodeError) as e:
        # Catches malformed JSON, missing tags, or other parsing errors
        return [False, f"Invalid input format: {e}. Please describe your symptoms, age, and gender."]

    # --- Machine Learning Prediction Logic ---
    # This part runs only if validation succeeds
    data = pd.read_csv('data_encoded_nonscaled.csv')
    X = data.drop('label', axis=1)
    y = data['label']

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.3, random_state=123, stratify=y
    )

    rf_final = RandomForestClassifier(
        n_estimators=200, max_depth=20, min_samples_split=5,
        max_features='sqrt', random_state=42, n_jobs=-1
    )
    rf_final.fit(X_train, y_train)

    def get_predictions(input_json_str):
        input_data = json.loads(input_json_str)
        
        aligned_data = pd.DataFrame(0, index=[0], columns=rf_final.feature_names_in_)
        
        gender = str(input_data.get('gender', '')).lower()
        aligned_data['gender'] = 1 if gender == 'male' else 0
        
        aligned_data['age'] = int(input_data.get('age', 0))
        
        symptoms = [str(s).lower().strip() for s in input_data.get('symptom', [])]
        model_features_lower = [f.lower() for f in rf_final.feature_names_in_]
        
        for symptom in symptoms:
            try:
                col_idx = model_features_lower.index(symptom)
                aligned_data.iloc[0, col_idx] = 1
            except ValueError:
                # Silently ignore symptoms not in the model's feature list
                pass
        
        return rf_final.predict(aligned_data)[0]
    
    classification = {1: "RSV", 2: "sinus infection", 3: "common cold", 4: "covid 19", 5: "influenza"}

    json_str = extract_json(string_value)
    prediction_code = get_predictions(json_str)
    predicted_illness = classification.get(prediction_code, "an undetermined condition")

    response_list = [
        f'Based on what you shared, I suspect you have {predicted_illness}.',
        f'Oh! It appears you may have {predicted_illness} based on your symptoms.',
        f'Thanks for sharing! By the looks of it, you most likely have {predicted_illness}.'
    ]
    
    return [True, response_list[randint(0, len(response_list) - 1)]]

# --- FastAPI Application ---
app = FastAPI()

@app.post("/predict")
async def predict(input_data: str = Body(..., media_type="text/plain")):
    print("Received input:", input_data)
    
    success, message = process_model_output(input_data)
    
    if not success:
        # If processing fails (due to validation, profanity, etc.),
        # raise an HTTP 400 error with the specific message.
        raise HTTPException(status_code=400, detail=message)
    
    # If successful, return a 200 OK with the result.
    return {"result": message}

def run():
    """This function starts the Uvicorn server to host the FastAPI app."""
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")

if __name__ == "__main__":
    run()
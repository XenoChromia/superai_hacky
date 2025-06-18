from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn


# Import your existing function (assuming it's in a file named model_logic.py)
# from model_logic import process_model_output
import re
import json
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

def process_model_output(string_value):
    
    def extract_json(text):
        pattern = r'<json>(.*?)</json>'
        match = re.search(pattern, text, re.DOTALL)

        if match:
            json_str = match.group(1).strip()
            # print(json_str)
            return json_str
    
    def validate_json(string_value):
        extracted_json = json.loads(extract_json(string_value))

        if extracted_json['gender'] == 'null':
            return [False, "User input has a missing input value!"] 
        elif extracted_json['age'] == 'null':
            return [False, "User input has a missing input value!"]
        # elif len(extracted_json['symptom']) < 2:
        #     return [False, "User input has insufficient matching symptoms in the database!"]
        else:
            registered_symptoms = [i.lower() for i in ['Cough', 'Runny Nose', 'Fever', 'Sore Throat', 'Headache', 'Fatigue',
              'Body Aches', 'Congestion', 'Wheezing', 'Facial pressure', 'Chills',
              'High Fever', 'Shortness of Breath', 'Sneezing', 'Mild Fever',
              'Severe Cough', 'Dry Cough', 'Ear pressure or pain', 'Runny nose',
              'Stuffy nose', 'Postnasal drip', 'Bad breath', 'Tiredness', 'Vomiting',
              'Swollen Lymph Nodes', 'Pressure or pain in teeth', 'Severe Headache',
              'Muscle Aches', 'Diarrhea', 'Bad taste in mouth', 'Loss of Appetite']]
            approved_count=0
            for s in extracted_json['symptom']:
                if s in registered_symptoms:
                    approved_count+=1
            if approved_count < 2:
                return [False, "User input has insufficient matching symptoms in the database!"]
        return [True, None]
    
    check_missing_input_values = validate_json(string_value)
    if not check_missing_input_values[0]:
        return [True, check_missing_input_values[1]]

    """example:
    
    <json>
    {
        "gender": "male",
        "age": 12,
        "symptom": ["cough", "runny nose"]
    }
    </json>"""

    data = pd.read_csv('data_encoded_nonscaled.csv')
    X = data.drop('label', axis=1)
    y = data['label']

    # Try a different random state
    new_random_state = 123  # You can iterate with different values

    # Train-test split (70-30)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.3, random_state=new_random_state, stratify=y
    )

    # Check representation of each label in training data
    # print("Label distribution in training data:")
    # print(y_train.value_counts().sort_index())

    # Initialize and fit final Random Forest
    rf_final = RandomForestClassifier(
        n_estimators=200,
        max_depth=20,
        min_samples_split=5,
        max_features='sqrt',
        random_state=42,
        n_jobs=-1
    )
    rf_final.fit(X_train, y_train)

    # Evaluate accuracy
    train_acc = rf_final.score(X_train, y_train)
    test_acc = rf_final.score(X_test, y_test)

    # print(f"\nTraining Accuracy: {train_acc:.4f}")
    # print(f"Test Accuracy: {test_acc:.4f}")

    # # Detailed performance report
    # print("\nClassification Report:")
    # print(classification_report(y_test, rf_final.predict(X_test)))

    # Feature importance
    importances = pd.DataFrame({
        'Feature': X.columns,
        'Importance': rf_final.feature_importances_
    }).sort_values('Importance', ascending=False)

    # print("\nTop 10 Important Features:")
    # print(importances.head(10))



    def get_predictions(input_data):
        """
        Processes input with string gender and symptoms
        Accepts either:
        - JSON string (with <json> tags or raw JSON)
        - Python dictionary
        - Pandas DataFrame with string columns
        
        Input format should contain:
        {
            "gender": "Male"/"Female" (case insensitive),
            "age": number,
            "symptom": ["symptom1", "symptom2", ...] (string list, case insensitive)
        }
        """
        # Handle JSON string input
        if isinstance(input_data, str):
            # Extract JSON if wrapped in <json> tags
            if input_data.strip().startswith('<json>'):
                input_data = extract_json(input_data)
            try:
                input_data = json.loads(input_data)
            except json.JSONDecodeError as e:
                raise ValueError(f"Invalid JSON input: {e}")
        
        # Handle DataFrame input
        elif isinstance(input_data, pd.DataFrame):
            # Convert first row to dictionary
            input_data = {
                "gender": input_data['gender'].iloc[0],
                "age": input_data['age'].iloc[0],
                "symptom": [s for s in input_data.filter(regex='symptom/').values.flatten() 
                        if pd.notna(s) and str(s).lower() != "none"]
            }
        
        # Ensure we have a dictionary at this point
        if not isinstance(input_data, dict):
            raise ValueError("Input must be JSON string, dictionary, or DataFrame")
        
        # Create base DataFrame with all features initialized to 0
        aligned_data = pd.DataFrame(0, index=[0], columns=rf_final.feature_names_in_)
        
        # Process gender (convert string to numeric)
        gender = str(input_data.get('gender', '')).lower()
        if gender == 'male':
            aligned_data['gender'] = 1
        elif gender == 'female':
            aligned_data['gender'] = 0
        else:
            print(f"Warning: Gender '{gender}' not recognized, defaulting to female")
            aligned_data['gender'] = 0
        
        # Process age
        aligned_data['age'] = int(input_data.get('age', 0))
        
        # Process symptoms - convert to lowercase and strip whitespace
        symptoms = [str(s).lower().strip() for s in input_data.get('symptom', [])]
        
        # Activate symptom flags by matching column names
        model_features_lower = [f.lower() for f in rf_final.feature_names_in_]
        
        for symptom in symptoms:
            try:
                # Find matching column (case insensitive)
                col_idx = model_features_lower.index(symptom.lower())
                aligned_data.iloc[0, col_idx] = 1
            except ValueError:
                print(f"Warning: Symptom '{symptom}' not found in model features")
        
        return rf_final.predict(aligned_data)[0]
    
    def extract_json(text):
        pattern = r'<json>(.*?)</json>'
        match = re.search(pattern, text, re.DOTALL)

        if match:
            json_str = match.group(1).strip()
            # print(json_str)
            return json_str
    
    def get_df(json_value):
        data = json_value

        # Prepare a dictionary to hold flattened data
        flat_data = {
            'gender': data['gender'],
            'age': data['age'],
        }

        # Add up to 4 symptoms, fill missing with None
        for i in range(4):
            flat_data[f'symptom/{i}'] = data['symptom'][i] if i < len(data['symptom']) else "None"

        # Create DataFrame
        df = pd.DataFrame([flat_data])

        return df
    
    classification = {
        1: "RSV",
        2: "sinus infection",
        3: "common cold",
        4: "covid 19",
        5: "influenza"
    }

    # user_input = string_value
    # model_output = prompt(instructions=instructions, user_prompt=user_input)
    model_output = string_value
    # print(model_output)

    from random import randint
    json_value = json.loads(extract_json(model_output))
    convert_json_to_df = get_df(json_value)
    prediction_grade = get_predictions(convert_json_to_df)
    response_list = [f'Based on what you shared, I suspect you have {classification[int(prediction_grade)]}.',
                     f'Oh! It appears you may have {classification[int(prediction_grade)]} based on your symptoms.',
                     f'Thanks for sharing! By the looks of it, you most likely have {classification[int(prediction_grade)]}.',
                     f'As far as I know, I suspect you have {classification[int(prediction_grade)]}.',
                     f'Don\'t worry, based on your symptoms, I believe it is a common case of {classification[int(prediction_grade)]}.']
    
    return [True, response_list[randint(0, 4)]]
    

# app = FastAPI()

# # Define a Pydantic model for the request body
# class InputString(BaseModel):
#     userMessage: str

# @app.post("/predict")
# async def predict(input_data: InputString):
#     # Call your unchanged function with the raw input string
#     success, message = process_model_output(input_data.userMessage)
    
#     if not success:
#         # Return HTTP 400 if validation fails inside your function
#         raise HTTPException(status_code=400, detail=message)
    
#     return {"result": message}

# # To run:
# # uvicorn your_script_name:app --reload
# def run():
#     # This function will start the uvicorn server hosting your FastAPI app
#     uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")

# if __name__ == "__main__":
#     run()
# app = FastAPI()

# # Define a Pydantic model for the request body

# @app.post("/predict")
# async def predict(input_data):
#     print(input_data)
#     # Call your unchanged function with the raw input string
#     success, message = process_model_output(input_data)
    
#     if not success:
#         # Return HTTP 400 if validation fails inside your function
#         raise HTTPException(status_code=400, detail=message)
    
#     return {"result": message}

def run():
    # This function will start the uvicorn server hosting your FastAPI app
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")




from fastapi import FastAPI, HTTPException, Request

# @app.post("/predict")
# async def predict(request: Request):
#     input_data = await request.body()
#     input_data = input_data.decode('utf-8')
    
#     success, message = process_model_output(input_data)
    
#     if not success:
#         raise HTTPException(status_code=400, detail=message)
    
#     return {"result": message}



from fastapi import FastAPI, HTTPException, Body
from typing import Any

# ... (keep your existing imports and process_model_output function)

app = FastAPI()

@app.post("/predict")
async def predict(input_data: str = Body(..., media_type="text/plain")):
    print("Received input:", input_data)
    # Call your unchanged function with the raw input string
    success, message = process_model_output(input_data)
    
    if not success:
        # Return HTTP 400 if validation fails inside your function
        raise HTTPException(status_code=400, detail=message)
    
    return {"result": message}

if __name__ == "__main__":
    run()
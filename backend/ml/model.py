import joblib
import pandas as pd
import numpy as np

# Load model
model = joblib.load("models/disease_prediction_model.pkl")

# Load feature names
train_data = pd.read_csv("dataset/Training.csv")
train_data = train_data.loc[:, ~train_data.columns.str.contains("^Unnamed")]

features = train_data.drop("prognosis", axis=1).columns

def predict_disease(symptoms):

    input_data = {feature: 0 for feature in features}

    invalid_symptoms = []

    for symptom in symptoms:
        if symptom in input_data:
            input_data[symptom] = 1
        else:
            invalid_symptoms.append(symptom)

    if invalid_symptoms:
        return {
            "error": f"Invalid symptom(s): {', '.join(invalid_symptoms)}"
        }

    input_df = pd.DataFrame([input_data])

    probabilities = model.predict_proba(input_df)[0]

    top3_indices = np.argsort(probabilities)[-3:][::-1]
    top3_predictions = []
    for index in top3_indices:
        top3_predictions.append({
            "disease": model.classes_[index],
            "confidence": round(float(probabilities[index] * 100), 2)
    })
        return {
            "prediction": top3_predictions[0]["disease"],
            "confidence": round(float(top3_predictions[0]["confidence"]), 2),
            "top3_predictions": top3_predictions
}

    
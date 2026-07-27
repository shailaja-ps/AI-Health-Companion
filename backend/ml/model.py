import joblib
import pandas as pd

# Load model
model = joblib.load("models/disease_prediction_model.pkl")

# Load feature names
train_data = pd.read_csv("dataset/Training.csv")
train_data = train_data.loc[:, ~train_data.columns.str.contains("^Unnamed")]

features = train_data.drop("prognosis", axis=1).columns


def predict_disease(symptoms):
    input_data = {feature: 0 for feature in features}

    for symptom in symptoms:
        if symptom in input_data:
            input_data[symptom] = 1

    input_df = pd.DataFrame([input_data])

    prediction = model.predict(input_df)

    return prediction[0]
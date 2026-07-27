import joblib
import pandas as pd

# Load the trained model
model = joblib.load("models/disease_prediction_model.pkl")

# Load training dataset to get feature names
train_data = pd.read_csv("dataset/Training.csv")

# Remove unnamed columns if present
train_data = train_data.loc[:, ~train_data.columns.str.contains("^Unnamed")]

# Get feature columns
features = train_data.drop("prognosis", axis=1).columns

# Create an empty symptom vector
input_data = {feature: 0 for feature in features}

# Mark selected symptoms

input_data["high_fever"] = 1
input_data["headache"] = 1
input_data["cough"] = 1

# Convert to DataFrame
input_df = pd.DataFrame([input_data])

# Predict disease
prediction = model.predict(input_df)

print("Predicted Disease:", prediction[0])
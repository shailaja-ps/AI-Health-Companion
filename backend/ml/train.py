import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load the dataset
train_data = pd.read_csv("dataset/Training.csv")
test_data = pd.read_csv("dataset/Testing.csv")
print(train_data.columns.tolist())
print(test_data.columns.tolist())
# Remove unwanted unnamed columns
train_data = train_data.loc[:, ~train_data.columns.str.contains("^Unnamed")]
test_data = test_data.loc[:, ~test_data.columns.str.contains("^Unnamed")]

# Display dataset information
print("Training Dataset Shape:", train_data.shape)
print("Testing Dataset Shape:", test_data.shape)

# Split features and target
X_train = train_data.drop("prognosis", axis=1)
y_train = train_data["prognosis"]

X_test = test_data.drop("prognosis", axis=1)
y_test = test_data["prognosis"]
# Create the model
model = RandomForestClassifier(random_state=42)

# Train the model
model.fit(X_train, y_train)

print("\n✅ Model trained successfully!")
# Predict on test data
y_pred = model.predict(X_test)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)

print(f"\nModel Accuracy: {accuracy * 100:.2f}%")

import joblib

# Save the trained model
joblib.dump(model, "models/disease_prediction_model.pkl")

print("✅ Model saved successfully!")
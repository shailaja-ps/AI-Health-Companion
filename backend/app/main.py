from fastapi import FastAPI
from app.schemas import SymptomRequest
from ml.model import predict_disease

app = FastAPI()

@app.get("/")
def home():
    return {
        "message": "Welcome to AI Health Companion API"
    }

@app.get("/health")
def health():
    return {
        "status": "API is running successfully"
    }

@app.post("/predict")
def predict(request: SymptomRequest):

    print("Received Symptoms:", request.symptoms)

    prediction = predict_disease(request.symptoms)

    print("Prediction:", prediction)

    return {
        "prediction": prediction,
        "symptoms": request.symptoms
    }
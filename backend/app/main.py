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

    result = predict_disease(request.symptoms)

    if "error" in result:
        return result

    return {
        "prediction": result["prediction"],
        "confidence": result["confidence"],
        "top3_predictions": result["top3_predictions"],
        "symptoms": request.symptoms
    }
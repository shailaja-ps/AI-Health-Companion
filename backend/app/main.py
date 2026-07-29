from fastapi import FastAPI
from app.schemas import SymptomRequest
from ml.model import predict_disease
from database.operations import save_prediction, get_prediction_history
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
@app.get("/history")
def history():

    return get_prediction_history()

@app.post("/predict")
def predict(request: SymptomRequest):

    print("Received Symptoms:", request.symptoms)

    result = predict_disease(request.symptoms)

    if "error" in result:
        return result

    response = {
        "prediction": result["prediction"],
        "confidence": result["confidence"],
        "top3_predictions": result["top3_predictions"],
        "symptoms": request.symptoms
    }

    save_prediction(response)

    return response
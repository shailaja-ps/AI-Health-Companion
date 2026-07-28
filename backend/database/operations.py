from database.connection import predictions_collection
from datetime import datetime
from pymongo import DESCENDING

def save_prediction(data):
    # Create a copy so the original response is not modified
    document = data.copy()

    document["timestamp"] = datetime.now()

    result = predictions_collection.insert_one(document)

    return str(result.inserted_id)


def get_prediction_history():
    predictions = list(
        predictions_collection.find({}, {"_id": 0})
        .sort("timestamp", DESCENDING)
    )

    return predictions
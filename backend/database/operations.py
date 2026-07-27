from database.connection import predictions_collection
from datetime import datetime


def save_prediction(data):
    data["timestamp"] = datetime.now()

    result = predictions_collection.insert_one(data)

    return str(result.inserted_id)
from pymongo import DESCENDING

def get_prediction_history():

    predictions = list(
        predictions_collection.find({}, {"_id": 0})
        .sort("timestamp", DESCENDING)
    )

    return predictions
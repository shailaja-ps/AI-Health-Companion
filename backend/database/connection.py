from pymongo import MongoClient

MONGO_URI = "mongodb+srv://aihealthuser:AIHealth12345@cluster0.d4scajy.mongodb.net/?appName=Cluster0"

client = MongoClient(MONGO_URI)

db = client["ai_health_companion"]

predictions_collection = db["predictions"]
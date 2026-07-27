from database.connection import client

print(client.list_database_names())

print("MongoDB Connected Successfully!")
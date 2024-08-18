from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*", "allow_headers": "*"}})

# Connect to MongoDB
client = MongoClient("mongodb+srv://TutorRaccon:JwVfmgTIYKbKAtwI@cluster0.3qnkm.mongodb.net/")
db = client['tutor_raccoon_db']
tutor_collection = db['tutors']

# API Endpoints

# Receive student preferences and suggest tutors
@app.route("/api/suggested_tutors", methods=['POST', 'GET'])
def suggested_tutors():
    if request.method == "POST":
        student_preferences = request.json
        # (Store preferences in a collection if needed)
        return jsonify({"status": "Preferences received"}), 200

    else:
        suggested_tutors = list(tutor_collection.find({}))
        return jsonify({"suggested_tutors": suggested_tutors})

# Retrieve a tutor's profile by their name (username)
@app.route("/api/tutor_profile/<username>", methods=['GET'])
def tutor_profile(username):
    tutor_profile = tutor_collection.find_one({"name": username})
    if tutor_profile:
        return jsonify({"tutor_profile": tutor_profile})
    else:
        return jsonify({"error": "Tutor not found"}), 404

# Search for tutors based on filters
@app.route("/api/search_tutors", methods=['POST', 'GET'])
def search_tutors():
    if request.method == "POST":
        search_filters = request.json
        query = {}
        for key, value in search_filters.items():
            if value is not None:
                query[key] = value
        
        searched_tutors = list(tutor_collection.find(query))
        return jsonify({"searched_tutors": searched_tutors})
    else:
        searched_tutors = list(tutor_collection.find({}))
        return jsonify({"searched_tutors": searched_tutors})

@app.route("/api/init_db", methods=['POST'])
def init_db():
    tutors = [
        {
            "name": "Sean",
            "institution": "University of Waterloo",
            "courses": ["Math", "Computer Science"],
            "style": ["Structured and Organized", "Goal-Oriented and Focused"],
            "sessions": ["In-Person", "Virtual"],
            "availability": ["Morning", "Evening"],
            "zip": "A#A#A#",
            "rates": "$25/hour",
            "bio": "A focused tutor passionate about math and computer science."
        },
        # Add more tutor entries as needed
    ]
    tutor_collection.insert_many(tutors)
    return jsonify({"status": "Database initialized"}), 200


if __name__ == '__main__':
    app.run(debug=True, port=8080)


import requests

response = requests.post('http://127.0.0.1:8080/api/init_db')
print(response.json())
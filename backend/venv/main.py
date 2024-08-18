from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import requests

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*", "allow_headers": "*"}})

# Connect to MongoDB
client = MongoClient("mongodb+srv://TutorRaccon:JwVfmgTIYKbKAtwI@cluster0.3qnkm.mongodb.net/")
db = client['tutor_raccoon_db']
tutor_collection = db['tutors']

# Tutor accounts for testing purposes
tutors = [
    {
        "username": "Endphite",
        "firstName": "Sean",
        "lastName": "Chen",
        "institution": "University of Waterloo",
        "courses": ["Math", "Computer Science"],
        "style": ["Structured and Organized", "Goal-Oriented and Focused"],
        "session": "In-Person",
        "availability": "Evening",
        "zip": "A#A#A#",
        "rates": "$25/hour",
        "bio": "A focused tutor passionate about math and computer science."
    },
]

# API Endpoints

student_preferences = {}
search_filters = {}

# Create these "routes" for the frontend to "POST" (send) information to backend, or "GET" (receive) information from backend
# and the backend returns more JSON to the frontend based on the input


# This route receives JSON about the student's preferences/data, in the following format:
# {
#   "institution": the university being attended (str)
#   "major": the student's major (str)
#   "subjects": the subjects the student needs help with (list of str)
#   "sessions": In-Person, Virtual, and/or Hybrid (list of str)
#   "style": Structured & Organized, Flexible & Adaptive, Casual & Relaxed, and/or Goal-Oriented & Focused (list of str)
#   "availability": Morning, Afternoon, Evening, and/or Night (list of str)
#   "budget": MAX $ the student willing to pay (float)
#   "max_dist": km the student is willing to travel (float)
# }
# Then, this route returns JSON containing a list of suggested tutors based on the received data.
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

# This route receives a tutor's username (username variable) from the URL and returns JSON containing the tutor's info (dict)
# Retrieve a tutor's profile by their name (username)
@app.route("/api/tutor_profile/<username>", methods=['GET'])
def tutor_profile(username):
    tutor_profile = tutor_collection.find_one({"name": username})
    if tutor_profile:
        return jsonify({"tutor_profile": tutor_profile})
    else:
        return jsonify({"error": "Tutor not found"}), 404

# This route receives the filters from the user's search and returns a list of matching tutor profiles (list[dict])
# The filters are in the following JSON format:
# {
#   "name": the tutor's name
#   "institution": the university being attended
#   "subject": the requested subject/course
#   "session": the requested session (In-Person, Virtual, or Hybrid)
#   "style": Structured & Organized, Flexible & Adaptive, Casual & Relaxed, or Goal-Oriented & Focused
#   "min_rate": minimum price charged
#   "max_rate": maximum price charged
# }
# If the user doesn't enter one of these filters, the JSON will store None for that key. In this case, don't take the filter into account.
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
    tutor_collection.insert_many(tutors)
    return jsonify({"status": "Database initialized"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=8080)

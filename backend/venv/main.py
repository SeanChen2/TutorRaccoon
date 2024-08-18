from flask import Flask, jsonify, request, session
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
import requests
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*", "allow_headers": "*"}})

# Connect to MongoDB
client = MongoClient("mongodb+srv://TutorRaccon:JwVfmgTIYKbKAtwI@cluster0.3qnkm.mongodb.net/")
db = client['tutor_raccoon_db']
tutor_collection = db['tutors']

# Retrieve the API key from environment variables
ZIPCODEBASE_API_KEY = os.getenv('ZIPCODEBASE_API_KEY')
ZIPCODEBASE_API_URL = "https://app.zipcodebase.com/api/v1/distance"

# Tutor accounts for testing purposes
tutors = [
    {
        "pfp": "../images/person1.jpg",
        "username": "Endphite",
        "firstName": "Sean",
        "lastName": "Chen",
        "institution": "University of Waterloo",
        "major": "Software Engineering",
        "subjects": ["Math", "Computer Science"],   #first subject is the "subject of expertise"
        "style": "Structured and Organized",
        "session": "In-Person",
        "availability": "Evening",
        "zip": "N6L1J9",
        "rate": "$25/hour",
        "bio": "A focused tutor passionate about math and computer science."
    },
]

# API Endpoints

# This route receives JSON about the student's preferences/data, in the following format:
# {
#   "institution": the university being attended (str)
#   "major": the student's major (str)
#   "subjects": the subjects the student needs help with (list of str)
#   "session": In-Person, Virtual, or Hybrid (str)
#   "style": Structured & Organized, Flexible & Adaptive, Casual & Relaxed, and/or Goal-Oriented & Focused (list of str)
#   "availability": Morning, Afternoon, Evening, and/or Night (list of str)
#   "budget": MAX $ the student willing to pay (float)
#   "max_dist": km the student is willing to travel (float)
# }
# Then, this route returns JSON containing a list of suggested tutors based on the received data.
# Receive student preferences and suggest tutors
@app.route("/api/suggested_tutors", methods=['POST'])
@cross_origin(origins='*')
def suggested_tutors():
    if request.method == "POST":
        student_preferences = request.json

        print(student_preferences)

        suggested_tutors = list(tutor_collection.find({
            "institution": student_preferences["institution"],
            "session": student_preferences["session"],
            "style": student_preferences["style"],
            "availability": student_preferences["availability"]
        }))

        # Store preferences in a collection if needed
        return jsonify({"suggested_tutors": tutors})
        

# This route receives a tutor's username (username variable) from the URL and returns JSON containing the tutor's info (dict)
# Retrieve a tutor's profile by their name (username)
@app.route("/api/tutor_profile/<username>", methods=['GET'])
def tutor_profile(username):
    tutor_profile = tutor_collection.find_one({"username": username})
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

@app.route("/api/distance", methods=['GET'])
def get_distance():
    code = request.args.get('code')
    compare = request.args.get('compare')
    country = request.args.get('country')
    unit = request.args.get('unit', 'km')

    if not code or not compare or not country:
        return jsonify({"error": "Missing required parameters"}), 400

    response = requests.get(
        f"{ZIPCODEBASE_API_URL}?apikey={ZIPCODEBASE_API_KEY}&code={code}&compare={compare}&country={country}&unit={unit}"
    )
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True, port=8080)

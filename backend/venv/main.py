from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*", "allow_headers": "*"}})

# Tutor accounts for testing purposes
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
    {

    },
    {

    }
]

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
@app.route("/api/suggested_tutors", methods=['POST', 'GET'])
def suggested_tutors():

    if request.method == "POST":
        global student_preferences
        student_preferences = request.json  # The JSON described above is stored in here
        return jsonify({"status": "Preferences received"}), 200

    else:

        # Algorithm to select suggested tutors here:
        suggested_tutors = []

        # Do not modify
        return jsonify(
            {
                "suggested_tutors": tutors
            }
        )

# This route receives a tutor's username (username variable) from the URL and returns JSON containing the tutor's info (dict)
@app.route("/api/tutor_profile/<username>", methods=['GET'])
def tutor_profile(username):

    # Algorithm to find the matching tutor profile from the tutors list here:
    tutor_profile = {}
    

    return jsonify(
        {
            "tutor_profile": tutor_profile
        }
    )

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
@app.route("/api/search_tutors", methods=['POST', 'GET'])
def search_tutors():

    if request.method == "POST":
        global search_filters
        search_filters = request.json # The JSON described above is stored in here

    else:

        # Algorithm to select searched tutors here:
        searched_tutors = []


        # Do not modify
        return jsonify(
            {
                "searched_tutors": searched_tutors
            }
        )



if __name__ == '__main__':
    app.run(debug=True, port=8080)
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')

# Create these "routes" for the frontend to "GET" information from the backend or "POST" (give) information to the backend.

# This route returns JSON which can be used by the frontend (to be displayed)
@app.route("/api/suggested_tutors", methods=['GET'])
def suggested_tutors():


    return jsonify(
        {
            "tutors": [
                # List of suggested tutors to return here
                "Sean",
                "Anania",
                "Rishi",
                "Candline"
            ]
        }
    )


if __name__ == '__main__':
    app.run(debug=True, port=8080)
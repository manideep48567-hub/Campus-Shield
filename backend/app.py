from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return jsonify({
        "message": "CampusShield backend is running!"
    })


@app.route("/scan", methods=["POST"])
def scan_url():

    data = request.get_json()

    if not data or "url" not in data:
        return jsonify({
            "error": "URL is required"
        }), 400

    url = data["url"]

    # Basic defensive checks
    warnings = []

    if not url.startswith("https://"):
        warnings.append("URL does not use HTTPS.")

    if len(url) > 100:
        warnings.append("URL is unusually long.")

    suspicious_words = [
        "password",
        "verify",
        "winner",
        "free",
        "login"
    ]

    for word in suspicious_words:
        if word in url.lower():
            warnings.append(
                f"URL contains the word '{word}'."
            )

    if len(warnings) == 0:
        risk = "Low"
    elif len(warnings) <= 2:
        risk = "Medium"
    else:
        risk = "High"

    return jsonify({
        "url": url,
        "risk": risk,
        "warnings": warnings
    })


if __name__ == "__main__":
    app.run(debug=True)

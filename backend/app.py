from flask import Flask, request, jsonify
from flask_cors import CORS
from astrology_matcher import calculate_compatibility

app = Flask(__name__)
CORS(app)  # Allow Expo app to communicate

# Dummy Database Mock (Ideally this would pull from MySQL `users` table)
# We mock it here for fast frontend integration.
USERS_DB = {
    "1": {"name": "Jack Lawson", "gender": "boy", "nakshatra": "Ashwini", "rasi": "Mesha"},
    "2": {"name": "Prisha Mirha", "gender": "girl", "nakshatra": "Rohini", "rasi": "Vrishabha"},
    "3": {"name": "Aishwarya", "gender": "girl", "nakshatra": "Krittika", "rasi": "Mithuna"},
    "4": {"name": "Diya Patel", "gender": "girl", "nakshatra": "Magha", "rasi": "Simha"},
    "p1": {"name": "Kavya", "gender": "girl", "nakshatra": "Revati", "rasi": "Meena"},
    "p2": {"name": "Nisha", "gender": "girl", "nakshatra": "Chitra", "rasi": "Kanya"}
}

PRIMARY_USER_ID = "1"  # Assume Jack is logged in

@app.route('/api/matches/compatibility', methods=['GET'])
def get_compatibility():
    target_id = request.args.get('target_user_id')
    primary_id = request.args.get('primary_user_id', PRIMARY_USER_ID)

    if not target_id or target_id not in USERS_DB:
        return jsonify({"error": "Target User not found"}), 404

    try:
        boy = USERS_DB[primary_id] if USERS_DB[primary_id]["gender"] == "boy" else USERS_DB[target_id]
        girl = USERS_DB[target_id] if USERS_DB[target_id]["gender"] == "girl" else USERS_DB[primary_id]

        result = calculate_compatibility(
            boy_n=boy["nakshatra"], boy_r=boy["rasi"],
            girl_n=girl["nakshatra"], girl_r=girl["rasi"]
        )

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Starting Astrology Matching Engine on port 5000...")
    app.run(host='0.0.0.0', port=5000)

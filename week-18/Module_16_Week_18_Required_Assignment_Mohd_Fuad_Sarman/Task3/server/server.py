from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

# Load the saved model
model = joblib.load("data/california_model.pkl")

# California housing features in correct order
feature_names = [
    'MedInc', 'HouseAge', 'AveRooms', 'AveBedrms',
    'Population', 'AveOccup', 'Latitude', 'Longitude'
]

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()

        # Validate input
        if not all(feature in data for feature in feature_names):
            return jsonify({
                "error": "Missing one or more required features",
                "required_features": feature_names
            }), 400

        # Prepare input array
        features = [data[feature] for feature in feature_names]
        features_array = np.array([features])  # 2D array for sklearn

        # Make prediction
        prediction = model.predict(features_array)[0]
        usd_price = round(prediction * 100000, 2) # convert to actual $

        return jsonify({
            "prediction": float(prediction),  # in units of $100,000
            "prediction_usd": usd_price
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)

import argparse
import mlflow.pyfunc
from flask import Flask, request, jsonify
import numpy as np
from typing import Optional
from flask_cors import CORS

# California housing features in correct order
feature_names = [
    'MedInc', 'HouseAge', 'AveRooms', 'AveBedrms',
    'Population', 'AveOccup', 'Latitude', 'Longitude'
]

DEFAULT_MODEL_PATH = "./data/mlflow_california_model"

def load_model(use_mlflow: bool, run_id: Optional[str] = None, local_path: Optional[str] = None):
    if use_mlflow:
        if not run_id:
            raise ValueError("run_id must be specified when use_mlflow=True")
        mlflow.set_tracking_uri("file:data/mlruns")
        model_uri = f"runs:/{run_id}/model"
        print(f"Loading model from MLflow run: {model_uri}")
        return mlflow.pyfunc.load_model(model_uri)
    else:
        if not local_path:
            raise ValueError("local_path must be specified when use_mlflow=False")
        print(f"Loading model from local path: {local_path}")
        return mlflow.pyfunc.load_model(local_path)

parser = argparse.ArgumentParser()
parser.add_argument("--use-mlflow", action="store_true", help="Load model from MLflow run")
parser.add_argument("--run-id", type=str, default=None, help="MLflow run ID if --use-mlflow is set")
parser.add_argument("--local-path", type=str, default=DEFAULT_MODEL_PATH, help="Local model path if --use-mlflow is not set")

args = parser.parse_args()

model = load_model(args.use_mlflow, run_id=args.run_id, local_path=args.local_path)

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        if not all(feature in data for feature in feature_names):
            return jsonify({
                "error": "Missing one or more required features",
                "required_features": feature_names
            }), 400

        features = [data[feature] for feature in feature_names]
        features_array = np.array([features])

        prediction = model.predict(features_array)[0]
        usd_price = round(prediction * 100000, 2)

        return jsonify({
            "prediction": float(prediction),
            "prediction_usd": usd_price
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001)

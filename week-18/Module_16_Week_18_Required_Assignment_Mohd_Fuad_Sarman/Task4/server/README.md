# California Housing Price Prediction App Usage

This app trains a RandomForestRegressor model on the California Housing dataset and serves predictions via a Flask API or MLflow's built-in model serving. Below are the command-line options for running the training and serving scripts.

## Prerequisites
- Python 3.8+
- Install dependencies: `pip3 install scikit-learn mlflow flask flask-cors numpy`

## Train and Save/Log Model
Run `mlflow_california_housing.py` inside `data` directory to train and save/log the model.

### Command
```bash
python3 mlflow_california_housing.py [--use-mlflow]
```

### Options
- `--use-mlflow`: If specified, logs the model to MLflow. Without it, saves the model locally to `mlflow_california_model/`.

### Examples
- Save locally:
  ```bash
  python3 mlflow_california_housing.py
  ```
  Output: Model saved to `mlflow_california_model/`, MSE printed.

- Log to MLflow:
  ```bash
  python3 mlflow_california_housing.py --use-mlflow
  ```
  Output: Model logged to MLflow, run ID printed.

## Serve Predictions with Flask
Run `server.py` to serve predictions via Flask on port 5001.

### Command
```bash
python3 server.py [--use-mlflow] [--run-id RUN_ID] [--local-path PATH]
```

### Options
- `--use-mlflow`: If specified, loads the model from MLflow using `--run-id`.
- `--run-id`: MLflow run ID of the logged model (required if `--use-mlflow` is set).
- `--local-path`: Path to the locally saved model (defaults to `./data/mlflow_california_model`).

### Examples
- Local model (use this when the model is saved without any argument):
  ```bash
  python server.py
  ```

- MLflow model (use this when the model is saved with --use-mlflow):
  ```bash
  python server.py --use-mlflow --run-id <RUN_ID>
  ```
  Replace `<RUN_ID>` with the run ID from training.

### Predict
Send a POST request to `http://localhost:5001/predict`:
```bash
curl -X POST http://localhost:5001/predict -H "Content-Type: application/json" -d '{
  "MedInc": 8.3252, "HouseAge": 41.0, "AveRooms": 6.9841, "AveBedrms": 1.0238,
  "Population": 322.0, "AveOccup": 2.5556, "Latitude": 37.88, "Longitude": -122.23
}'
```

Response:
```json
{
  "prediction": 4.526,
  "prediction_usd": 452600.00
}
```

## Serve Predictions with MLflow
Serve the model using MLflow on port 5002.

### Command
```bash
python3 -m mlflow models serve -m ./mlflow_california_model [--port PORT]
```

### Options
- `-m mlflow_california_model: Specifies the MLflow model path.
- `--port`: Port for the server.

### Example
```bash
python3 -m mlflow models serve -m ./mlflow_california_model --port 5001
```

### Predict
Send a POST request to `http://localhost:5001/invocations`:
```bash
curl -X POST http://localhost:5001/invocations -H "Content-Type: application/json" -d '{
    inputs": [[8.3252, 41.0, 6.9841, 1.0238, 322.0, 2.5556, 37.88, -122.23]]
}'
```

Response:
```json
{
  "predictions": [4.526]
}
```
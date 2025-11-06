import argparse
from sklearn.datasets import fetch_california_housing
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import mlflow
from mlflow import sklearn as mlflow_sklearn
from mlflow.models.signature import infer_signature

def train_and_save(log_mlflow: bool):
    # Load dataset
    X, y = fetch_california_housing(return_X_y=True)

    # Split dataset
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train model
    model = RandomForestRegressor(random_state=42)
    model.fit(X_train, y_train)

    # Evaluate model
    preds = model.predict(X_test)
    mse = mean_squared_error(y_test, preds)
    print(f"Mean Squared Error: {mse:.4f}")

    # Infer signature
    signature = infer_signature(X_train, model.predict(X_train))
    print("Inferred signature:", signature)

    if log_mlflow:
        with mlflow.start_run() as run:
            mlflow.log_metric("mse", mse)
            mlflow_sklearn.log_model(
                model,
                artifact_path="model",
                signature=signature,
                input_example=X_train[:2]
            )
            print(f"\nModel logged to MLflow under run ID: {run.info.run_id}\n")
    else:
        mlflow_sklearn.save_model(
            sk_model=model,
            path="mlflow_california_model",
            signature=signature,
            input_example=X_train[:2]
        )
        print("Model saved locally to 'mlflow_california_model/'")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train and save/log model.")
    parser.add_argument(
        "--use-mlflow",
        action="store_true",
        help="If set, log the model to MLflow instead of saving locally."
    )
    args = parser.parse_args()

    train_and_save(args.use_mlflow)

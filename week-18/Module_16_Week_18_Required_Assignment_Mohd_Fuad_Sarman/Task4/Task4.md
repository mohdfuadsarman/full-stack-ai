# 4. Using MLflow to Serve a Machine Learning Model

---

## a) Briefly describe what MLflow is and how it differs from custom Flask APIs

MLflow is an open-source platform for managing the machine learning lifecycle, including experimentation, reproducibility, deployment, and model registry. It provides tools for tracking experiments (e.g., logging parameters, metrics), managing models (e.g., versioning, staging), and serving models as APIs. Key components include MLflow Tracking, Projects, Models, and Registry.

**Differences from Custom Flask APIs**:
- **Purpose**: MLflow is a specialized ML lifecycle management tool with built-in features for model tracking, packaging, and deployment, while Flask is a general-purpose web framework for building custom APIs, requiring manual implementation of ML-specific features.
- **Model Serving**: MLflow Models provides standardized model serving (e.g., via `mlflow models serve`) with automatic REST API generation, supporting multiple frameworks (e.g., scikit-learn, TensorFlow). Flask requires manually coding routes, serialization, and model loading.
- **Tracking and Reproducibility**: MLflow tracks experiments (parameters, metrics, artifacts) and ensures reproducible runs, which Flask lacks natively.
- **Ease of Use**: MLflow simplifies model deployment with minimal configuration, while Flask requires more setup for authentication, scaling, and input validation.
- **Flexibility**: Flask offers greater customization for complex APIs, whereas MLflow focuses on standardized ML workflows.

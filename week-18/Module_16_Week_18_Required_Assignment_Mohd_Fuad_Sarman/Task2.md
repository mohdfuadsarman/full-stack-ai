# 2. Model Serving with RESTful APIs

---

## a) Explain the role of Flask + Connexion in serving models via REST APIs

**Flask** is a lightweight Python web framework used to build web applications and REST APIs. It enables serving machine learning (ML) models by handling HTTP requests, routing, and responses. Developers can define endpoints (e.g., `/predict`) to accept input data, pass it to an ML model, and return predictions in JSON format.

**Connexion** extends Flask by integrating OpenAPI (Swagger) specifications. It maps API endpoints defined in an OpenAPI YAML/JSON file to Flask routes, automating request validation, serialization, and documentation. Key roles include:

- **Flask**:
  - Loads ML models (e.g., using `pickle`, `joblib`, or frameworks like TensorFlow/PyTorch).
  - Defines endpoints to process input data and return predictions.
  - Example: A `/predict` endpoint that accepts JSON input, runs inference, and returns results.

- **Connexion**:
  - Uses an OpenAPI spec to define API structure (endpoints, schemas, HTTP methods).
  - Validates requests against the schema (e.g., data types, required fields).
  - Generates interactive Swagger UI for testing and documentation.
  - Maps OpenAPI paths to Python functions, reducing boilerplate code.

**Workflow**:
1. Define an OpenAPI spec (`openapi.yaml`) with endpoints like `/predict`.
2. Load the ML model in a Flask app.
3. Use Connexion to link the OpenAPI spec to Flask routes.
4. Run the Flask server to handle HTTP requests.

---

## b) Discuss the advantages of using an OpenAPI specification in this context

Using an OpenAPI specification with Flask + Connexion offers:

1. **Standardized API Definition**:
   - A machine-readable YAML/JSON contract defines endpoints, request/response formats, and parameters for consistency.

2. **Automatic Request Validation**:
   - Connexion ensures incoming requests match the schema, reducing manual validation and errors.

3. **Interactive Documentation**:
   - Auto-generates Swagger UI for testing and exploring endpoints.

4. **Improved Collaboration**:
   - Acts as a single source of truth for data scientists, developers, and DevOps teams.

5. **Scalability and Maintainability**:
   - Separates API design from implementation, simplifying updates and versioning (e.g., `/v1/predict`).

6. **Client Generation**:
   - Tools like Swagger Codegen create client libraries in multiple languages from the spec.

7. **Consistent Error Handling**:
   - Enforces standardized error responses (e.g., 400 for invalid inputs).

---

## c) Compare REST API model serving with MLflow-based serving

### REST API Model Serving (Flask + Connexion)
- **Overview**: Custom REST APIs built with Flask and Connexion, using OpenAPI specs.
- **Advantages**:
  - **Flexibility**: Full control over endpoints, preprocessing, and logic.
  - **Lightweight**: Flask is minimal, ideal for tailored deployments.
  - **OpenAPI Integration**: Connexion provides validation and documentation.
  - **Customizability**: Integrates with Flask extensions (e.g., authentication).
- **Disadvantages**:
  - **Manual Setup**: Requires configuring endpoints and server manually.
  - **Scalability**: Flask is not asynchronous, needing tools like Gunicorn for high concurrency.
  - **Maintenance**: Manual management of deployment and monitoring.
- **Use Case**: Custom APIs requiring specific endpoint behavior.

### MLflow-Based Serving
- **Overview**: MLflow manages the ML lifecycle and serves models as REST APIs via CLI or cloud.
- **Advantages**:
  - **Simplified Deployment**: Serve models with commands like `mlflow models serve`.
  - **Model Management**: Tracks versions, artifacts, and metadata.
  - **Framework Agnostic**: Supports scikit-learn, TensorFlow, PyTorch, etc.
  - **Scalability**: Supports cloud deployments (e.g., AWS SageMaker) and Docker.
  - **Monitoring**: Integrates with MLflow’s tracking server.
- **Disadvantages**:
  - **Less Flexibility**: Limited endpoint customization.
  - **Dependency Overhead**: Requires MLflow setup.
  - **Learning Curve**: Requires familiarity with MLflow’s ecosystem.
- **Use Case**: Rapid deployment in ML pipelines with versioning.

### Key Differences
- **Setup**: Flask + Connexion requires manual API design while MLflow automates serving.
- **Ecosystem**: MLflow integrates with model tracking while Flask integrates with web tools.
- **Scalability**: MLflow supports cloud while Flask needs additional tools.
- **Use Case Fit**: Flask for bespoke APIs while MLflow for standardized deployment.

---

## d) Include example tools for model deployment (e.g., Flask, FastAPI, MLflow)

1. **Flask**:
   - Lightweight framework for custom REST APIs.
   - Use Case: Tailored endpoints for ML model serving.
   - Example: `/predict` endpoint for JSON-based predictions.

2. **FastAPI**:
   - Asynchronous Python framework for high-performance APIs.
   - Advantages: Auto OpenAPI docs, async support, Pydantic validation.
   - Use Case: High-traffic ML model serving.
   - Example: Async `/predict` endpoint with schema validation.

3. **MLflow**:
   - Manages ML lifecycle with built-in serving tools.
   - Advantages: Easy deployment, framework-agnostic, cloud support.
   - Use Case: Rapid deployment with model versioning.
   - Example: `mlflow models serve -m models:/my_model/1`.

4. **TensorFlow Serving**:
   - Optimized for TensorFlow models with REST/gRPC support.
   - Advantages: High throughput, model versioning.
   - Use Case: Deep learning model deployment.
   - Example: Serve TensorFlow model via REST endpoints.

5. **Seldon Core**:
   - Kubernetes-based platform for ML model deployment.
   - Advantages: Supports complex pipelines, multi-framework.
   - Use Case: Enterprise-grade deployment with orchestration.
   - Example: Deploy model as a Kubernetes pod.

6. **BentoML**:
   - Framework for packaging and serving ML models.
   - Advantages: Simplifies packaging, supports monitoring.
   - Use Case: Streamlined deployment for data scientists.
   - Example: Package and serve model with Docker.

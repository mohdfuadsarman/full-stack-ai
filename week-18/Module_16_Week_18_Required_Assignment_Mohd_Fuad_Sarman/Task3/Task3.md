

# 3. Consuming ML APIs in Full Stack Applications

---

## a) Describe how you would consume the /predict endpoint, considering API request structure

The `/predict` endpoint is typically consumed using an HTTP POST request with a JSON payload containing the model input features. The request should include headers such as `Content-Type: application/json` and, if required, an `Authorization` token.

**Example request body:**

```json
{ "features": [5.1, 3.5, 1.4, 0.2] }
```

**Example response:**

```json
{ "prediction": "setosa", "confidence": 0.92 }
```

The client workflow is to format the input correctly, send the request, and parse the returned prediction. This well-defined structure ensures smooth interaction between client and model service.

### Example – Python (`requests`)

```python
import requests

url = "https://api.example.com/predict"
payload = {"features": [5.1, 3.5, 1.4, 0.2]}
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)
print(response.json())   # -> {"prediction": "setosa", "confidence": 0.92}
```

### Example – JavaScript (`fetch`)

```javascript
fetch("https://api.example.com/predict", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ features: [5.1, 3.5, 1.4, 0.2] })
})
.then(res => res.json())
.then(data => console.log(data))  // { prediction: "setosa", confidence: 0.92 }
```

---

## b) Describe how you would consume the /predict endpoint, considering handling asynchronous responses

For models that require longer processing, the API may use an asynchronous pattern instead of returning the result immediately. A common approach is to return a job identifier and processing status:

```json
{ "job_id": "12345", "status": "processing" }
```

The client can then poll a status endpoint (e.g., `/predict/status/12345`) until the prediction is complete, and finally retrieve the result from a `/result` endpoint. Another approach is to use a callback mechanism, where the client provides a `callback_url`, and the server posts the prediction back once it is ready. Both methods allow the client to remain responsive and avoid blocking while waiting for computation.

### Example – Python (Polling)

```python
import time, requests

# Submit async job
job = requests.post("https://api.example.com/predict", json={"features": [5.1, 3.5, 1.4, 0.2]}).json()
job_id = job["job_id"]

# Poll until completed
while True:
    status = requests.get(f"https://api.example.com/predict/status/{job_id}").json()
    if status["status"] == "completed":
        result = requests.get(f"https://api.example.com/predict/result/{job_id}").json()
        print(result)
        break
    time.sleep(2)
```

### Example – JavaScript (Polling)

```javascript
async function getPrediction(features) {
  const job = await fetch("https://api.example.com/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ features })
  }).then(r => r.json());

  let status;
  do {
    await new Promise(res => setTimeout(res, 2000)); // wait 2s
    status = await fetch(`https://api.example.com/predict/status/${job.job_id}`)
                  .then(r => r.json());
  } while (status.status !== "completed");

  const result = await fetch(`https://api.example.com/predict/result/${job.job_id}`)
                        .then(r => r.json());
  console.log(result);
}
```

---

## c) Describe how you would consume the /predict endpoint, considering CORS and security implications

When consuming the API from a browser, CORS (Cross-Origin Resource Sharing) must be enabled so that requests from the frontend’s domain are accepted. For example, the server should include headers like:

```
Access-Control-Allow-Origin: https://myfrontend.com
Access-Control-Allow-Methods: POST
Access-Control-Allow-Headers: Content-Type, Authorization
```

From a security perspective, the API should always run over HTTPS to prevent interception of sensitive inputs, require authentication (e.g., API keys or JWTs), and avoid exposing credentials in client-side code. Additional measures include rate limiting to mitigate abuse, validating all incoming JSON to prevent malformed requests, and restricting access to authorized users only.

### Example – Enabling CORS in Flask (Python)

```python
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://myfrontend.com"])  # restrict allowed origins
```

### Example – Secure Request with Token (JavaScript)

```javascript
fetch("https://api.example.com/predict", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer <your_token_here>"
  },
  body: JSON.stringify({ features: [5.1, 3.5, 1.4, 0.2] })
})
.then(res => res.json())
.then(data => console.log(data));
```

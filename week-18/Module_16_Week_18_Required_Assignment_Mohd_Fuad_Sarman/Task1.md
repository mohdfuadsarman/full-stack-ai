# 1. Model Persistence Techniques

---

## a) Identify and describe three different model persistence techniques used in machine learning

1. **Pickle (`.pkl`)**
   - Python’s built-in serialization format.
   - Saves model objects as binary.
   - Works with most Python ML libraries (e.g., scikit-learn, XGBoost).

2. **Joblib (`.joblib`)**
   - Similar to Pickle but optimized for large NumPy arrays.
   - Faster and more memory-efficient for large scikit-learn models.

3. **HDF5 (`.h5`)**
   - Hierarchical Data Format for large structured data.
   - Common in Keras/TensorFlow for saving both weights and architecture.

4. **TensorFlow SavedModel (directory)**
   - TensorFlow’s native export format.
   - Stores weights, computation graph, and metadata for serving.

5. **PyTorch (`.pt` / `.pth`)**
   - PyTorch-native format using `torch.save()`.
   - Can save full models or just state dictionaries.

---

## b) Explain their use cases, supported model types and common pitfalls or compatibility issues when used across environments

| **Format**      | **Use Cases**                                 | **Supported Models**            | **Common Pitfalls / Compatibility Issues**                              |
| --------------- | --------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| **Pickle**      | Quick saving in Python projects               | Any Python object               | Unsafe for untrusted files; Python version mismatch; not cross-language |
| **Joblib**      | Large NumPy-heavy models                      | Scikit-learn, XGBoost, LightGBM | Python-only; not for small models                                       |
| **HDF5**        | Keras/TensorFlow models with weights & config | Neural networks, tensors        | Requires `h5py`; version incompatibilities                              |
| **SavedModel**  | TF Serving, TF Lite, TF.js                    | TensorFlow/Keras                | Large size; TF-specific                                                 |
| **PyTorch .pt** | PyTorch-only workflows                        | PyTorch NNs, Torch objects      | Version dependent; architecture needed for `state_dict`; PyTorch-only   |

---

## c) Compare these techniques in terms of serialisation speed, Cross-platform compatibility and Human readability

| **Format**      | **Serialization Speed** | **Cross-Platform Compatibility** | **Human Readability**     |
| --------------- | ----------------------- | -------------------------------- | ------------------------- |
| **Pickle**      | Medium                  | Low                              | Low                       |
| **Joblib**      | Fast                    | Low                              | Low                       |
| **HDF5**        | Medium                  | Medium                           | Low–Medium (with viewers) |
| **SavedModel**  | Medium                  | Medium–High (TF supported)       | Low                       |
| **PyTorch .pt** | Medium                  | Low                              | Low                       |

---

## d) Present your findings in a comparison table and describe when to use each

| **Format**      | **Best For**                                 | **Avoid If**                         |
| --------------- | -------------------------------------------- | ------------------------------------ |
| **Pickle**      | Python-only prototyping                      | Need cross-platform portability      |
| **Joblib**      | Large NumPy-based scikit-learn models        | Small models or multi-language needs |
| **HDF5**        | Keras/TensorFlow with weights + architecture | Non-NN portability needs             |
| **SavedModel**  | TF Serving, mobile/edge deployment           | Non-TF workflows                     |
| **PyTorch .pt** | PyTorch training/inference                   | Non-PyTorch deployment               |

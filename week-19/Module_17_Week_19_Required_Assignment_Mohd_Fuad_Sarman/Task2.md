# 2. Sparsity and Matrix Factorisation

### a) Discuss matrix sparsity in collaborative filtering

1. Definition of Matrix Sparsity
   - In collaborative filtering, user-item interactions are represented as a user-item rating matrix, where rows represent users and columns represent items.
   - Matrix sparsity occurs when most entries in this matrix are empty or unknown because users typically rate or interact with only a small subset of all available items.

2. Why Sparsity Occurs
   - Large platforms (e.g., Netflix, Amazon) have millions of users and thousands of items, but each user engages with only a few items.
   - As a result, the matrix contains very few known ratings compared to its total possible entries.

3. Challenges Caused by Sparsity
   - **Difficulty in similarity computation:** Hard to find overlapping ratings between users or items, reducing the accuracy of similarity-based methods.
   - **Cold start issues:** New users and new items have little or no interaction history.
   - **Reduced recommendation quality:** Sparse data limits the system’s ability to make reliable predictions.
   - **Computational inefficiency:** Large sparse matrices require more storage and processing if not handled properly.

---

### b) Explain how matrix factorisation helps address the sparsity issue

Matrix factorisation transforms a sparse, high-dimensional problem into a lower-dimensional representation, allowing the system to infer missing ratings and improve recommendation accuracy.

1. Concept of Matrix Factorisation
   - Matrix factorisation decomposes the large user-item rating matrix **R** (of size *m × n*) into the product of two smaller matrices:
     - **User matrix (U)**: Represents latent features of users.
     - **Item matrix (V)**: Represents latent features of items.
   - Prediction is made by multiplying these two matrices (**R ≈ U × Vᵀ**).

2. How It Addresses Sparsity
   - **Latent feature representation:** Instead of relying on direct user-item ratings, it models users and items in a lower-dimensional latent space. Missing values can be approximated by these latent factors.
   - **Better generalisation:** Even if two users have no direct rating overlap, the model can predict preferences based on shared latent factors.
   - **Efficient storage and computation:** Reduces the dimensionality of the data, making it easier to handle large, sparse datasets.
   - **Handles implicit patterns:** Captures hidden associations between users and items, which are not visible in sparse explicit ratings.

3. Examples of Techniques
   - Singular Value Decomposition (SVD)
   - Alternating Least Squares (ALS)
   - Probabilistic Matrix Factorisation (PMF)

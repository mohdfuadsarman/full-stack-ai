# 1. Collaborative Filtering: User-Based vs. Item-Based

### a) Compare and contrast user-based collaborative filtering with item-based collaborative filtering

1. Concept
   - **User-based collaborative filtering (UBCF):** Focuses on finding similarities between users. It predicts a user’s rating for an item based on ratings given by other users with similar preferences.
   - **Item-based collaborative filtering (IBCF):** Focuses on finding similarities between items. It predicts a user’s rating for an item by examining the user’s ratings for similar items.

2. Similarity Measurement
   - **UBCF:** Computes similarity between users (rows in the user-item matrix) using metrics like cosine similarity or Pearson correlation.
   - **IBCF:** Computes similarity between items (columns in the user-item matrix) using similar metrics.

3. Data Requirements
   - **UBCF:** Needs sufficient user overlap in ratings. Performance decreases if users have rated only a few items (sparse matrix).
   - **IBCF:** Performs better when items receive many ratings, as similarity between items can be computed more reliably.

4. Scalability and Computation
   - **UBCF:** Requires recomputing similarities whenever new users join or existing users change ratings, making it computationally expensive as the user base grows.
   - **IBCF:** Item similarities are relatively stable and can be precomputed and cached, reducing computation when new users arrive.

5. Cold Start Problem
   - **UBCF:** Struggles when there are many new users who have rated few items.
   - **IBCF:** Struggles when new items have no ratings, but handles new users better since item similarities are already established.

---

### b) Discuss which approaches are more efficient in a large-scale system like Netflix

In large-scale systems such as Netflix, item-based collaborative filtering is generally more efficient due to the following reasons:

1. **Stability of Items:** The number of movies or shows grows much slower compared to the user base. Precomputing item-to-item similarities is feasible and reusable.
2. **Computation and Storage:** Item similarity matrices are smaller and less frequently updated, leading to lower computational cost and faster predictions.
3. **Online Performance:** When a new user arrives, recommendations can be generated quickly by matching their few ratings against a precomputed item similarity model.
4. **Scalability:** Netflix has millions of users; recalculating user-to-user similarities in real-time would be impractical. Item-based methods scale better to this scenario.

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import joblib

# Load CSV
df = pd.read_csv("data/intent_dataset.csv")  # ← Make sure this is the final, merged file

# Use text and intent only
df['text'] = df['text'].astype(str)
df['intent'] = df['intent'].astype(str)

# Vectorize
vectorizer = TfidfVectorizer(max_features=2000)
X_vec = vectorizer.fit_transform(df['text'])

# Train model
model = LogisticRegression(max_iter=200)
model.fit(X_vec, df['intent'])

# Save model
joblib.dump(model, "model/intent_model.pkl")
joblib.dump(vectorizer, "model/vectorizer.pkl")

print("✅ Model trained and saved.")

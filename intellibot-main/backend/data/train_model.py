import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
import joblib

# 🔧 Create model folder if it doesn't exist
os.makedirs("model", exist_ok=True)

# Load dataset
df = pd.read_csv("data/intent_dataset.csv")

# Vectorize text
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df["text"])
y = df["intent"]

# Train model
model = LinearSVC()
model.fit(X, y)

# Save model and vectorizer
joblib.dump(model, "model/intent_classifier.pkl")
joblib.dump(vectorizer, "model/vectorizer.pkl")

print("✅ Model trained and saved successfully.")

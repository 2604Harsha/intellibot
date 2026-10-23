import os
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Sample training data
training_data = {
    "greeting": [
        "hello", "hi", "hey", "good morning", "good evening"
    ],
    "code_explain": [
        "can you explain this code", "what does this code do", "explain the python function", "understand this code"
    ],
    "pdf_qa": [
        "answer from pdf", "can you read this pdf", "summarize pdf content", "question from document"
    ],
    "general": [
        "what's the weather", "who are you", "tell me something", "what is AI"
    ]
}

# Prepare training data
X = []
y = []

for intent, examples in training_data.items():
    for example in examples:
        X.append(example)
        y.append(intent)

# Vectorize text
vectorizer = TfidfVectorizer()
X_vec = vectorizer.fit_transform(X)

# Train classifier
model = LogisticRegression()
model.fit(X_vec, y)

# Ensure model directory exists
os.makedirs("model", exist_ok=True)

# Save model and vectorizer as a tuple in one file
joblib.dump((model, vectorizer), "model/intent_classifier.pkl")

print("✅ Model and vectorizer saved to model/intent_classifier.pkl")

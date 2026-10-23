import joblib
import os

# Load model and vectorizer
model_dir = os.path.join(os.path.dirname(__file__), '..', 'model')
model = joblib.load(os.path.join(model_dir, "intent_model.pkl"))
vectorizer = joblib.load(os.path.join(model_dir, "vectorizer.pkl"))

def predict_intent(user_input):
    X = vectorizer.transform([user_input])
    return model.predict(X)[0]

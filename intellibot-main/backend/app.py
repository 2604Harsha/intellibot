from flask import Flask, request, jsonify
from flask_cors import CORS
import cohere
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Cohere Client (Ensuring we use the correct env variable from your .env)
api_key = os.getenv("COHERE_API_KEY", "").strip()
if not api_key:
    raise ValueError("COHERE_API_KEY is missing from .env file")

co = cohere.Client(api_key)

app = Flask(__name__)
CORS(app) # Enable Cross-Origin Resource Sharing for the Next.js frontend

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message")
    chat_history = data.get("chat_history", [])
    print("User asked:", user_message)

    # Convert chat history for Cohere
    formatted_history = []
    for msg in chat_history:
        formatted_history.append({
            "role": "USER" if msg["role"] == "user" else "CHATBOT",
            "message": msg["content"]
        })

    try:
        response = co.chat(
            model='command-r-plus-08-2024',
            message=user_message,
            chat_history=formatted_history,
            temperature=0.7
        )

        bot_reply = response.text.strip()
        print("Bot replied:", bot_reply)
        return jsonify({"response": bot_reply})

    except Exception as e:
        print("Error from Cohere:", e)
        return jsonify({"response": f"⚠️ Error: {str(e)}"})

if __name__ == "__main__":
    # Running on 5001 to avoid conflicts
    app.run(port=5001, debug=True)

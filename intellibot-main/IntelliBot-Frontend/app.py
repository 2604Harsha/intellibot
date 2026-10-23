from flask import Flask, render_template, request, jsonify
import cohere
import os
from dotenv import load_dotenv

load_dotenv()
co = cohere.Client(os.getenv("COHERE_API_KEY"))

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message")
    print("User asked:", user_message)

    try:
        response = co.chat(
            model='command-r',  # You can also use 'command-r+', 'command-r+_v2'
            message=user_message,
            temperature=0.7
        )

        bot_reply = response.text.strip()
        print("Bot replied:", bot_reply)
        return jsonify({"response": bot_reply})

    except Exception as e:
        print("Error from Cohere:", e)
        return jsonify({"response": f"⚠️ Error: {str(e)}"})

if __name__ == "__main__":
    app.run(debug=True)

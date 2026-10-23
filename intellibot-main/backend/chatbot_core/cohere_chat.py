import cohere
import os
from dotenv import load_dotenv

load_dotenv()
COHERE_API_KEY = os.getenv("COHERE_API_KEY")

if COHERE_API_KEY:
    co = cohere.Client(COHERE_API_KEY)
else:
    co = None

def cohere_chat(prompt):
    if not co:
        return "⚠️ Cohere API key not set in .env"
    try:
        response = co.chat(message=prompt)
        return response.text
    except Exception as e:
        return f"⚠️ Cohere Error: {str(e)}"

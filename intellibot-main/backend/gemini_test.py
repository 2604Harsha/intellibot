import google.generativeai as genai

import os
from dotenv import load_dotenv

load_dotenv()

# Load Gemini API key from .env
api_key = os.getenv("GEMINI_API_KEY")

# Configure Gemini
if api_key:
    genai.configure(api_key=api_key)
else:
    print("❌ GEMINI_API_KEY not found in .env file.")
    exit(1)

# Test call
try:
    model = genai.GenerativeModel("models/gemini-pro")
    response = model.generate_content("Tell me a fun fact about technology.")
    print("✅ Success:\n", response.text)
except Exception as e:
    print("❌ Gemini Error:", e)

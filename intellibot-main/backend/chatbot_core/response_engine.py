import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from chatbot_core.intent_classifier import predict_intent




def get_bot_response(user_input):
    intent = predict_intent(user_input)

    if intent == "greeting":
        return "Hello! How can I help you today?"
    elif intent == "resume_help":
        return "Sure! Please upload your resume or paste it here."
    elif intent == "career_help":
        return "Let me suggest some career options for you."
    elif intent == "pdf_query":
        return "Please upload the document, and I’ll find your answer."
    elif intent == "goodbye":
        return "Goodbye! Have a great day."
    else:
        return "Sorry, I didn't understand that."

# Test
if __name__ == "__main__":
    while True:
        user = input("You: ")
        if user.lower() in ["exit", "quit"]:
            break
        print("Bot:", get_bot_response(user))

import os
from dotenv import load_dotenv
from chatbot_core.cohere_chat import cohere_chat
from chatbot_core.intent_classifier import predict_intent
from chatbot_core.pdf_qa import load_pdf_text, answer_question_from_pdf
from chatbot_core.code_assistant import explain_code, generate_code

load_dotenv(".env")

def main():
    print("\n🤖 Welcome to IntelliBot (Cohere)!")
    print("Type 'exit' to quit.\n")

    while True:
        user_input = input("You: ").strip()
        if user_input.lower() == "exit":
            print("IntelliBot: Goodbye!")
            break

        intent = predict_intent(user_input)

        if intent == "greeting":
            print("IntelliBot: Hello! How can I assist you?")
        elif intent == "code_explain":
            print("IntelliBot: This looks like code. Let me try to explain it:")
            print("→", cohere_chat("Explain this code: " + user_input))
        else:
            response = cohere_chat(user_input)
            print("IntelliBot:", response)

if __name__ == "__main__":
    main()
# import os
# from dotenv import load_dotenv
# from chatbot_core.intent_classifier import predict_intent
# from chatbot_core.pdf_qa import load_pdf_text, answer_question_from_pdf
# from chatbot_core.code_assistant import explain_code, generate_code

# load_dotenv(".env")

# def main():
#     print("\n🤖 Welcome to IntelliBot (Offline Mode)!")
#     print("Type 'exit' to quit.\n")

#     while True:
#         user_input = input("You: ").strip()
#         if user_input.lower() == "exit":
#             print("IntelliBot: Goodbye!")
#             break

#         intent = predict_intent(user_input)

#         if intent == "greeting":
#             print("IntelliBot: Hello! How can I assist you?")

#         elif intent == "code_explain":
#             explanation = explain_code(user_input)
#             print("IntelliBot (Code Explanation):", explanation)

#         elif intent == "code_generate":
#             generated_code = generate_code(user_input)
#             print("IntelliBot (Code Generator):", generated_code)

#         elif intent == "pdf_qa":
#             pdf_path = input("📄 Enter PDF filename (in task1_pdf folder): ").strip()
#             full_path = os.path.join("task1_pdf", pdf_path)

#             if not os.path.exists(full_path):
#                 print("IntelliBot: File not found.")
#                 continue

#             text = load_pdf_text(full_path)
#             answer = answer_question_from_pdf(text, user_input)
#             print("IntelliBot (PDF Answer):", answer)

#         else:
#             print("IntelliBot: Sorry, I couldn't understand that. Can you try rephrasing?")

# if __name__ == "__main__":
#     main()

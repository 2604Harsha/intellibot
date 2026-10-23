import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "chatbot_core")))

from chatbot_core.pdf_qa import load_pdf_text, answer_question_from_pdf




pdf_text = load_pdf_text("task1_pdf")
question = "What is the attendance rule?"
answer = answer_question_from_pdf(pdf_text, question)
print("Answer:", answer)

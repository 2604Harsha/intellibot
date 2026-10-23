import PyPDF2
from sentence_transformers import SentenceTransformer, util

# Load the embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Load PDF and return full text
def load_pdf_text(task1_pdf):
    text = ""
    with open(task1_pdf, 'rb') as f:
        reader = PyPDF2.PdfReader(f)
        for page in reader.pages:
            text += page.extract_text()
    return text

# Search the best matching sentence
def answer_question_from_pdf(pdf_text, user_question):
    sentences = [s.strip() for s in pdf_text.split('.') if len(s.strip()) > 10]
    sentence_embeddings = model.encode(sentences, convert_to_tensor=True)
    question_embedding = model.encode(user_question, convert_to_tensor=True)

    scores = util.cos_sim(question_embedding, sentence_embeddings)[0]
    best_idx = scores.argmax()
    return sentences[best_idx]

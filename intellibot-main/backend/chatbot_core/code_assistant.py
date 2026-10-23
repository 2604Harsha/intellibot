import re

def explain_code(code_snippet):
    # Basic explanation using keywords (can upgrade with GPT or LLMs later)
    if "for" in code_snippet and "range" in code_snippet:
        return "This is a for-loop that runs over a range of numbers."
    elif "def" in code_snippet:
        return "This defines a function in Python."
    elif "if" in code_snippet:
        return "This is a conditional 'if' statement."
    else:
        return "This code does something in Python, but needs more analysis."

def generate_code(task):
    task = task.lower()
    if "reverse a string" in task:
        return "def reverse_string(s):\n    return s[::-1]"
    elif "fibonacci" in task:
        return "def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        print(a)\n        a, b = b, a + b"
    else:
        return "I can’t generate that yet, but I’m learning!"

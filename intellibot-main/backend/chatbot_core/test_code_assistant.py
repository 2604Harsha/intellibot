import sys
import os

# This points to chatbot_core correctly
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "chatbot_core")))

from code_assistant import explain_code, generate_code

# Testing functions
code = "for i in range(5): print(i)"
print("Explanation:", explain_code(code))

task = "Write a function to add two numbers"
print("Generated Code:", generate_code(task))

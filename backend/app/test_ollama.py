import ollama

response = ollama.chat(
    model="mistral",
    messages=[
        {"role": "user", "content": "Explain artificial intelligence in simple terms"}
    ]
)

print("\nModel Response:\n")
print(response["message"]["content"])

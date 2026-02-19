from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import OllamaEmbeddings
import ollama


# --------- SMALL TALK DETECTION ----------
SMALL_TALK = ["hi", "hello", "hey", "how are you", "good morning", "good evening"]


def build_prompt(query: str, context: str | None = None):
    if context:
        return f"""
You are an AI assistant.

Use ONLY the information provided in the context below.
Extract exact details clearly and directly.
Do not summarize unless asked.
Do not guess.
If the answer is not present in the context, respond exactly with:
"I don't know based on the provided document."

Context:
{context}

Question:
{query}

Answer clearly and precisely.
"""
    else:
        return f"""
You are a helpful and friendly AI assistant.
Respond naturally and conversationally.

Question:
{query}
"""


def retrieve_context(query: str):
    embeddings = OllamaEmbeddings(model="mistral")

    vectorstore = Chroma(
        persist_directory="./chroma_db",
        embedding_function=embeddings
    )

    retriever = vectorstore.as_retriever(search_kwargs={"k": 8})

    docs = retriever.invoke(query)

    if not docs:
        return None

    return "\n\n".join([doc.page_content for doc in docs])


# ---------------- NON-STREAM VERSION ----------------

def chat_with_rag(query: str):

    # Small talk bypass
    if query.lower().strip() in SMALL_TALK:
        prompt = build_prompt(query)
    else:
        context = retrieve_context(query)
        prompt = build_prompt(query, context)

    response = ollama.chat(
        model="mistral",
        messages=[{"role": "user", "content": prompt}]
    )

    return response["message"]["content"]


# ---------------- STREAM VERSION ----------------

def stream_chat_with_rag(query: str):

    # Small talk bypass
    if query.lower().strip() in SMALL_TALK:
        prompt = build_prompt(query)
    else:
        context = retrieve_context(query)
        prompt = build_prompt(query, context)

    stream = ollama.chat(
        model="mistral",
        messages=[{"role": "user", "content": prompt}],
        stream=True
    )

    for chunk in stream:
        if "message" in chunk:
            yield chunk["message"]["content"]

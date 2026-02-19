import requests

url = "http://127.0.0.1:8000/query"

payload = {
    "query": "Explain RAG in detail in 200 words."
}

with requests.post(url, json=payload, stream=True) as r:
    for chunk in r.iter_content(chunk_size=None):
        if chunk:
            print(chunk.decode(), end="", flush=True)

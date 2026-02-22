# ⚡ RAG Nexus

A futuristic, full-stack Retrieval-Augmented Generation (RAG) AI chatbot built with FastAPI, Ollama, ChromaDB, and React.
RAG Nexus combines modern UI design with intelligent document-based AI responses using a streaming interface.

## 🧠 What is RAG?

Retrieval-Augmented Generation (RAG) is a technique where:

1. Documents are converted into embeddings
2. Stored inside a vector database (ChromaDB)
3. Relevant chunks are retrieved based on user query
4. Context is injected into an LLM prompt
5. AI generates grounded, factual answers

This reduces hallucination and improves accuracy.


## ✨ Features

- 🚀 Streaming responses (ChatGPT-style typing)
- 📄 PDF upload & ingestion
- 📚 Vector database (ChromaDB)
- 🤖 Local LLM using Ollama (Mistral)
- 🎨 Cyber futuristic UI
- 🌌 Glassmorphism design
- 💡 Neon glow interface
- 📜 Scroll-optimized chat layout
- 🧠 Context-aware RAG responses
- 🗂 Chat history sidebar


## 🏗 Architecture

Frontend (React + Vite)
↓
FastAPI Backend
↓
RAG Pipeline
↓
ChromaDB Vector Store
↓
Ollama (Mistral LLM)

## 🛠 Local Setup

### 🔹 1. Install Ollama

Download from:
https://ollama.com/

Pull the model:
ollama pull mistral

### 🔹 2. Backend Setup
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

Backend runs at:
http://127.0.0.1:8000

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|------------|
| `/health` | GET | Server health check |
| `/upload` | POST | Upload & ingest PDF |
| `/query` | POST | Ask AI question |


## 🧪 How It Works

1. Upload a PDF
2. Backend splits text into chunks
3. Embeddings generated via Ollama
4. Stored in ChromaDB
5. Query retrieves top relevant chunks
6. Context injected into prompt
7. AI generates response (streamed)

## 🎨 UI Highlights

- Cyber-themed dark interface
- Animated light streak
- Subtle tech grid background
- Neon-glow buttons
- Glass sidebar panel
- Capsule-style futuristic input
- Responsive scroll system

## 🚀 Future Improvements

- Source citation display
- Multi-document filtering
- Authentication system
- Cloud deployment version
- OpenAI API production mode
- Conversation memory storage
- Multi-session support


## 💼 Why This Project Matters

This project demonstrates:

- Full-stack AI system design
- RAG implementation
- Vector database integration
- LLM prompt engineering
- Streaming API handling
- Modern UI/UX development
- Proper layout architecture
- Git workflow management


## 👨‍💻 Author

Mahadiya

## ⭐ Star the Repo

If you like this project, consider starring it!

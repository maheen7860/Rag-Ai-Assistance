from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile, File
import shutil
import os


from app.rag import stream_chat_with_rag
from app.ingest import ingest_pdf


# ✅ FIRST create app
app = FastAPI(title="RAG Chatbot Backend")


# ✅ THEN add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QueryRequest(BaseModel):
    query: str


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/ingest")
async def ingest():
    ingest_pdf("data/ai_notes.pdf")
    return {"message": "PDF ingested successfully"}


@app.post("/query")
async def query(req: QueryRequest):
    generator = stream_chat_with_rag(req.query)
    return StreamingResponse(generator, media_type="text/plain")


@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        # Validate file type
        if not file.filename.endswith(".pdf"):
            return {"error": "Only PDF files are allowed"}

        upload_dir = "data"
        os.makedirs(upload_dir, exist_ok=True)

        file_path = os.path.join(upload_dir, file.filename)

        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Ingest into vector DB
        ingest_pdf(file_path)

        return {
            "message": f"{file.filename} uploaded and ingested successfully"
        }

    except Exception as e:
        return {"error": str(e)}

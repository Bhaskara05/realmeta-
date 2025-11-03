# app.py
import os
import io
import uuid
from typing import List
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from PIL import Image

from pinecone import Pinecone, ServerlessSpec  # ✅ NEW IMPORT

from embedding_service import get_embedding_service
from pipeline import get_pipeline  # your ImagePipeline

load_dotenv()

# --- Config ---
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_INDEX = os.getenv("PINECONE_INDEX_NAME", "museum-images")
PINECONE_REGION = os.getenv("PINECONE_REGION", "us-east-1")   # ✅ NEW
TOP_K = int(os.getenv("TOP_K", "5"))
IMAGES_DIR = "images"
MUSEUM_DIR = os.path.join(IMAGES_DIR, "museum")
QUERIES_DIR = os.path.join(IMAGES_DIR, "queries")

os.makedirs(MUSEUM_DIR, exist_ok=True)
os.makedirs(QUERIES_DIR, exist_ok=True)

# --- FastAPI App ---
app = FastAPI(title="Visual RAG Prototype - Pinecone + Local Images")
app.mount("/images", StaticFiles(directory=IMAGES_DIR), name="images")

# --- Load Models ---
embed_service = get_embedding_service()
pipeline = get_pipeline()

# --- Initialize Pinecone v3 ---
if not PINECONE_API_KEY:
    raise RuntimeError("Set PINECONE_API_KEY in .env")

pc = Pinecone(api_key=PINECONE_API_KEY)

# Ensure index exists
EMBED_DIM = embed_service.get_embedding_dim()
existing_indexes = pc.list_indexes().names()

if PINECONE_INDEX not in existing_indexes:
    pc.create_index(
        name=PINECONE_INDEX,
        dimension=EMBED_DIM,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region=PINECONE_REGION)
    )

index = pc.Index(PINECONE_INDEX)  # ✅ NEW WAY OF GETTING INDEX


# ---------- Helpers ----------
def save_upload_file(local_dir: str, file: UploadFile) -> str:
    filename = f"{uuid.uuid4().hex}_{os.path.basename(file.filename)}"
    path = os.path.join(local_dir, filename)
    with open(path, "wb") as f:
        f.write(file.file.read())

    rel = path.replace("\\", "/")
    return f"/{rel}"


# ---------- Endpoints ----------
@app.post("/index")
async def index_image(
    file: UploadFile = File(...),
    title: str = Form("unknown"),
    artist: str = Form(""),
    year: str = Form(""),
    category: str = Form(""),
):
    if file.content_type not in ["image/jpeg", "image/png", "image/jpg"]:
        raise HTTPException(status_code=400, detail="Only JPG/PNG images supported.")

    try:
        file.file.seek(0)
        saved_url = save_upload_file(MUSEUM_DIR, file)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {e}")

    try:
        image_path = saved_url.lstrip("/")
        pil = Image.open(image_path).convert("RGB")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image: {e}")

    try:
        processed = pipeline.process_image(pil, apply_detection=False, apply_color_norm=True)
        vector = embed_service.generate_embedding(processed)

        item_id = os.path.basename(image_path)
        metadata = {
            "title": title,
            "artist": artist,
            "year": year,
            "category": category,
            "image_url": saved_url
        }

        index.upsert(vectors=[{"id": item_id, "values": vector, "metadata": metadata}])  # ✅ v3 Format

        return JSONResponse({"status": "ok", "id": item_id, "metadata": metadata})

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing/indexing image: {e}")


@app.post("/search")
async def search_image(file: UploadFile = File(...), top_k: int = Form(TOP_K)):
    if file.content_type not in ["image/jpeg", "image/png", "image/jpg"]:
        raise HTTPException(status_code=400, detail="Only JPG/PNG images supported.")

    try:
        file.file.seek(0)
        saved_url = save_upload_file(QUERIES_DIR, file)
        image_path = saved_url.lstrip("/")
        pil = Image.open(image_path).convert("RGB")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid query image: {e}")

    try:
        processed = pipeline.process_image(pil, apply_detection=False, apply_color_norm=True)
        q_vector = embed_service.generate_embedding(processed)

        resp = index.query(vector=q_vector, top_k=top_k, include_metadata=True)

        matches = []
        for m in resp.matches:
            md = m.metadata or {}
            matches.append({
                "id": m.id,
                "score": float(m.score),
                "metadata": md,
                "image_url": md.get("image_url", "")
            })

        return {"matches": matches}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search error: {e}")


@app.get("/health")
def health():
    return {"status": "ok"}

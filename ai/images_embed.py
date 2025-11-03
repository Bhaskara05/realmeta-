import os
import uuid
from PIL import Image
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec

from embedding_service import get_embedding_service
from pipeline import get_pipeline  # your ImagePipeline

load_dotenv()

# ---- Config ----
FOLDER = "converted_images"  # the folder that contains your images
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_INDEX = os.getenv("PINECONE_INDEX_NAME", "museum-images")
PINECONE_REGION = os.getenv("PINECONE_REGION", "us-east-1")

# ---- Init ----
pc = Pinecone(api_key=PINECONE_API_KEY)
embed_service = get_embedding_service()
pipeline = get_pipeline()

EMBED_DIM = embed_service.get_embedding_dim()
if PINECONE_INDEX not in pc.list_indexes().names():
    pc.create_index(
        name=PINECONE_INDEX,
        dimension=EMBED_DIM,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region=PINECONE_REGION)
    )

index = pc.Index(PINECONE_INDEX)


def index_folder(folder_path):
    files = os.listdir(folder_path)
    supported = [f for f in files if f.lower().endswith(('.jpg', '.jpeg', '.png'))]

    print(f"Found {len(supported)} images to index.")

    for filename in supported:
        img_path = os.path.join(folder_path, filename)
        try:
            pil = Image.open(img_path).convert("RGB")
            processed = pipeline.process_image(pil, apply_detection=True, apply_color_norm=True)
            vector = embed_service.generate_embedding(processed)

            item_id = f"{uuid.uuid4().hex}_{filename}"
            metadata = {
                "title": "", "artist": "", "year": "", "category": "",
                "image_url": f"/images/museum/{item_id}"
            }

            index.upsert(vectors=[{"id": item_id, "values": vector, "metadata": metadata}])
            print(f"✅ Indexed: {filename}")

        except Exception as e:
            print(f"❌ Failed for {filename}: {e}")


if __name__ == "__main__":
    index_folder(FOLDER)
    print("\n🎉 Bulk Indexing Completed!")

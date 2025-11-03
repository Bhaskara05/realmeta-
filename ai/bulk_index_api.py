import os
import requests
from tqdm import tqdm  # progress bar (install via pip install tqdm)

# ---- CONFIG ----
API_URL = "http://localhost:8000/index"  # your running FastAPI server
IMAGE_FOLDER = r"E:\\Realmeta\\ai\\museum\\resized\\resized"  # full path to images
DEFAULT_TITLE = "Mona Lisa"
DEFAULT_ARTIST = "Leonardo da Vinci"
DEFAULT_YEAR = "1503"
DEFAULT_CATEGORY = "Painting"

# ---- SCRIPT ----
def index_all_images():
    # Get all supported images
    supported_exts = (".jpg", ".jpeg", ".png")
    image_files = [f for f in os.listdir(IMAGE_FOLDER) if f.lower().endswith(supported_exts)]
    
    if not image_files:
        print("❌ No images found in folder:", IMAGE_FOLDER)
        return

    print(f"📸 Found {len(image_files)} images. Starting upload to {API_URL} ...")

    for filename in tqdm(image_files, desc="Indexing images"):
        file_path = os.path.join(IMAGE_FOLDER, filename)
        try:
            with open(file_path, "rb") as f:
                files = {"file": (filename, f, "image/jpeg")}
                data = {
                    "title": DEFAULT_TITLE,
                    "artist": DEFAULT_ARTIST,
                    "year": DEFAULT_YEAR,
                    "category": DEFAULT_CATEGORY,
                }

                response = requests.post(API_URL, files=files, data=data, timeout=60)
                
                if response.status_code == 200:
                    print(f"✅ Indexed: {filename}")
                else:
                    print(f"❌ Failed for {filename}: {response.status_code} - {response.text}")

        except Exception as e:
            print(f"⚠️ Error for {filename}: {e}")

    print("\n🎉 Done! All images processed.")

if __name__ == "__main__":
    index_all_images()

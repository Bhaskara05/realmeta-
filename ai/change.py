from PIL import Image, UnidentifiedImageError, ImageFile
import os

ImageFile.LOAD_TRUNCATED_IMAGES = True   # Allow loading broken images

input_folder = "E:/Realmeta/ai/museum/resized/resized"
output_folder = "E:/Realmeta/ai/converted_images"
os.makedirs(output_folder, exist_ok=True)

count = 0
for file in os.listdir(input_folder):
    path = os.path.join(input_folder, file)
    ext = os.path.splitext(file)[1].lower()
    
    if ext not in [".jpg", ".jpeg", ".png"]:
        continue

    try:
        img = Image.open(path)
        img = img.convert("RGB")  # Force RGB

        # Skip very small files (<10KB)
        if os.path.getsize(path) < 10 * 1024:
            print(f"⚠️ Too small, skipped: {file}")
            continue

        # Save as clean baseline JPEG
        clean_name = os.path.splitext(file)[0] + ".jpg"
        img.save(os.path.join(output_folder, clean_name), "JPEG", quality=90, optimize=True, progressive=False)

        print(f"✅ Cleaned: {file}")
        count += 1

    except UnidentifiedImageError:
        print(f"❌ Corrupt/Unsupported: {file}")

print(f"\nDone. Cleaned images: {count}")

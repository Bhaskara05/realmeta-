import os

folder = r"E:\Realmeta\ai\museum\resized\resized"
prefix = "art"
files = os.listdir(folder)

for i, filename in enumerate(files, start=1):
    old_path = os.path.join(folder, filename)
    ext = os.path.splitext(filename)[1]
    new_name = f"{prefix}_{i}{ext}"
    new_path = os.path.join(folder, new_name)

    os.rename(old_path, new_path)

print("✅ Files renamed with prefix!")

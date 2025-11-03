"""
Local Storage Manager
Handles saving and retrieving images from local filesystem
"""

import os
import uuid
from pathlib import Path
from typing import Optional
from PIL import Image


class LocalStorage:
    """Manager for local image storage"""
    
    def __init__(self, base_dir: str = "images"):
        """
        Initialize storage manager
        
        Args:
            base_dir: Base directory for storing images
        """
        self.base_dir = Path(base_dir)
        self.museum_dir = self.base_dir / "museum"
        self.query_dir = self.base_dir / "queries"
        
        # Create directories if they don't exist
        self.museum_dir.mkdir(parents=True, exist_ok=True)
        self.query_dir.mkdir(parents=True, exist_ok=True)
        
        print(f"Storage initialized at: {self.base_dir.absolute()}")
    
    def save_museum_image(
        self, 
        image_bytes: bytes, 
        filename: Optional[str] = None,
        format: str = "JPEG"
    ) -> tuple[str, str]:
        """
        Save museum image to local storage
        
        Args:
            image_bytes: Image data as bytes
            filename: Original filename (optional, will generate UUID if None)
            format: Image format (JPEG, PNG, etc.)
            
        Returns:
            Tuple of (file_id, file_path)
        """
        # Generate unique filename
        if filename:
            # Sanitize filename and keep extension
            ext = Path(filename).suffix or f".{format.lower()}"
            base_name = Path(filename).stem
            file_id = f"{base_name}_{uuid.uuid4().hex[:8]}{ext}"
        else:
            file_id = f"{uuid.uuid4().hex}.{format.lower()}"
        
        file_path = self.museum_dir / file_id
        
        # Save file
        with open(file_path, 'wb') as f:
            f.write(image_bytes)
        
        return file_id, str(file_path)
    
    def save_query_image(
        self, 
        image_bytes: bytes, 
        filename: Optional[str] = None
    ) -> tuple[str, str]:
        """
        Save query image to local storage (for debugging)
        
        Args:
            image_bytes: Image data as bytes
            filename: Original filename (optional)
            
        Returns:
            Tuple of (file_id, file_path)
        """
        if filename:
            ext = Path(filename).suffix or ".jpg"
            file_id = f"{uuid.uuid4().hex[:8]}_{Path(filename).name}"
        else:
            file_id = f"{uuid.uuid4().hex}.jpg"
        
        file_path = self.query_dir / file_id
        
        with open(file_path, 'wb') as f:
            f.write(image_bytes)
        
        return file_id, str(file_path)
    
    def get_image_url(self, file_id: str, image_type: str = "museum") -> str:
        """
        Get URL path for serving image via FastAPI static files
        
        Args:
            file_id: Image file ID
            image_type: Either 'museum' or 'query'
            
        Returns:
            URL path for the image
        """
        return f"/images/{image_type}/{file_id}"
    
    def get_image_path(self, file_id: str, image_type: str = "museum") -> Path:
        """
        Get full filesystem path for an image
        
        Args:
            file_id: Image file ID
            image_type: Either 'museum' or 'query'
            
        Returns:
            Path object for the image
        """
        if image_type == "museum":
            return self.museum_dir / file_id
        else:
            return self.query_dir / file_id
    
    def image_exists(self, file_id: str, image_type: str = "museum") -> bool:
        """
        Check if image exists in storage
        
        Args:
            file_id: Image file ID
            image_type: Either 'museum' or 'query'
            
        Returns:
            True if image exists
        """
        return self.get_image_path(file_id, image_type).exists()
    
    def list_museum_images(self) -> list[str]:
        """
        List all museum image file IDs
        
        Returns:
            List of file IDs
        """
        return [f.name for f in self.museum_dir.iterdir() if f.is_file()]
    
    def delete_image(self, file_id: str, image_type: str = "museum") -> bool:
        """
        Delete an image from storage
        
        Args:
            file_id: Image file ID
            image_type: Either 'museum' or 'query'
            
        Returns:
            True if deleted successfully
        """
        path = self.get_image_path(file_id, image_type)
        if path.exists():
            path.unlink()
            return True
        return False


# Global instance
_storage = None

def get_storage() -> LocalStorage:
    """Get or create global storage instance"""
    global _storage
    if _storage is None:
        _storage = LocalStorage()
    return _storage
"""
Image Processing Pipeline
Handles detection, cropping, color normalization, and preprocessing
"""

import io
import numpy as np
from PIL import Image
import cv2
from ultralytics import YOLO
from typing import Optional
from embedding_service import get_embedding_service

class ImagePipeline:
    """Complete pipeline for image processing and embedding generation"""
    
    def __init__(self, yolo_model: str = "yolov8n.pt"):
        """
        Initialize the pipeline
        
        Args:
            yolo_model: Path or name of YOLO model for object detection
        """
        print(f"Loading YOLO model: {yolo_model}...")
        self.yolo_model = YOLO(yolo_model)
        self.embedding_service = get_embedding_service()
        print("Pipeline initialized successfully")
    
    def detect_and_crop(self, pil_img: Image.Image, conf_threshold: float = 0.25) -> Image.Image:
        """
        Detect main object in image and crop it. Falls back to center crop if no detection.
        
        Args:
            pil_img: Input PIL Image
            conf_threshold: Confidence threshold for detection
            
        Returns:
            Cropped PIL Image
        """
        # Save image to buffer for YOLO
        buf = io.BytesIO()
        pil_img.save(buf, format="JPEG")
        buf.seek(0)
        
        # Run YOLO detection
        results = self.yolo_model.predict(
            buf, 
            conf=conf_threshold, 
            max_det=10, 
            imgsz=640,
            verbose=False
        )
        
        boxes = results[0].boxes
        
        # If no detections, return center crop
        if len(boxes) == 0:
            return self._center_crop(pil_img)
        
        # Find box with largest area
        best_box = None
        best_area = 0
        
        for box in boxes:
            x1, y1, x2, y2 = box.xyxy[0].tolist()
            area = (x2 - x1) * (y2 - y1)
            if area > best_area:
                best_area = area
                best_box = (x1, y1, x2, y2)
        
        if best_box:
            x1, y1, x2, y2 = map(int, best_box)
            # Add small padding (5%) if possible
            w, h = pil_img.size
            pad_x = int((x2 - x1) * 0.05)
            pad_y = int((y2 - y1) * 0.05)
            x1 = max(0, x1 - pad_x)
            y1 = max(0, y1 - pad_y)
            x2 = min(w, x2 + pad_x)
            y2 = min(h, y2 + pad_y)
            
            return pil_img.crop((x1, y1, x2, y2))
        
        return self._center_crop(pil_img)
    
    def _center_crop(self, pil_img: Image.Image) -> Image.Image:
        """
        Crop center square from image
        
        Args:
            pil_img: Input PIL Image
            
        Returns:
            Center-cropped square PIL Image
        """
        w, h = pil_img.size
        side = min(w, h)
        left = (w - side) // 2
        top = (h - side) // 2
        return pil_img.crop((left, top, left + side, top + side))
    
    def normalize_color(self, pil_img: Image.Image) -> Image.Image:
        """
        Normalize color using LAB color space histogram equalization
        Helps with lighting variations
        
        Args:
            pil_img: Input PIL Image in RGB
            
        Returns:
            Color-normalized PIL Image
        """
        # Convert PIL to OpenCV format
        img_cv = cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)
        
        # Convert to LAB color space
        lab = cv2.cvtColor(img_cv, cv2.COLOR_BGR2LAB)
        
        # Split channels
        l, a, b = cv2.split(lab)
        
        # Apply histogram equalization to L channel
        l = cv2.equalizeHist(l)
        
        # Merge channels back
        lab = cv2.merge((l, a, b))
        
        # Convert back to RGB
        img_eq = cv2.cvtColor(lab, cv2.COLOR_LAB2BGR)
        img_rgb = cv2.cvtColor(img_eq, cv2.COLOR_BGR2RGB)
        
        return Image.fromarray(img_rgb)
    
    def resize_for_model(self, pil_img: Image.Image, size: int = 224) -> Image.Image:
        """
        Resize image for model input
        
        Args:
            pil_img: Input PIL Image
            size: Target size (square)
            
        Returns:
            Resized PIL Image
        """
        return pil_img.resize((size, size), Image.BICUBIC)
    
    def process_image(
        self, 
        pil_img: Image.Image, 
        apply_detection: bool = True,
        apply_color_norm: bool = True
    ) -> Image.Image:
        """
        Apply full preprocessing pipeline
        
        Args:
            pil_img: Input PIL Image
            apply_detection: Whether to apply object detection and cropping
            apply_color_norm: Whether to apply color normalization
            
        Returns:
            Processed PIL Image ready for embedding
        """
        # Ensure RGB
        if pil_img.mode != 'RGB':
            pil_img = pil_img.convert('RGB')
        
        # Step 1: Object detection and crop
        if apply_detection:
            pil_img = self.detect_and_crop(pil_img)
        
        # Step 2: Color normalization
        if apply_color_norm:
            pil_img = self.normalize_color(pil_img)
        
        # Step 3: Resize (done in embedding service, but can be done here too)
        # pil_img = self.resize_for_model(pil_img)
        
        return pil_img
    
    def generate_embedding(
        self, 
        pil_img: Image.Image,
        apply_detection: bool = True,
        apply_color_norm: bool = True
    ) -> list:
        """
        Complete pipeline: preprocess + embed
        
        Args:
            pil_img: Input PIL Image
            apply_detection: Whether to apply object detection
            apply_color_norm: Whether to apply color normalization
            
        Returns:
            Normalized embedding vector as list
        """
        # Preprocess
        processed = self.process_image(pil_img, apply_detection, apply_color_norm)
        
        # Generate embedding
        embedding = self.embedding_service.generate_embedding(processed)
        
        return embedding


# Global instance (lazy loading)
_pipeline = None

def get_pipeline() -> ImagePipeline:
    """Get or create global pipeline instance"""
    global _pipeline
    if _pipeline is None:
        _pipeline = ImagePipeline()
    return _pipeline
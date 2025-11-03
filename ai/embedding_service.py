"""
Embedding Service Module
Handles DINOv2 model loading and embedding generation
"""

import numpy as np
from PIL import Image
import torch
import timm
from typing import List

class EmbeddingService:
    """Service for generating image embeddings using DINOv2"""
    
    def __init__(self, model_name: str = "vit_base_patch16_224.dino", device: str = None):
        """
        Initialize the embedding service
        
        Args:
            model_name: Name of the timm model to use
            device: Device to run model on ('cuda' or 'cpu')
        """
        self.device = device or ("cuda" if torch.cuda.is_available() else "cpu")
        print(f"Loading embedding model on {self.device}...")
        
        # Load DINOv2-style model from timm
        self.model = timm.create_model(model_name, pretrained=True, num_classes=0)
        self.model.eval()
        self.model.to(self.device)
        
        # Get model's expected input size
        data_config = timm.data.resolve_model_data_config(self.model)
        self.input_size = data_config['input_size'][1]  # Height = Width for square input
        
        # ImageNet normalization stats (standard for DINOv2)
        self.mean = torch.tensor([0.485, 0.456, 0.406]).reshape(1, 3, 1, 1).to(self.device)
        self.std = torch.tensor([0.229, 0.224, 0.225]).reshape(1, 3, 1, 1).to(self.device)
        
        print(f"Model loaded successfully. Input size: {self.input_size}x{self.input_size}")
    
    def preprocess_image(self, pil_img: Image.Image) -> torch.Tensor:
        """
        Convert PIL image to normalized tensor
        
        Args:
            pil_img: PIL Image in RGB format
            
        Returns:
            Normalized tensor ready for model input
        """
        # Resize if needed
        if pil_img.size != (self.input_size, self.input_size):
            pil_img = pil_img.resize((self.input_size, self.input_size), Image.BICUBIC)
        
        # Convert to numpy array and normalize to [0, 1]
        img_array = np.array(pil_img).astype(np.float32) / 255.0
        
        # Convert to tensor (C, H, W)
        tensor = torch.from_numpy(img_array).permute(2, 0, 1).unsqueeze(0).to(self.device)
        
        # Apply ImageNet normalization
        tensor = (tensor - self.mean) / self.std
        
        return tensor
    
    def extract_features(self, tensor: torch.Tensor) -> np.ndarray:
        """
        Extract features from preprocessed tensor
        
        Args:
            tensor: Preprocessed image tensor
            
        Returns:
            Feature vector as numpy array
        """
        with torch.no_grad():
            # Forward pass
            features = self.model(tensor)
            
            # Handle different output shapes
            if features.ndim > 2:
                # Global average pooling if spatial dimensions exist
                features = features.mean(dim=(-2, -1))
            
            # Move to CPU and convert to numpy
            vec = features.cpu().numpy().astype(np.float32).squeeze()
        
        return vec
    
    def normalize_vector(self, vec: np.ndarray) -> np.ndarray:
        """
        L2 normalize the feature vector
        
        Args:
            vec: Feature vector
            
        Returns:
            Normalized vector
        """
        norm = np.linalg.norm(vec)
        if norm > 0:
            vec = vec / norm
        return vec
    
    def generate_embedding(self, pil_img: Image.Image) -> List[float]:
        """
        Generate embedding for a PIL image
        
        Args:
            pil_img: PIL Image in RGB format
            
        Returns:
            Normalized embedding vector as list
        """
        # Preprocess
        tensor = self.preprocess_image(pil_img)
        
        # Extract features
        features = self.extract_features(tensor)
        
        # Normalize
        normalized = self.normalize_vector(features)
        
        return normalized.tolist()
    
    def get_embedding_dim(self) -> int:
        """Get the dimensionality of embeddings produced by this model"""
        dummy_input = torch.randn(1, 3, self.input_size, self.input_size).to(self.device)
        with torch.no_grad():
            output = self.model(dummy_input)
            if output.ndim > 2:
                output = output.mean(dim=(-2, -1))
            return output.shape[-1]


# Global instance (lazy loading)
_embedding_service = None

def get_embedding_service() -> EmbeddingService:
    """Get or create global embedding service instance"""
    global _embedding_service
    if _embedding_service is None:
        _embedding_service = EmbeddingService()
    return _embedding_service
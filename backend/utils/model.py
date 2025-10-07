from pathlib import Path

import numpy as np
import torch
from PIL import Image
from transformers import AutoImageProcessor, AutoModel


class EmbeddingModel:
    def __init__(self):
        self.image_processor = AutoImageProcessor.from_pretrained(
            "google/efficientnet-b0", use_fast=True
        )

        self.model = AutoModel.from_pretrained("google/efficientnet-b0")

    def _load_image(self, image: str | Path):
        """
        Loads an image and processes it using the model's image processor.
        Reusable helper function for single and batch image processing.
        """
        if isinstance(image, str) or isinstance(image, Path):
            image = Image.open(image)
        elif isinstance(image, np.ndarray):
            image = Image.fromarray(image)
        elif not isinstance(image, Image.Image):
            return None

        if image.mode != "RGB":
            image = image.convert("RGB")

        image = self.image_processor(images=image, return_tensors="pt")

        return image["pixel_values"]

    def _embed(self, image):
        """
        Helper function to perform model inference and return the embeddings.
        """
        with torch.no_grad():
            outputs = self.model(pixel_values=image)
        return outputs.pooler_output

    def embed_image(self, image):
        """
        Embeds a single image by first loading and processing it, then passing it to the model.
        """
        pixel_values = self._load_image(image)
        if pixel_values is not None:
            embeddings = self._embed(pixel_values)
            return embeddings.cpu().numpy()
        else:
            print("Failed to load image.")

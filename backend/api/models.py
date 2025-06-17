from pydantic import BaseModel


class CreateEmbedding(BaseModel):
    media_url: str
    embedding: list[float]
    image_data: str
    meta_data: dict
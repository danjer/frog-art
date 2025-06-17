from fastapi import APIRouter
from api.models import CreateEmbedding

router = APIRouter(prefix="/embeddings")


@router.get(
    "/",
    tags=["embeddings"],
)
def create_embedding(embedding: CreateEmbedding):
    """
    Create an embedding.
    """

    return {"message": "hello world"}

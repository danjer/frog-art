import base64
import io
import re

from logging import getLogger
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from PIL import Image

from api.models import FindComparableArt

logger = getLogger(__name__)

router = APIRouter()


@router.post("/compare-art")
async def upload_image_base64(request: Request, payload: FindComparableArt):
    embedder = request.app.embedder  # Ensure the model is loaded
    image_b64 = payload.image
    # TODO find nice way to avoid getting the collection each time.
    # Because of the re-indexing the reference changes and the collection must be reloaded.
    # chroma_collection = request.app.chroma_collection
    chroma_collection = request.app.chroma_client.get_or_create_collection(
        "embeddings", embedding_function=None
    )

    if not image_b64:
        return JSONResponse(
            status_code=400, content={"error": "Missing image_base64 field"}
        )
    try:
        image_data = re.sub("^data:image/.+;base64,", "", image_b64)
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes))

        embedding = embedder.embed_image(image)

        # Example of querying ChromaDB with the embedding
        comparable_ids = chroma_collection.query(
            query_embeddings=embedding, n_results=3
        )["ids"]

        return {"comparable_ids": comparable_ids}
    except Exception as e:
        logger.exception("Error processing image")
        return JSONResponse(status_code=400, content={"error": str(e)})

import base64

from fastapi import APIRouter
from fastapi.responses import JSONResponse

from api.models import FindComparableArt

router = APIRouter()


@router.post("/compare-art")
async def upload_image_base64(payload: FindComparableArt):
    image_b64 = payload.get("image")
    if not image_b64:
        return JSONResponse(
            status_code=400, content={"error": "Missing image_base64 field"}
        )
    try:
        image_bytes = base64.b64decode(image_b64)
        # Process image_bytes as needed, e.g., extract embeddings
        # result = your_embedding_function(image_bytes)
        result = {"message": "Image received and decoded successfully"}
        return result
    except Exception as e:
        return JSONResponse(status_code=400, content={"error": str(e)})

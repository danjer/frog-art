import base64
import io
import re

import numpy as np
from fastapi import APIRouter
from fastapi.responses import JSONResponse
from PIL import Image

from api.models import FindComparableArt

router = APIRouter()


@router.post("/compare-art")
async def upload_image_base64(payload: FindComparableArt):
    image_b64 = payload.image
    if not image_b64:
        return JSONResponse(
            status_code=400, content={"error": "Missing image_base64 field"}
        )
    try:
        image_data = re.sub("^data:image/.+;base64,", "", image_b64)
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes))

        # To print a simple ASCII representation to the terminal:
        try:
            chars = np.asarray(list(" .:-=+*%@#"))
            img_gray = image.convert("L").resize((80, 40))
            img_np = np.array(img_gray)
            img_norm = (img_np - img_np.min()) / (np.ptp(img_np) + 1e-6)
            img_idx = (img_norm * (len(chars) - 1)).astype(int)
            ascii_art = "\n".join(
                "".join(chars[c] for c in row) for row in img_idx
            )
            print(ascii_art)
        except ImportError:
            print("numpy is required for ASCII art rendering.")
        # Process image_bytes as needed, e.g., extract embeddings
        # result = your_embedding_function(image_bytes)
        result = {"message": "Image received and decoded successfully"}
        return result
    except Exception as e:
        return JSONResponse(status_code=400, content={"error": str(e)})

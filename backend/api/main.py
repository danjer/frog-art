from fastapi import FastAPI

from api.settings import PROJECT_NAME
from backend.api.endpoints.compare import router as embeddings_router

app = FastAPI(
    title=PROJECT_NAME,
    openapi_url="/openapi.json",
)

# # Set all CORS enabled origins
# if settings.all_cors_origins:
#     app.add_middleware(
#         CORSMiddleware,
#         allow_origins=settings.all_cors_origins,
#         allow_credentials=True,
#         allow_methods=["*"],
#         allow_headers=["*"],
#     )

app.include_router(embeddings_router, prefix="/api")

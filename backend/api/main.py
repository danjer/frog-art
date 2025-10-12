from contextlib import asynccontextmanager

import chromadb
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.utils.model import EmbeddingModel

from api.endpoints.compare import router as embeddings_router
from api.settings import PROJECT_NAME, settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load the ML model
    app.embedder = EmbeddingModel()
    app.chroma_client = chromadb.HttpClient(
        host=settings.chromadb_host, port=settings.chromadb_port
    )
    app.chroma_collection = app.chroma_client.get_or_create_collection(
        "embeddings", embedding_function=None
    )
    yield
    # Clean up the ML models and release the resources
    del app.embedder
    del app.chroma_client
    del app.chroma_collection


app = FastAPI(
    title=PROJECT_NAME,
    openapi_url="/openapi.json",
    lifespan=lifespan,
)

# Set all CORS enabled origins
if settings.all_cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.all_cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(embeddings_router, prefix="/api")

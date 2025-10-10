import os

PROJECT_NAME = "frog-art-backend"


class Settings:
    all_cors_origins = ["*"]  # Allow all origins for CORS
    chromadb_host = os.getenv("CHROMADB_HOST", "localhost")
    chromadb_port = os.getenv("CHROMADB_PORT", "8000")
    chromadb_collection_name = os.getenv("CHROMADB_COLLECTION_NAME", "embeddings")    


settings = Settings()

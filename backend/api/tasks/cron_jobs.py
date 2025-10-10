from api.utils.scraper import Scraper, ChromaProcessor
from api.utils.model import EmbeddingModel
from api.settings import settings
from chromadb import HttpClient


def batch_scrape():
    client = HttpClient(host=settings.chromadb_host, port=settings.chromadb_port)
    embedding_model = EmbeddingModel()
    processor = ChromaProcessor(embedding_model, client, settings.chromadb_collection_name)
    scraper = Scraper(processor=processor)
    scraper.scrape()

if __name__ == "__main__":
    batch_scrape()

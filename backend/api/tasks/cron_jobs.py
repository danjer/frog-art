from api.utils.scraper import Scraper, ChromaProcessor
from api.utils.model import EmbeddingModel
from api.settings import settings
from chromadb import HttpClient
from celery import Celery
from celery.signals import worker_ready


celery_app = Celery("tasks", broker=settings.celery_broker_url)
celery_app.conf.beat_schedule = {
    "periodic-scrape-artworks": {
        "task": "api.tasks.cron_jobs.embed_artworks",
        "schedule": 60.0 * 60 * 24,  # Every 24 hours
    },
}


@celery_app.task
def embed_artworks():
    client = HttpClient(host=settings.chromadb_host, port=settings.chromadb_port)
    embedding_model = EmbeddingModel()
    processor = ChromaProcessor(
        embedding_model, client, settings.chromadb_collection_name
    )
    scraper = Scraper(processor=processor)
    scraper.scrape()


@worker_ready.connect
def at_startup(sender, **kwargs):
    with sender.app.connection() as conn:
        sender.app.send_task("api.tasks.cron_jobs.embed_artworks")

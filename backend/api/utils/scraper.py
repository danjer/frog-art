from typing import List
from abc import ABC, abstractmethod
import requests
import pathlib
import re
import concurrent.futures
import logging
from api.utils.model import EmbeddingModel, EmbeddingModelInterface
from io import BytesIO
from chromadb import HttpClient, errors as chromadb_errors
import numpy as np
from tqdm import tqdm

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(name)s - %(message)s"
)
logger = logging.getLogger(__name__)


class ImageProcessorInterface(ABC):
    @abstractmethod
    def process(self, img_data: bytes, name: str):
        raise NotImplementedError


class WriteProcessor(ImageProcessorInterface):
    """ "Simply writes the image to disk."""

    def __init__(self, path: pathlib.Path):
        self.path = path

    def process(self, img_data: bytes, name: str):
        logger.warning(f"Writing image {name} to {self.path/name}")
        with open(self.path / name, "wb") as handler:
            handler.write(img_data)


class ChromaProcessor(ImageProcessorInterface):
    """Processes the image and loads it into a ChromaDB instance."""

    def __init__(
        self,
        model: EmbeddingModelInterface,
        client: HttpClient,
        collection_name="embeddings",
    ):
        self.model = model
        self.client = client
        self.collection = self.setup_collection(collection_name)

    def setup_collection(self, name):
        try:
            self.client.delete_collection(name)
        except chromadb_errors.NotFoundError:
            pass
        collection = self.client.get_or_create_collection(
            name, embedding_function=None
        )
        return collection

    def process(self, img_data: bytes, name: str):
        logger.info(f"Processing image {name} into ChromaDB")
        name, _ = name.split(".")
        embedding = self.model.embed_image(BytesIO(img_data))
        logger.info(f"Created embedding... Storing in ChromaDB")
        self.collection.add(
            embeddings=embedding,
            ids=[name],
        )
        logger.info(f"Stored image {name} in ChromaDB")


def _batch_download_jpgs(
    session: requests.Session, urls: List[str], processor: ImageProcessorInterface
):
    for url in urls:
        img_data = session.get(url).content
        name = url.split("/")[-1]
        processor.process(img_data, name)


class Scraper:

    def __init__(
        self,
        base: str = "https://kunstuitleenutrecht.kunstuitleenonline.nl/catalogue",
        offset=0,
        end=100,
        increment=25,
        workers=8,
        processor: ImageProcessorInterface = None,
    ):
        self.base = base
        self.offset = offset
        self.increment = increment
        self.end = end
        self.session = requests.Session()
        self.workers = workers
        self.processor = processor or WriteProcessor(
            pathlib.Path(__file__).parent / "images"
        )

    def scrape(self):
        for i in tqdm(range(self.offset, self.end, self.increment)):
            logger.info(f"Scraping {i} to {i + self.increment}")
            raw_content = self.session.get(self.base, params={"start": i})
            urls = self._extract_jpgs(raw_content)
            self._fetch_jpgs(urls)

    def _fetch_jpgs(self, urls: List[str]):
        logger.info(f"Fetching {len(urls)} jpgs")
        with concurrent.futures.ThreadPoolExecutor(self.workers) as pool:
            pool.submit(_batch_download_jpgs, self.session, urls, self.processor)

    def _extract_jpgs(self, urls) -> List[str]:
        pattern = r"https?://[^\s]+\.jpg"
        jpg_urls = re.findall(pattern, urls.content.decode())
        return jpg_urls


if __name__ == "__main__":
    # Example usage
    client = HttpClient(host="localhost", port=8000)
    embedding_model = EmbeddingModel()
    processor = ChromaProcessor(embedding_model, client)
    scraper = Scraper(processor=processor)
    scraper.scrape()

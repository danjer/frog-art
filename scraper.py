from typing import List
import requests
import pathlib
import re
import concurrent.futures

def _batch_download_jpgs(session: requests.Session, urls: List[str], destination: pathlib.Path):
    for url in urls:
        img_data = session.get(url).content
        name = url.split('/')[-1]
        with open(destination / name, 'wb') as handler:
            handler.write(img_data)


class Scraper:
    base = "https://kunstuitleenutrecht.kunstuitleenonline.nl/catalogue"

    def __init__(self, offset=0, end=100, increment=25, destination: pathlib.Path=None, workers=8):
        self.offset = offset
        self.increment = increment
        self.end = end
        self.session = requests.Session()
        self.workers = workers
        self.destination = destination or pathlib.Path(__file__).parent / 'images'

    def scrape(self):
        for i in range(self.offset, self.end, self.increment):
            raw_content = self.session.get(self.base, params={'start': i})
            urls = self._extract_jpgs(raw_content)
            self._fetch_jpgs(urls)

    def _fetch_jpgs(self, urls: List[str]):
        with concurrent.futures.ThreadPoolExecutor(self.workers) as pool:
            result = pool.submit(_batch_download_jpgs, self.session, urls, self.destination)
        for url in urls:
            img_data = requests.get(url).content
            name = url.split('/')[-1]
            with open(self.destination / name, 'wb') as handler:
                handler.write(img_data)

    def _extract_jpgs(self, urls) -> List[str]:
        pattern = r"https?://[^\s]+\.jpg"
        jpg_urls = re.findall(pattern, urls.content.decode())
        return jpg_urls


if __name__ == "__main__":
    scraper = Scraper()
    scraper.scrape()







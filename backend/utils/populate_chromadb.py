import argparse
import os

import chromadb
import numpy as np
from model import EmbeddingModel
from tqdm import tqdm


def populate(images_path):
    embedder = EmbeddingModel()
    embeddings_list = []
    ids_list = []

    for file in tqdm(os.listdir(images_path)):
        embeddings_list.append(
            embedder.embed_image(os.path.join(images_path, file))
        )
        ids_list.append(file.split(".")[0])

    client = chromadb.HttpClient(host="localhost", port=8000)
    client.delete_collection("embeddings")
    collection = client.get_or_create_collection(
        "embeddings", embedding_function=None
    )

    collection.add(
        embeddings=np.concatenate(embeddings_list),
        ids=ids_list,
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Populate ChromaDB with image embeddings."
    )
    parser.add_argument(
        "--path",
        type=str,
        default="images",
        help="Path to the images directory",
    )
    args = parser.parse_args()

    populate(args.path)

from pydantic import BaseModel


class FindComparableArt(BaseModel):
    image: str

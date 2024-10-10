from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel, Field, Required


class NewsModel(BaseModel):
    title: str = Field(Required)
    description: str = Field(Required)
    text: Optional[str]
    images: Optional[List[str]]
    date: Optional[datetime]

    class Config:
        orm_mode = True

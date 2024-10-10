from typing import Optional
from datetime import datetime

from pydantic import BaseModel, Field, Required


class MediaModel(BaseModel):
    image: str = Field(Required)
    description: Optional[str]
    date: Optional[datetime]

    class Config:
        orm_mode = True

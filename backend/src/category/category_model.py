from typing import Optional

from pydantic import BaseModel, Required, Field


class CategoryModel(BaseModel):
    title: str = Field(Required)
    description: str = Field(Required)
    image: Optional[str]

    class Config:
        orm_mode = True

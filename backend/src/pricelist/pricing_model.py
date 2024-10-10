from typing import Optional

from pydantic import BaseModel


class PricingModel(BaseModel):
    image: str
    text: Optional[str]

    class Config:
        orm_mode = True

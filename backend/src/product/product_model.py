from typing import Optional
from decimal import Decimal

from pydantic import BaseModel, Field, Required


class ProductModel(BaseModel):
    category_id: int = Field(Required)
    title: str = Field(Required)
    description: str = Field(Required)
    text: Optional[str]
    image: Optional[str]
    price: Decimal = Field(Decimal('0.0'))
    is_active: bool = Field(default=True)
    detail: Optional[str]

    class Config:
        orm_mode = True

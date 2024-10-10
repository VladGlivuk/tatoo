from datetime import datetime
import uuid
from typing import Optional

import phonenumbers
from phonenumbers import NumberParseException
from pydantic import BaseModel, validator, Field, Required, UUID4

from config import user_config as conf


class TransactionModel(BaseModel):
    id: int
    order_id: UUID4
    name: str = Field(Required, min_length=conf.username_min_length, max_length=conf.username_max_length)
    phone_number: str = Field(Required, min_length=conf.phone_number_length, max_length=conf.phone_number_length)
    timestamp: Optional[datetime]
    transaction_data: Optional[dict]

    @validator("phone_number")
    def validate_number(value: str) -> str:
        try:
            number_to_check = phonenumbers.parse(value)
        except NumberParseException:
            raise ValueError("Error! Can`t parse the number.")
        if phonenumbers.is_valid_number(number_to_check):
            return value
        else:
            raise ValueError("Error! Invalid number.")

    class Config:
        orm_mode = True


class DataCollectorModel(BaseModel):
    product_id: int = Field(None)
    name: str = Field(Required, min_length=conf.username_min_length, max_length=conf.username_max_length)
    phone_number: str = Field(Required, min_length=conf.phone_number_length, max_length=conf.phone_number_length)

    @validator("phone_number")
    def validate_number(value: str) -> str:
        try:
            number_to_check = phonenumbers.parse(value)
        except NumberParseException:
            raise ValueError("Error! Can`t parse the number.")
        if phonenumbers.is_valid_number(number_to_check):
            return value
        else:
            raise ValueError("Error! Invalid number.")

    class Config:
        orm_mode = True

from pydantic import BaseModel, Field, Required


class FaqModel(BaseModel):
    question: str = Field(Required)
    answer: str = Field(Required)

    class Config:
        orm_mode = True

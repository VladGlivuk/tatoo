from sqlalchemy import Column, Integer, String

from database.base import Base, engine
from config import faq_config as conf


class FaqSchema(Base):
    __tablename__ = "faqs"
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True)
    question = Column(String(conf.question_max_length), nullable=False)
    answer = Column(String(conf.answer_max_length), nullable=False)


Base.metadata.create_all(engine)

import datetime

from sqlalchemy import Column, String, Integer, DateTime, Text, ARRAY

from config import news_config as conf
from database.base import Base, engine


class NewsSchema(Base):
    __tablename__ = "news"
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True)
    title = Column(String(conf.title_max_length), nullable=False)
    description = Column(String(conf.description_max_length), nullable=False)
    text = Column(Text, nullable=True)
    images = Column(ARRAY(String), nullable=True)
    date = Column(DateTime, default=datetime.datetime.utcnow)


Base.metadata.create_all(engine)

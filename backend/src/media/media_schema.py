import datetime

from sqlalchemy import Column, Integer, String, DateTime

from database.base import Base, engine
from config import media_config as conf


class MediaSchema(Base):
    __tablename__ = "medias"
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True)
    image = Column(String, nullable=False)
    description = Column(String(conf.description_max_length), nullable=True)
    date = Column(DateTime, default=datetime.datetime.utcnow)


Base.metadata.create_all(engine)

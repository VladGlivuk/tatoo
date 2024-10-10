from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship

from database.base import engine, Base
from config import category_config as conf


class CategorySchema(Base):
    __tablename__ = "categories"
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True)
    title = Column(String(conf.title_max_length), nullable=False, unique=True)
    description = Column(String(conf.description_max_length), nullable=True)
    image = Column(String, nullable=True)
    products = relationship("ProductSchema", back_populates='category')

    def __str__(self):
        return f"Category: {self.title}"


Base.metadata.create_all(engine)

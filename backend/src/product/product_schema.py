from sqlalchemy import Column, String, Integer, Boolean, Numeric, ForeignKey, Text
from sqlalchemy.orm import relationship

from database.base import Base, engine
from category.category_schema import CategorySchema
from config import product_config as conf


class ProductSchema(Base):
    __tablename__ = "products"
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True)
    category = relationship("CategorySchema")
    category_id = Column(Integer, ForeignKey(CategorySchema.id))
    title = Column(String(conf.title_max_length), nullable=False, unique=True)
    description = Column(String(conf.description_max_length), nullable=False)
    text = Column(Text, nullable=True)
    price = Column(Numeric, nullable=False)
    image = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    detail = Column(String, nullable=True)

    def __str__(self):
        return f"Product: {self.title}"


Base.metadata.create_all(engine)

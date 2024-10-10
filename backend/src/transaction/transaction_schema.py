import datetime

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import relationship

from database.base import Base, engine
from product.product_schema import ProductSchema


class TransactionSchema(Base):
    __tablename__ = "transactions"
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True)
    order_id = Column(UUID, unique=True, nullable=False)
    product_id = Column(Integer, ForeignKey(ProductSchema.id), nullable=False)
    product: ProductSchema = relationship(ProductSchema)
    name = Column(String, nullable=False)
    phone_number = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    transaction_data = Column(JSONB, nullable=True)

    def __str__(self):
        return f"Order: {self.order_id}. Mobile: {self.phone_number}"


Base.metadata.create_all(engine)

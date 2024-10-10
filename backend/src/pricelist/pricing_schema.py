from sqlalchemy import Column, String, Integer, Text

from database.base import Base, engine


class PricingSchema(Base):
    __tablename__ = "pricing"
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True)
    image = Column(String, nullable=False)
    text = Column(Text, nullable=True)

    def __str__(self):
        return f"Pricing: {self.category}"


Base.metadata.create_all(engine)

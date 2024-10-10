from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, Boolean

from database.base import Base, engine


class AdminSchema(Base, UserMixin):
    __tablename__ = "admins"
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True)
    login = Column(String, nullable=False, unique=True)
    email = Column(String(255), nullable=True)
    password = Column(String, nullable=False)
    is_active = Column(Boolean, default=False)
    status = Column(Integer, nullable=False, default=0)
    has_role = Column(String, nullable=True, default="user")

    def __str__(self):
        return f"ACCOUNT_NAME: {self.login}."


Base.metadata.create_all(engine)

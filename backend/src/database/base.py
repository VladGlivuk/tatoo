from sqlalchemy.engine import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

from settings import pg_settings

DATABASE_URL = pg_settings.postgres
engine = create_engine(DATABASE_URL, connect_args={'sslmode': 'prefer'}, pool_size=20, max_overflow=0)
session_local = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()


def create_db():
    Base.metadata.create_all(engine)

from sqlmodel import SQLModel, create_engine
from sqlalchemy.orm import sessionmaker
from microscopes.models_microscope import Webcam_Config
from users.model_users import User_Table


db_name = "microscope"

psql_url = f"postgresql:///{db_name}"
engine = create_engine(psql_url)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

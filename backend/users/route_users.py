from fastapi import APIRouter
import sys
sys.path.append("..")
from database_connect import engine
from users.model_users import User_Table
from sqlmodel import Session
from pydantic import BaseModel
import os
from jose import JWTError, jwt
from utils.password import get_password_hash, verify_password
from dotenv import load_dotenv

router = APIRouter()
load_dotenv()
SECRET_KEY = os.environ['SECRET_KEY']

@router.post("/create")
def create_user(user: User_Table):
    user.password = get_password_hash(user.password)
    with Session(engine) as session:
        session.add(user)
        session.commit()
        session.refresh(user)
        return user

class Token(BaseModel):
    access_token: str
    token_type: str
class UserToken(BaseModel):
    login: str
    id: int


def create_access_token(data: dict):
    encoded_jwt = jwt.encode(data, SECRET_KEY, algorithm='HS256')
    return encoded_jwt

def get_user(login):
    with Session(engine) as session:
        result = session.execute(f"SELECT * FROM user_table WHERE login='{login}'").all()
        return result[0]

@router.get("/authenticate")
def authenticate_user(login: str, password: str):
    user = get_user(login)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return create_access_token({"login": user.login, "id": user.id})

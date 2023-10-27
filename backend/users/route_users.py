from fastapi import APIRouter, HTTPException
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
        if result:
            return result[0]
        return False


@router.post("/login/")
def authenticate_user(user: User_Table):
    print(user)
    
    db_user = get_user(user.login)
    if not db_user:
        return False
    if not verify_password(user.password, db_user.password):
        return False
    return create_access_token({"login": db_user.login, "id": db_user.id})

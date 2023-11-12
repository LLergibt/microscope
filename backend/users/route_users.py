from fastapi import APIRouter, HTTPException
from database_connect import engine
from users.model_users import User_Table
from sqlmodel import Session
from pydantic import BaseModel
import os
from jose import jwt
from utils.password import get_password_hash, verify_password
from dotenv import load_dotenv
from typing import Union, Any
from fastapi import Depends, HTTPException, status
from users.auth_bearer import JWTBearer
from users.auth_handler import signJWT


from jose import jwt
from pydantic import ValidationError


router = APIRouter(prefix="/user")
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



def get_user(login):
    with Session(engine) as session:
        result = session.execute(f"SELECT * FROM user_table WHERE login='{login}'").all()
        if result:
            return result[0]
        return False

@router.get("/")
def get_current_user(token: str = Depends(JWTBearer())):
    payload = jwt.decode(
        token, SECRET_KEY, algorithms="HS256"
    )
    user = get_user(payload['login'])
    
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not find user",
        )
    
    return {"login": user.login, "id": user.id}

@router.post("/login/")
def authenticate_user(user: User_Table):
    print(user)
    
    db_user = get_user(user.login)
    print(db_user)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not find user",
        )
    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect password",
        )
    return signJWT(db_user.login, db_user.id)

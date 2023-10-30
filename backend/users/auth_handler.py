from dotenv import load_dotenv
from jose import jwt
from typing import Dict
import os

load_dotenv()
SECRET_KEY = os.environ['SECRET_KEY']

def decodeJWT(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms="HS256")
        return decoded_token 
    except:
        return {}

def signJWT(id: int, login: str) -> str:
    payload = {
        "id": id,
        "login": login,
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

    return token

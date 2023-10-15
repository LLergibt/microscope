from typing import Union
from users.route_users import router as user_router
from microscopes.routes_microscope import router as microscope_router
from database_connect import create_db_and_tables

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
app.include_router(user_router)
app.include_router(microscope_router)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()


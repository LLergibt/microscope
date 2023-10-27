from typing import Union
from users.route_users import router as user_router
from microscopes.routes_microscope import router as microscope_router
from database_connect import create_db_and_tables
from fastapi.middleware.cors import CORSMiddleware




from fastapi import FastAPI

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5173"
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}
app.include_router(user_router)
app.include_router(microscope_router)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()



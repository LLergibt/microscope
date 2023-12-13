from microscopes.routes_microscope import router as microscope_router
from fastapi.middleware.cors import CORSMiddleware
import sys
sys.path.append('./microscopes')

from fastapi import FastAPI

origins = [
    "http://localhost",
    "http://localhost:3000",
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
app.include_router(microscope_router)




from fastapi import APIRouter
from .base import write_image
from fastapi.responses import StreamingResponse, FileResponse
from io import BytesIO
import cv2


router = APIRouter()


@router.post("/take-shot")
def take_shot(title: str):
    write_image(title)
    return FileResponse(f"{title}.png")
    #return StreamingResponse(image, media_type="image/png")


    #return StreamingResponse(img.read(), media_type="image/png")

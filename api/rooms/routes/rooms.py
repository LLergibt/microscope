from fastapi import APIRouter, HTTPException, Depends

from firebase_connect import db
from utils import get_firebase_user

router = APIRouter(prefix="/rooms")




@router.post("/stream")
def change_streaming(room_uid: str, user = Depends(get_firebase_user)):
    rooms_ref = db.collection("rooms").document(room_uid)
    room = rooms_ref.get()
    if user['uid'] in room.to_dict()['owners']:
        rooms_ref.set({"microscope_config": {"is_streaming": not room.to_dict()['microscope_config']['is_streaming']}}, merge=True)
    else:
        raise HTTPException(status_code=401)


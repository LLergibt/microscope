from fastapi import APIRouter
from .models_microscope import Offer, Webcam_Config
from fastapi.responses import StreamingResponse, FileResponse
from database_connect import engine
from aiortc import RTCPeerConnection, RTCSessionDescription
from sqlmodel import Session




from fastapi import Depends, HTTPException
from users.auth_bearer import JWTBearer
from aiortc.contrib.media import MediaPlayer, MediaRelay
import asyncio


router = APIRouter()
relay = None
webcam = None

def create_local_tracks(play_from=None):
    global relay, webcam

    if play_from:
        player = MediaPlayer(play_from)
        return player.audio, player.video
    else:
        options = {"framerate": "30", "video_size": "640x480"}
        if relay is None:
            webcam = MediaPlayer("/dev/video0", format="v4l2", options=options)
            relay = MediaRelay()
        return None, relay.subscribe(webcam.video)

@router.post("/offer")
async def offer(params: Offer):
    offer = RTCSessionDescription(sdp=params.sdp, type=params.type)

    pc = RTCPeerConnection()
    pcs.add(pc)

    @pc.on("connectionstatechange")
    async def on_connectionstatechange():
        print("Connection state is %s" % pc.connectionState)
        if pc.connectionState == "failed":
            await pc.close()
            pcs.discard(pc)

    # open media source
    audio, video = create_local_tracks()

    await pc.setRemoteDescription(offer)
    for t in pc.getTransceivers():
        if t.kind == "audio" and audio:
            pc.addTrack(audio)
        elif t.kind == "video" and video:
            pc.addTrack(video)

    answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)

    return {"sdp": pc.localDescription.sdp, "type": pc.localDescription.type}


pcs = set()
args = ''


@router.on_event("shutdown")
async def on_shutdown():
    # close peer connections
    coros = [pc.close() for pc in pcs]
    await asyncio.gather(*coros)
    pcs.clear()

@router.post("/translation")
def start_translation(token: str = Depends(JWTBearer())):
    with Session(engine) as session:
        result = session.execute(f"SELECT is_streaming FROM webcam_config").one()
        if result:
            not_is_streaming = not result["is_streaming"]
            session.execute(f"UPDATE webcam_config  set is_streaming={not_is_streaming}  WHERE id=1")
            session.commit()
            return not_is_streaming
        return False
@router.get("/translation")
def translation():
    with Session(engine) as session:
        result = session.execute(f"SELECT is_streaming FROM webcam_config").one()
        if result:
            return result
        return False





    #return StreamingResponse(img.read(), media_type="image/png")

from typing import Union
import asyncio
from users.route_users import router as user_router
from microscopes.routes_microscope import router as microscope_router
from database_connect import create_db_and_tables
from pydantic import BaseModel
from aiortc import RTCPeerConnection, RTCSessionDescription
from aiortc.contrib.media import MediaPlayer, MediaRelay
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

relay = None
webcam = None

class Offer(BaseModel):
    sdp: str
    type: str

@app.get("/")
def read_root():
    return {"Hello": "World"}
app.include_router(user_router)
app.include_router(microscope_router)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()


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

@app.post("/offer")
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


@app.on_event("shutdown")
async def on_shutdown():
    # close peer connections
    coros = [pc.close() for pc in pcs]
    await asyncio.gather(*coros)
    pcs.clear()

from fastapi import APIRouter, WebSocket
from .models_microscope import Offer
from .movement_microscope import junk_is_about_to_start_moving
from motion_utils.motor_movement import main
from aiortc import RTCPeerConnection, RTCSessionDescription
import json

import time
from aiortc.contrib.media import MediaPlayer, MediaRelay
import asyncio

router = APIRouter(prefix="/webcam")
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


def set_move_config_by_key(key: str):
    axis = ''
    direction = ''
    match key:
        case 'ARROWUP':
            direction = "cw"
            axis = "y"
        case 'ARROWDOWN':
            direction = "acw"
            axis = "y"
        case 'ARROWRIGHT':
            direction = "cw"
            axis = "x"
        case 'ARROWLEFT':
            direction = "acw"
            axis = "x"
        case 'W':
            direction = "cw"
            axis = "z"
        case 'S':
            direction = "acw"
            axis = "z"
    return direction, axis


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    future = ''
    tasks = []
    while True:
        data = await websocket.receive_text()
        if data != 'Connection established':
            parse_data = json.loads(data)
            direction, axis = set_move_config_by_key(parse_data['direction'])
            match parse_data['move_status']:
                case 'start':
                    future = asyncio.ensure_future(main(direction, axis))
                    tasks.append({"task": future, "direction": parse_data['direction']})
                case 'stop':
                    for task in tasks:
                        if task['direction'] == parse_data['direction']:
                            task['task'].cancel()
                            tasks.remove(task)


pcs = set()
args = ''


@router.on_event("shutdown")
async def on_shutdown():
    # close peer connections
    coros = [pc.close() for pc in pcs]
    await asyncio.gather(*coros)
    pcs.clear()






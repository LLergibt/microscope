import axios from "axios";
let pc = null;
async function negotiate() {
  pc.addTransceiver("video", { direction: "recvonly" });
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  async function eventListener() {
    if (pc.iceGatheringState === "complete") {
      return true;
    } else {
      function checkState() {
        if (pc.iceGatheringState === "complete") {
          pc.removeEventListener("icegatheringstatechange", checkState);
        }
      }
      pc.addEventListener("icegatheringstatechange", checkState);
    }
  }
  await eventListener();

  async function queryToApi() {
    let offer = pc.localDescription;
    const result = await axios.post("http://localhost:8000/webcam/offer", {
      sdp: offer.sdp,
      type: offer.type,
    });
    return result.json();
  }
  const result = await queryToApi();

  pc.setRemoteDescription(result);
}
export async function start() {
  let config = {
    sdpSemantics: "unified-plan",
  };

  pc = new RTCPeerConnection(config);
  function onTrack(evt) {
    if (evt.track.kind == "video") {
      video.srcObject = evt.streams[0];
    }
  }
  pc.ontrack = onTrack;

  await negotiate();
}

export async function stop() {
  // close peer connection
  await pc?.close();
}

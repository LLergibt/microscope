import { Setter } from "solid-js";
import axios from "axios";
async function negotiate(pc: RTCPeerConnection) {
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
    if (offer) {
      const result = await axios.post("http://localhost:8000/webcam/offer", {
        sdp: offer.sdp,
        type: offer.type,
      });
      return result.data;
    }
  }
  const result = await queryToApi();

  pc.setRemoteDescription(result);
}
async function connect(
  pc: RTCPeerConnection | null,
  setVideo: Setter<HTMLVideoElement | undefined>
) {
  pc = new RTCPeerConnection();
  function onTrack(evt: RTCTrackEvent) {
    if (evt.track.kind == "video") {
      setVideo((video) => {
        if (video) {
          video.srcObject = evt.streams[0];
          return video;
        }
      });
    }
  }
  pc.ontrack = onTrack;

  await negotiate(pc);
}

function disconnect(pc: RTCPeerConnection | null) {
  // close peer connection
  pc?.close();
}

export const useNegotiate = (
  setVideo: Setter<HTMLVideoElement | undefined>
) => {
  let pc: RTCPeerConnection | null = null;
  const start = async () => await connect(pc, setVideo);
  const stop = () => disconnect(pc);

  return { start, stop };
};

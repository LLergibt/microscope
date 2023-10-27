import type { JSX, Component } from 'solid-js';
import { createSignal, createContext, createEffect, createResource } from 'solid-js';
import {useUser} from '../contexts/UserProvider'
type Component<P = {}> = (props: P) => JSX.Element;

const Translater: Component = () => {
  let video
  const {isAuthenticated} = useUser()

  const [count, setCount] = createSignal(0);
  const [isStreaming, setIsStreaming] = createSignal(false)
  let pc = null

  async function negotiate() {
      pc.addTransceiver('video', {direction: 'recvonly'});
      const offer = await pc.createOffer()
      const localDescription = await pc.setLocalDescription(offer)
      
      async function eventListener() {
          // wait for ICE gathering to complete
              if (pc.iceGatheringState === 'complete') {
                  return true
              } else {
                  function checkState() {
                      if (pc.iceGatheringState === 'complete') {
                          pc.removeEventListener('icegatheringstatechange', checkState);
                      }
                  }
                  pc.addEventListener('icegatheringstatechange', checkState);
              }
          };
      await eventListener()
      async function queryToApi() {
          let offer = pc.localDescription;
          const result = await fetch('http://localhost:8000/offer', {
              body: JSON.stringify({
                  sdp: offer.sdp,
                  type: offer.type,
              }),
              headers: {
                  'Content-Type': 'application/json'
              },
              method: 'POST'
          });
          return result.json()
      }
      const result = await queryToApi()
      pc.setRemoteDescription(result)
  }
  async function start() {
      const config = {
          sdpSemantics: 'unified-plan'
      };
      pc = new RTCPeerConnection(config);

      // connect audio / video
      await pc.addEventListener('track', function(evt) {
          if (evt.track.kind == 'video') {
              video.srcObject = evt.streams[0]}
      });

      await negotiate();
      setIsStreaming(true)
  }

  function stop() {
      // close peer connection
      pc.close();
      setIsStreaming(false)
  }

  return (
  <>
    <div class="w-screen my-20 flex justify-center text-xl">
      {isAuthenticated() && <button  onClick={() => {isStreaming()? stop() : start()}}>
        {isStreaming()? 'stop': 'start'}
      </button>}
      <p>
      </p>
      <video id="video" ref={video} autoPlay>
      </video>
    </div>
  </>
  );
};
export default Translater

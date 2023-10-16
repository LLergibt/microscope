import type { JSX, Component } from 'solid-js';
import { createSignal, createEffect, createResource } from 'solid-js';
type Component<P = {}> = (props: P) => JSX.Element;

const Counter: Component = () => {
  let video
  const [count, setCount] = createSignal(0);
  const [isStreaming, setIsStreaming] = createSignal(false)
  var pc = null

  function negotiate() {
      pc.addTransceiver('video', {direction: 'recvonly'});
      return pc.createOffer().then(function(offer) {
          return pc.setLocalDescription(offer);
      }).then(function() {
          // wait for ICE gathering to complete
          return new Promise(function(resolve) {
              if (pc.iceGatheringState === 'complete') {
                  resolve();
              } else {
                  function checkState() {
                      if (pc.iceGatheringState === 'complete') {
                          pc.removeEventListener('icegatheringstatechange', checkState);
                          resolve();
                      }
                  }
                  pc.addEventListener('icegatheringstatechange', checkState);
              }
          });
      }).then(function() {
          var offer = pc.localDescription;
          return fetch('http://localhost:8000/offer', {
              body: JSON.stringify({
                  sdp: offer.sdp,
                  type: offer.type,
              }),
              headers: {
                  'Content-Type': 'application/json'
              },
              method: 'POST'
          });
      }).then(function(response) {
          return response.json();
      }).then(function(answer) {
          return pc.setRemoteDescription(answer);
      }).catch(function(e) {
          alert(e);
      });
  }
  function start() {
      var config = {
          sdpSemantics: 'unified-plan'
      };


      pc = new RTCPeerConnection(config);

      // connect audio / video
      pc.addEventListener('track', function(evt) {
          if (evt.track.kind == 'video') {
              video.srcObject = evt.streams[0]

          }       });

      negotiate();
      setIsStreaming(true)
  }

  function stop() {
      // close peer connection
      setTimeout(function() {
          pc.close();
          setIsStreaming(false)
      }, 500);
  }

  return (
  <>
    <button  onClick={() => {isStreaming()? stop() : start()}}>
      {isStreaming()? 'stop': 'start'}
    </button>
    <video id="video" ref={video} autoPlay>
    </video>
  </>
  );
};
export default Counter

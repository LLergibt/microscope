import {
  useKeyDownList,
  useCurrentlyHeldKey,
} from "@solid-primitives/keyboard";
import { createEffect, createSignal } from "solid-js";

export const useMovement = () => {
  const socket = new WebSocket("ws://127.0.0.1:8000/webcam/ws");
  socket.addEventListener("open", (event) => {
    socket.send("Connection established");
  });

  socket.addEventListener("message", (event) => {
    console.log("Message from server ", event.data);
  });
  const [moveList, setMoveList] = createSignal<Array<string>>([]);
  createEffect(() => {
    console.log(moveList());
  });

  const event = useKeyDownList();

  createEffect(() => {
    const e = event();

    if (e) {
      e.map((key) => {
        let acceptableKeys = [
          "ARROWUP",
          "ARROWDOWN",
          "ARROWLEFT",
          "ARROWRIGHT",
          "W",
          "S",
        ];
        if (acceptableKeys.includes(key)) {
          if (!moveList().includes(key)) {
            setMoveList((prev) => [...prev, key]);
            sendMoveConfig({ move_status: "start", direction: key });
          }
        }
      });
    }
    if (e.length < moveList().length) {
      const dataList = moveList();
      moveList().map((move, idx) => {
        if (!e.includes(move)) {
          dataList.splice(idx, 1);
          sendMoveConfig({ move_status: "stop", direction: move });
        }
      });
      setMoveList([...dataList]);
    }
  });

  const sendMoveConfig = (movementConfig: {
    move_status: string;
    direction: string;
  }) => {
    try {
      socket.send(JSON.stringify(movementConfig)); //send data to the server
    } catch (error) {
      console.log(error); // catch error
    }
  };
};

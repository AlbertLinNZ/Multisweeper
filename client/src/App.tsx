import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "../../shared/typings";
import GamePage from "./components/GamePage";
const SERVER_URL = "http://localhost:3000";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(SERVER_URL);

socket.on("connect", () => {
  console.log(`Client ${socket.id}`);
});

function App() {
  const [lastPong, setLastPong] = useState<number | null>(null);
  const [ponged, setPonged] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    left: 0,
    top: 0,
  });
  const windowSize: [number, number] = [window.innerWidth, window.innerHeight];

  useEffect(() => {
    socket.on("pong", (data) => {
      setLastPong(data);
      setPonged(true);
    });

    socket.on("allMouseActivity", (data) => {
      setMousePosition({
        left: data.coords.left * windowSize[0],
        top: data.coords.top * windowSize[1],
      });
      console.log(data.coords.left);
      console.log(data.coords.top);
    });
  }, [socket]);

  return (
    <>
      <GamePage
        socket={socket}
        mousePosition={mousePosition}
        windowSize={windowSize}
        ponged={ponged}
        lastPong={lastPong}
      />
    </>
  );
}

export default App;

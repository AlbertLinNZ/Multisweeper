import { useEffect, useState, MouseEvent } from "react";
import { Socket, io } from "socket.io-client";
import {
  ServerToClientEvents,
  ClientToServerEvents,
} from "../../shared/typings";
import Cursor from "./components/Cursor";
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
  const windowSize = [window.innerWidth, window.innerHeight];

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

  function handleMouseMove(e: MouseEvent) {
    socket.emit("mouseMove", {
      left: e.pageX / windowSize[0],
      top: e.pageY / windowSize[1],
    });
  }

  return (
    <>
      <Cursor left={mousePosition.left} top={mousePosition.top} />
      <div
        className="page text-purple space-y-3"
        onMouseMove={(e) => {
          handleMouseMove(e);
        }}
      >
        <h1 className="text-5xl font-semibold">Multisweeper</h1>
        <button
          className="bg-transparent py-2 px-4 border border-purple rounded font-semibold"
          onClick={() => {
            socket.emit("ping", new Date().toISOString());
          }}
        >
          {"Ping!"}
        </button>
        {
          <p className={ponged ? "visible" : "invisible"}>
            Pong! The server took {lastPong}ms to respond!
          </p>
        }
        <div>
          <h2>Width: {windowSize[0]}</h2>

          <h2>Height: {windowSize[1]}</h2>
        </div>
      </div>
    </>
  );
}

export default App;

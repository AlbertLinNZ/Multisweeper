import { MouseEvent } from "react";
import {
  ClientToServerEvents,
  Coordinates,
  ServerToClientEvents,
} from "../../../shared/typings";
import { Socket } from "socket.io-client";
import Cursor from "../components/Cursor";

interface Props {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  mousePosition: Coordinates;
  windowSize: [number, number];
  ponged: boolean;
  lastPong: number | null;
}

function handleMouseMove({ socket, windowSize }: Props, e: MouseEvent) {
  socket.emit("mouseMove", {
    left: e.pageX / windowSize[0],
    top: e.pageY / windowSize[1],
  });
}

const GamePage = ({
  socket,
  mousePosition,
  windowSize,
  ponged,
  lastPong,
}: Props) => {
  return (
    <>
      <Cursor left={mousePosition.left} top={mousePosition.top} />
      <div
        className="page text-purple space-y-3"
        onMouseMove={(e) => {
          handleMouseMove(
            { socket, mousePosition, windowSize, ponged, lastPong },
            e
          );
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
};

export default GamePage;

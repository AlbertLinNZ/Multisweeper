import { useState } from "react";
import { io } from "socket.io-client";
const SERVER_URL = "http://localhost:3000";

const socket = io(SERVER_URL);

socket.on("connect", () => {
  console.log(`Client ${socket.id}`);
});

function App() {
  const [lastPong, setLastPong] = useState<string | null>(null);
  const [ponged, setPonged] = useState(false);

  socket.on("pong", (data) => {
    setLastPong(data);
    setPonged(true);
  });

  return (
    <div className="page text-purple space-y-3">
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
    </div>
  );
}

export default App;

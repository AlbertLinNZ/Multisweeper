import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
const PORT = 3000;
const CLIENT_URL = ["http://localhost:5173", "http://localhost:4173"];

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(`Server ${socket.id}`);
  socket.on("ping", (data) => {
    let pingDate = new Date(data);
    let currentDate = new Date();
    socket.emit("pong", currentDate.getTime() - pingDate.getTime());
  });
});

httpServer.listen(PORT);
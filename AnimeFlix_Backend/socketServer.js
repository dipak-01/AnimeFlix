// socketServer.js
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  // Options if needed
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  // Handle other events...
});

const SOCKET_PORT = 3001; // Different from your main server's port
httpServer.listen(SOCKET_PORT, () =>
  console.log(`Socket.IO server running on port ${SOCKET_PORT}`)
);

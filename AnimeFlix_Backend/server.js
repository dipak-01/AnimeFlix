import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js"; // Assuming this is the path to your connectDB function
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import watchHistoryRoutes from "./routes/watchHistoryRoutes.js";
import watchListRoutes from "./routes/watchListRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";
import { connected } from "process";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.use(express.json());
app.use(cors());

connectDB();

app.use(authRoutes);
app.use(forumRoutes);
app.use(userRoutes);
app.use(watchHistoryRoutes);
app.use(watchListRoutes);

const PORT = process.env.PORT || 3000;
io.on("connection", (socket) => {
  socket.emit("logs", "Welcome to the server!");

  socket.on("user-connected", (name) => {
    socket.broadcast.emit("logs", `${name} has connected`);
  });

  socket.on("create-something", (message, callback) => {
    io.emit("foo", message);
    callback();
  });

  socket.on("user-disconnected", (name) => {
    socket.broadcast.emit("logs", `${name} has disconnected`);
  });

  socket.on("activity", (name) => {
    socket.broadcast.emit("activity", name);
  });
});

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));


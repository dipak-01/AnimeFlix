import express from "express";
import cors from "cors";
import { createServer } from "http"; // Import createServer from http module

import { Server } from "socket.io";
import connectDB from "./config/db.js"; // Assuming this is the path to your connectDB function
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import watchHistoryRoutes from "./routes/watchHistoryRoutes.js";
import watchListRoutes from "./routes/watchListRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";

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
app.use(watchHistoryRoutes); // Changed to avoid path conflict
app.use(watchListRoutes); // Changed to avoid path conflict

const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log("A user connected");

  io.emit("foo", "Welcome to the server!");

  // Handle other events from the client
  socket.on("create-something", (message, callback) => {
    io.emit("foo", `Received: ${message}`);
    callback();
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

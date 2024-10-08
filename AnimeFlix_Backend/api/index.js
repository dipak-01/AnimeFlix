import { app, httpServer } from "../server.js";
import cors from "cors";
import { Server } from "socket.io";
import connectDB from "../config/db.js"; // Assuming this is the path to your connectDB function
import authRoutes from "../routes/authRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import watchHistoryRoutes from "../routes/watchHistoryRoutes.js";
import watchListRoutes from "../routes/watchListRoutes.js";
import forumRoutes from "../routes/forumRoutes.js";
import express from "express";

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:4000", "https://anime-flix-two.vercel.app"],
    methods: ["GET", "POST"],
  },
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
  const welcomeMessage = {
    message: "Welcome to the server!!!",
    identifier: "miscellaneousMessage",
  };
  socket.emit("chatMessages", welcomeMessage);

  socket.on("user-connected", (name) => {
    const connectMessage = {
      message: `${name} has connected`,
      identifier: "miscellaneousMessage",
    };
    socket.broadcast.emit("chatMessages", connectMessage.message);
  });

  socket.on("create-something", (message, callback) => {
    try {
      const formattedMessage = {
        message: message.message,
        identifier: "msg",
        data: message.data,
        userId: socket.id,
      };
      socket.broadcast.emit("chatMessages", formattedMessage);

      // Optionally, also send the message back to the sender
      socket.emit("chatMessages", formattedMessage);
      // console.log("Emitted chatMessages:", formattedMessage);
      callback();
    } catch (err) {
      console.error("Error processing message:", err);
    }
  });

  socket.on("user-disconnected", (name) => {
    const disconnectMessage = {
      message: `${name} has disconnected`,
      identifier: "miscellaneousMessage",
    };
    socket.broadcast.emit("chatMessages", disconnectMessage.message);
  });

  socket.on("activity", (name) => {
    const activityMessages = {
      message: `${name}`,
      identifier: "activityMessage",
    };
    socket.broadcast.emit("activity", activityMessages.message);
  });
});

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

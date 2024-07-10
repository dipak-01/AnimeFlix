import express from "express";
import cors from "cors";
import connectDB from "./config/db.js"; // Assuming this is the path to your connectDB function
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import watchHistoryRoutes from "./routes/watchHistoryRoutes.js";
import watchListRoutes from "./routes/watchListRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use(authRoutes);
app.use(forumRoutes);
app.use(userRoutes);
app.use(watchHistoryRoutes); // Changed to avoid path conflict
app.use(watchListRoutes); // Changed to avoid path conflict

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

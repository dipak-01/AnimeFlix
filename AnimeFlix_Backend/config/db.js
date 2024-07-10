import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = async () => {
  const a=process.env.URI;
  if (!a) {
    console.error("Error: MONGODB_URI is not defined in the environment variables.");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;

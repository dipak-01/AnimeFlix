import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/auth_system_db");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.status(201).send("User registered");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ userId: user._id }, "jwt_secret");
    res.send({ token });
  } else {
    res.send(401).send("Invalid credentials");
  }
});

app.get("/user", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).send("No token provided");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "jwt_secret");
    const userId = decoded.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    res.status(401).send("Invalid or expired token");
  }
});

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const payload = jwt.verify(token, "jwt_secret");
      req.user = payload;
      next();
    } catch (error) {
      res.status(401).send("Unauthorize");
    }
  } else {
    res.status(401).send("Unauthorize");
  }
};

app.get("/protected", authMiddleware, (req, res) => {
  res.send("This is a protected route");
});
app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

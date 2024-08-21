import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// Register Function
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate all fields are provided
    if (!username || !email || !password) {
      return res.status(400).send("All fields are required.");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Invalid email format.");
    }

    //Check if the username is already in use
    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      return res.status(400).send("Username is already in use");
    }
    // Check if the email is already in use
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).send("Email is already in use");
    }

    // Hash the password and create the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Respond with success
    return res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).send("Error registering user");
  }
};

// Login Function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate both email and password are provided
    if (!email || !password) {
      return res.status(400).send("Email and Password are required");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Invalid email format");
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email");
    }

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).send("Check your Password and Try again");
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, "jwt_secret");
    return res.send({ message: "Login Successfull", token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send("Error logging in");
  }
};

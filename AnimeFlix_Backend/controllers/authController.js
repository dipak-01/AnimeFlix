import  bcrypt  from "bcrypt";
import  jwt  from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //all field are available
    if (!username || !email || !password) {
      return res.status(400).send("All fields are required.");
    }
    //validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Invalid email format.");
    }
    //email already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).send("Email is already in use");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error registering user");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("Email and Password are required");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send("Invalid email format");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("Invalid email");
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id }, "jwt_secret");
      return res.send({ token });
    } else {
      return res.status(401).send("Check your Password and Try again");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error logging in");
  }
};

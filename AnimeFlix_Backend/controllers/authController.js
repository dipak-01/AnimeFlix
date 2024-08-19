import {bcrypt} from "bcrypt";
import {jwt} from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).send("User registered");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error registering user");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user._id }, "jwt_secret");
      return res.send({ token });
    } else {
      return res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error logging in");
  }
};

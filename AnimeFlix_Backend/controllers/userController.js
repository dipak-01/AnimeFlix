import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
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
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(401).send("Invalid or expired token");
  }
};

export const updateUser = async (req, res) => {
  console.log("hgius");
  const { userName, oldPassword, newPassword, avatarUrl } = req.body;
  console.log(userName);
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
    if (userName) user.username = userName;

    if (oldPassword || newPassword) {
      const isPasswordCorrect = await bcrypt.compare(
        oldPassword,
        user.password
      );
      if (!isPasswordCorrect) {
        return res.status(401).send("Check your Password and Try again");
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }
    if (req.file) {
      const fieldName = req.file.fieldname;
      if (fieldName === "profileImage") {
        user.avatarUrl = req.file.path;
      }
    }
    await user.save();
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(401).send("Invalid or expired token");
  }
};

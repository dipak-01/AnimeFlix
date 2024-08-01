import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const payload = jwt.verify(token, "jwt_secret");
      req.user = payload;
      next();
    } catch (error) {
      return res.status(401).send("Unauthorized NIGH");
    }
  } else {
    return res.status(401).send("Unauthorized");
  }
};

export default authMiddleware;

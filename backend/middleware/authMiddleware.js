import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: "Unauthorized" });
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

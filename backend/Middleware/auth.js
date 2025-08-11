import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;

  if (!token) return res.status(401).json({ success: false, message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   req.userId = decoded.id; 

    next();
  } catch (err) {
    res.status(403).json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;

import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers.authorization;

    // No token
    if (!token) {
      return res.status(401).json({
        error: "No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save user id in request
    req.userId = decoded.id;

    next();
  } catch (err) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
};

export default auth;

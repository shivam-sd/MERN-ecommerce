const jwt = require("jsonwebtoken");

const authTokenMiddleware = async (req, res, next) => {
  try {
    let token;

    // Extract token from cookies if available
    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // Extract token from Authorization header if available
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1]; // Get token after "Bearer "
    }

    // If token is not found
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token not provided" });
    }
// console.log(req)
    // console.log("Token" , token)

    // Verify Token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Attach User ID to Request for Future Use
    req.userId = decoded.id;

    next(); // Call next middleware
  } catch (err) {
    console.error("JWT Error:", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired. Please log in again." });
    }

    res.status(403).json({ error: "Invalid token. Authentication failed." });
  }
};

module.exports = authTokenMiddleware;

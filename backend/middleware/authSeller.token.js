const jwt = require("jsonwebtoken");

const authSellerToken = async (req,res,next) => {
    try {
        // console.log(req)
        let sellertoken;
        // Extract token from cookies if available
        if (req.cookies?.Sellertoken) {
            sellertoken = req.cookies.Sellertoken;
        }
    
        // Extract token from Authorization header if available
        if (!sellertoken && req.headers.authorization?.startsWith("Bearer ")) {
            sellertoken = req.headers.authorization.split(" ")[1]; // Get token after "Bearer "
        }
    
        // If token is not found
        if (!sellertoken) {
          return res.status(401).json({ error: "Unauthorized: Sellertoken not provided" });
        }
    // console.log(req)
        // console.log("Token" , token) 
    
        // Verify Token
        const decoded = jwt.verify(sellertoken, process.env.SECRET_KEY);
    
        // Attach User ID to Request for Future Use
        req.sellerId = decoded.id;
    
        next(); // Call next middleware
      } catch (err) {
        console.error("JWT Error:", err.message);
    
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ error: "Sellertoken has expired. Please log in again." });
        }
    
        res.status(403).json({ error: "Invalid Sellertoken. Authentication failed." });
      }
}

module.exports = authSellerToken;
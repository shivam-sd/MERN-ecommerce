const sellerModel = require("../models/seller.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const sellerLoginController = async (req,res) => {
    try {
        const { email, password } = req.body;
    
        // Find user using email
        const seller = await sellerModel.findOne({ email });
    
        // If user not found
        if (!seller) {
          return res.status(401).json({ errors: "Please register first." });
        }
    
        // Compare passwords
        const isCorrectPassword = await bcrypt.compare(password, seller.password);
        if (!isCorrectPassword) {
          return res.status(401).json({ errors: "Invalid credentials." });
        }
    
        // Check if SECRET_KEY is set
        if (!process.env.SECRET_KEY) {
          throw new Error("Missing SECRET_KEY in environment variables");
        }
    
        // Generate JWT token with expiry time
        const Sellertoken = jwt.sign(
          { id: seller._id, email: seller.email },
          process.env.SECRET_KEY,
          { expiresIn: "8h" } // Token expires in 8 hour
        );
    
        // Set secure cookie with the token
        res.cookie("Sellertoken", Sellertoken, {
          httpOnly: true, // Prevents client-side access
          secure: process.env.NODE_ENV === "production", // Use secure flag in production
          sameSite: "Strict", // Prevents CSRF attacks
          maxAge: 3600000, // 1 hour
        }); 
    
        // Return success response
        res.status(200).json({
          message: "seller successfully logged in.",
          seller,
          Sellertoken,
        });
    
      } catch (err) {
        console.error("Login Error:", err);
        console.log(err.message);
        res.status(500).json({ errors: "Error in seller login.", details: err.message });
      }
}


module.exports = sellerLoginController;
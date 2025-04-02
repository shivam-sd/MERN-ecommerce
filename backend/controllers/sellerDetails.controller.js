const sellerModel = require("../models/seller.model");

const sellerDetailsController = async (req,res) => {
    try {
        // Extract userId from request (set by authTokenMiddleware)
        const sellerId = req.sellerId;
    
        // Find user in database by userId
        const seller = await sellerModel.findById(sellerId);
    
        // If user is not found
        if (!seller) {
          return res.status(404).json({ error: "Seller not found" });
        }
    
        // Successfully found user
        res.status(200).json({ message: "Seller details retrieved successfully", seller });
    
      } catch (err) {
        console.error("Error fetching seller details:", err.message);
        return res.status(500).json({ error: "Internal Server Error", details: err.message });
      }
}


module.exports = sellerDetailsController;
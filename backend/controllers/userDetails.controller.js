const userModel = require("../models/user.model");

const userDetailsController = async (req, res) => {
  try {
    // Extract userId from request (set by authTokenMiddleware)
    const userId = req.userId;

    // Find user in database by userId
    const user = await userModel.findById(userId);

    // If user is not found
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Successfully found user
    res.status(200).json({ message: "User details retrieved successfully", user });

  } catch (err) {
    console.error("Error fetching user details:", err.message);
    return res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};

module.exports = userDetailsController;

const sellerLogoutController = async (req,res) => {
    try {
        res.clearCookie("Sellertoken", {
          httpOnly: true,
          secure: true, // Use true in production (HTTPS)
          sameSite: "None",
        });
        return res.status(200).json({ message: "Seller logged out successfully" });
      } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({ error: "Logout failed. Please try again." });
      }
}



module.exports = sellerLogoutController;
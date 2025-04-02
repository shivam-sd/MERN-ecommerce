const sellerModel = require("../models/seller.model");
const bcrypt = require("bcrypt");

const sellerRegisterController =  async (req,res) => {
    const { name, email, phone, businessType, password } = req.body;

  try {
    // Check if user already exists
    const ifSellerExist = await sellerModel.findOne({ email });
    if (ifSellerExist) {
      return res.status(409).json({ errors: "Seller already exists..." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const seller = await sellerModel.create({
      name,
      email,
      phone,
      businessType,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "Seller Successfully Registered", seller });

  } catch (err) {
    console.error("Error in SellerRegisterController:", err);
    return res.status(400).json({ errors: "Error In Register Seller", details: err.message });
  }
}


module.exports = sellerRegisterController;
const mongoose = require("mongoose");

const ConnectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database Connected To MongoDB Atlas");
  } catch (err) {
    console.error("Error in Database Connection:", err.message);
    process.exit(1);
  }
};

module.exports = ConnectToDB;

const express = require("express");
const router = express.Router();
const sellerDetailsController = require("../controllers/sellerDetails.controller");
const authSellerToken = require("../middleware/authSeller.token");

router.get("/details" , authSellerToken, sellerDetailsController);

module.exports = router
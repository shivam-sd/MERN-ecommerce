const express = require("express");
const router = express.Router();
const sellerDetailsController = require("../controllers/sellerDetails.controller");


router.get("/seller-details" , sellerDetailsController);

module.exports = router
const express = require("express");
const router = express.Router();
const sellerRegisterController = require("../controllers/sellerRegister.controller");

router.post("/register",sellerRegisterController);


module.exports = router; 
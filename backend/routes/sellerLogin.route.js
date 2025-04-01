const express = require("express");
const router = express.Router();
const sellerLoginController = require("../controllers/sellerLogin.controller");

router.post("/seller-login",sellerLoginController);


module.exports = router;
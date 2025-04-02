const express = require("express");
const router = express.Router();
const sellerLogoutController = require("../controllers/sellerLogout.Controller");


router.get("/logout", sellerLogoutController);


module.exports = router;
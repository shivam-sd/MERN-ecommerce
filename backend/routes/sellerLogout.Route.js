const express = require("express");
const router = express.Router();
const sellerLogoutController = require("../controllers/sellerLogout.Controller");


router.get("/seller-logout", sellerLogoutController);


module.exports = router;
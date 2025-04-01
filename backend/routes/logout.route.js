const express = require("express");
const router = express.Router();
const  logoutController  = require("../controllers/logout.controller"); // Ensure function is imported correctly

router.get("/logout", logoutController); // Call the function, not the entire module

module.exports = router;

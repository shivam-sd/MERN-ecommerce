const express = require("express");
const router = express.Router();
const RegisterController = require("../controllers/register.controller");

router.post("/register" , RegisterController);

module.exports = router;
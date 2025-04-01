const express = require("express");
const router = express.Router();
const userDetailsController = require("../controllers/userDetails.controller");
const authTokenMiddleware = require("../middleware/authToken");

router.get("/details" , authTokenMiddleware , userDetailsController);

module.exports = router;
const express = require("express");
const router = express.Router();
const userDetailsController = require("../controllers/userDetails.controller");
const authTokenMiddleware = require("../middleware/authToken");
const AllUsersController = require("../controllers/AllUsers.Controller");

router.get("/details" , authTokenMiddleware , userDetailsController);
router.get("/all-users" , AllUsersController);

module.exports = router;
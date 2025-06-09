const express = require("express");
const {productController , getAllProduct} = require("../controllers/product.controller");
const router = express.Router();


router.post("/create", productController);
router.get("/all-products", getAllProduct);

module.exports = router;
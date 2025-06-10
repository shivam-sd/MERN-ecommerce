const express = require("express");
const {productController , getAllProduct, DeleteProductController} = require("../controllers/product.controller");
const router = express.Router();


router.post("/create", productController);
router.get("/all-products", getAllProduct);
router.get("/delete-product/:id", DeleteProductController);

module.exports = router;
const ProductModel = require("../models/product.model");
const cloudinary = require("cloudinary").v2;

const productController = async (req, res) => {
    try {
        const { productName, productBrand, productPrice, productDescription, productCategory } = req.body;

        // Validate all required fields
        if (!productName || !productBrand || !productPrice || !productDescription || !productCategory) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check for image file
        if (!req.files || !req.files.productImage) {
            return res.status(400).json({
                message: "Product image is required"
            });
        }

        const productImageFile = req.files.productImage;

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(productImageFile.tempFilePath);

        // Save product to DB
        const newProduct = await ProductModel.create({
            productName,
            productBrand,
            productPrice,
            productDescription,
            productImage: result.secure_url,
            productCategory
        });

        // Response
        res.status(201).json({
            message: "Product created successfully",
            product: newProduct
        });

    } catch (err) {
        console.error("Error in productController:", err);
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
};

const getAllProduct = async (req,res) => {
     try{
        const products = await ProductModel.find();
        if(!products || products.length === 0){
            return res.status(404).json({ message: "No products found" });
        }
        return res.status(200).json({message:"All Products Fetched Successfully", products});
    }catch(err){
        console.error("Error fetching all products:", err.message);
        return res.status(500).json({ error: "Internal Server Error", error: err.message });
    }
}


module.exports = {
    productController ,
    getAllProduct
};

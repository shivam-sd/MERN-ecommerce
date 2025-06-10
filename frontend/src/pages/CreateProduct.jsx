import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productBrand: "",
    productPrice: "",
    productDescription: "",
    productCategory: "",
  });
  const [productImage, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    data.append("productImage", productImage);

    try {
      const res = await axios.post(`${import.meta.env.VITE_USERS_BASE_URL}/products/create`, data);
      setMessage("✅ " + res.data.message);
      toast.success("product created successfully");
      setFormData({
        productName: "",
        productBrand: "",
        productPrice: "",
        productDescription: "",
        productCategory: "",
      });
      setProductImage(null);
      setPreviewImage(null);
      navigate("/admin/all-products");
    } catch (err) {
      setMessage((err.response?.data?.message || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Product</h2>

        {message && <div className="mb-4 text-sm text-blue-700">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl"
            required
            />
          <input
            type="text"
            name="productBrand"
            placeholder="Product Brand"
            value={formData.productBrand}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl"
            required
            />
          <input
            type="number"
            name="productPrice"
            placeholder="Product Price"
            value={formData.productPrice}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl"
            required
            />
          <textarea
            name="productDescription"
            placeholder="Product Description"
            value={formData.productDescription}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl"
            rows={3}
            required
            />
          <input
            type="text"
            name="productCategory"
            placeholder="Product Category"
            value={formData.productCategory}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-xl"
            required
            />

          <div>
            <label className="block mb-1 font-medium text-gray-700">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 p-2 rounded-xl"
              required
              />
            {previewImage && (
                <img src={previewImage} alt="Preview" className="mt-3 h-40 object-cover rounded-xl" />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl w-full transition duration-200"
            >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
    <Footer />
              </>
  );
};

export default CreateProduct;


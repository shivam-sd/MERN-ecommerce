import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_USERS_BASE_URL}/products/all-products`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setProducts(response.data.products || []);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  // Handle product delete
  const handleDelete = async (productId) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_USERS_BASE_URL}/products/delete-product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(res.data.message || "Product deleted successfully");

      // Update state
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting product");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center p-2 bg-white shadow-md">
        <h3 className="font-bold text-xl">All Products</h3>
        <Link
          to="/createProduct"
          className="text-xl font-bold bg-blue-600 rounded-sm text-white p-2"
        >
          Upload Product
        </Link>
      </div>

      <div className="w-full min-h-screen bg-gray-200 rounded-md flex justify-center p-3">
        <div className="bg-white rounded-md shadow-xl w-full h-auto p-2 flex flex-wrap gap-3 container mx-auto">
          {[...products].reverse().map((product) => (
            <div
              className="w-64 bg-gray-100 p-2 rounded-md relative"
              key={product._id}
            >
              <img
                src={product.productImage}
                className="rounded-md w-full h-40 object-cover"
                alt={product.productName}
              />
              <div className="flex flex-col mt-2 space-y-1 text-sm">
                <span><b>Product Name:</b> {product.productName}</span>
                <span><b>Price:</b> ₹{product.productPrice}</span>
                <span><b>Brand:</b> {product.productBrand}</span>
                <p><b>Description:</b> {product.productDescription}</p>
              </div>

              <button
                onClick={() => handleDelete(product._id)}
                className="text-2xl absolute top-2 right-2 text-red-500 cursor-pointer"
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProducts;

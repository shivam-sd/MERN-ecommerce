import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_USERS_BASE_URL}/products/all-products`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return toast.error(data.message || "Failed to fetch products");
        }

        setProducts(data.products || []);
        console.log("Fetched Products:", data.products);

      } catch (err) {
        toast.error(err.message || "Failed to fetch products", {
          position: "top-center",
        });
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full min-h-screen p-4 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
        <Link
          to="/createProduct"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-md"
        >
          + Create Product
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Brand</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Description</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product._id || index} className="hover:bg-gray-50">
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border">{product.productName}</td>
                  <td className="p-3 border">{product.productBrand}</td>
                  <td className="p-3 border">₹{product.productPrice}</td>
                  <td className="p-3 border">{product.productCategory}</td>
                  <td className="p-3 border">{product.productDescription}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;

import React from "react";
import { FaRegUser } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex gap-4 p-2 lg:pl-14 bg-gray-100">
      {/* Sidebar */}
      <aside className="w-80 h-full bg-white rounded-xl p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

        <div className="text-center mb-4 flex justify-center items-center mt-10 flex-col gap-3">
          <FaRegUser className="text-3xl" />
          <span className="ml-2 text-lg font-semibold">Admin Name</span>
        </div>

        <ul className="space-y-2">
          <li>
            <Link
              to="all-users"
              className="block p-2 hover:bg-gray-200 rounded-lg"
            >
              All Users
            </Link>
          </li>
          <li>
            <Link
              to="all-products"
              className="block p-2 hover:bg-gray-200 rounded-lg"
            >
              All Products
            </Link>
          </li>
        </ul>
        <button
          onClick={() => navigate("/")}
          className="mt-4 w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-500 transition duration-300">
            Go to Home
          </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white rounded-xl p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;

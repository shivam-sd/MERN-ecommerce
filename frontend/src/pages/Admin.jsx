import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Admin = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row gap-4 p-2 lg:pl-14 bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-white rounded-xl p-4">
        <h2 className="text-2xl font-bold mb-4 text-center lg:text-left">Admin Dashboard</h2>

        <div className="text-center mb-6 flex justify-center items-center flex-col gap-3">
          <FaRegUser className="text-3xl" />
          <span className="text-lg font-semibold">Admin Name</span>
        </div>

        <ul className="space-y-2 text-center lg:text-left">
          <li>
            <Link
              to="all-users"
              className="block p-2 hover:bg-gray-200 rounded-lg transition"
            >
              All Users
            </Link>
          </li>
          <li>
            <Link
              to="all-products"
              className="block p-2 hover:bg-gray-200 rounded-lg transition"
            >
              All Products
            </Link>
          </li>
        </ul>

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-500 transition"
        >
          Go to Home
        </button>
      </aside>

      {/* Main Content */}
      <main className="w-full flex-1 bg-white rounded-xl p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;

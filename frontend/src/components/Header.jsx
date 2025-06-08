import React from "react";
import logo from "../assets/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";

const Header = () => {
  const user = useSelector((state) => state?.user?.user?.user);
  const seller = useSelector((state) => state?.seller?.seller);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USERS_BASE_URL}/users/logout`,
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      localStorage.removeItem("token");
      toast.success(data.message || "User Logged out");
      dispatch(setUserDetails(null));
      navigate("/users-login");
      window.location.reload(); // refresh the page after logout
    } catch (err) {
      toast.error(err.message || "Logout failed");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-full p-2">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            loading="lazy"
            className="lg:w-24 md:w-24 w-16"
          />
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center">
          <input
            type="text"
            placeholder="Search Here"
            className="border-2 border-red-300 w-80 h-10 outline-none focus-within:shadow-xl p-2 text-md rounded-l-full"
          />
          <div className="bg-red-700 w-10 h-10 p-1 rounded-r-full flex items-center justify-center cursor-pointer">
            <IoSearchSharp className="text-white text-xl" />
          </div>
        </div>

        {/* Icons and Actions */}
        <div className="flex items-center gap-2 lg:gap-6 text-2xl relative">
          {/* User */}
          <div className="relative group">
            {user ? (
              <div className="flex flex-col items-center">
                <span className="text-sm font-semibold cursor-pointer">{user.name}</span>
                <Link
                  to="/user-profile"
                  className="text-md hidden group-hover:block duration-400 rounded p-2 font-semibold mt-6 text-center absolute"
                >
                  Profile
                </Link>
              </div>
            ) : (
              <FaRegUserCircle />
            )}
          </div>

          {/* Seller */}
          <div className="relative group">
            {seller ? (
              <div className="flex flex-col items-center">
                <span className="text-sm font-semibold">
                  {seller?.seller?.name}
                </span>
                <Link
                  to="/seller-profile"
                  className="text-sm hidden group-hover:block bg-gray-100 rounded p-1 font-semibold mt-1 text-center"
                >
                  Profile
                </Link>
              </div>
            ) : (
              <FaRegUserCircle className="opacity-0" />
            )}
          </div>

          {/* Cart */}
          <div className="relative cursor-pointer">
            <FaShoppingCart />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </div>

          {/* Login / Logout */}
          <div className="text-sm">
            {user || seller ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-1 rounded-md text-white font-semibold hover:bg-red-500 duration-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login-option"
                className="bg-blue-600 px-3 py-1 rounded-md text-white font-semibold hover:bg-blue-500 duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

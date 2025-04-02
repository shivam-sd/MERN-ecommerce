import React from "react";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state?.user?.user?.user);
  const seller = useSelector((state) => state?.seller?.seller);
  const dispatch = useDispatch();

  console.log("User Header ", user);
  console.log("Seller Header ", seller);

  

  return (
    <div>
      <header className="h-16 shadow-md">
        <div className=" container mx-auto flex items-center justify-between h-full lg:p-2 md:p-2 p-2">
          <div className="logo">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                loading="lazy"
                className="lg:w-24 md:w-24 w-16"
              />
            </Link>
          </div>
          <div className="hidden lg:flex items-center">
            <input
              type="text"
              placeholder="Search Here"
              className="border-2 border-red-300 w-80 h-10 outline-none focus-within:shadow-xl p-2 text-md rounded-l-full"
            />
            <div className="bg-red-700 w-10 h-10 p-1 rounded-r-full flex items-center justify-between cursor-pointer">
              <IoSearchSharp className="text-white text-xl" />
            </div>
          </div>
          <div className="icons flex items-center justify-center lg:gap-6 gap-4">
            {/* for use */}
            <div className="user text-3xl cursor-pointer">
              {user ? (
                <div className="group absolute lg:right-52 md:right-52 right-36 lg:top-4 md:top-4 top-3 flex flex-col gap-2">
                  <b className="text-2xl flex justify-center items-center border border-sky-100 rounded font-AfacadFlux p-1">
                    {user?.name}
                  </b>
                  <Link
                    to="/user-profile"
                    className="text-md font-bold font-AfacadFlux bg-gray-200 rounded-sm cursor-pointer hidden group-hover:block p-1 text-center"
                  >
                    Profile
                  </Link>
                </div>
              ) : (
                <><FaRegUserCircle className="" /></>
              )}
            </div>

            {/* for seller */}

            <div className="user text-3xl cursor-pointer">
              {seller ? (
                <div className="group absolute lg:right-52 md:right-52 right-36 lg:top-4 md:top-4 top-3 flex flex-col gap-2">
                  <b className="text-2xl flex justify-center items-center border border-sky-100 rounded font-AfacadFlux p-1">
                    {seller?.seller?.name}
                  </b>
                  <Link
                    to="/seller-profile"
                    className="text-sm font-bold font-AfacadFlux bg-gray-200 rounded-sm cursor-pointer hidden group-hover:block p-1 text-center"
                  >
                    Profile
                  </Link>
                </div>
              ) : (
                <><FaRegUserCircle className=" opacity-0" /></>
              )}

              
            </div>
            <div className="cards text-3xl relative cursor-pointer">
              <span>
                <FaShoppingCart />
              </span>
              <div className="text-sm text-white flex items-center justify-center absolute -top-1 right-0 rounded-full">
                <span className="bg-red-500 rounded-full">0</span>
              </div>
            </div>
            <div className="login">
              {user?._id ? (
                <>
                  {" "}
                  <button
                    // to="/users-login"
                    className="bg-red-500 p-1 text-lg rounded-md text-white cursor-pointer font-bold duration-300 hover:bg-blue-500"
                  >
                    Connect With Us
                  </button>
                </>
              ) : (
                <>
                  {" "}
                  <Link
                    to="/login-option"
                    className="bg-blue-600 p-1 text-lg rounded-md text-white cursor-pointer font-bold duration-300 hover:bg-blue-500"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
            
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

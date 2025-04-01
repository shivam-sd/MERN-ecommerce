import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleFormData = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return toast.error("Password and Confirm Password do not match!", {
        position: "top-center",
      });
    }

    // Check if all required fields are filled
    if (!name || !email || !phone || !password || !confirmPassword) {
      return toast.error("All fields are required!", {
        position: "top-center",
      });
    }

    const userData = {
      name,
      email,
      phone,
      password,
    };

    try {
      console.log("User Data Register", userData);
      const response = await axios.post(
        `${import.meta.env.VITE_USERS_BASE_URL}/users/register`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message || "Registration successful!");
      navigate("/users-login");
    } catch (err) {
      console.error("Registration Error:", err);
      toast.error(err.response?.data?.errors || "Registration failed. Try again!", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="mx-auto container flex justify-between flex-col">
      <Header />
      <div className="forms lg:h-auto md:h-auto lg:flex lg:items-center lg:justify-center mt-8">
        <form
          onSubmit={handleFormData}
          className="border border-gray-400 h-auto p-4 flex flex-col rounded-sm relative lg:overflow-auto overflow-y-scroll"
        >
          <h1 className="flex items-center justify-center gap-2 text-xl font-bold">
            <FaUserAlt />
            User Signup
          </h1>
          
          <label className="mt-3 text-xl" htmlFor="name">Full Name:</label>
          <input
            className="mt-1 lg:w-80 md:w-80 h-8 rounded-sm text-lg pl-1 outline-none focus-within:shadow-md border border-slate-400"
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter Your Full Name" // ✅ Fixed placeholder
          />

          <label className="mt-3 text-xl" htmlFor="email">Email:</label>
          <input
            className="mt-1 lg:w-80 md:w-80 h-8 rounded-sm text-lg pl-1 outline-none focus-within:shadow-md border border-slate-400"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter Your Email"
          />

          <label className="mt-3 text-xl" htmlFor="phone">Phone Number:</label>
          <input
            className="mt-1 lg:w-80 md:w-80 h-8 rounded-sm text-lg pl-1 outline-none focus-within:shadow-md border border-slate-400"
            type="number"
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            placeholder="Enter Your Phone Number"
          />

          <label className="mt-3 text-xl" htmlFor="password">Password:</label>
          <input
            className="mt-1 lg:w-80 md:w-80 h-8 rounded-sm text-lg pl-1 outline-none focus-within:shadow-md border border-slate-400"
            type="password"
            id="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="mt-3 text-xl" htmlFor="Confirmpassword">Confirm Password:</label>
          <input
            className="mt-1 lg:w-80 md:w-80 h-8 rounded-sm text-lg pl-1 outline-none focus-within:shadow-md border border-slate-400"
            type="password"
            id="Confirmpassword"
            placeholder="Confirm Your Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-1 text-xl cursor-pointer duration-300 hover:bg-blue-500 mt-2 active:scale-90"
          >
            Register
          </button>

          <p className="flex items-center justify-center mt-1 font-bold">
            Already have an account?
            <Link
              to="/users-login"
              className="duration-300 hover:underline hover:text-red-500 ml-1 font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;

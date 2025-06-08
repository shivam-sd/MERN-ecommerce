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

    // Validation
    if (!name || !email || !phone || !password || !confirmPassword) {
      return toast.error("All fields are required!", {
        position: "top-center",
      });
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!", {
        position: "top-center",
      });
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USERS_BASE_URL}/users/register`,
        { name, email, phone, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message || "Registration successful!");
      navigate("/users-login");
    } catch (err) {
      console.error("Registration Error:", err);
      const errorMsg =
        err?.response?.data?.errors ||
        err?.response?.data?.message ||
        "Registration failed!";
      toast.error(errorMsg, { position: "top-center" });
    }
  };

  return (
    <div className="mx-auto container flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex items-center justify-center mt-8">
        <form
          onSubmit={handleFormData}
          className="border border-gray-300 shadow-md p-6 rounded-md w-full max-w-md bg-white"
        >
          <h1 className="flex items-center justify-center gap-2 text-2xl font-bold mb-4">
            <FaUserAlt />
            User Signup
          </h1>

          {/* Name */}
          <label htmlFor="name" className="text-lg font-medium">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            className="mt-1 w-full h-10 px-3 border rounded outline-none focus:shadow-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Email */}
          <label htmlFor="email" className="text-lg font-medium mt-4 block">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="mt-1 w-full h-10 px-3 border rounded outline-none focus:shadow-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Phone */}
          <label htmlFor="phone" className="text-lg font-medium mt-4 block">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            className="mt-1 w-full h-10 px-3 border rounded outline-none focus:shadow-md"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {/* Password */}
          <label htmlFor="password" className="text-lg font-medium mt-4 block">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="mt-1 w-full h-10 px-3 border rounded outline-none focus:shadow-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Confirm Password */}
          <label
            htmlFor="confirmPassword"
            className="text-lg font-medium mt-4 block"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className="mt-1 w-full h-10 px-3 border rounded outline-none focus:shadow-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-500 active:scale-95 transition-transform duration-150 w-full"
          >
            Register
          </button>

          {/* Login Link */}
          <p className="mt-3 text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/users-login"
              className="text-blue-600 hover:underline font-medium"
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

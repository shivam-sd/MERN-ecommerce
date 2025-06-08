import React, { useContext, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import Context from "../context/Context";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const ContextUserdetail = useContext(Context);

  const handleFormData = async (e) => {
    e.preventDefault();

    // Validation check
    if (!email || !password) {
      return toast.error("All fields are required!", { position: "top-center" });
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USERS_BASE_URL}/users/login`,
        { email, password }, // Sending user data correctly
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // ✅ Corrected `credentials` placement
        }
      );

      const data = response.data;
      localStorage.setItem("token", data.token);
      console.log("Login Successful:", data);

      toast.success(data.message || "Login successful!", {
        position: "top-center",
      });
      navigate("/");
      ContextUserdetail.fetchUsersDetails();

    } catch (err) {
      console.error("Login Error:", err);
      toast.error(err.response?.data?.errors || "Login failed. Try again!", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="mx-auto h-screen  container flex flex-col justify-between">
      <Header />
      <div className="forms lg:h-screen md:h-auto lg:flex lg:items-center lg:justify-center ">
        <form
          onSubmit={handleFormData}
          className="border border-gray-400 h-auto p-4 flex flex-col rounded-sm relative"
        >
          <h1 className="flex items-center justify-center gap-2 text-xl font-bold">
            <FaUserAlt />
            User Login
          </h1>

          <label className="mt-3 text-xl" htmlFor="email">
            Email:
          </label>
          <input
            className="mt-1 lg:w-80 md:w-80 h-8 rounded-sm text-lg pl-1 outline-none focus-within:shadow-md border border-slate-400"
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter Your Email"
          />

          <label className="mt-3 text-xl" htmlFor="password">
            Password:
          </label>
          <input
            className="mt-1 lg:w-80 md:w-80 h-8 rounded-sm text-lg pl-1 outline-none focus-within:shadow-md border border-slate-400 relative"
            type="password"
            id="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link
            to="/forgot-password"
            className="flex items-center justify-end mt-1 duration-300 hover:underline hover:border-red-400 hover:text-red-500 cursor-pointer"
          >
            Forgot Password?
          </Link>

          <button
            type="submit"
            className="bg-blue-600 text-white p-1 text-xl cursor-pointer duration-300 hover:bg-blue-500 mt-2 active:scale-90"
          >
            Login
          </button>

          <p className="flex items-center justify-center mt-1">
            Don't have an account?{" "}
            <Link to="/users-register" className="duration-300 hover:underline ml-1">
              Sign up
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Option from "./pages/Option";
import ForgotPage from "./pages/ForgotPage";
import Context from "./context/Context";
import UserProfile from "./pages/ProfleUser";
import axios from "axios";
import { setUserDetails } from "./store/userSlice";
import { setSellerDetails } from "./store/sellerSlice";
import AllProducts from "./pages/AllProducts";
import AllUsers from "./pages/AllUsers";
import SellerRegister from "./pages/SellerRegister";
import SellerLogin from "./pages/SellerLogin";
import SellerProfile from "./pages/SellerProfile";
import "./App.css";
import { useDispatch } from "react-redux";

function App() {
  const [user, setUser] = useState(null);
  const [seller, setSeller] = useState(null);
  const dispatch = useDispatch();

  // Fetch user details
  const fetchUsersDetails = async () => {
    try {
      let token = localStorage.getItem("token"); // Get token from localStorage

      if (!token) {
        return; // No token means user is not logged in
      }

      const response = await axios.get(`${import.meta.env.VITE_USERS_BASE_URL}/users/details`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Correct way to send token
        },
      });
     console.log("User Data ",response.data.user);
      setUser(response.data.user); // Set user data
      dispatch(setUserDetails(response.data)); // give data userSlice usign redux toolkit

    } catch (err) {
      console.error("Error fetching user details:", err);
      toast.error(err.response?.data?.errors || "Go to Login", {
        position: "top-center",
      });
    }
  }; 

  // fetch seller details

  const fetchsellerdetails = async () => {
    try {
      let sellertoken = localStorage.getItem("SellerToken"); // Get token from localStorage

      if (!sellertoken) {
        return; // No token means user is not logged in
      }

      const response = await axios.get(`${import.meta.env.VITE_USERS_BASE_URL}/seller/details`, {
        headers: {
          Authorization: `Bearer ${sellertoken}`,  // Correct way to send token
        },
      });
     console.log("Seller Data ",response.data.seller);
      setSeller(response.data.seller); // Set seller data
      dispatch(setSellerDetails(response.data)); // give data userSlice usign redux toolkit

    } catch (err) {
      console.error("Error fetching seller details:", err);
      toast.error(err.response?.data?.errors || "Go to Login", {
        position: "top-center",
      });
    }
  }; 

  useEffect(() => {
    fetchUsersDetails();
    fetchsellerdetails();
  }, []);

  return (
    <>
      <div>
      <Context.Provider value={{user, fetchUsersDetails , seller, fetchsellerdetails}}>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users-register" element={<Register />} />
            <Route path="/users-login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPage />} />
            <Route path="/login-option" element={<Option />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/seller-register" element={<SellerRegister />} />
            <Route path="/seller-login" element={<SellerLogin />} />
            <Route path="/seller-profile" element={<SellerProfile />} />
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/all-products" element={<AllProducts />} />
          </Routes>
        </Context.Provider>
      </div>
    </>
  );
}

export default App;

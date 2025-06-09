import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Option from "./pages/Option";
import ForgotPage from "./pages/ForgotPage";
import UserProfile from "./pages/ProfleUser";
import SellerRegister from "./pages/SellerRegister";
import SellerLogin from "./pages/SellerLogin";
import SellerProfile from "./pages/SellerProfile";
import AllProducts from "./pages/AllProducts";
import AllUsers from "./pages/AllUsers";
import Admin from "./pages/Admin";
import CreateProduct from "./pages/CreateProduct";

// Store
import { setUserDetails } from "./store/userSlice";
import { setSellerDetails } from "./store/sellerSlice";

// Context
import Context from "./context/Context";
import EditUserByAdmin from "./pages/EditUserByAdmin";

function App() {
  const [user, setUser] = useState(null);
  const [seller, setSeller] = useState(null);
  const dispatch = useDispatch();

  // ✅ User fetch
  const fetchUsersDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get(
        `${import.meta.env.VITE_USERS_BASE_URL}/users/details`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("User Data", response.data.user);
      setUser(response.data.user);
      dispatch(setUserDetails(response.data));
    } catch (err) {
      console.error("Error fetching user details:", err);
      toast.error(err.response?.data?.errors || "Go to Login", {
        position: "top-center",
      });
    }
  };

  // ✅ Seller fetch
  const fetchsellerdetails = async () => {
    try {
      const sellertoken = localStorage.getItem("SellerToken");
      if (!sellertoken) return;

      const response = await axios.get(
        `${import.meta.env.VITE_USERS_BASE_URL}/seller/details`,
        { headers: { Authorization: `Bearer ${sellertoken}` } }
      );

      console.log("Seller Data", response.data.seller);
      setSeller(response.data.seller);
      dispatch(setSellerDetails(response.data));
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
    <Context.Provider value={{ user, fetchUsersDetails, seller, fetchsellerdetails }}>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/users-register" element={<Register />} />
        <Route path="/users-login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPage />} />
        <Route path="/login-option" element={<Option />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/seller-register" element={<SellerRegister />} />
        <Route path="/seller-login" element={<SellerLogin />} />
        <Route path="/seller-profile" element={<SellerProfile />} />
        <Route path="/user/:id" element={<EditUserByAdmin />} />
        <Route path="/createProduct" element={<CreateProduct />} />

        {/* Optional: Public admin data (can remove if protected) */}
        <Route path="/all-users" element={<AllUsers />}>
        </Route>
        <Route path="/all-products" element={<AllProducts />} />

        {/* Admin Nested Routes */}
        <Route path="/admin" element={<Admin />}>
        <Route index element={<AllUsers />} />
          <Route path="all-users" element={<AllUsers />} />
          <Route path="all-products" element={<AllProducts />} />
        </Route>
      </Routes>
    </Context.Provider>
  );
}

export default App;

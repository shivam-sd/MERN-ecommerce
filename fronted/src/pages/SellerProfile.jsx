import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setSellerDetails } from "../store/sellerSlice";
import {toast} from "react-toastify";
import axios from "axios";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const SellerProfile = () => {
  const seller = useSelector((state) => state?.seller?.seller);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //seller logout function
    const handleLogutUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/seller/logout`, {
          withCredentials: "include",
        });
        const data = response.data;
        localStorage.removeItem("SellerToken");
        console.log("logout", response);
        toast.success(data.message || "Seller Logged out");
        dispatch(setSellerDetails(null));
        navigate("/seller-login");
        window.location.reload(); // refresh the page after user logout
      } catch (err) {
        return toast.error(err.message || "Seller Not Logout");
      }
    };

  return (
    <div>
      <Header />
      <div className="w-full h-screen p-5 lg:flex lg:gap-6 grid grid-cols-1 lg:grid-cols-2 md:grid-cols-3 bg-gray-200 mb-8">
        <aside className="bg-white w-96 rounded-lg flex items-center flex-col p-4 gap-3">
          <span className="font-bold font-AfacadFlux text-2xl underline duration-200">
            Profile
          </span>
          <div className="profile w-24 h-24 border border-black rounded-full overflow-hidden">
            <img src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg" alt="" />
          </div>
          <div className="seller-information w-full flex flex-col items-center gap-3">
          <p className="font-AfacadFlux font-bold text-2xl">Name:- &nbsp;<span className="text-xl">{seller?.seller?.name}</span></p>
          <p className="font-AfacadFlux font-bold text-2xl">Role:-&nbsp;<span className="text-xl">{seller?.seller?.role}</span></p>
          <p className="font-AfacadFlux font-bold text-2xl">Email:-&nbsp;<span className="text-xl">{seller?.seller?.email}</span></p>
          <p className="font-AfacadFlux font-bold text-2xl">Phone:-&nbsp;<span className="text-xl">{seller?.seller?.phone}</span></p>
          </div>
          <button className="bg-red-500 mt-2 text-white p-2 rounded-md text-xl cursor-pointer font-AfacadFlux">Edit Your Profile</button>
          <button onClick={handleLogutUser} className="bg-red-500 mt-2 text-white p-2 rounded-md text-xl cursor-pointer font-AfacadFlux">Logout</button>
          <Link 
          to="/"
          className="font-AfacadFlux font-bold underline duration-150 text-xl">Back</Link>
        </aside>
        <main><span className="font-AfacadFlux font-bold text-2xl underline duration-200 hover:text-gray-600">All Products :-</span></main>
      </div>
      <Footer />
    </div>
  );
};

export default SellerProfile;

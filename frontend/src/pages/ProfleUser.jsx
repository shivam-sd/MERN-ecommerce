import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaUserCircle } from "react-icons/fa";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setUserDetails } from "../store/userSlice";
import { toast } from "react-toastify";

const UserProfile = () => {
  const user = useSelector((state) => state?.user?.user?.user);
  const dispatch = useDispatch();

  // useRef Ki sahayata se any item pe click karne per open another item
  const inputRefProfilePic = useRef(null);
  const [image, setImage] = useState("");

  // click another item and open file for upload profile pic
  const handleInputProfilePic = () => {
    inputRefProfilePic.current.click();
  };

  //every refresh page image will be load automatecally
  useEffect(() => {
    const profileImage = localStorage.getItem("profilePic");
    setImage(profileImage);
  }, []);

  // convert image base64 and save localStrorage
  const handleUploadProgilePic = (e) => {
    const file = e.target.files[0];
    if (file) {
      const render = new FileReader();
      render.readAsDataURL(file); // convert file base64
      render.onload = () => {
        const Base64Image = render.result;
        setImage(Base64Image);
        localStorage.setItem("profilePic", Base64Image);
      };
    }
  };

  const navigate = useNavigate();

// user ko logout kraya ja rha hai
  const handleLogutUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_USERS_BASE_URL}/users/logout`, {
        withCredentials: "include",
      });
      const data = response.data;
      localStorage.removeItem("token");
      console.log("logout", response);
      toast.success(data.message || "User Logged out");
      dispatch(setUserDetails(null));
      navigate("/users-login");
      window.location.reload(); // refresh the page after user logout
    } catch (err) {
      return toast.error(err.message || "User Not Logout");
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100">
      <Header />
      <div className="p-4 pl-10">
        <aside
          className="w-full min-h-[80vh] bg-white rounded-lg flex flex-col items-center
         p-2 "
        >
          <b className="underline mb-5">Profile</b>
          <div className="profileImage cursor-pointer">
            <input
              type="file"
              className="hidden"
              ref={inputRefProfilePic}
              onChange={handleUploadProgilePic}
            />
            {image ? (
              <>
                <img src={image} alt="" className="w-24 h-24 rounded-full" />
              </>
            ) : (
              <>
                <FaUserCircle
                  className="text-7xl "
                  onClick={handleInputProfilePic}
                />
              </>
            )}
          </div>
          {user ? (
            <>
              <p className="font-bold text-3xl font-AfacadFlux">{user?.name}</p>
              <span className="text-xl mt-4">
                <span className="font-bold">Role :-</span> {user?.role}
              </span>
              <span className="text-xl mt-4">
                <span className="font-bold">Email :-</span> {user?.email}
              </span>
              <span className="text-xl mt-4">
                <span className="font-bold">Phone :-</span> {user?.phone}
              </span>
              <button className="text-white bg-red-500 rounded-md p-2 text-xl mt-6 font-AfacadFlux">
                Edit Your Profile
              </button>
            </>
          ) : (
            <></>
          )}
          {/* <div className="mt-8 w-full p-2 cursor-pointer">
          <Link to="/all-users" className="text-lg font-bold font-AfacadFlux">All Users</Link>
          <Link to="/all-products" className="text-lg font-AfacadFlux font-bold">All Products</Link>
          </div> */}

          <Link 
          className="text-lg p-1 bg-red-500 text-white font-AfacadFlux rounded-sm font-bold cursor-pointer mt-5 hover:bg-red-400 duration-200"
          to={"/admin"}
          >
            Go to Dashboard
          </Link>
          <button 
          className="text-lg p-1 bg-red-500 text-white font-AfacadFlux rounded-sm font-bold cursor-pointer mt-5 hover:bg-red-400 duration-200"
          onClick={handleLogutUser}
          >
            Logout
          </button>

          <Link
            to="/"
            className="mt-5 font-AfacadFlux text-2xl font-bold underline hover:text-blue-500 duration-200"
          >
            Back
          </Link>
        </aside>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;

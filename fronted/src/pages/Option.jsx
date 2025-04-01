import React from 'react'
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { IoManSharp } from "react-icons/io5";

const Option = () => {
  return (
    <div className="bg-gray-400 w-full h-screen">
    <div className="container mx-auto bg-[#FFF2AF] w-full h-screen flex items-center flex-col">
      <h1 className="text-center mt-20 text-2xl font-bold">Option For Login User or Seller</h1>
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-20 cursor-pointer ">
        <div className="bg-[#E195AB] p-2 border border-white w-40 h-36 duration-300 rounded-md hover:scale-105 mr-5 lg:mt-5 flex items-center justify-center">
          
          <Link to="/users-login" className="bg-blue-500 p-1 rounded-md text-white font-bold flex gap-2 items-center justify-between"><FaRegUser className="text-black"/> As A User</Link>
        </div>
        <div className="bg-[#E195AB] p-2 border border-white w-40 h-36 duration-300 rounded-md hover:scale-105 mt-5 flex items-center justify-center">
          <Link className="bg-blue-500 p-1 rounded-md text-white font-bold flex gap-2 items-center justify-between"> <IoManSharp className="text-black"/>As A Seller</Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Option

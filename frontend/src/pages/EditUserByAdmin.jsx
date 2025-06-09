import React from "react";

const EditUserByAdmin = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white p-4 rounded-sm border border-2-black ">
      <div className="flex flex-col gap-4 w-full max-w-md">
        <form action="" className="flex flex-col gap-4">
        <h1 className="text-xl font-bold underline">Edit By Admin Profile</h1>
        <input type="text" name="name" placeholder="Name" className="bg-black p-3 rounded text-white w-80" />
        <input type="text" name="email" placeholder="Email" className="bg-black p-3 rounded text-white w-80" />
        <input type="text" name="phone" placeholder="Phone" className="bg-black p-3 rounded text-white w-80" />
        <select name="role" id="role" className="bg-gray-400 p-3 rounded text-white w-80" >
          <option value="ROLE">ROLE</option>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button className="text-center w-80 font-bold bg-blue-600 p-2 rounded text-white text-xl cursor-pointer">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditUserByAdmin;

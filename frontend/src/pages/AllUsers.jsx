import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { toast  } from "react-toastify";
import { Outlet, Link } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_USERS_BASE_URL}/users/all-users`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          return toast.error(data.message || "Failed to fetch users");
        }

        setUsers(data.users || []); // ensure it's an array
        console.log("All Users Data", data.users);
      } catch (err) {
        toast.error(err.message || "Failed to fetch users", {
          position: "top-center",
        });
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="w-full h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md table-auto border-collapse">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-2 border">Index</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id || index} className="hover:bg-gray-50">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td
                    className={`p-2 border font-semibold ${
                      user.role === "admin" ? "text-green-600" : "text-blue-600"
                    }`}
                  >
                    {user.role}
                  </td>
                  <td className="p-2 border text-blue-500 hover:text-blue-700 cursor-pointer">
                    <Link to={`user/${user._id}`} ><MdEdit /></Link>
                  </td>
                </tr>
                
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;

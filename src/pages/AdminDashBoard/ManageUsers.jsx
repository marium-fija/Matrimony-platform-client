import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaUserCheck } from "react-icons/fa";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import Loading from '../Loading';
import useAxios from '../../hooks/useAxios';

const ManageUsers = () => {
    const axios = useAxios();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users with server-side search
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users", searchTerm],
    queryFn: async () => {
      const res = await axios.get(`/users?search=${searchTerm}`);
      return res.data;
    },
  });

  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to make this user an admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, make admin",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`/users/admin/${id}`);
          Swal.fire("Success!", "User is now an admin", "success");
          refetch();
        } catch (err) {
            console.log(err);
          Swal.fire("Error!", "Failed to make admin", "error");
        }
      }
    });
  };

  const handleMakePremium = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to make this user premium?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, make premium",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.patch(`/approvedPremium/${id}`);
          Swal.fire("Success!", "User is now premium", "success");
          refetch();
        } catch (err) {
            console.log(err);
            
          Swal.fire("Error!", "Failed to make premium", "error");
        }
      }
    });
  };

  if (isLoading) {
    return (
      <Loading></Loading>
    );
  }
    return (
        <div>
             <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Users</h1>

      {/* Search Input */}
      <div className="my-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by username..."
          className="bg-transparent border border-gray-300 rounded-2xl p-3 w-full md:w-1/3"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto mt-10 lg:px-4">
        <table className="min-w-full  border-gray-300">
          <thead className="bg-cyan-800 lg:px-4">
            <tr>
              <th className="py-2 px-4 ">Name</th>
              <th className="py-2 px-4 ">Email</th>
              <th className="py-2 px-4 ">Make Admin</th>
              <th className="py-2 px-4 ">Make Premium</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center ">
                <td className="py-2 px-4 ">{user.name}</td>
                <td className="py-2 px-4 ">{user.email}</td>
                <td className="py-2 px-4 ">
                  {user.role === "admin" ? (
                    <span className="text-green-600 font-semibold">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-pink-500"
                    >
                     <FaUserCheck size={20}/>
                    </button>
                  )}
                </td>
                <td className="py-2 px-4 ">
                  {user.premium ? (
                    <span className="text-lime-500 font-semibold">Premium</span>
                  ) : user.requestPremium ? (
                    <button
                      onClick={() => handleMakePremium(user._id)}
                      className="bg-lime-400 text-white px-3 py-1 rounded hover:bg-rose-400"
                    >
                      <TbRosetteDiscountCheck size={25}/>
                    </button>
                  ) : (
                    <span className="text-gray-400 font-semibold">Not Interested</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <p className="text-center mt-4 text-gray-500">No users found</p>
        )}
      </div>
    </div>
        </div>
    );
};

export default ManageUsers;
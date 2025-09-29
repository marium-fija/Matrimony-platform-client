import React, { useEffect, useState } from 'react';
import { useAuth } from '../provider/AuthProvider';
import useAxios from '../hooks/useAxios';
import Swal from 'sweetalert2';

const MyContactRequest = () => {
     const { user } = useAuth();
     const axios = useAxios();
  const [requests, setRequests] = useState([]);

 useEffect(() => {
  if (!user?.email) return;

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`/contactRequests/user/${user.email}`);
      console.log(res.data);
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchRequests();
}, [user?.email]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/contactRequests/${id}`);
      setRequests((prev) => prev.filter((req) => req._id !== id));
      Swal.fire("Deleted!", "Your request has been removed.", "success");
    } catch (error) {
        console.log(error);
        
      Swal.fire("Error", "Failed to delete.", "error");
    }
  };
    return (
        <div>
            <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Contact Requests</h2>
      <table className="table-fixed w-full">
        <thead>
          <tr className="bg-gray-700 ">
            <th className="text-center px-4 py-2">Name</th>
            <th className="text-center px-4 py-2">Biodata Id</th>
            <th className="text-center px-4 py-2">Status</th>
            <th className="text-center px-4 py-2">Mobile</th>
            <th className="text-center px-4 py-2">Email</th>
            <th className="text-center px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td className="text-center px-4 py-2">{req.name}</td>
              <td className="text-center px-4 py-2">{req.biodataId}</td>
              <td className="text-center px-4 py-2">{req.status}</td>
              <td className="text-center px-4 py-2">{req.status === "approved" ? req.mobileNumber : "-"}</td>
              <td className="text-center px-4 py-2">{req.status === "approved" ? req.contactEmail : "-"}</td>
              <td className="text-center px-4 py-2">
                <button onClick={() => handleDelete(req._id)} className="btn btn-sm btn-error">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
    );
};

export default MyContactRequest;
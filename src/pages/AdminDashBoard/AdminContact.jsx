import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FcApproval } from "react-icons/fc";

const AdminContact = () => {
     const axiosSecure = useAxiosSecure();

  // Fetch all contact requests
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['approvedContactRequest'],
    queryFn: async () => {
      const res = await axiosSecure.get('/approvedContactRequest');
      // attach biodataId from biodata collection
      const usersWithBiodata = await Promise.all(
        res.data.map(async (user) => {
          try {
            const biodataRes = await axiosSecure.get(`/biodatas/email/${user.contactEmail}`);
            console.log(biodataRes);
            
            return { ...user, biodataId: biodataRes.data.biodataId };
          } catch {
            return { ...user, biodataId: null };
          }
        })
      );
      return usersWithBiodata;
    },
  });

  const handleApproveContact = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this user's contact request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/approvedContactRequest/${id}`);
          Swal.fire("Success!", "Contact request approved", "success");
          refetch();
        } catch (err) {
          console.log(err);
          Swal.fire("Error!", "Failed to approve contact", "error");
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading contact requests...</p>
      </div>
    );
  }
    return (
        <div>
             <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Approved Contact Requests</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border-gray-300">
          <thead className="bg-cyan-800">
            <tr className="text-center">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Biodata ID</th>
              <th className="py-2 px-4">Approve Contact</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center border-b">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.contactEmail}</td>
                <td className="py-2 px-4">{user.biodataId || ""}</td>
                <td className="py-2 px-4 ">
                  {user.approvedContact ? (
                    <span className="text-green-600 font-semibold">Approved</span>
                  ) : (
                    <button
                      onClick={() => handleApproveContact(user._id)}
                      className="bg-transparent text-white border border-cyan-400 px-3 py-1 rounded hover:bg-slate-700 flex items-center justify-center gap-2"
                    >
                      <FcApproval size={20} /> Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center mt-4 text-gray-500">No contact requests found.</p>
        )}
      </div>
    </div>
        </div>
    );
};

export default AdminContact;
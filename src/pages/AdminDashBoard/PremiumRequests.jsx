import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { TbRosetteDiscountCheck } from 'react-icons/tb';

const PremiumRequests = () => {
    const axiosSecure = useAxiosSecure();

  // Fetch premium requests
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ['approvedPremium'],
    queryFn: async () => {
      const res = await axiosSecure.get('/approvedPremium');
      const usersWithBiodata = await Promise.all(
        res.data.map(async (user) => {
          try {
            const biodataRes = await axiosSecure.get(`/biodatas/email/${user.email}`);
            return { ...user, biodataId: biodataRes.data.biodataId };
          } catch {
            return { ...user, biodataId: null };
          }
        })
      );
      return usersWithBiodata;
    },
  });

  const handleMakePremium = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this user as premium?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, make premium",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/approvedPremium/${id}`);
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
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading premium requests...</p>
      </div>
    );
  }
    return (
        <div>
            <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Approved Premium Requests</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border-gray-300">
          <thead className="bg-cyan-800">
            <tr className="text-center">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Biodata ID</th>
              <th className="py-2 px-4">Make Premium</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center border-b">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.biodataId || ""}</td>
                <td className="py-2 px-4 text-center">
                  {user.premium ? (
                    <span className="text-emerald-600 font-semibold">Premium</span>
                  ) : (
                    <button
                      onClick={() => handleMakePremium(user._id)}
                      className="bg-lime-500 text-white px-3 py-1 rounded hover:bg-rose-400 flex items-center justify-center gap-2"
                    >
                      <TbRosetteDiscountCheck size={20} /> Make Premium
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center mt-4 text-gray-500">No premium requests found.</p>
        )}
      </div>
    </div>
        </div>
    );
};

export default PremiumRequests;
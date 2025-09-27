import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

  // Fetch admin stats
  const { data: stats = {}, isLoading, refetch } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading admin stats...</p>
      </div>
    );
  }
    return (
        <div>
           <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard Home</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-10">
        <div className="bg-blue-500 text-center text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Total Biodata</h2>
          <p className="text-2xl font-bold">{stats.totalBiodatas}</p>
        </div>

        <div className="bg-lime-500 text-center text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Male Biodata</h2>
          <p className="text-2xl font-bold">{stats.maleCount}</p>
        </div>

        <div className="bg-sky-500 text-center text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Female Biodata</h2>
          <p className="text-2xl font-bold">{stats.femaleCount}</p>
        </div>

        <div className="bg-pink-500 text-center text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Premium Biodata</h2>
          <p className="text-2xl font-bold">{stats.premiumCount}</p>
        </div>

        <div className="bg-purple-500 text-center text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-2xl font-bold">${stats.revenue}</p>
        </div>
      </div>
    </div> 
        </div>
    );
};

export default AdminHome;
import React from 'react';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import Loading from './Loading';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const OverviewPage = () => {
  const axiosSecure = useAxios();

   const { data: stats = {}, isLoading, error } = useQuery({
    queryKey: ["overviewStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  if (error) return <p className="text-center py-10 text-red-500">Failed to load stats</p>;

  // Pie Chart for Male vs Female
  const pieData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Biodata Gender Distribution",
        data: [stats.maleCount, stats.femaleCount],
        backgroundColor: ["#F472B6", "#60A5FA"],
        borderWidth: 1,
      },
    ],
  };

  // Bar Chart for Users vs Premium Users
  const barData = {
    labels: ["Total Users", "Premium Users"],
    datasets: [
      {
        label: "Users",
        data: [stats.totalBiodatas, stats.premiumCount],
        backgroundColor: ["#F472B6", "#34D399"],
      },
    ],
  };

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-cyan-600 mb-8 text-center">Overview State</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gray-800 shadow rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold ">Total Biodatas</h3>
          <p className="text-3xl font-bold text-cyan-400 mt-2">{stats.totalBiodatas}</p>
        </div>
        <div className="bg-gray-800 shadow rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold ">Premium Users</h3>
          <p className="text-3xl font-bold text-green-500 mt-2">{stats.premiumCount}</p>
        </div>
        <div className="bg-gray-800 shadow rounded-xl p-6 text-center">
          <h3 className="text-lg font-semibold ">Revenue (USD)</h3>
          <p className="text-3xl font-bold text-blue-500 mt-2">{stats.revenue}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gray-800 shadow rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4  text-center">Biodata Gender Distribution</h3>
          <Pie data={pieData} />
        </div>
        <div className="bg-gray-800 shadow rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4  text-center">Users vs Premium Users</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
        </div>
    );
};

export default OverviewPage;
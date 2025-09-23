import React, { useEffect, useState } from 'react';
import { FaUser, FaIdBadge, FaVenusMars, FaInfoCircle, FaEnvelope, FaPhone, FaUserFriends } from "react-icons/fa";
import { MdContactPhone, MdHeight, MdMonitorWeight } from "react-icons/md";
import { GiBodyHeight } from "react-icons/gi";
import useAxios from '../hooks/useAxios';

const ViewBiodata = ({ email }) => {
    console.log(email);
    
    const axios = useAxios();
  const [biodata, setBiodata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!email) return;

    const fetchBiodata = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/biodatas/email/${email}`);
        
        setBiodata(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBiodata();
  }, [email, axios]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    
    return (
        <div>
             <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
      
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Profile Picture */}
        <div className="w-40 h-40 rounded-full overflow-hidden shadow-md">
          <img
            src={biodata?.photo || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Basic Info */}
        <div className="flex-1 space-y-3">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaUser /> {biodata?.name || "User Name"}
          </h2>
          <p className="flex items-center gap-2 text-gray-700">
            <FaIdBadge /> Biodata ID: {biodata?.biodataId || "N/A"}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <FaVenusMars /> Gender: {biodata?.gender || "N/A"}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <FaInfoCircle /> About: {biodata?.about || "No description"}
          </p>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <MdContactPhone /> Contact Info
            </h3>
            <p className="flex items-center gap-2 text-gray-700">
              <FaEnvelope /> {biodata?.contactEmail || "example@mail.com"}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaPhone /> {biodata?.contactNumber || "Not Available"}
            </p>
          </div>

          {/* Premium Button */}
          <button className="mt-3 px-6 py-2 bg-pink-500 text-white rounded-xl shadow hover:bg-pink-600">
            Get Premium
          </button>
        </div>
      </div>

      {/* Personal Info */}
      <div className="border-t pt-4">
        <h3 className="text-xl font-semibold flex items-center gap-2 mb-2">
          <FaUserFriends /> Personal Info
        </h3>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Age: {biodata?.age || "N/A"}</li>
          <li>Height: {biodata?.height || "N/A"}</li>
          <li>Weight: {biodata?.weight || "N/A"}</li>
        </ul>
      </div>

      {/* Expected Partner Info */}
      <div className="border-t pt-4">
        <h3 className="text-xl font-semibold flex items-center gap-2 mb-2">
          <GiBodyHeight /> Expected Partner
        </h3>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Age: {biodata?.expectedPartner?.age || "N/A"}</li>
          <li>
            <MdHeight /> Height: {biodata?.expectedPartner?.height || "N/A"}
          </li>
          <li>
            <MdMonitorWeight /> Weight: {biodata?.expectedPartner?.weight || "N/A"}
          </li>
        </ul>
      </div>
    </div>
        </div>
    );
};

export default ViewBiodata;
import React from 'react';
import { useAuth } from '../provider/AuthProvider';
import { FaUser, FaIdBadge, FaVenusMars, FaInfoCircle, FaEnvelope, FaPhone, FaUserFriends } from "react-icons/fa";
import { MdContactPhone, MdHeight, MdMonitorWeight } from "react-icons/md";
import { GiBodyHeight } from "react-icons/gi";

const ViewBiodata = () => {
    const {user} = useAuth();
    console.log(user);
    
    return (
        <div>
            <div className="max-w-4xl mx-auto  rounded-2xl shadow-lg p-6 space-y-6">
      
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Profile Picture */}
        <div className="w-40 h-40 rounded-full overflow-hidden shadow-md">
          <img
            src={user?.photo || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Basic Info */}
        <div className="flex-1 space-y-3">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaUser /> {user?.name || "User Name"}
          </h2>
          <p className="flex items-center gap-2 text-gray-700">
            <FaIdBadge /> Biodata ID: {user?.biodataId || "N/A"}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <FaVenusMars /> Gender: {user?.gender || "N/A"}
          </p>
          <p className="flex items-center gap-2 text-gray-700">
            <FaInfoCircle /> About: {user?.about || "No description"}
          </p>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <MdContactPhone /> Contact Info
            </h3>
            <p className="flex items-center gap-2 text-gray-700">
              <FaEnvelope /> {user?.email || "example@mail.com"}
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <FaPhone /> {user?.phone || "Not Available"}
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
          <li>Age: {user?.age || "N/A"}</li>
          <li>Height: {user?.height || "N/A"}</li>
          <li>Weight: {user?.weight || "N/A"}</li>
        </ul>
      </div>

      {/* Expected Partner Info */}
      <div className="border-t pt-4">
        <h3 className="text-xl font-semibold flex items-center gap-2 mb-2">
          <GiBodyHeight /> Expected Partner
        </h3>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Age: {user?.expectedPartner?.age || "N/A"}</li>
          <li>
            <MdHeight /> Height: {user?.expectedPartner?.height || "N/A"}
          </li>
          <li>
            <MdMonitorWeight /> Weight: {user?.expectedPartner?.weight || "N/A"}
          </li>
        </ul>
      </div>
    </div>
        </div>
    );
};

export default ViewBiodata;
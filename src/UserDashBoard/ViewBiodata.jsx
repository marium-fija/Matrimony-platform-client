import React, { useEffect, useState } from 'react';
import { FaUser, FaIdBadge, FaVenusMars, FaInfoCircle, FaEnvelope, FaPhone, FaUserFriends } from "react-icons/fa";
import { MdContactPhone, MdHeight, MdMonitorWeight } from "react-icons/md";
import { GiBodyHeight } from "react-icons/gi";
import useAxios from '../hooks/useAxios';
import { useParams } from 'react-router';
import { GoHeart } from "react-icons/go";

const ViewBiodata = () => {

  const { email } = useParams();
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

  const [favorites, setFavorites] = useState(() => {
    // Load from localStorage
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (biodata) => {
    let updatedFavorites;
    if (favorites.some(fav => fav.biodataId === biodata.biodataId)) {
      // remove from favorites
      updatedFavorites = favorites.filter(fav => fav.biodataId !== biodata.biodataId);
    } else {
      updatedFavorites = [...favorites, biodata];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;


  return (
    <div>
      <div className="max-w-4xl mx-auto  rounded-2xl shadow-lg p-6 space-y-6">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Profile Picture */}
          <div className="w-80 h-80 rounded-full overflow-hidden shadow-md">
            <img
              src={biodata?.profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Basic Info */}
          <div className="flex-1 space-y-4 ml-10 border-2 border-cyan-400 rounded-2xl shadow-xl  shadow-blue-300 p-5">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaUser /> {biodata?.name || ""}
            </h2>
            <p className="flex items-center gap-2 text-gray-300">
              <FaIdBadge /> Biodata ID : {biodata?.biodataId || ""}
            </p>
            <p className="flex items-center gap-2 text-gray-300">
              <FaVenusMars /> Gender : {biodata?.biodataType || ""}
            </p>
            <p className=" items-center gap-2 text-gray-300">
              <span className='flex items-center gap-2'><FaInfoCircle size={20} /> About : </span>{biodata?.about || ""}
            </p>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <MdContactPhone /> Contact Info
              </h3>
              <p className="flex items-center gap-2 text-gray-300">
                <FaEnvelope /> {biodata?.contactEmail || ""}
              </p>
              <p className="flex items-center gap-2 text-gray-300">
                <FaPhone /> {biodata?.mobileNumber || ""}
              </p>
            </div>

           <div className='flex items-center gap-5'>
             {/* Premium Button */}
            <button className="mt-3 px-6 py-2 bg-indigo-500 text-white rounded-xl shadow hover:bg-pink-400">
              Get Premium
            </button>
            <button
              onClick={() => toggleFavorite(biodata)}
              className={`p-3 rounded-full ${favorites.some(fav => fav.biodataId === biodata.biodataId) ? "bg-red-500" : "bg-transparent"}`}
            ><GoHeart size={25} className='text-white' /></button>
            <button>Send Requrest</button>
           </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="mt-14 border-t pt-8">
          <h3 className="text-xl font-semibold flex items-center gap-4 mb-2">
            <FaUserFriends /> Personal Info
          </h3>
          <ul className="list-disc ml-8 text-gray-300">
            <li>Age : {biodata?.age || ""}</li>
            <li>Height : {biodata?.height || ""}</li>
            <li>Weight : {biodata?.weight || ""}</li>
          </ul>
        </div>

        {/* Expected Partner Info */}
        <div className="border-t pt-4">
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <GiBodyHeight /> Expected Partner
          </h3>
          <ul className="list-disc ml-6 text-gray-300">
            <li>Age : {biodata?.expectedPartnerAge || ""}</li>
            <li>
              Height : {biodata?.expectedPartnerHeight || ""}
            </li>
            <li>
              Weight : {biodata?.expectedPartnerWeight || ""}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewBiodata;
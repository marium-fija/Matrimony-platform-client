import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { Link, useNavigate } from 'react-router';
import { GoHeart } from "react-icons/go";
import { useAuth } from '../provider/AuthProvider';


const divisions = [
  "Dhaka",
  "Chattagra",
  "Rangpur",
  "Barisal",
  "Khulna",
  "Mymensingh",
  "Sylhet",
];

const Biodata = () => {
    const axios = useAxios();
  const navigate = useNavigate();
  const {user} = useAuth();

  const [biodatas, setBiodatas] = useState([]);
  const [filteredBiodatas, setFilteredBiodatas] = useState([]);
  const [filters, setFilters] = useState({
    minAge: "",
    maxAge: "",
    biodataType: "",
    division: "",
  });

  // Fetch all biodatas
  useEffect(() => {
    const fetchBiodatas = async () => {
      try {
        const res = await axios.get("/biodatas");
        setBiodatas(res.data);
        setFilteredBiodatas(res.data);
      } catch (err) {
        console.error("Error fetching biodatas:", err);
      }
    };
    fetchBiodatas();
  }, [axios]);

  // Filter function
  const handleFilter = () => {
    let temp = [...biodatas];
    if (filters.minAge) temp = temp.filter((b) => b.age >= Number(filters.minAge));
    if (filters.maxAge) temp = temp.filter((b) => b.age <= Number(filters.maxAge));
    if (filters.biodataType) temp = temp.filter((b) => b.biodataType === filters.biodataType);
    if (filters.division) temp = temp.filter((b) => b.permanentDivision === filters.division);
    setFilteredBiodatas(temp);
  };

  // Handle input changes
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Navigate to view profile (private)
  const handleViewProfile = (email) => {
     
    if (!user) {
      navigate("/auth/login");
    } else {
      navigate(`/dashboard/view-biodata/email/${email}`);
    }
  };

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

    return (
        <div>
            <div className="flex flex-col md:flex-row p-6 gap-6">
      {/* Left Filter */}
      <div className="w-full sm:w-1/6 md:w-1/4 bg-blue-950 text-white p-6 rounded-xl shadow-lg space-y-4">
        <h2 className="text-xl font-bold mb-4">Filters</h2>

        {/* Age Range */}
        <div className="space-y-2">
          <label className="block">Min Age</label>
          <input
            type="number"
            name="minAge"
            value={filters.minAge}
            onChange={handleChange}
            className="w-full p-2 rounded-2xl bg-transparent "
          />
          <label className="block">Max Age</label>
          <input
            type="number"
            name="maxAge"
            value={filters.maxAge}
            onChange={handleChange}
            className="w-full p-2 rounded-2xl bg-transparent "
          />
        </div>

        {/* Biodata Type */}
        <div className="space-y-3">
          <label>Biodata Type</label>
          <select
            name="biodataType"
            value={filters.biodataType}
            onChange={handleChange}
            className="w-full mt-2 p-2 rounded-2xl bg-transparent"
          >
            <option value="">All</option>
            <option className='text-black' value="Male">Male</option>
            <option className='text-black' value="Female">Female</option>
          </select>
        </div>

        {/* Division */}
        <div className="space-y-2">
          <label>Division</label>
          <select
            name="division"
            value={filters.division}
            onChange={handleChange}
            className="w-full mt-2 p-2 rounded-2xl bg-transparent "
          >
            <option value="">All</option>
            {divisions.map((d) => (
              <option key={d} className='text-black' value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Apply Filter Button */}
        <button
          onClick={handleFilter}
          className="w-full mt-4 bg-indigo-500 hover:bg-pink-400 text-white py-2 rounded-full"
        >
          Apply Filters
        </button>
      </div>

      {/* Biodata List */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBiodatas.slice(0, 20).map((biodata) => (
          <div key={biodata.biodataId} className="bg-gray-800 text-white p-4 border border-cyan-400 rounded-xl shadow-lg flex flex-col ">
            <div className='flex justify-evenly items-center gap-5 '>
                <img
              src={biodata.profileImage}
              alt={biodata.name}
              className="w-32 h-32 object-cover rounded-full border-2 border-cyan-500 mb-3"
            />
            <p><span className='font-bold'>Biodata ID : </span> {biodata.biodataId}</p>
            
            </div>
            <div className='p-4 justify-start'>
                
           
                <h2><span className='font-bold'>Name :</span> {biodata.name}</h2>
                <p><span className='font-bold'>Biodata Type : </span> {biodata.biodataType}</p>
            
            <p><span className='font-bold'>Division : </span>{biodata.permanentDivision}</p>   
                <p><span className='font-bold'>Age :</span> {biodata.age}</p>
                <p><span className='font-bold'>Occupation :</span> {biodata.occupation}</p>
            </div>
             <div className='flex justify-between px-4'>
                <button
               onClick={() => handleViewProfile(biodata.contactEmail)}
              className="mt-3 bg-indigo-500 hover:bg-pink-400 text-white px-4 py-2 rounded-2xl"
            >
              View Profile
            </button>
            <button
              onClick={() => toggleFavorite(biodata)}
  className={`p-3 rounded-full ${favorites.some(fav => fav.biodataId === biodata.biodataId) ? "bg-red-500" : "bg-transparent"}`}
            ><GoHeart size={25} className='text-white'/></button>
             </div>
          </div>
        ))}
      </div>
    </div>
        </div>
    );
};

export default Biodata;
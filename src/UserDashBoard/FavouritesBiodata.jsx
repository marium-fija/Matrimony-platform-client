import React, { useEffect, useState } from 'react';

const FavouritesBiodata = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (biodataId) => {
    const updated = favorites.filter(fav => fav.biodataId !== biodataId);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };
    return (
        <div className='max-w-7xl mx-auto'>
            <div className=" p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Favorite Biodatas</h2>
      <table className="w-full  table-auto border-collapse border rounded-3xl border-gray-500">
        <thead>
          <tr className="bg-gray-700">
            <th className=" border-gray-500 px-4 py-2">Image</th>
            <th className=" border-gray-500 px-4 py-2">Name</th>
            <th className=" border-gray-500 px-4 py-2">Biodata ID</th>
            <th className=" border-gray-500 px-4 py-2">Permanent Division</th>
            <th className=" border-gray-500 px-4 py-2">Occupation</th>
            <th className=" border-gray-500 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {favorites.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-4xl text-center py-4">No favorite biodata yet.</td>
            </tr>
          ) : (
            favorites.map((fav) => (
              <tr key={fav.biodataId} className="text-center">
                <td className="p-3"><img className='w-20 h-20 object-cover rounded-full' src={fav.profileImage} alt="" /></td>
                <td className=" px-4 py-2">{fav.name}</td>
                <td className=" px-4 py-2">{fav.biodataId}</td>
                <td className=" px-4 py-2">{fav.permanentDivision}</td>
                <td className=" px-4 py-2">{fav.occupation}</td>
                <td className=" px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleDelete(fav.biodataId)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-700 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

        </div>
    );
};

export default FavouritesBiodata;
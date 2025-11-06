import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { Link } from 'react-router';

const PremiumUsers = () => {
     const axiosInstance = useAxios();
  const [premiumUsers, setPremiumUsers] = useState([]);

  useEffect(() => {
    axiosInstance.get("/biodatas")
      .then(res => {
       
        const filtered = res.data.filter(item => item.Premium === true);
        setPremiumUsers(filtered);
      })
      .catch(err => {
        console.error("Error fetching biodatas:", err);
      });
  }, [axiosInstance]);
    return (
        <div className="py-6 px-4">
             <h2 className="text-4xl text-cyan-500 font-bold mb-6 text-center"> Premium Members</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
            premiumUsers.map(user => (
                 <div key={user.biodataId}
                  className="max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow-md shadow-cyan-200 dark:bg-gray-800 dark:border-gray-700">
                <div className='flex items-center justify-center gap-8 mb-6'>
                    <img className='w-24 h-24 rounded-full object-cover' src={user.profileImage} alt="" />    
    
        <h5 className="flex-1 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{user.name}</h5>
                </div>
    
    <div className='flex justify-items-start gap-5 space-y-3 font-semibold'>
        <p> Gender : <span className='text-cyan-500'>{user.biodataType}</span></p>
    <p> Age : <span className='text-cyan-500'>{user.age}</span></p>
    <p> Biodata Id : <span className='text-cyan-500'>{user.biodataId}</span></p>
    </div>
    <p>Occupation : {user.occupation}</p>
    <p>Permanent Division : {user.permanentDivision}</p>
    <div className='mt-4'>
        <Link to={`/dashboard/view-biodata/email/${user.contactEmail}`} className=" rounded-full px-3 py-2  font-medium items-center bg-indigo-500 hover:bg-indigo-700">
        See Biodata 
    </Link>
    </div>
    
</div>
            ))
        }
      </div>
           
        </div>
    );
};

export default PremiumUsers;
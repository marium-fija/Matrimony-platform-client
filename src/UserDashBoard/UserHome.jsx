import React from 'react';
import { useAuth } from '../provider/AuthProvider';
import userHomeImg from '../assets/Img/UserHome.png';
import OverviewPage from '../pages/OverviewPage';

const UserHome = () => {
    const {user} = useAuth();
    console.log(user);
    
    return (
        <div>
            <div>
           <div>
            <h1 className='text-2xl font-semibold'>Hey , Welcome to Our Website <span className='text-pink-700'> 
                 {user.displayName} ! !
                </span> </h1>
           </div>
           <div className='mt-10 p-3 mx-auto'>
            <img className='w-full max-w-screen-lg rounded-xl' src={userHomeImg} alt="" />
           </div>
        </div>
        </div>
    );
};

export default UserHome;
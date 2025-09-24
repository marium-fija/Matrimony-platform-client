import React from 'react';
import Navbar from '../shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../shared/Footer';

const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
           {/* <div className='max-w-7xl mx-auto'> */}
            <Outlet></Outlet> 
           {/* </div> */}
           <Footer></Footer>
        </div>
    );
};

export default HomeLayout;
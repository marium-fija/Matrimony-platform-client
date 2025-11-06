import React from 'react';
import Logo from '../assets/Img/hand.png';
import { FaFacebook } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { MdMarkEmailRead } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";

const Footer = () => {
    return (
        <div>
            <footer className="bg-slate-700 text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row md:justify-between md:items-start">
        {/* Logo & Description */}
        <div className="mb-8 md:mb-0 md:w-1/3">
          <div className="flex items-center gap-2 text-2xl font-bold ">
                   <img className='w-12 rounded-2xl' src={Logo} alt="" /> 
                    <h3><span className=''>Soul</span><span className='text-cyan-400'>Knot</span></h3>
                  </div>
          <p className="text-gray-200">
            <span>Soul</span><span className='text-cyan-400'>Knot</span> brings hearts together by connecting like-minded souls. 
  Discover meaningful relationships, build lasting bonds, and take the 
  first step towards a beautiful journey of love and companionship.
          </p>
        </div>

        {/* Social Links */}
        <div className="md:w-1/3 flex flex-col items-start md:items-center">
          <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-4 text-gray-200">
            <a href="#" className="hover:text-white"><FaFacebook size={25}/></a>
            <a href="#" className="hover:text-white"><FiTwitter size={25}/></a>
            <a href="#" className="hover:text-white"><FaInstagram size={25}/></a>
            <a href="#" className="hover:text-white"><CiLinkedin size={25}/></a>
          </div>
        </div>

        {/* Optional extra links or info */}
        <div className="md:w-1/3 mt-8 md:mt-0">
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <p className="text-gray-200 flex items-center gap-3"><MdMarkEmailRead size={25}/> info@SoulKnot.com</p>
          <p className="text-gray-200 flex items-center gap-3"><LuPhoneCall size={25}/> ( +880 ) 123 456 789</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-800 text-gray-400 text-center py-4">
        &copy; {new Date().getFullYear()} SoulKnot. All rights reserved.
      </div>
    </footer>
        </div>
    );
};

export default Footer;
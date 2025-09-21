import React, { useState } from 'react';
import { NavLink } from 'react-router';
import Logo from '../assets/logo.png';
import { TiThMenuOutline } from "react-icons/ti";

const Navbar = () => {
     const [isOpen, setIsOpen] = useState(false);

    const isLoggedIn = false;

    const links = [
    { path: "/", label: "Home" },
    { path: "/biodatas", label: "Biodatas" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact Us" },
  ];
    return (
        <div>
            <nav className=" shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo + Name */}
        <div className="flex items-center gap-2 text-2xl font-bold ">
         <img className='w-12 rounded-2xl' src={Logo} alt="" /> 
          <h3><span className='text-sky-500'>Soul</span><span className='text-pink-500'>Knot</span></h3>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive ? " border-b-4 border-b-sky-400 text-white" : "text-gray-700 hover:text-cyan-400"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Login / Logout Btn */}
          {isLoggedIn ? (
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-purple-400"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <TiThMenuOutline />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg flex flex-col items-start px-4 pb-4">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `w-full px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive ? "bg-gray-800 text-white" : "text-gray-700 hover:text-cyan-800"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {isLoggedIn ? (
            <button className="w-full bg-red-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-red-600">
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full bg-indigo-500 text-white px-2 py-2 mt-2 rounded-lg hover:bg-purple-400"
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
        </div>
    );
};

export default Navbar;
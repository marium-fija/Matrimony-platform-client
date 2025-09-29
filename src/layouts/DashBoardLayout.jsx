import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { FaBars, FaHome, FaUserEdit, FaIdCard, FaPhone, FaHeart, FaSignOutAlt, FaTimes } from "react-icons/fa";
import Swal from 'sweetalert2';
import { useAuth } from '../provider/AuthProvider';

const DashBoardLayout = () => {
    const { user, logOut} = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
          await logOut();
          Swal.fire(
            "Success", 
            "Log Out Successful !", "success");
            navigate("/auth/login");
        }
         catch (err) {
          Swal.fire("Error", err.message, "error");
        }

      };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
    return (
        <div>
            <Navbar></Navbar>
           <div className="flex flex-col min-h-screen">
      {/* === Menu Button for Mobile === */}
      <div className="md:hidden bg-slate-800 text-white flex items-center px-4 py-3">
        <button onClick={toggleDrawer} className="text-2xl">
          <FaBars />
        </button>
        <h2 className="ml-4 font-bold text-lg">Dashboard</h2>
      </div>

      <div className="flex flex-1 pl-16 ">
        {/* === Sidebar Drawer === */}
        <div
          className={`fixed top-0 left-0 min-h-screen pt-10 w-64 bg-cyan-950 text-white transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}
        >
          {/* Header with Cross Button */}
          <div className="flex items-center justify-between p-4 border-b border-teal-700">
            <h2 className="font-bold text-xl">Dashboard Menu</h2>
            <button onClick={toggleDrawer} className="text-2xl md:hidden">
              <FaTimes />
            </button>
          </div>

          {/* Menu List */}
          <ul className="p-4 space-y-4">
            <li>
              <NavLink to="/dashboard/home" onClick={() => setIsOpen(false)} className="flex items-center gap-2
              ">
                <FaHome /> User Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/edit-biodata" onClick={() => setIsOpen(false)} className={({isActive}) => `flex items-center gap-2 p-2 ${isActive ? "border border-sky-400 rounded-xl text-white" : "text-gray-300 hover:text-cyan-400"}`
              }>
                <FaUserEdit /> Edit Biodata
              </NavLink>
            </li>
            <li>
              <NavLink to={`/dashboard/view-biodata/email/${user.email}`} onClick={() => setIsOpen(false)} className={({isActive}) => `flex items-center gap-2 p-2 ${isActive ? "border border-sky-400 rounded-xl text-white" : "text-gray-300 hover:text-cyan-400"}`
              }>
                <FaIdCard /> View Biodata
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/contact-request" onClick={() => setIsOpen(false)} className={({isActive}) => `flex items-center gap-2 p-2 ${isActive ? "border border-sky-400 rounded-xl text-white" : "text-gray-300 hover:text-cyan-400"}`
              }>
                <FaPhone /> Contact Request
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/favourites" onClick={() => setIsOpen(false)} className={({isActive}) => `flex items-center gap-2 p-2 ${isActive ? "border border-sky-400 rounded-xl text-white" : "text-gray-300 hover:text-cyan-400"}`
              }>
                <FaHeart /> Favourites Biodata
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="flex items-center gap-2">
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </ul>
        </div>

        {/* === Overlay for Mobile === */}
        {isOpen && (
          <div
            onClick={toggleDrawer}
            className="fixed inset-0 bg-opacity-30 md:hidden z-40"
          ></div>
        )}

        {/* === Main Content === */}
        <main className="flex-1 bg-slate-900 text-white p-6">
          <Outlet />
          <Footer></Footer>
        </main>
      </div>
    </div>
        </div>
    );
};

export default DashBoardLayout;
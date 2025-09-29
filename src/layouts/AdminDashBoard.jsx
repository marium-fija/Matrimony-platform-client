import React, { useState } from 'react';
import { useAuth } from '../provider/AuthProvider';
import { NavLink, Outlet, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { FaBars, FaHome,  FaSignOutAlt, FaTimes, FaUserEdit } from 'react-icons/fa';
import { MdWorkspacePremium } from "react-icons/md";
import { IoIosContacts } from "react-icons/io";
import Footer from '../shared/Footer';
import Navbar from '../shared/Navbar';
import useUserRole from '../hooks/useUserRole';
import Loading from '../pages/Loading';

const AdminDashBoard = () => {
     const { role, roleLoading } = useUserRole();
     const {logOut} = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    if (roleLoading) {
    return  <Loading></Loading>
    }

  if (role !== "admin") {
    return <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl font-bold text-red-500">Access Denied </h1>
    </div>;
  }

    const handleLogout = async () => {
        try {
          await logOut();
          Swal.fire(
            "Success", 
            "Log Out Successful !", "success");
            navigate("/");
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
           <div>
            <Navbar></Navbar>
           <div className="flex flex-col min-h-screen">
      {/* === Menu Button for Mobile === */}
      <div className="md:hidden bg-slate-800 text-white flex items-center px-4 py-3">
        <button onClick={toggleDrawer} className="text-2xl">
          <FaBars />
        </button>
        <h2 className="ml-4 font-bold text-lg">Admin Dashboard</h2>
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
              <NavLink to="/dashboard/admin/home" onClick={() => setIsOpen(false)} className="flex items-center gap-2
              ">
                <FaHome /> Admin Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/admin/users" onClick={() => setIsOpen(false)} className={({isActive}) => `flex items-center gap-2 p-2 ${isActive ? "border border-sky-400 rounded-xl text-white" : "text-gray-300 hover:text-cyan-400"}`
              }>
                <FaUserEdit /> Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/admin/premium" onClick={() => setIsOpen(false)} className={({isActive}) => `flex items-center gap-2 p-2 ${isActive ? "border border-sky-400 rounded-xl text-white" : "text-gray-300 hover:text-cyan-400"}`
              }>
                <MdWorkspacePremium /> Premium Request
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/admin/contact" onClick={() => setIsOpen(false)} className={({isActive}) => `flex items-center gap-2 p-2 ${isActive ? "border border-sky-400 rounded-xl text-white" : "text-gray-300 hover:text-cyan-400"}`
              }>
                <IoIosContacts /> Contact Request
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
        </div>
    );
};

export default AdminDashBoard;
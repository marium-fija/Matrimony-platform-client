import { NavLink } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { TiThMenuOutline } from "react-icons/ti";
import { useAuth } from '../provider/AuthProvider';
import { useState } from 'react';
import Swal from 'sweetalert2';


const Navbar = () => {
     const { user, logOut } = useAuth();
     const [isOpen, setIsOpen] = useState(false);

    const links =
     [
  { path: "/", label: "Home" },
  { path: "/biodata", label: "Biodatas" },
  { path: "/about", label: "About Us" },
  { path: "/contact", label: "Contact Us" },
  ...(user ? [{ path: "/dashboard", label: "Dashboard" }] : [])
];

  const handleLogout = async () => {
    try {
      await logOut();
      Swal.fire(
        "Success", 
        "Log Out Successful !", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

    return (
        <div>
            <nav className=" shadow-md w-full  z-50">
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

          {user ? (
              <>
                <div className="w-10 rounded-full border-2">
                {/* <img src= alt="" /> */}
                <img className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={user.photoURL} alt="Bordered avatar"></img>
              </div>
                <button
                  onClick={handleLogout}
                  className="bg-purple-400 text-white px-4 py-2 rounded-lg hover:bg-indigo-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/auth/login"
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-purple-400">
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

          {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full bg-purple-400 text-white px-4 py-2 mt-2 rounded-lg hover:bg-indigo-500"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/auth/login"
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
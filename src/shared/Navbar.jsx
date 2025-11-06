import { NavLink } from 'react-router-dom';
import Logo from '../assets/Img/wedding_14024580.png';
import { TiThMenuOutline } from "react-icons/ti";
import { useAuth } from '../provider/AuthProvider';
import { useState } from 'react';
import Swal from 'sweetalert2';
import useUserRole from '../hooks/useUserRole';
import Loading from '../pages/Loading';
import { FaAngleDown } from "react-icons/fa6";


const Navbar = () => {
     const { user, logOut } = useAuth();
     const { role, roleLoading } = useUserRole();
     const [isOpen, setIsOpen] = useState(false);
     const [dropdownOpen, setDropdownOpen] = useState(false);

      if (roleLoading) {
    return <Loading></Loading>;
  }

    const links =[
  { path: "/", label: "Home" },
  { path: "/biodata", label: "Biodatas" },
  { path: "/about", label: "About Us" },
  { path: "/contact", label: "Contact Us" },
  //  ...(user ? [
  //     { path: role === "admin" ? "/dashboard/admin/home" : "/dashboard/home", label: "Dashboard" }
  //   ] : [])
];
 const userDashboardLinks = [
    { path: "/dashboard/home", label: "User Home" },
    { path: "/dashboard/edit-biodata", label: "Edit Biodata" },
    { path: `/dashboard/view-biodata/email/${user?.email}`, label: "View Biodata" },
    { path: "/dashboard/contact-request", label: "Contact Request" },
    { path: "/dashboard/favourites", label: "Favourites" },
    { path: "/dashboard/profile", label: "Profile" },
  ];
   const adminDashboardLinks = [
    { path: "/dashboard/admin/home", label: "Admin Home" },
    { path: "/dashboard/admin/users", label: "Manage Users" },
    { path: "/dashboard/admin/premium", label: "Premium Request" },
    { path: "/dashboard/admin/contact", label: "Contact Request" },
    { path: "/dashboard/admin/profile", label: "Profile" },
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
<nav className="fixed top-0 w-full bg-slate-900 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-bold">
          <img className="w-12 rounded-full bg-slate-100 p-2" src={Logo} alt="Logo" />
          <h3>
            <span>Soul</span>
            <span className="text-cyan-400">Knot</span>
          </h3>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "border-b-4 border-b-sky-400 text-white"
                    : "text-gray-300 hover:text-cyan-400"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Dashboard Dropdown - Click to open */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium hover:text-cyan-400"
              >
                Dashboard <FaAngleDown
                  className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white text-gray-800 rounded-md shadow-lg z-50">
                  {(role === "admin" ? adminDashboardLinks : userDashboardLinks).map(link => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className="block px-4 py-2 hover:bg-cyan-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Auth buttons */}
          {user ? (
            <>
              <img
                className="w-10 h-10 rounded-full border-2 border-gray-400"
                src={user.photoURL}
                alt="user"
              />
              <button
                onClick={handleLogout}
                className="bg-indigo-500 px-4 py-2 rounded-full hover:bg-purple-400 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/auth/login"
              className="bg-indigo-500 px-4 py-2 rounded-full hover:bg-purple-400 transition"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl text-white"
        >
          <TiThMenuOutline />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 flex flex-col gap-2 px-4 pb-4">
          {links.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm ${
                  isActive
                    ? "bg-indigo-500 text-white"
                    : "text-gray-300 hover:text-cyan-500 hover:bg-slate-700"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Dashboard links visible in mobile */}
          {user && (
            <div className="mt-2">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-300 hover:text-cyan-400
                hover:bg-slate-700"
              >
                Dashboard <FaAngleDown
                  className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <div className="ml-3 flex flex-col">
                  {(role === "admin" ? adminDashboardLinks : userDashboardLinks).map(link => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => {
                        setIsOpen(false);
                        setDropdownOpen(false);
                      }}
                      className="block px-3 py-1 text-gray-300 hover:bg-slate-700 rounded-md"
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Auth buttons */}
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="mt-3 bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-purple-400"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/auth/login"
              onClick={() => setIsOpen(false)}
              className="mt-3 bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-purple-400"
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
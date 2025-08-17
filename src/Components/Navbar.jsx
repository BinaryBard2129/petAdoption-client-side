import { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Pages/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      setDropdownOpen(false);
      setMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = (
    <>
      <li><Link to="/" className="hover:text-blue-200 transition">Home</Link></li>
      <li><Link to="/petListing" className="hover:text-blue-200 transition">Pet Listing</Link></li>
      <li><Link to="/DonationCampaigns" className="hover:text-blue-200 transition">Donations</Link></li>
      {user && <li><Link to="/dashboardLayout" className="hover:text-blue-200 transition">Dashboard</Link></li>}
      {!user && <li><Link to="/login" className="hover:text-blue-200 transition">Login</Link></li>}
      {!user && <li><Link to="/register" className="hover:text-blue-200 transition">Register</Link></li>}
    </>
  );

  return (
    <div className="fixed top-0 left-0 right-0 w-full z-50 bg-gradient-to-r from-blue-600 to-blue-500 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          🐾 PawPal
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8 items-center text-white font-medium">
          {menuItems}
        </ul>

        {/* User Profile - Desktop */}
        {user && (
          <div className="hidden lg:flex items-center relative ml-4" ref={dropdownRef}>
            <div
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="cursor-pointer"
              title={user.displayName}
            >
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="user"
                className="w-10 h-10 rounded-full border-2 border-white hover:scale-105 transition"
              />
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 top-12 w-44 bg-white text-gray-700 border rounded-lg shadow-lg z-50">
                <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded-b-lg hover:bg-red-500 hover:text-white transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="btn btn-ghost text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-blue-50 border-t border-blue-200 px-6 pb-4 shadow-md">
          <ul className="flex flex-col gap-3 text-gray-700 font-medium">
            {menuItems}
            {user && (
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;

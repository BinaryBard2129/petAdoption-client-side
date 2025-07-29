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
      <li><Link to="/">Home</Link></li>
      <li><Link to="/petListing">Pet Listing</Link></li>
      <li><Link to="/DonationCampaigns">Donations</Link></li>
      {user && <li><Link to="/dashboardLayout">Dashboard</Link></li>}
      {!user && <li><Link to="/login">Login</Link></li>}
      {!user && <li><Link to="/register">Register</Link></li>}
    </>
  );

  return (
    <div className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🐾 PawPal
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6 items-center text-gray-700">
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
                className="w-10 h-10 rounded-full border-2 border-blue-600"
              />
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 top-12 w-40 bg-white border rounded shadow z-50">
                <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100">Dashboard</Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
        <div className="lg:hidden px-4 pb-4">
          <ul className="flex flex-col gap-2 text-gray-700">
            {menuItems}
            {user && (
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white rounded"
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

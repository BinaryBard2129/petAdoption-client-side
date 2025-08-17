import React from 'react';
import { FaHome, FaListAlt, FaPlusCircle, FaPaw } from 'react-icons/fa';
import { Link, Outlet, NavLink } from 'react-router';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for Large Screens */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r shadow-md">
        <div className="p-6 border-b">
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
            🐾 PawPal
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-3">
          {navLinks()}
        </nav>
      </aside>

      {/* Mobile Top Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md lg:hidden z-20">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-700">
            🐾 PawPal
          </Link>
          <label htmlFor="mobile-menu-toggle" className="cursor-pointer">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
        </div>
      </div>

      {/* Mobile Drawer Toggle */}
      <input type="checkbox" id="mobile-menu-toggle" className="hidden peer" />
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-10 hidden peer-checked:block lg:hidden transition-opacity" />
      {/* Mobile Sidebar */}
      <aside className="fixed top-0 left-0 w-64 h-full bg-white z-30 transform -translate-x-full peer-checked:translate-x-0 transition-transform duration-300 ease-in-out lg:hidden shadow-lg">
        <div className="p-6 border-b">
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            🐾 PawPal
          </Link>
        </div>
        <nav className="p-4 space-y-3">
          {navLinks(true)}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto mt-14 lg:mt-0 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

// Helper Function to Generate NavLinks
const navLinks = (isMobile = false) => {
  const baseClass = "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-blue-50";
  return (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => `${baseClass} ${isActive ? 'bg-blue-100 font-semibold text-blue-600' : 'text-gray-700'}`}
      >
        <FaHome /> Home
      </NavLink>
      <NavLink
        to="/dashboard/myCampaigns"
        className={({ isActive }) => `${baseClass} ${isActive ? 'bg-blue-100 font-semibold text-blue-600' : 'text-gray-700'}`}
      >
        <FaListAlt /> My Campaigns
      </NavLink>
      <NavLink
        to="/dashboard/createCampaign"
        className={({ isActive }) => `${baseClass} ${isActive ? 'bg-blue-100 font-semibold text-blue-600' : 'text-gray-700'}`}
      >
        <FaPlusCircle /> Create Campaign
      </NavLink>
      <NavLink
        to="/dashboard/addPet"
        className={({ isActive }) => `${baseClass} ${isActive ? 'bg-blue-100 font-semibold text-blue-600' : 'text-gray-700'}`}
      >
        <FaPaw /> Add a Pet
      </NavLink>
      <NavLink
        to="/dashboard/MyAddedPets"
        className={({ isActive }) => `${baseClass} ${isActive ? 'bg-blue-100 font-semibold text-blue-600' : 'text-gray-700'}`}
      >
        <FaListAlt /> My Added Pets
      </NavLink>
    </>
  );
};

export default DashboardLayout;

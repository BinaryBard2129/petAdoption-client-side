// components/Footer.jsx
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-10 px-4 mt-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-sm">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p>
            We're dedicated to connecting loving pets with forever homes. Join us in making a
            difference in an animal's life.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/pets" className="hover:underline">Browse Pets</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p>Email: support@pawpal.com</p>
          <p>Phone: +880 123 456 7890</p>
          <p>Chittagong, Bangladesh</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-300 text-xl"><FaFacebookF /></a>
            <a href="#" className="hover:text-pink-300 text-xl"><FaInstagram /></a>
            <a href="#" className="hover:text-sky-300 text-xl"><FaTwitter /></a>
            <a href="#" className="hover:text-red-300 text-xl"><FaEnvelope /></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 border-t border-blue-700 pt-4 text-center text-xs">
        © {new Date().getFullYear()} PawPal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

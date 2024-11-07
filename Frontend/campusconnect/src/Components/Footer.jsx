import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#6845b8] text-white py-3">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Social Media Icons */}
          <div className="mb-4 md:mb-0 flex-1">
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-2xl hover:text-blue-500" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-2xl hover:text-blue-400" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-2xl hover:text-pink-500" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-2xl hover:text-blue-700" />
              </a>
            </div>
          </div>

          {/* About / Contact Info */}
          <div className="mb-4 md:mb-0 flex-1">
            <h2 className="text-lg font-semibold mb-2">About CampusConnect</h2>
            <p className="text-sm">
              CampusConnect is an exclusive online platform designed by students, for students.
            </p>
          </div>
        </div>
        <div className="mt-3 border-t border-gray-700 pt-4 text-center text-sm">
          &copy; 2024 CampusConnect. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

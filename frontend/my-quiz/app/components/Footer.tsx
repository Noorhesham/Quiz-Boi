import React from "react";
import Logo from "./Logo";
import MiniLogo from "./MiniLogo";

const Footer = () => {
  return (
    <footer className="spacer py-8 w-full max-h-[40vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <MiniLogo />
          </div>
          <nav className="flex flex-wrap gap-4">
            <a href="#" className="text-gray-300 hover:text-white">
              Home
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              About
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Services
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Contact
            </a>
          </nav>
          {/* Social Media Icons */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

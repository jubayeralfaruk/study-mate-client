import React from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="w-full bg-base-200 text-base-content p-10 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Logo + Description */}
        <aside className="text-center md:text-left">
          <img
            src="/logo.png"
            alt="site logo"
            className="w-24 h-24 mx-auto md:mx-0 rounded-full object-cover mb-4"
          />
          <h2 className="text-2xl font-semibold">Study<span className="p-0 text-primary -mr-100">Mate</span></h2>
          <p className="text-sm mt-2">
            A smart learning platform helping students grow with modern tools 
            and real-time feedback.
          </p>
        </aside>

        {/* Quick Links */}
        <nav className="flex flex-col space-y-2 mx-auto md:mx-0 text-center md:text-left">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <Link className="link link-hover">Find Partners</Link>
          <Link className="link link-hover">About Us</Link>
          <Link className="link link-hover">Contact</Link>
        </nav>

        {/* Social Media */}
        <nav className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 justify-center md:justify-start">
            <a href="https://facebook.com/" target="_blank" className="cursor-pointer">
              <FaFacebookF size={20} />
            </a>
            <a href="https://x.com/" target="_blank" className="cursor-pointer">
              <BsTwitterX size={20} />
            </a>
            <a href="https://www.linkedin.com/" target="_blank"  className="cursor-pointer">
              <FaLinkedinIn size={20} />
            </a>
            <a  href="https://www.instagram.com/" target="_blank"  className="cursor-pointer">
              <FaInstagram size={20} />
            </a>
          </div>
        </nav>
      </div>

      <div className="text-center mt-10 pt-5 border-t">
        <p>
          © {new Date().getFullYear()} StudyMate — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

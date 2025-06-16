import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope } from "react-icons/fa";
import HomeHeroLogo from "@/assets/Home-HeroLogo.png";
import Image from "../Image/image";

const Footer = () => {
  return (
    <footer className="dark:bg-gray-900 bg-gray-50 text-gray-800 dark:text-gray-300 px-6 md:px-16 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <Image src={HomeHeroLogo} alt="HomeHero Logo" className="w-28 h-6 mb-4" />
          <p className="mt-3 text-sm">
            Book trusted professionals for all your home repair and installation needs.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="dark:hover:text-white">Home</a></li>
            <li><a href="#" className="dark:hover:text-white">About Us</a></li>
            <li><a href="#" className="dark:hover:text-white">Services</a></li>
            <li><a href="#" className="dark:hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Top Services</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="dark:hover:text-white">AC Repair</a></li>
            <li><a href="#" className="dark:hover:text-white">Geyser Installation</a></li>
            <li><a href="#" className="dark:hover:text-white">Water Purifier</a></li>
            <li><a href="#" className="dark:hover:text-white">LED TV Wall Mount</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><FaPhone /> +91 6303896539</li>
            <li className="flex items-center gap-2"><FaEnvelope /> homehero.care@gmail.com</li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="dark:hover:text-white"><FaFacebook size={18} /></a>
            <a href="#" className="dark:hover:text-white"><FaInstagram size={18} /></a>
            <a href="#" className="dark:hover:text-white"><FaTwitter size={18} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} HomeHero. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

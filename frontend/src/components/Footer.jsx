import React from 'react';
import { FaLinkedin, FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#1E1E2F] text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-bold text-[#6A38C2]">Worksy</h2>
          <p className="mt-2 text-sm text-gray-300">
            Your trusted platform to discover top job opportunities and connect with employers that value your potential.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/jobs" className="hover:text-[#6A38C2]">Browse Jobs</a></li>
            <li><a href="/about" className="hover:text-[#6A38C2]">About Us</a></li>
            <li><a href="/contact" className="hover:text-[#6A38C2]">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Support</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/faq" className="hover:text-[#6A38C2]">FAQs</a></li>
            <li><a href="/privacy" className="hover:text-[#6A38C2]">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-[#6A38C2]">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Social + Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Stay Connected</h3>
          <div className="flex gap-4 mt-3 text-gray-300">
            <a href="#" className="hover:text-[#6A38C2]"><FaLinkedin size={20} /></a>
            <a href="#" className="hover:text-[#6A38C2]"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-[#6A38C2]"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-[#6A38C2]"><FaInstagram size={20} /></a>
          </div>
          <p className="mt-4 text-sm text-gray-400">© {new Date().getFullYear()} JobLink. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

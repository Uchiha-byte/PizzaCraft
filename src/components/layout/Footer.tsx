import React from 'react';
import { Link } from 'react-router-dom';
import { Pizza, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Heart, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../../utils/config';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 pt-12 pb-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section with columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          {/* Company column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">PizzaCraft</h3>
            <p className="text-gray-400 mb-4">Crafting perfect pizzas with premium ingredients. Build your dream pizza exactly how you like it.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-800">
                  <Facebook className="h-5 w-5" />
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-800">
                  <Twitter className="h-5 w-5" />
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-800">
                  <Instagram className="h-5 w-5" />
                </div>
              </a>
            </div>
          </div>
          
          {/* Quick Links column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/build" className="text-gray-400 hover:text-primary-500 transition-colors">Build Your Pizza</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-primary-500 transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-primary-500 transition-colors">Register</Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-primary-500 transition-colors">Cart</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info column */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-400">
                  {CONTACT_INFO.address.city}, {CONTACT_INFO.address.state}, {CONTACT_INFO.address.zipCode}, {CONTACT_INFO.address.country}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-gray-400 hover:text-primary-500 transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-400 hover:text-primary-500 transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>
        
        {/* Bottom copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} PizzaCraft. All rights reserved.</p>
          <p className="mt-1">
            <Link to="/privacy" className="hover:text-primary-500 transition-colors">Privacy Policy</Link>
            {' • '}
            <Link to="/terms" className="hover:text-primary-500 transition-colors">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
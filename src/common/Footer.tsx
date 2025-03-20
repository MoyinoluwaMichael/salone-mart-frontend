import React, { useState } from 'react'
import { applicationConstants } from '@/constant/data';
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  CreditCardIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from 'lucide-react'

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  return (
      <footer className="bg-gray-800 text-white pt-6 pb-4">
        <div className="container mx-auto px-4">
          {/* About - Always visible */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">{applicationConstants.name}</h3>
            <p className="text-gray-400 mb-3 text-sm">
              Your one-stop shop for all your shopping needs at competitive prices.
            </p>
            <div className="flex space-x-4 mb-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FacebookIcon size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <TwitterIcon size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <InstagramIcon size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <YoutubeIcon size={18} />
              </a>
            </div>
          </div>

          {/* Collapsible sections for mobile */}
          <div className="md:hidden border-t border-gray-700">
            {/* Quick Links */}
            <div className="py-3 border-b border-gray-700">
              <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection('quickLinks')}
              >
                <h3 className="font-bold">Quick Links</h3>
                {openSection === 'quickLinks' ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
              </button>
              {openSection === 'quickLinks' && (
                  <ul className="mt-2 space-y-2 pl-2">
                    <li><a href="#" className="text-gray-400 text-sm">About Us</a></li>
                    <li><a href="#" className="text-gray-400 text-sm">Contact Us</a></li>
                    <li><a href="#" className="text-gray-400 text-sm">Terms & Conditions</a></li>
                    <li><a href="#" className="text-gray-400 text-sm">Privacy Policy</a></li>
                    <li><a href="#" className="text-gray-400 text-sm">FAQs</a></li>
                  </ul>
              )}
            </div>

            {/* Customer Service */}
            <div className="py-3 border-b border-gray-700">
              <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection('customerService')}
              >
                <h3 className="font-bold">Customer Service</h3>
                {openSection === 'customerService' ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
              </button>
              {openSection === 'customerService' && (
                  <ul className="mt-2 space-y-2 pl-2">
                    <li><a href="#" className="text-gray-400 text-sm">My Account</a></li>
                    <li><a href="#" className="text-gray-400 text-sm">Track Order</a></li>
                    <li><a href="#" className="text-gray-400 text-sm">Wishlist</a></li>
                    <li><a href="#" className="text-gray-400 text-sm">Returns</a></li>
                    <li><a href="#" className="text-gray-400 text-sm">Shipping Info</a></li>
                  </ul>
              )}
            </div>

            {/* Contact Us */}
            <div className="py-3 border-b border-gray-700">
              <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleSection('contactUs')}
              >
                <h3 className="font-bold">Contact Us</h3>
                {openSection === 'contactUs' ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
              </button>
              {openSection === 'contactUs' && (
                  <ul className="mt-2 space-y-2 pl-2">
                    <li className="flex items-start">
                      <MapPinIcon size={16} className="mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-400 text-sm">123 Shopping Street, SC 12345</span>
                    </li>
                    <li className="flex items-center">
                      <PhoneIcon size={16} className="mr-2 flex-shrink-0" />
                      <span className="text-gray-400 text-sm">+1 234 567 8900</span>
                    </li>
                    <li className="flex items-center">
                      <MailIcon size={16} className="mr-2 flex-shrink-0" />
                      <span className="text-gray-400 text-sm">{applicationConstants.email}</span>
                    </li>
                  </ul>
              )}
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
            {/* About section is already shown above for all screens */}
            <div className="hidden lg:block">
              {/* Empty div for spacing in desktop layout since About is shown above */}
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-bold mb-3">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">My Account</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Wishlist</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-3">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <MapPinIcon size={18} className="mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-400">123 Shopping Street, Commerce City, SC 12345</span>
                </li>
                <li className="flex items-center">
                  <PhoneIcon size={18} className="mr-2 flex-shrink-0" />
                  <span className="text-gray-400">+1 234 567 8900</span>
                </li>
                <li className="flex items-center">
                  <MailIcon size={18} className="mr-2 flex-shrink-0" />
                  <span className="text-gray-400">{applicationConstants.email}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Payment Methods - Simplified */}
          <div className="border-t border-gray-700 pt-4">
            <div className="flex flex-col md:flex-row md:justify-between items-center">
              <div className="mb-4 md:mb-0">
                <div className="flex space-x-2">
                  <div className="bg-white p-1 rounded">
                    <CreditCardIcon size={20} className="text-gray-800" />
                  </div>
                  <div className="bg-white p-1 rounded flex items-center justify-center">
                    <span className="text-blue-700 font-bold text-xs">VISA</span>
                  </div>
                  <div className="bg-white p-1 rounded flex items-center justify-center">
                    <span className="text-red-600 font-bold text-xs">Master</span>
                  </div>
                  <div className="bg-white p-1 rounded flex items-center justify-center">
                    <span className="text-yellow-500 font-bold text-xs">PayPal</span>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-gray-400 text-xs">
                  &copy; {new Date().getFullYear()} {applicationConstants.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer;

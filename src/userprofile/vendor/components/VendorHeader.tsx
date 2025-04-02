import React from "react";
import { Menu, Bell, LogOut, User } from "lucide-react";
import { motion } from "framer-motion";
interface VendorHeaderProps {
  onLogout: () => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

const VendorHeader: React.FC<VendorHeaderProps> = ({
  onLogout,
  onToggleSidebar,
  sidebarOpen,
}) => {
  const sierraLeoneColors = {
    green: "#1EB53A",
    white: "#FFFFFF",
    blue: "#0072C6",
  };

  return (
    <header
      className="bg-emerald-900 shadow-lg fixed top-0 left-0 right-0 z-30"
      style={{
        background: `linear-gradient(90deg, ${sierraLeoneColors.green} 0%, ${sierraLeoneColors.blue} 100%)`,
      }}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Mobile Menu Toggle */}
        <button onClick={onToggleSidebar} className="md:hidden text-white">
          <Menu size={24} />
        </button>

        {/* Logo */}
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <span
              style={{ color: sierraLeoneColors.blue }}
              className="font-bold text-xl"
            >
              S
            </span>
          </motion.div>
          <h1 className="text-xl font-bold text-white hidden md:block">
            Seria Lonne Vendor Portal
          </h1>
        </div>

        {/* Header Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative text-white hover:text-emerald-300">
            <Bell size={20} />
            <span
              className="absolute -top-2 -right-2 bg-red-500 text-white
              rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              3
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative group">
            <button className="text-white hover:text-emerald-300 flex items-center space-x-2">
              <User size={20} />
              <span className="hidden md:block">Emma Rodriguez</span>
            </button>

            {/* Dropdown Menu */}
            <div
              className="absolute right-0 mt-2 w-48 bg-emerald-800 rounded-lg shadow-lg
                            opacity-0 invisible group-hover:opacity-100 group-hover:visible
                            transition-all duration-300 z-50 overflow-hidden"
            >
              <button
                className="w-full text-left px-4 py-2 hover:bg-emerald-700
                                flex items-center space-x-2 text-white"
              >
                <User size={16} />
                <span>My Profile</span>
              </button>
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 hover:bg-emerald-700
                                flex items-center space-x-2 text-white"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default VendorHeader;

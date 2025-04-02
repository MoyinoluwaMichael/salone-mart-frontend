import React, { useState } from "react";
import { Bell, Search, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

interface AdminHeaderProps {
  onLogout: () => void;
  onToggleSidebar: () => void;
  sidebarOpen?: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  onLogout,
  onToggleSidebar,
  sidebarOpen,
}) => {
  const [notifications, setNotifications] = useState(5);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sierra Leone colors
  const sierraLeoneColors = {
    green: "#1EB53A",
    white: "#FFFFFF",
    blue: "#0072C6",
  };

  // For demonstration - in real app this would fetch from API
  const notificationsList = [
    {
      id: 1,
      message: "New order #12345 has been placed",
      time: "10 min ago",
      read: false,
    },
    {
      id: 2,
      message: "New vendor registration waiting for approval",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      message: "System update completed successfully",
      time: "3 hours ago",
      read: false,
    },
    {
      id: 4,
      message: "Inventory alert: Product XYZ is low in stock",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 5,
      message: "Customer complaint submitted for order #12300",
      time: "Yesterday",
      read: false,
    },
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setSearchActive(false);
    }
  };

  const toggleSearch = () => {
    setSearchActive(!searchActive);
    if (!searchActive) {
      setShowNotifications(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className="text-white shadow-md z-30"
      style={{
        background: `linear-gradient(90deg, ${sierraLeoneColors.green} 0%, ${sierraLeoneColors.blue} 100%)`,
      }}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Sidebar Toggle for Mobile */}
          <div className="flex items-center space-x-2">
            {/* Sidebar Toggle Button - Visible only on mobile */}
            <motion.button
              className="md:hidden mr-2 p-2 rounded-full hover:bg-white hover:bg-opacity-20"
              onClick={onToggleSidebar}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>

            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <span
                  style={{ color: sierraLeoneColors.blue }}
                  className="font-bold text-xl"
                >
                  A
                </span>
              </motion.div>
              <h1 className="text-xl font-bold hidden md:block">
                Admin Dashboard
              </h1>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Bell size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Bar */}
            <div className="relative">
              <motion.div
                animate={{ width: searchActive ? "200px" : "40px" }}
                transition={{ duration: 0.3 }}
                className="flex items-center"
              >
                <button
                  onClick={toggleSearch}
                  className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
                >
                  <Search size={20} />
                </button>
                {searchActive && (
                  <motion.form
                    onSubmit={handleSearchSubmit}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="ml-2"
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="bg-opacity-20 bg-white text-white placeholder-white rounded-full py-1 px-3 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </motion.form>
                )}
              </motion.div>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors relative"
              >
                <Bell size={20} />
                {notifications > 0 && (
                  <motion.span
                    className="absolute top-0 right-0 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {notifications}
                  </motion.span>
                )}
              </button>

              {showNotifications && (
                <motion.div
                  className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden z-10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="p-3 text-white font-semibold"
                    style={{
                      background: `linear-gradient(90deg, ${sierraLeoneColors.green} 0%, ${sierraLeoneColors.blue} 100%)`,
                    }}
                  >
                    Notifications ({notifications})
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notificationsList.map((notification) => (
                      <motion.div
                        key={notification.id}
                        className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-start">
                          <div
                            className={`w-2 h-2 rounded-full mt-1 mr-2 ${
                              notification.read ? "bg-gray-300" : "bg-blue-700"
                            }`}
                          ></div>
                          <div>
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="p-2 bg-gray-50 text-center">
                    <button className="text-blue-700 text-sm hover:underline">
                      Mark all as read
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Logout Button */}
            <motion.button
              onClick={onLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white px-4 py-2 rounded-full font-medium shadow-sm hover:shadow-md transition-all"
              style={{ color: sierraLeoneColors.blue }}
            >
              Logout
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden mt-4 pb-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-3">
              <form onSubmit={handleSearchSubmit} className="flex">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="bg-white bg-opacity-20 text-white placeholder-white rounded-l-full py-2 px-4 flex-grow focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-white rounded-r-full px-4 py-2"
                  style={{ color: sierraLeoneColors.blue }}
                >
                  <Search size={18} />
                </button>
              </form>

              <button
                onClick={toggleNotifications}
                className="flex items-center space-x-2 bg-white bg-opacity-20 p-3 rounded-full"
              >
                <Bell size={18} />
                <span>Notifications ({notifications})</span>
              </button>

              <button
                onClick={onLogout}
                className="bg-white p-3 rounded-full font-medium shadow-sm"
                style={{ color: sierraLeoneColors.blue }}
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;

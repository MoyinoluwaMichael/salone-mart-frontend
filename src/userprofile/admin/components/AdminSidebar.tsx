import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Package,
  Users,
  Truck,
  FileText,
  Tag,
  Bookmark,
  Settings,
  ShoppingBag,
} from "lucide-react";
import {
  AuthenticationResponse,
} from "@/authentication/authenticationService";
import { sierraLeoneColors } from "@/utils/apputils";

interface AdminSidebarProps {
  userData: AuthenticationResponse;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  userData,
  activeTab,
  setActiveTab,
}) => {
  // const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isUploading, setIsUploading] = useState(false);
  // const fileInputRef = useRef<HTMLInputElement>(null);

  // const handleProfilePictureClick = () => {
  //     fileInputRef.current?.click();
  // };

  const navItems = [
    { id: "overview", label: "Dashboard", icon: <Home size={20} /> },
    { id: "orders", label: "Orders", icon: <ShoppingBag size={20} /> },
    { id: "customers", label: "Customers", icon: <Users size={20} /> },
    { id: "vendors", label: "Vendors", icon: <Package size={20} /> },
    { id: "transporters", label: "Transporters", icon: <Truck size={20} /> },
    {
      id: "document-types",
      label: "Document Types",
      icon: <FileText size={20} />,
    },
    {
      id: "product-categories",
      label: "Product Categories",
      icon: <Tag size={20} />,
    },
    {
      id: "product-brands",
      label: "Product Brands",
      icon: <Bookmark size={20} />,
    },
    {
      id: "system-config",
      label: "System Config",
      icon: <Settings size={20} />,
    },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <motion.div
      className="w-full md:w-64 bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Admin Profile Summary */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="flex items-center justify-center flex-col">
          <div
            className="h-24 w-24 rounded-full flex items-center justify-center text-white text-3xl font-bold overflow-hidden"
            style={{
              background: `linear-gradient(to right, ${sierraLeoneColors.blue}, ${sierraLeoneColors.green})`,
            }}
          >
            {userData.user.bioData?.profilePicture ? (
              <img
                src={userData.user.bioData.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              userData.user.bioData?.firstName?.charAt(0).toUpperCase() || "U"
            )}
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          <motion.h2
            className="text-xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {userData.user.bioData.firstName} {userData.user.bioData.lastName}
          </motion.h2>

          <motion.p
            className="text-blue-100 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            System Administrator
          </motion.p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <motion.li
              key={item.id}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => handleTabChange(item.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-all duration-300 ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>

                {activeTab === item.id && (
                  <motion.span
                    className="ml-auto h-2 w-2 rounded-full bg-white"
                    layoutId="activeDot"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};

export default AdminSidebar;

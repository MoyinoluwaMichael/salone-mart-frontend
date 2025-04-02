import React, { useState } from "react";
import {
  Home,
  Package,
  ShoppingCart,
  Truck,
  User,
  Settings,
  Building2,
} from "lucide-react";
import { AuthenticationResponse } from "@/authentication/authenticationService";
import { motion } from "framer-motion";
import { sierraLeoneColors } from "@/utils/apputils";

interface VendorSidebarProps {
  userData: AuthenticationResponse;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const VendorSidebar: React.FC<VendorSidebarProps> = ({
  userData,
  activeTab,
  setActiveTab,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isUploading, setIsUploading] = useState(false);

  const sidebarItems = [
    {
      icon: <Home className="mr-2" />,
      label: "Dashboard",
      tab: "dashboard",
      id: 1,
    },
    {
      icon: <Package className="mr-2" />,
      label: "My Products",
      tab: "products",
      id: 2,
    },
    {
      icon: <ShoppingCart className="mr-2" />,
      label: "Orders",
      tab: "orders",
    },
    {
      icon: <Truck className="mr-2" />,
      label: "Transporters",
      tab: "transporters",
      id: 3,
    },
    {
      icon: <Building2 className="mr-2" />,
      label: "Business Profile",
      tab: "business-profile",
      id: 4,
    },
    {
      icon: <User className="mr-2" />,
      label: "Account Profile",
      tab: "account-profile",
      id: 5,
    },
    {
      icon: <Settings className="mr-2" />,
      label: "Settings",
      tab: "settings",
      id: 6,
    },
  ];

  return (
    <div className="space-y-2 rounded-xl">
      {/* Admin Profile Summary */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl">
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
            Vendor
          </motion.p>
        </div>
      </div>
      {/* ,..... */}

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            // <button
            //   key={item.tab}
            //   onClick={() => setActiveTab(item.tab)}
            //   className={`
            //                 w-full text-left px-4 py-2 rounded-lg transition-all duration-300
            //                 flex items-center
            //                 ${
            //                   activeTab === item.tab
            //                     ? "bg-emerald-600 text-white"
            //                     : "hover:bg-emerald-700 text-emerald-200"
            //                 }
            //             `}
            // >
            //   {item.icon}
            //   {item.label}
            // </button>
            <motion.li
              key={item.tab}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => setActiveTab(item.tab)}
                className={`w-full flex items-center p-3 rounded-lg transition-all duration-300 ${
                  activeTab === item.tab
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>

                {activeTab === item.tab && (
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
    </div>
  );
};

export default VendorSidebar;

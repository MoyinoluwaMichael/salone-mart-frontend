import React, { useState, useRef, useEffect } from "react";
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Users,
  Camera,
} from "lucide-react";
import { sierraLeoneColors } from "@/utils/apputils";
import {
  AuthenticationResponse,
  BioData,
} from "@/authentication/authenticationService";
import { useNavigate } from "react-router-dom";
import { handleFileChange } from "@/userprofile/userProfileService";
import { motion } from 'framer-motion';


interface VendorDashboardProps {
  userData: AuthenticationResponse;
  setIsEditing: (editing: boolean) => void;
}

const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
  trend?: number;
}> = ({ icon, title, value, trend }) => (
  <div
    className="rounded-lg p-4 shadow-md transform transition-all hover:scale-105"
    style={{
      backgroundColor: sierraLeoneColors.blue,
      color: sierraLeoneColors.white,
    }}
  >
    <div className="flex justify-between items-center">
      <div style={{ color: sierraLeoneColors.midGreen }}>{icon}</div>
      <div className="text-right">
        <h3 className="text-sm opacity-80">{title}</h3>
        <div className="flex items-center">
          <p className="text-xl font-bold">{value}</p>
          {trend && (
            <span
              className={`ml-2 text-sm ${
                trend > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {trend > 0 ? "▲" : "▼"} {Math.abs(trend)}%
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

const VendorDashboard: React.FC<VendorDashboardProps> = ({
  userData,
  setIsEditing,
}) => {
  // const [stats, setStats] = useState({
  //         totalTransporters: 0,
  //         totalOrders: 0,
  //         totalCustomers: 0,
  //         totalVendors: 0
  //     });

  const navigate = useNavigate();

  // const [categoryProductCount, setCategoryProductCount] = useState<CategoryProductCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bioData, setBioData] = useState<BioData | null>(null);
  // const [activeCard, setActiveCard] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "error" | "success" | "info" | "warning";
    message: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const fetchData = async () => {
      const adminDashboardResponse: AdminDashboardResponse | null =
        await retrieveAdminDashboard();
      if (adminDashboardResponse) {
        setBioData(userData.user.bioData);
        setCategoryProductCount(adminDashboardResponse.categoryProductCount);
        setStats({
          totalTransporters: adminDashboardResponse.totalTransporters,
          totalOrders: adminDashboardResponse.totalOrders,
          totalCustomers: adminDashboardResponse.totalCustomers,
          totalVendors: adminDashboardResponse.totalVendors,
        });
        setIsLoading(false);
      } else {
        navigate("/auth");
      }
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Mock data - in real app, these would come from backend
  const dashboardStats = [
    {
      icon: <Package className="w-6 h-6 text-white" />,
      title: "Total Products",
      value: "42",
      trend: 12,
    },
    {
      icon: <ShoppingCart className="w-6 h-6 text-white" />,
      title: "Active Orders",
      value: "17",
      trend: 5,
    },
    {
      icon: <DollarSign className="w-6 h-6 text-white" />,
      title: "Monthly Revenue",
      value: "$24,500",
      trend: 8,
    },
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "New Customers",
      value: "23",
      trend: 15,
    },
  ];

  return (
    <div className="space-y- text-white">
      {/* Profile Overview */}
      <div
        className="rounded-lg p-6 md:flex items-center justify-between bg-gray-800 shadow-md shadow-gray-900"
        style={{
          //   backgroundColor: sierraLeoneColors.darkBlue,
          color: sierraLeoneColors.white,
        }}
      >
        <div className="md:flex items-center space-x-4 mt-2 mb-5">
          <div className="relative group">
            <div
              className="h-24 w-24 rounded-full flex items-center justify-center text-white text-3xl font-bold overflow-hidden"
              style={{
                background: `linear-gradient(to right, ${sierraLeoneColors.blue}, ${sierraLeoneColors.green})`,
              }}
            >
              {bioData?.profilePicture ? (
                <img
                  src={bioData.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                bioData?.firstName?.charAt(0).toUpperCase() || "U"
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <div
              className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
              onClick={handleProfilePictureClick}
            >
              {isUploading ? (
                <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Camera size={24} className="text-white" />
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) =>
                handleFileChange(
                  e,
                  fileInputRef,
                  setAlert,
                  setIsUploading,
                  setBioData,
                  userData,
                  navigate
                )
              }
              className="hidden"
              accept="image/*"
            />
          </div>
          {/* <img
            src="/api/placeholder/100/100"
            alt="Vendor Profile"
            className="w-20 h-20 rounded-full border-4"
            style={{ borderColor: sierraLeoneColors.green }}
          /> */}
          <div>
            <h1 className="text-2xl font-bold">
              Welcome, {userData.user.bioData.firstName}
            </h1>
            <p className="opacity-80">
              Vendor Dashboard - {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        <motion.button
          onClick={() => setIsEditing(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-lg transition-colors hover:cursor-pointer hover:bg-${sierraLeoneColors.midGreen}`}
          style={{
            background: `linear-gradient(to right, ${sierraLeoneColors.blue}, ${sierraLeoneColors.green})`,
            color: sierraLeoneColors.white,
          }}
        >
          Edit Profile
        </motion.button>
      </div>

      {/* Dashboard Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4 sm:grid-cols-2 py-5">
        {dashboardStats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Recent Activity Section */}
      <div
        className="rounded-lg p-6 bg-gray-900"
        style={{
          // backgroundColor: sierraLeoneColors.blue,
          color: sierraLeoneColors.white,
        }}
      >
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            "New order #1245 received",
            "Product 'Organic Tea' stock updated",
            "Payment for order #1243 processed",
          ].map((activity, index) => (
            <div
              key={index}
              className="p-3 rounded-lg flex items-center justify-between ring-[0.3px] ring-gray-400"
              // style={{ backgroundColor: sierraLeoneColors.darkBlue }}
            >
              <span className="opacity-80">{activity}</span>
              <TrendingUp className="text-green-400" size={20} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;

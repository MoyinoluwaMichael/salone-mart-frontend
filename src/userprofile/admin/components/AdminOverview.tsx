import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    ShoppingBag,
    ArrowUp,
    ArrowDown,
    Edit,
    Mail,
    Phone,
    Package,
    Truck,
    Camera
} from 'lucide-react';
import { AuthenticationResponse, BioData } from '@/authentication/authenticationService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {
    AdminDashboardResponse,
    CategoryProductCount,
    retrieveAdminDashboard
} from "@/userprofile/admin/adminProfileService";
import { handleFileChange } from "@/userprofile/userProfileService";
import { useNavigate } from "react-router-dom";
import {sierraLeoneColors} from "@/utils/apputils";

interface AdminOverviewProps {
    userData: AuthenticationResponse;
    setIsEditing: (isEditing: boolean) => void;
}

const AdminOverview: React.FC<AdminOverviewProps> = ({ userData, setIsEditing }) => {
    // Sierra Leone colors palette

    const [stats, setStats] = useState({
        totalTransporters: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalVendors: 0
    });

    const navigate = useNavigate();

    const [categoryProductCount, setCategoryProductCount] = useState<CategoryProductCount[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [bioData, setBioData] = useState<BioData | null>(null);
    const [activeCard, setActiveCard] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [alert, setAlert] = useState<{ type: 'error' | 'success' | 'info' | 'warning'; message: string } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleProfilePictureClick = () => {
        fileInputRef.current?.click();
    };

    useEffect(() => {
        const fetchData = async () => {
            const adminDashboardResponse: AdminDashboardResponse | null = await retrieveAdminDashboard();
            if (adminDashboardResponse) {
                setBioData(userData.user.bioData);
                setCategoryProductCount(adminDashboardResponse.categoryProductCount);
                setStats({
                    totalTransporters: adminDashboardResponse.totalTransporters,
                    totalOrders: adminDashboardResponse.totalOrders,
                    totalCustomers: adminDashboardResponse.totalCustomers,
                    totalVendors: adminDashboardResponse.totalVendors
                });
                setIsLoading(false);
            } else {
                navigate('/auth');
            }
        };

        const timer = setTimeout(() => {
            fetchData();
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const orderStatusData = [
        { name: 'Completed', value: 60 },
        { name: 'Processing', value: 25 },
        { name: 'Cancelled', value: 15 }
    ];

    // Sierra Leone themed colors for charts
    const CHART_COLORS = [sierraLeoneColors.green, sierraLeoneColors.blue, '#f87171'];

    const categoryData: { name: string; value: number }[] = categoryProductCount.map(item => ({
        name: item.category.name,
        value: item.productCount
    }));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 300, damping: 24 }
        }
    };

    const cardVariants = {
        inactive: { scale: 1, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' },
        active: {
            scale: 1.05,
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
            transition: { type: 'spring', stiffness: 300, damping: 20 }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
        >
            <motion.div variants={itemVariants}>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2 md:mb-0">Dashboard Overview</h2>
                    <motion.button
                        onClick={() => setIsEditing(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-lg shadow"
                        style={{
                            background: `linear-gradient(to right, ${sierraLeoneColors.blue}, ${sierraLeoneColors.green})`
                        }}
                    >
                        <Edit size={16} />
                        <span>Edit Profile</span>
                    </motion.button>
                </div>

                <div className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-lg shadow-md p-6 mb-6">
                    <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                        <div className="relative group">
                            <div
                                className="h-24 w-24 rounded-full flex items-center justify-center text-white text-3xl font-bold overflow-hidden"
                                style={{
                                    background: `linear-gradient(to right, ${sierraLeoneColors.blue}, ${sierraLeoneColors.green})`
                                }}
                            >
                                {bioData?.profilePicture ? (
                                    <img src={bioData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    bioData?.firstName?.charAt(0).toUpperCase() || 'U'
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
                                onChange={(e) => handleFileChange(
                                    e,
                                    fileInputRef,
                                    setAlert,
                                    setIsUploading,
                                    setBioData,
                                    userData,
                                    navigate
                                )}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>

                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white">
                                {userData.user.bioData.firstName} {userData.user.bioData.lastName}
                            </h3>
                            <p className="text-green-300 mt-1">System Administrator</p>

                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2 text-gray-300">
                                    <Mail size={18} style={{ color: sierraLeoneColors.blue }} />
                                    <span>{userData.user.bioData.emailAddress}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-300">
                                    <Phone size={18} style={{ color: sierraLeoneColors.blue }} />
                                    <span>{userData.user.bioData.phoneNumber || 'Not provided'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                <motion.div
                    variants={cardVariants}
                    animate={activeCard === 1 ? 'active' : 'inactive'}
                    onMouseEnter={() => setActiveCard(1)}
                    onMouseLeave={() => setActiveCard(0)}
                    className="rounded-lg shadow-md p-6"
                    style={{
                        background: `linear-gradient(135deg, ${sierraLeoneColors.blue}, ${sierraLeoneColors.darkBlue})`
                    }}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-blue-100 text-sm">Total Transporters</p>
                            <h3 className="text-white text-2xl font-bold mt-2">
                                {isLoading ?
                                    <div className="h-8 w-24 bg-blue-400 animate-pulse rounded"></div> :
                                    stats.totalTransporters.toLocaleString()
                                }
                            </h3>
                        </div>
                        <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                            <Truck size={24} className="text-white" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        <ArrowUp size={20} className="text-green-300 mr-1" />
                        <span className="text-green-300">+8.2%</span>
                        <span className="text-blue-100 text-sm ml-2">from last month</span>
                    </div>
                </motion.div>

                <motion.div
                    variants={cardVariants}
                    animate={activeCard === 2 ? 'active' : 'inactive'}
                    onMouseEnter={() => setActiveCard(2)}
                    onMouseLeave={() => setActiveCard(0)}
                    className="rounded-lg shadow-md p-6"
                    style={{
                        background: `linear-gradient(135deg, ${sierraLeoneColors.white}, rgba(255, 255, 255, 0.7))`
                    }}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-gray-700 text-sm">Total Orders</p>
                            <h3 className="text-gray-800 text-2xl font-bold mt-2">
                                {isLoading ?
                                    <div className="h-8 w-24 bg-gray-300 animate-pulse rounded"></div> :
                                    stats.totalOrders.toLocaleString()
                                }
                            </h3>
                        </div>
                        <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                            <ShoppingBag size={24} className="text-gray-700" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        <ArrowUp size={20} className="text-green-600 mr-1" />
                        <span className="text-green-600">+12.1%</span>
                        <span className="text-gray-600 text-sm ml-2">from last month</span>
                    </div>
                </motion.div>

                <motion.div
                    variants={cardVariants}
                    animate={activeCard === 3 ? 'active' : 'inactive'}
                    onMouseEnter={() => setActiveCard(3)}
                    onMouseLeave={() => setActiveCard(0)}
                    className="rounded-lg shadow-md p-6"
                    style={{
                        background: `linear-gradient(135deg, ${sierraLeoneColors.green}, ${sierraLeoneColors.midGreen})`
                    }}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-green-100 text-sm">Total Customers</p>
                            <h3 className="text-white text-2xl font-bold mt-2">
                                {isLoading ?
                                    <div className="h-8 w-24 bg-green-400 animate-pulse rounded"></div> :
                                    stats.totalCustomers.toLocaleString()
                                }
                            </h3>
                        </div>
                        <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                            <Users size={24} className="text-white" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        <ArrowUp size={20} className="text-blue-200 mr-1" />
                        <span className="text-blue-200">+5.8%</span>
                        <span className="text-green-100 text-sm ml-2">from last month</span>
                    </div>
                </motion.div>

                <motion.div
                    variants={cardVariants}
                    animate={activeCard === 4 ? 'active' : 'inactive'}
                    onMouseEnter={() => setActiveCard(4)}
                    onMouseLeave={() => setActiveCard(0)}
                    className="bg-gradient-to-br rounded-lg shadow-md p-6"
                    style={{
                        background: `linear-gradient(135deg, ${sierraLeoneColors.green}, ${sierraLeoneColors.blue})`
                    }}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-white text-sm">Total Vendors</p>
                            <h3 className="text-white text-2xl font-bold mt-2">
                                {isLoading ?
                                    <div className="h-8 w-24 bg-blue-300 animate-pulse rounded"></div> :
                                    stats.totalVendors.toLocaleString()
                                }
                            </h3>
                        </div>
                        <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                            <Package size={24} className="text-white" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center">
                        <ArrowDown size={20} className="text-red-300 mr-1" />
                        <span className="text-red-300">-2.3%</span>
                        <span className="text-white text-sm ml-2">from last quarter</span>
                    </div>
                </motion.div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <motion.div
                    variants={itemVariants}
                    className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-lg shadow-md p-6"
                >
                    <h3 className="text-xl font-bold text-white mb-4">Top Product Categories</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1F2937',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        color: '#F9FAFB'
                                    }}
                                />
                                <Bar dataKey="value" fill={sierraLeoneColors.green} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="bg-gray-800 bg-opacity-60 backdrop-blur-sm rounded-lg shadow-md p-6"
                >
                    <h3 className="text-xl font-bold text-white mb-4">Order Status</h3>
                    <div className="flex h-64">
                        <div className="w-1/2">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={orderStatusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {orderStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1F2937',
                                            border: 'none',
                                            borderRadius: '0.5rem',
                                            color: '#F9FAFB'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="w-1/2 flex flex-col justify-center">
                            {orderStatusData.map((entry, index) => (
                                <div key={index} className="flex items-center mb-3">
                                    <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}></div>
                                    <div className="text-gray-300">
                                        <span className="font-medium">{entry.name}</span>
                                        <span className="ml-2 text-sm text-gray-400">{entry.value}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AdminOverview;

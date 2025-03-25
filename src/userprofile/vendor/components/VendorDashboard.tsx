import React from 'react';
import {
    Package,
    ShoppingCart,
    DollarSign,
    TrendingUp,
    Users
} from 'lucide-react';
import { sierraLeoneColors } from "@/utils/apputils";
import { AuthenticationResponse } from "@/authentication/authenticationService";

interface VendorDashboardProps {
    userData: AuthenticationResponse;
    setIsEditing: (editing: boolean) => void;
}

const StatCard: React.FC<{
    icon: React.ReactNode,
    title: string,
    value: string,
    trend?: number
}> = ({ icon, title, value, trend }) => (
    <div
        className="rounded-lg p-4 shadow-md transform transition-all hover:scale-105"
        style={{
            backgroundColor: sierraLeoneColors.blue,
            color: sierraLeoneColors.white
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
                                trend > 0 ? 'text-green-400' : 'text-red-400'
                            }`}
                        >
                            {trend > 0 ? '▲' : '▼'} {Math.abs(trend)}%
                        </span>
                    )}
                </div>
            </div>
        </div>
    </div>
);

const VendorDashboard: React.FC<VendorDashboardProps> = ({
                                                             userData,
                                                             setIsEditing
                                                         }) => {
    // Mock data - in real app, these would come from backend
    const dashboardStats = [
        {
            icon: <Package className="w-6 h-6" />,
            title: "Total Products",
            value: "42",
            trend: 12
        },
        {
            icon: <ShoppingCart className="w-6 h-6" />,
            title: "Active Orders",
            value: "17",
            trend: 5
        },
        {
            icon: <DollarSign className="w-6 h-6" />,
            title: "Monthly Revenue",
            value: "$24,500",
            trend: 8
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "New Customers",
            value: "23",
            trend: 15
        }
    ];

    return (
        <div className="space-y-6">
            {/* Profile Overview */}
            <div
                className="rounded-lg p-6 flex items-center justify-between"
                style={{
                    backgroundColor: sierraLeoneColors.darkBlue,
                    color: sierraLeoneColors.white
                }}
            >
                <div className="flex items-center space-x-4">
                    <img
                        src="/api/placeholder/100/100"
                        alt="Vendor Profile"
                        className="w-20 h-20 rounded-full border-4"
                        style={{ borderColor: sierraLeoneColors.green }}
                    />
                    <div>
                        <h1 className="text-2xl font-bold">
                            Welcome, {userData.user.bioData.firstName}
                        </h1>
                        <p className="opacity-80">
                            Vendor Dashboard - {new Date().toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 rounded-lg transition-colors"
                    style={{
                        backgroundColor: sierraLeoneColors.green,
                        color: sierraLeoneColors.white,
                        hover: { backgroundColor: sierraLeoneColors.midGreen }
                    }}
                >
                    Edit Profile
                </button>
            </div>

            {/* Dashboard Stats Grid */}
            <div className="grid md:grid-cols-4 gap-4 sm:grid-cols-2">
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
                className="rounded-lg p-6"
                style={{
                    backgroundColor: sierraLeoneColors.blue,
                    color: sierraLeoneColors.white
                }}
            >
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-3">
                    {[
                        "New order #1245 received",
                        "Product 'Organic Tea' stock updated",
                        "Payment for order #1243 processed"
                    ].map((activity, index) => (
                        <div
                            key={index}
                            className="p-3 rounded-lg flex items-center justify-between"
                            style={{ backgroundColor: sierraLeoneColors.darkBlue }}
                        >
                            <span className="opacity-80">{activity}</span>
                            <TrendingUp
                                className="text-green-400"
                                size={20}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;

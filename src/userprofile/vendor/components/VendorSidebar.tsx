import React from 'react';
import {
    Home,
    Package,
    ShoppingCart,
    Truck,
    User,
    Settings,
    Building2
} from 'lucide-react';
import { AuthenticationResponse } from "@/authentication/authenticationService";

interface VendorSidebarProps {
    userData: AuthenticationResponse;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const VendorSidebar: React.FC<VendorSidebarProps> = ({
                                                         userData,
                                                         activeTab,
                                                         setActiveTab
                                                     }) => {
    const sidebarItems = [
        {
            icon: <Home className="mr-2" />,
            label: 'Dashboard',
            tab: 'dashboard'
        },
        {
            icon: <Package className="mr-2" />,
            label: 'My Products',
            tab: 'products'
        },
        {
            icon: <ShoppingCart className="mr-2" />,
            label: 'Orders',
            tab: 'orders'
        },
        {
            icon: <Truck className="mr-2" />,
            label: 'Transporters',
            tab: 'transporters'
        },
        {
            icon: <Building2 className="mr-2" />,
            label: 'Business Profile',
            tab: 'business-profile'
        },
        {
            icon: <User className="mr-2" />,
            label: 'Account Profile',
            tab: 'account-profile'
        },
        {
            icon: <Settings className="mr-2" />,
            label: 'Settings',
            tab: 'settings'
        }
    ];

    return (
        <div className="p-4 space-y-2">
            <div className="flex items-center mb-6 p-3 bg-emerald-700 rounded-lg">
                <img
                    src="/api/placeholder/50/50"
                    alt="Vendor Avatar"
                    className="w-12 h-12 rounded-full mr-3 border-2 border-emerald-500"
                />
                <div>
                    <h2 className="text-lg font-semibold">
                        {userData.user.bioData.firstName} {userData.user.bioData.lastName}
                    </h2>
                    <p className="text-sm text-emerald-200">Vendor</p>
                </div>
            </div>

            {sidebarItems.map((item) => (
                <button
                    key={item.tab}
                    onClick={() => setActiveTab(item.tab)}
                    className={`
                        w-full text-left px-4 py-2 rounded-lg transition-all duration-300
                        flex items-center
                        ${activeTab === item.tab
                        ? 'bg-emerald-600 text-white'
                        : 'hover:bg-emerald-700 text-emerald-200'}
                    `}
                >
                    {item.icon}
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default VendorSidebar;

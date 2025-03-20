import React, {useEffect, useState} from 'react';
import { User, Package, Heart, MapPin, Settings, Home } from 'lucide-react';
import {AuthenticationResponse, BioData} from "@/service/authenticationService";
import {useNavigate, Link} from "react-router-dom";

const ProfileSidebar = ({ userData, activeTab, setActiveTab }: { userData: AuthenticationResponse, activeTab: string, setActiveTab: any }) => {
    const navigationItems = [
        { key: 'overview', label: 'Account Overview', icon: <User size={18} /> },
        { key: 'orders', label: 'Orders', icon: <Package size={18} /> },
        { key: 'wishlist', label: 'Wishlist', icon: <Heart size={18} /> },
        { key: 'addresses', label: 'Addresses', icon: <MapPin size={18} /> },
        { key: 'settings', label: 'Account Settings', icon: <Settings size={18} /> }
    ];

    const [bioData, setBioData] = useState<BioData | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (userData) {
            let bioData: BioData = userData?.user?.bioData;
            setBioData(bioData);
        } else {
            navigate('/auth');
        }
    }, [navigate]);


    return (
        <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-700 to-green-600 flex items-center justify-center text-white font-bold overflow-hidden">
                            {bioData?.profilePicture ? (
                                <img src={bioData?.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                bioData?.firstName?.charAt(0).toUpperCase() || 'U'
                            )}
                        </div>
                        <div className="overflow-hidden">
                            <h2 className="font-bold truncate">{bioData?.firstName} {bioData?.lastName}</h2>
                            <p className="text-sm text-gray-500 truncate">{bioData?.emailAddress}</p>
                        </div>
                    </div>
                </div>

                <nav className="p-2">
                    <Link
                        to="/"
                        className="w-full flex items-center gap-3 p-3 rounded-md mb-1 bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 transition-all duration-300 hover:shadow-md hover:translate-x-1"
                    >
                        <span className="text-blue-600">
                            <Home size={18} className="transition-transform duration-300 transform group-hover:rotate-12" />
                        </span>
                        <span className="font-medium">Return to Home</span>
                    </Link>

                    {navigationItems.map((item) => (
                        <button
                            key={item.key}
                            className={`w-full flex items-center gap-3 p-3 rounded-md mb-1 transition-all duration-300 ${
                                activeTab === item.key
                                    ? 'bg-gradient-to-r from-blue-50 to-green-50 text-blue-700'
                                    : 'hover:bg-gray-50 text-gray-700'
                            }`}
                            onClick={() => setActiveTab(item.key)}
                        >
                            <span className={activeTab === item.key ? 'text-blue-600' : 'text-gray-500'}>
                                {item.icon}
                            </span>
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default ProfileSidebar;

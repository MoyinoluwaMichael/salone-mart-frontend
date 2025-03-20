import React from 'react';
import { LogOut, Home } from 'lucide-react';
import Button from '@/component/ui/userAuth/Button';
import { Link } from 'react-router-dom';

const ProfileHeader = ({ onLogout }: { onLogout: any }) => {
    return (
        <div className="bg-gradient-to-r from-blue-700 to-green-600 text-white shadow-md">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <Link
                            to="/"
                            className="flex items-center gap-2 hover:bg-white hover:text-blue-700 px-3 py-1 rounded-md transition-all duration-300 transform hover:scale-105"
                        >
                            <Home size={18} className="animate-pulse" />
                            <span className="font-medium">Home</span>
                        </Link>
                        <h1 className="text-2xl font-bold">My Account</h1>
                    </div>
                    <Button
                        type="button"
                        variant="primary"
                        onClick={onLogout}
                        className="flex items-center gap-2 hover:bg-orange-200 hover:bg-opacity-20 px-3 py-1 rounded-md transition-colors duration-300"
                    >
                        <LogOut size={18} /> Logout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;

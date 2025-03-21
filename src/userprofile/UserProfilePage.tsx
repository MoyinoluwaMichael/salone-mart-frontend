import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    retrieveFromStorage,
    CUSTOMER_DATA,
    removeFromStorage,
    BioData,
    AuthenticationResponse
} from "@/authentication/authenticationService";

// Import Components
import ProfileHeader from '@/userprofile/component/ProfileHeader';
import ProfileSidebar from '@/userprofile/component/ProfileSidebar';
import ProfileOverview from '@/userprofile/component/ProfileOverview';
import OrdersTab from '@/userprofile/component/OrdersTab';
import ProfileAddresses from '@/userprofile/component/ProfileAddresses';
import WishlistTab from '@/userprofile/component/WishlistTab';
import EditProfileForm from '@/userprofile/component/EditProfileForm';

const UserProfile = () => {
    const [userData, setUserData] = useState<AuthenticationResponse | null>(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<BioData | any>({});
    const navigate = useNavigate();

    useEffect(() => {
        const customerData: AuthenticationResponse = retrieveFromStorage(CUSTOMER_DATA) as AuthenticationResponse;
        if (customerData) {

            setUserData(customerData);
            let bioData = customerData?.user?.bioData;
            setEditForm({
                firstName: bioData.firstName || '',
                lastName: bioData.lastName || '',
                emailAddress: bioData.emailAddress || '',
                phoneNumber: bioData.phoneNumber || ''
            });
        } else {
            // Redirect to login if not logged in
            navigate('/auth');
        }
    }, [navigate]);

    const handleLogout = () => {
        removeFromStorage(CUSTOMER_DATA);
        navigate('/auth');
    };

    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUserData({
            ...userData,
            ...editForm
        });
        setIsEditing(false);
    };

    const handleInputChange = (e: React.FormEvent<HTMLFormElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        setEditForm({
            ...editForm,
            [name]: value
        });
    };

    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="p-8 rounded-lg shadow-md bg-white w-full max-w-md text-center">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-12 w-12 bg-gradient-to-r from-blue-700 to-green-600 rounded-full mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <ProfileHeader onLogout={handleLogout} />

            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar */}
                    <ProfileSidebar
                        userData={userData}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />

                    {/* Main Content */}
                    <div className="flex-1">
                        {activeTab === 'overview' && (
                            <ProfileOverview userData={userData} setIsEditing={setIsEditing} />
                        )}
                        {activeTab === 'orders' && <OrdersTab />}
                        {activeTab === 'addresses' && <ProfileAddresses />}
                        {activeTab === 'wishlist' && <WishlistTab />}
                        {activeTab === 'settings' && (
                            <ProfileOverview userData={userData} setIsEditing={setIsEditing} />
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditing && (
                <EditProfileForm
                    editForm={editForm}
                    handleInputChange={handleInputChange}
                    handleEditSubmit={handleEditSubmit}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    );
};

export default UserProfile;

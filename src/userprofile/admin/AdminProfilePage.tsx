import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AUTHENTICATION_RESPONSE_DATA,
    BioData,
    AuthenticationResponse
} from "@/authentication/authenticationService";

// Import Components
import AdminHeader from '@/userprofile/admin/components/AdminHeader';
import AdminSidebar from '@/userprofile/admin/components/AdminSidebar';
import AdminOverview from '@/userprofile/admin/components/AdminOverview';
import OrdersManagement from '@/userprofile/admin/components/OrdersManagement';
import CustomersManagement from '@/userprofile/admin/components/CustomersManagement';
import VendorsManagement from '@/userprofile/admin/components/VendorsManagement';
import TransportersManagement from '@/userprofile/admin/components/TransportersManagement';
import DocumentTypesManagement from '@/userprofile/admin/components/DocumentTypesManagement';
import ProductCategoryManagement from '@/userprofile/admin/components/ProductCategoryManagement';
import ProductBrandsManagement from '@/userprofile/admin/components/ProductBrandsManagement';
import SystemConfigManagement from '@/userprofile/admin/components/SystemConfigManagement';
import EditProfileForm from '@/userprofile/admin/components/EditProfileForm';
import { removeFromStorage, retrieveFromStorage } from "@/utils/storageservice";
import { Roles } from "@/utils/routes";
import { updateUserData } from "@/userprofile/userProfileService";

// Define constants for localStorage keys
const ACTIVE_TAB_KEY = 'admin_active_tab';
const SIDEBAR_OPEN_KEY = 'admin_sidebar_open';

const AdminProfile = () => {
    const [userData, setUserData] = useState<AuthenticationResponse | null>(null);
    // Get the active tab from localStorage or default to 'overview'
    const [activeTab, setActiveTab] = useState(() => {
        return localStorage.getItem(ACTIVE_TAB_KEY) || 'overview';
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<BioData | any>({});
    const [sidebarOpen, setSidebarOpen] = useState(() => {
        // On mobile default to closed, on desktop default to open
        const savedState = localStorage.getItem(SIDEBAR_OPEN_KEY);
        return savedState ? savedState === 'true' : window.innerWidth >= 768;
    });
    const navigate = useNavigate();

    // Save the active tab and sidebar state to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem(ACTIVE_TAB_KEY, activeTab);
    }, [activeTab]);

    useEffect(() => {
        localStorage.setItem(SIDEBAR_OPEN_KEY, String(sidebarOpen));
    }, [sidebarOpen]);

    useEffect(() => {
        const authenticationResponse: AuthenticationResponse = retrieveFromStorage(AUTHENTICATION_RESPONSE_DATA) as AuthenticationResponse;
        console.log("authenticationResponse", authenticationResponse);
        if (authenticationResponse) {
            let userRoles = authenticationResponse.user.bioData.roles;
            console.log("userRoles", userRoles);
            if (userRoles.length > 0) {
                if (!Roles.ADMINS.includes(userRoles[0])) {
                    navigate("/auth");
                }
            }
            setUserData(authenticationResponse);
            let bioData = authenticationResponse?.user?.bioData;
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
        // Clear user preferences when logging out
        localStorage.removeItem(ACTIVE_TAB_KEY);
        localStorage.removeItem(SIDEBAR_OPEN_KEY);
        removeFromStorage(AUTHENTICATION_RESPONSE_DATA);
        navigate('/auth');
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        // On mobile, close the sidebar when a tab is selected
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
        // Auto-scroll to top when changing tabs
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUserData({
            ...userData,
            user: {
                ...userData?.user,
                bioData: {
                    ...userData?.user.bioData,
                    ...editForm
                }
            },
        } as AuthenticationResponse);

        if (userData) {
            await updateUserData(userData.user.id, editForm, userData.accessToken, userData.user.bioData.roles);
        }
        setIsEditing(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditForm({
            ...editForm,
            [name]: value
        });
    };

    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="p-8 rounded-lg shadow-lg bg-white w-full max-w-md text-center">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            {/* Header with Mobile Menu Toggle */}
            <AdminHeader
                onLogout={handleLogout}
                onToggleSidebar={toggleSidebar}
                sidebarOpen={sidebarOpen}
            />

            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-6 relative">
                    {/* Sidebar - Mobile responsive */}
                    <div className={`
                        ${sidebarOpen ? 'block' : 'hidden'} 
                        md:block
                        fixed md:static 
                        top-16 left-0 z-20 
                        w-5/6 md:w-64
                        h-full md:h-auto
                        bg-gray-800 
                        shadow-lg md:shadow-none
                        overflow-y-auto
                        transition-all duration-300
                    `}>
                        <AdminSidebar
                            userData={userData}
                            activeTab={activeTab}
                            setActiveTab={handleTabChange}
                        />
                    </div>

                    {/* Overlay for mobile when sidebar is open */}
                    {sidebarOpen && (
                        <div
                            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
                            onClick={() => setSidebarOpen(false)}
                        ></div>
                    )}

                    {/* Main Content */}
                    <div className="flex-1 bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-500 ease-in-out">
                        {activeTab === 'overview' && (
                            <AdminOverview userData={userData} setIsEditing={setIsEditing} />
                        )}
                        {activeTab === 'orders' && <OrdersManagement />}
                        {activeTab === 'customers' && <CustomersManagement />}
                        {activeTab === 'vendors' && <VendorsManagement />}
                        {activeTab === 'transporters' && <TransportersManagement />}
                        {activeTab === 'document-types' && <DocumentTypesManagement />}
                        {activeTab === 'product-categories' && <ProductCategoryManagement />}
                        {activeTab === 'product-brands' && <ProductBrandsManagement />}
                        {activeTab === 'system-config' && <SystemConfigManagement />}
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

export default AdminProfile;

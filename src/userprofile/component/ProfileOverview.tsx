import React, {useEffect, useState, useRef} from 'react';
import { Edit, Camera, ShoppingBag, Heart, MapPin, CreditCard, Bell, Shield, ChevronRight, BackpackIcon } from 'lucide-react';
import {useNavigate} from "react-router-dom";
import {AuthenticationResponse, BioData} from "@/authentication/authenticationService";
import {FileMetaData, uploadMedia} from "@/userprofile/userProfileService";
import Alert from '@/common/Alert';

const ProfileOverview = ({ userData, setIsEditing }: { userData: AuthenticationResponse, setIsEditing: any }) => {

    const [bioData, setBioData] = useState<BioData | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [alert, setAlert] = useState<{type: 'error' | 'success' | 'info' | 'warning', message: string} | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (userData) {
            let bioData: BioData = userData?.user?.bioData;
            console.log("BioData: ", bioData);
            setBioData(bioData);
        } else {
            navigate('/auth');
        }
    }, [navigate]);

    const handleProfilePictureClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validFileTypes.includes(file.type)) {
            setAlert({
                type: 'error',
                message: 'Please upload a valid image file (JPEG, PNG, GIF, WEBP)'
            });
            return;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            setAlert({
                type: 'error',
                message: 'File size exceeds 5MB. Please upload a smaller image.'
            });
            return;
        }

        try {
            setIsUploading(true);
            setAlert(null);

            const files: File[] = [file];
            let metaData: FileMetaData = {
                id: file.name,
                documentTypeId: 1,
                mediaCategory: 'USER'
            };
            const fileMetaData: FileMetaData[] = [metaData];
            const response = await uploadMedia(files, fileMetaData, null, userData);

            if (response && response.profilePicture) {
                setBioData(prev => {
                    if (!prev) return null;
                    return {...prev, profilePicture: response.profilePicture};
                });

                setAlert({
                    type: 'success',
                    message: 'Profile picture updated successfully!'
                });
            }
        } catch (error: any) {
            console.error('Error uploading profile picture:', error);
            setAlert({
                type: 'error',
                message: 'Failed to upload profile picture. Please try again.'
            });
            if (error.response.status === 401 || error.response.status === 403) {
                navigate('/auth');
            }
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <div className="animate-fadeIn">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                {alert && (
                    <Alert
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                )}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="relative group">
                        <div className="h-24 w-24 rounded-full bg-gradient-to-r from-blue-700 to-green-600 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
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
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-black text-2xl font-bold mb-1">{bioData?.firstName} {bioData?.lastName}</h2>
                        <p className="text-gray-600 mb-2">{bioData?.emailAddress}</p>
                        <p className="text-gray-500 mb-4">{bioData?.phoneNumber || 'No phone number added'}</p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="btn bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:from-blue-700 hover:to-green-700 transition-all duration-300 w-full sm:w-auto"
                        >
                            <Edit size={18} /> Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <RecentOrders />
                <SavedItems />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { icon: <MapPin size={20} />, title: 'Addresses', desc: 'Manage delivery addresses' },
                        { icon: <CreditCard size={20} />, title: 'Payment Methods', desc: 'Manage your payment options' },
                        { icon: <Bell size={20} />, title: 'Notifications', desc: 'Set your notification preferences' },
                        { icon: <Shield size={20} />, title: 'Security', desc: 'Update password and security settings' }
                    ].map((item, index) => (
                        <div key={index} className="flex items-center p-3 border rounded-lg hover:bg-blue-50 cursor-pointer transition-colors duration-300 group">
                            <div className="mr-3 text-gray-500 group-hover:text-blue-600">{item.icon}</div>
                            <div className="flex-1">
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                            <ChevronRight size={18} className="text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const RecentOrders = () => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-black text-lg font-semibold">Recent Orders</h3>
            <button className="text-blue-600 text-sm hover:underline">View All</button>
        </div>
        {[1, 2].map((_, index) => (
            <div key={index} className="border-b last:border-0 py-3">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-black font-medium">Order #25{index}4</p>
                        <p className="text-sm text-gray-500">March {10 + index}, 2025</p>
                    </div>
                    <div className="text-right">
                        <p className="font-medium text-green-600">${(59.99 * (index + 1)).toFixed(2)}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${index === 0 ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
              {index === 0 ? 'In Transit' : 'Delivered'}
            </span>
                    </div>
                </div>
            </div>
        ))}
        <div className="mt-4 pt-2 text-center">
            {/* Empty state for no orders */}
            {false && (
                <div className="py-6">
                    <ShoppingBag size={40} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-gray-500">No orders yet</p>
                </div>
            )}
        </div>
    </div>
);

const SavedItems = () => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-black text-lg font-semibold">Saved Items</h3>
            <button className="text-blue-600 text-sm hover:underline">View All</button>
        </div>
        {[1, 2].map((_, index) => (
            <div key={index} className="border-b last:border-0 py-3">
                <div className="flex items-center gap-3">
                    <button className="text-blue-600 hover:text-blue-700">
                        <BackpackIcon size={36}/>
                    </button>
                    <div className="flex-1">
                        <p className="text-black font-medium truncate">Product Name Example {index + 1}</p>
                        <p className="text-sm text-gray-500">${(19.99 * (index + 1)).toFixed(2)}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700">
                        <ShoppingBag size={18} />
                    </button>
                </div>
            </div>
        ))}
        <div className="mt-4 pt-2 text-center">
            {/* Empty state for no saved items */}
            {false && (
                <div className="py-6">
                    <Heart size={40} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-gray-500">No saved items yet</p>
                </div>
            )}
        </div>
    </div>
);

export default ProfileOverview;

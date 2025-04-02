import React, { useState } from 'react';
import {
    User,
    Lock,
    CreditCard,
    Shield,
    Edit2,
    Save
} from 'lucide-react';

const VendorAccountProfile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [accountProfile, setAccountProfile] = useState({
        firstName: 'Emma',
        lastName: 'Rodriguez',
        email: 'emma.rodriguez@serialonne.com',
        phoneNumber: '+1 (555) 987-6543',
        role: 'Vendor Administrator',
        lastLogin: '2024-03-25 14:30:45',
        twoFactorAuth: true,
    });

    const [passwordChange, setPasswordChange] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAccountProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordChange(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleTwoFactorAuth = () => {
        setAccountProfile(prev => ({
            ...prev,
            twoFactorAuth: !prev.twoFactorAuth
        }));
    };

    return (
        <div className="space-y-6">
            {/* Account Profile Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Account Profile</h1>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white
                    px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                    {isEditing ? (
                        <>
                            <Save className="mr-2" /> Save Changes
                        </>
                    ) : (
                        <>
                            <Edit2 className="mr-2" /> Edit Profile
                        </>
                    )}
                </button>
            </div>

            {/* Account Details */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                    <div className="flex items-center mb-4">
                        <User className="text-blue-400 mr-4" size={24} />
                        <h2 className="text-xl font-semibold text-white">Personal Information</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-white block mb-2">First Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="firstName"
                                    value={accountProfile.firstName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-gray-900 border-1 border-gray-500
                                     text-white rounded-lg"
                                />
                            ) : (
                                <p className="text-gray-400">{accountProfile.firstName}</p>
                            )}
                        </div>
                        <div>
                            <label className="text-white block mb-2">Last Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="lastName"
                                    value={accountProfile.lastName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-gray-900 border-1 border-gray-500
                                     text-white rounded-lg"
                                />
                            ) : (
                                <p className="text-gray-400">{accountProfile.lastName}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="text-white block mb-2">Email Address</label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={accountProfile.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-900 border-1 border-gray-500
                                 text-white rounded-lg"
                            />
                        ) : (
                            <p className="text-gray-400">{accountProfile.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-white block mb-2">Phone Number</label>
                        {isEditing ? (
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={accountProfile.phoneNumber}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-gray-900 border-1 border-gray-500
                                 text-white rounded-lg"
                            />
                        ) : (
                            <p className="text-gray-400">{accountProfile.phoneNumber}</p>
                        )}
                    </div>
                </div>

                {/* Account Security */}
                <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                    <div className="flex items-center mb-4">
                        <Shield className="text-blue-400 mr-4" size={24} />
                        <h2 className="text-xl font-semibold text-white">Account Security</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-white block mb-2">Role</label>
                            <p className="text-gray-400">{accountProfile.role}</p>
                        </div>

                        <div>
                            <label className="text-white block mb-2">Last Login</label>
                            <p className="text-gray-400">{accountProfile.lastLogin}</p>
                        </div>

                        {isEditing ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-white block mb-2">Current Password</label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={passwordChange.currentPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full px-3 py-2 bg-gray-900 border-1 border-gray-500
                                         text-white rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="text-white block mb-2">New Password</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={passwordChange.newPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full px-3 py-2 bg-gray-900 border-1 border-gray-500
                                         text-white rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="text-white block mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={passwordChange.confirmPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full px-3 py-2 bg-gray-900 border-1 border-gray-500
                                         text-white rounded-lg"
                                    />
                                </div>
                            </div>
                        ) : null}

                        <div className="flex justify-between items-center">
                            <div>
                                <label className="text-white block mb-2">Two-Factor Authentication</label>
                                <p className="text-gray-400">
                                    {accountProfile.twoFactorAuth ? 'Enabled' : 'Disabled'}
                                </p>
                            </div>
                            {isEditing && (
                                <button
                                    onClick={toggleTwoFactorAuth}
                                    className={`
                                        px-4 py-2 rounded-lg transition-colors
                                        ${accountProfile.twoFactorAuth
                                        ? 'bg-red-600 hover:bg-red-500'
                                        : 'bg-emerald-600 hover:bg-emerald-500'
                                    }
                                        text-white
                                    `}
                                >
                                    {accountProfile.twoFactorAuth ? 'Disable' : 'Enable'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorAccountProfile;

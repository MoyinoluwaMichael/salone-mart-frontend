import React, { useState } from 'react';
import {
    MapPin,
    Phone,
    Mail,
    Globe,
    Edit2,
    Save
} from 'lucide-react';

const VendorBusinessProfile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [businessProfile, setBusinessProfile] = useState({
        businessName: 'Seria Lonne Organic Goods',
        description: 'Artisanal organic products sourced from local sustainable farms.',
        email: 'contact@serialonne.com',
        phone: '+1 (555) 123-4567',
        address: '123 Green Valley Road, Eco City, ST 12345',
        website: 'www.serialonne.com',
        taxId: 'EIN: 12-3456789',
        foundedYear: 2020
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBusinessProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="space-y-6">
            {/* Business Profile Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Business Profile</h1>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white
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

            {/* Business Details */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="bg-emerald-800 rounded-lg p-6 space-y-4">
                    <div>
                        <label className="text-emerald-300 block mb-2">Business Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="businessName"
                                value={businessProfile.businessName}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-emerald-700 text-white rounded-lg"
                            />
                        ) : (
                            <p className="text-white font-semibold">{businessProfile.businessName}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-emerald-300 block mb-2">Business Description</label>
                        {isEditing ? (
                            <textarea
                                name="description"
                                value={businessProfile.description}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-emerald-700 text-white rounded-lg h-24"
                            />
                        ) : (
                            <p className="text-emerald-200">{businessProfile.description}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-emerald-300 block mb-2">Founded</label>
                            {isEditing ? (
                                <input
                                    type="number"
                                    name="foundedYear"
                                    value={businessProfile.foundedYear}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-emerald-700 text-white rounded-lg"
                                />
                            ) : (
                                <p className="text-white">{businessProfile.foundedYear}</p>
                            )}
                        </div>
                        <div>
                            <label className="text-emerald-300 block mb-2">Tax ID</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="taxId"
                                    value={businessProfile.taxId}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-emerald-700 text-white rounded-lg"
                                />
                            ) : (
                                <p className="text-white">{businessProfile.taxId}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="bg-emerald-800 rounded-lg p-6 space-y-4">
                    <div className="flex items-center space-x-4 mb-4">
                        <MapPin className="text-emerald-400" size={24} />
                        <div>
                            <label className="text-emerald-300 block mb-2">Business Address</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="address"
                                    value={businessProfile.address}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-emerald-700 text-white rounded-lg"
                                />
                            ) : (
                                <p className="text-white">{businessProfile.address}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-4">
                        <Phone className="text-emerald-400" size={24} />
                        <div>
                            <label className="text-emerald-300 block mb-2">Phone Number</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    value={businessProfile.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-emerald-700 text-white rounded-lg"
                                />
                            ) : (
                                <p className="text-white">{businessProfile.phone}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-4">
                        <Mail className="text-emerald-400" size={24} />
                        <div>
                            <label className="text-emerald-300 block mb-2">Email Address</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={businessProfile.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-emerald-700 text-white rounded-lg"
                                />
                            ) : (
                                <p className="text-white">{businessProfile.email}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Globe className="text-emerald-400" size={24} />
                        <div>
                            <label className="text-emerald-300 block mb-2">Website</label>
                            {isEditing ? (
                                <input
                                    type="url"
                                    name="website"
                                    value={businessProfile.website}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-emerald-700 text-white rounded-lg"
                                />
                            ) : (
                                <a
                                    href={`https://${businessProfile.website}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-400 hover:text-emerald-300"
                                >
                                    {businessProfile.website}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorBusinessProfile;

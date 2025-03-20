import React from 'react';
import { MapPin } from 'lucide-react';

const ProfileAddresses = () => {
    return (
        <div className="animate-fadeIn">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Your Addresses</h2>
                    <button className="btn bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 hover:from-blue-700 hover:to-green-700 transition-all duration-300">
                        <MapPin size={18} /> Add New Address
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2].map((_, index) => (
                        <div key={index} className={`border rounded-lg p-4 relative hover:shadow-md transition-shadow duration-300 ${index === 0 ? 'border-green-500' : ''}`}>
                            {index === 0 && (
                                <span className="absolute top-2 right-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                  Default
                </span>
                            )}
                            <h4 className="font-medium mb-1">{index === 0 ? 'Home' : 'Work'}</h4>
                            <p className="text-gray-700 mb-1">John Doe</p>
                            <p className="text-gray-600 text-sm mb-1">
                                {index === 0 ? '123 Main Street, Apt 4B' : '456 Corporate Drive, Suite 100'}
                            </p>
                            <p className="text-gray-600 text-sm mb-1">
                                {index === 0 ? 'New York, NY 10001' : 'Boston, MA 02110'}
                            </p>
                            <p className="text-gray-600 text-sm mb-4">United States</p>

                            <div className="flex gap-2">
                                <button className="text-blue-600 hover:text-blue-800 text-sm">
                                    Edit
                                </button>
                                <div className="text-gray-300">|</div>
                                {index !== 0 && (
                                    <>
                                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                                            Set as Default
                                        </button>
                                        <div className="text-gray-300">|</div>
                                    </>
                                )}
                                <button className="text-red-600 hover:text-red-800 text-sm">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileAddresses;

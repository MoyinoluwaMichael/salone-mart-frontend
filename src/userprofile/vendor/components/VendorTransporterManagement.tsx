import React, { useState } from 'react';
import {
    Truck,
    MapPin,
    Phone,
    Mail,
    Plus,
    Edit,
    Trash2,
    Search
} from 'lucide-react';

interface Transporter {
    id: number;
    name: string;
    company: string;
    email: string;
    phone: string;
    activeOrders: number;
    rating: number;
}

const VendorTransporterManagement: React.FC = () => {
    const [transporters, setTransporters] = useState<Transporter[]>([
        {
            id: 1,
            name: 'John Smith',
            company: 'Swift Logistics',
            email: 'john.smith@swiftlogistics.com',
            phone: '+1 (555) 123-4567',
            activeOrders: 12,
            rating: 4.5
        },
        {
            id: 2,
            name: 'Maria Garcia',
            company: 'Green Transport Solutions',
            email: 'maria.garcia@greentransport.com',
            phone: '+1 (555) 987-6543',
            activeOrders: 8,
            rating: 4.8
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isAddingTransporter, setIsAddingTransporter] = useState(false);
    const [newTransporter, setNewTransporter] = useState({
        name: '',
        company: '',
        email: '',
        phone: ''
    });

    const filteredTransporters = transporters.filter(transporter =>
        transporter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transporter.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddTransporter = () => {
        if (newTransporter.name && newTransporter.company && newTransporter.email && newTransporter.phone) {
            setTransporters(prev => [...prev, {
                ...newTransporter,
                id: prev.length + 1,
                activeOrders: 0,
                rating: 0
            }]);
            setNewTransporter({ name: '', company: '', email: '', phone: '' });
            setIsAddingTransporter(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewTransporter(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="space-y-6">
            {/* Transporter Management Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Transporter Management</h1>
                <button
                    onClick={() => setIsAddingTransporter(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white
                    px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                    <Plus className="mr-2" /> Add Transporter
                </button>
            </div>

            {/* Add Transporter Modal */}
            {isAddingTransporter && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-emerald-800 p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold text-white mb-4">Add New Transporter</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Transporter Name"
                                value={newTransporter.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-emerald-700 text-white rounded-lg"
                            />
                            <input
                                type="text"
                                name="company"
                                placeholder="Company Name"
                                value={newTransporter.company}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-emerald-700 text-white rounded-lg"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={newTransporter.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-emerald-700 text-white rounded-lg"
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={newTransporter.phone}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-emerald-700 text-white rounded-lg"
                            />
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setIsAddingTransporter(false)}
                                    className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddTransporter}
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Add Transporter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Search */}
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Search transporters..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 bg-emerald-700 text-white
                    rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Search
                    className="absolute left-3 top-3 text-emerald-300"
                    size={20}
                />
            </div>

            {/* Transporters Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {filteredTransporters.map(transporter => (
                    <div
                        key={transporter.id}
                        className="bg-emerald-800 rounded-lg p-6 space-y-4 relative group"
                    >
                        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                className="text-emerald-400 hover:text-emerald-300"
                                title="Edit Transporter"
                            >
                                <Edit size={20} />
                            </button>
                            <button
                                className="text-red-500 hover:text-red-400"
                                title="Remove Transporter"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>

                        <div className="flex items-center space-x-4 mb-4">
                            <div className="bg-emerald-700 p-3 rounded-full">
                                <Truck className="text-emerald-400" size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white">{transporter.name}</h2>
                                <p className="text-emerald-300">{transporter.company}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Mail className="text-emerald-400" size={18} />
                                <p className="text-white">{transporter.email}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="text-emerald-400" size={18} />
                                <p className="text-white">{transporter.phone}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="bg-emerald-700 p-3 rounded-lg text-center">
                                <p className="text-emerald-300 text-sm">Active Orders</p>
                                <p className="text-white font-bold">{transporter.activeOrders}</p>
                            </div>
                            <div className="bg-emerald-700 p-3 rounded-lg text-center">
                                <p className="text-emerald-300 text-sm">Rating</p>
                                <p className="text-white font-bold">{transporter.rating.toFixed(1)}/5</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VendorTransporterManagement;

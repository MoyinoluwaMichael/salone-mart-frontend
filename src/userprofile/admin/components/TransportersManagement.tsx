import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiRefreshCw, FiTruck, FiMap, FiCheck, FiX } from 'react-icons/fi';

const TransportersManagement = () => {
    const [transporters, setTransporters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentTransporter, setCurrentTransporter] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewDetails, setViewDetails] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        vehicleType: '',
        capacity: '',
        areas: '',
        available: true
    });

    // Dummy data for demonstration
    useEffect(() => {
        setTimeout(() => {
            setTransporters([
                { id: 1, name: 'Express Delivery', email: 'dispatch@expressdelivery.com', phone: '555-1234', vehicleType: 'Van', capacity: '1000kg', areas: 'North, Central', available: true },
                { id: 2, name: 'Fast Track Logistics', email: 'operations@fasttl.com', phone: '555-5678', vehicleType: 'Truck', capacity: '5000kg', areas: 'South, East', available: true },
                { id: 3, name: 'City Movers', email: 'info@citymovers.com', phone: '555-9012', vehicleType: 'Pickup', capacity: '750kg', areas: 'Central, West', available: false },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredTransporters = transporters.filter(transporter =>
        transporter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transporter.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transporter.areas.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddNew = () => {
        setCurrentTransporter(null);
        setFormData({
            name: '',
            email: '',
            phone: '',
            vehicleType: '',
            capacity: '',
            areas: '',
            available: true
        });
        setIsModalOpen(true);
    };

    const handleEdit = (transporter) => {
        setCurrentTransporter(transporter);
        setFormData({
            name: transporter.name,
            email: transporter.email,
            phone: transporter.phone,
            vehicleType: transporter.vehicleType,
            capacity: transporter.capacity,
            areas: transporter.areas,
            available: transporter.available
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this transporter?')) {
            setTransporters(transporters.filter(transporter => transporter.id !== id));
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentTransporter) {
            // Update existing transporter
            setTransporters(transporters.map(transporter =>
                transporter.id === currentTransporter.id ? { ...transporter, ...formData } : transporter
            ));
        } else {
            // Add new transporter
            const newTransporter = {
                id: transporters.length > 0 ? Math.max(...transporters.map(t => t.id)) + 1 : 1,
                ...formData
            };
            setTransporters([...transporters, newTransporter]);
        }
        setIsModalOpen(false);
    };

    const toggleAvailability = (id) => {
        setTransporters(transporters.map(transporter =>
            transporter.id === id ? { ...transporter, available: !transporter.available } : transporter
        ));
    };

    const viewTransporterDetails = (transporter) => {
        setViewDetails(transporter);
    };

    return (
        <div className="transition-all duration-500 ease-in-out">
            <h2 className="text-2xl font-bold text-white mb-2 md:mb-0">
                Transporters Management
            </h2>

            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-64">
                    <input
                        type="text"
                        placeholder="Search transporters..."
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                </div>

                <button
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
                    onClick={handleAddNew}
                >
                    <FiPlus /> Add New Transporter
                </button>
            </div>

            {loading ? (
                <div className="animate-pulse space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-gray-700 rounded-lg h-20"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTransporters.length > 0 ? (
                        filteredTransporters.map(transporter => (
                            <div
                                key={transporter.id}
                                className="bg-gray-750 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700"
                            >
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-bold text-lg">{transporter.name}</h3>
                                            <p className="text-sm text-gray-400">{transporter.email}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs ${transporter.available ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                      {transporter.available ? 'Available' : 'Unavailable'}
                    </span>
                                    </div>

                                    <div className="space-y-2 text-sm mb-4">
                                        <div className="flex items-center">
                                            <FiTruck className="text-purple-400 mr-2" />
                                            <span>{transporter.vehicleType} - {transporter.capacity}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FiMap className="text-blue-400 mr-2" />
                                            <span>{transporter.areas}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(transporter)}
                                                className="p-2 bg-gray-700 rounded-lg text-blue-400 hover:bg-gray-650 transition-colors"
                                                title="Edit"
                                            >
                                                <FiEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(transporter.id)}
                                                className="p-2 bg-gray-700 rounded-lg text-red-400 hover:bg-gray-650 transition-colors"
                                                title="Delete"
                                            >
                                                <FiTrash2 />
                                            </button>
                                            <button
                                                onClick={() => toggleAvailability(transporter.id)}
                                                className={`p-2 bg-gray-700 rounded-lg ${transporter.available ? 'text-yellow-400' : 'text-green-400'} hover:bg-gray-650 transition-colors`}
                                                title={transporter.available ? 'Mark as Unavailable' : 'Mark as Available'}
                                            >
                                                {transporter.available ? <FiX /> : <FiCheck />}
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => viewTransporterDetails(transporter)}
                                            className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg text-white transition-all duration-300"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-10 bg-gray-750 rounded-lg">
                            <p className="text-gray-400 mb-4">No transporters found</p>
                            <button
                                className="flex items-center text-purple-400 hover:text-purple-300"
                                onClick={() => setSearchTerm('')}
                            >
                                <FiRefreshCw className="mr-2" /> Clear search
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Add/Edit Transporter Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
                    <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 animate-scaleIn">
                        <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            {currentTransporter ? 'Edit Transporter' : 'Add New Transporter'}
                        </h3>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Transporter Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Vehicle Type</label>
                                    <select
                                        name="vehicleType"
                                        value={formData.vehicleType}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                    >
                                        <option value="">Select Vehicle Type</option>
                                        <option value="Van">Van</option>
                                        <option value="Truck">Truck</option>
                                        <option value="Pickup">Pickup</option>
                                        <option value="Motorcycle">Motorcycle</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Capacity</label>
                                    <input
                                        type="text"
                                        name="capacity"
                                        value={formData.capacity}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                        placeholder="e.g., 1000kg"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Service Areas</label>
                                    <input
                                        type="text"
                                        name="areas"
                                        value={formData.areas}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                        placeholder="e.g., North, Central, South"
                                    />
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="available"
                                        name="available"
                                        checked={formData.available}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                                    />
                                    <label htmlFor="available" className="ml-2 block text-sm text-gray-300">
                                        Available for orders
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105"
                                >
                                    {currentTransporter ? 'Update' : 'Add'} Transporter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Details Modal */}
            {viewDetails && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
                    <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 animate-scaleIn">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                Transporter Details
                            </h3>
                            <button
                                onClick={() => setViewDetails(null)}
                                className="p-1 text-gray-400 hover:text-white"
                            >
                                <FiX />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <h4 className="text-gray-400 text-sm">Transporter Name</h4>
                                <p>{viewDetails.name}</p>
                            </div>

                            <div>
                                <h4 className="text-gray-400 text-sm">Email</h4>
                                <p>{viewDetails.email}</p>
                            </div>

                            <div>
                                <h4 className="text-gray-400 text-sm">Phone</h4>
                                <p>{viewDetails.phone}</p>
                            </div>

                            <div>
                                <h4 className="text-gray-400 text-sm">Vehicle Type</h4>
                                <p>{viewDetails.vehicleType}</p>
                            </div>

                            <div>
                                <h4 className="text-gray-400 text-sm">Capacity</h4>
                                <p>{viewDetails.capacity}</p>
                            </div>

                            <div>
                                <h4 className="text-gray-400 text-sm">Service Areas</h4>
                                <p>{viewDetails.areas}</p>
                            </div>

                            <div>
                                <h4 className="text-gray-400 text-sm">Status</h4>
                                <p className={viewDetails.available ? 'text-green-400' : 'text-red-400'}>
                                    {viewDetails.available ? 'Available' : 'Unavailable'}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={() => setViewDetails(null)}
                                className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransportersManagement;

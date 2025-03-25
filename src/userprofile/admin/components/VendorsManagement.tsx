import React, {useState, useEffect, ReactNode} from 'react';
import { FiPlus, FiEye, FiSearch, FiRefreshCw } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import {AppPageResponse, Vendor} from "@/utils/apputils";
import {formatDate, retrieveVendors} from "@/userprofile/admin/adminProfileService";

const VendorsManagement = () => {
    const navigate = useNavigate();
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        category: {},
        status: 'active'
    });

    // API data
    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const vendorResponse: AppPageResponse<Vendor> | null = await retrieveVendors();
                if (vendorResponse && vendorResponse.data && vendorResponse.data.length > 0) {
                    setVendors(vendorResponse.data);
                    setLoading(false);
                } else {
                    navigate('/auth');
                }
            } catch (error) {
                console.error('Error fetching vendors:', error);
                navigate('/auth');
            }
        };

        setTimeout(() => {
            fetchVendors();
        }, 1000);
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredVendors = vendors.filter((vendor: Vendor) =>
        vendor?.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor?.bioData.emailAddress?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddNew = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            address: '',
            category: '',
            status: 'active'
        });
        setIsModalOpen(true);
    };

    const handleViewDetails = (vendor) => {
        // Navigate to the vendor details page with the vendor ID
        navigate(`/vendors/${vendor.id}`, { state: { vendor } });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this vendor?')) {
            setVendors(vendors.filter(vendor => vendor.id !== id));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add new vendor only
        const newVendor = {
            id: vendors.length > 0 ? Math.max(...vendors.map(v => v.id)) + 1 : 1,
            ...formData
        };
        setVendors([...vendors, newVendor]);
        setIsModalOpen(false);
    };

    return (
        <div className="transition-all duration-500 ease-in-out p-6">
            <h2 className="text-2xl font-bold text-white mb-2 md:mb-0">
                Vendors Management
            </h2>

            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                <div className="relative w-full sm:w-64">
                    <input
                        type="text"
                        placeholder="Search vendors..."
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                </div>

                <button
                    className={`w-full sm:w-auto text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 ${
                        disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
                    }`}
                    onClick={handleAddNew}
                    disabled={disabled}
                >
                    <FiPlus /> Add New Vendor
                </button>
            </div>

            {loading ? (
                <div className="animate-pulse space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-gray-700 rounded-lg h-20"></div>
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                        <tr className="bg-gray-700 rounded-lg">
                            <th className="px-4 py-3 rounded-l-lg">Business Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3 hidden md:table-cell">Phone</th>
                            <th className="px-4 py-3 hidden lg:table-cell">Category</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 rounded-r-lg">Created Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredVendors.length > 0 ? (
                            filteredVendors.map((vendor: Vendor, index): ReactNode => (
                                <tr
                                    key={vendor.id}
                                    onClick={() => handleViewDetails(vendor)}
                                    className={`border-b border-gray-700 hover:bg-gray-700 transition-all duration-200 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}`}
                                >
                                    <td className="px-4 py-3">{vendor?.businessName}</td>
                                    <td className="px-4 py-3">{vendor?.bioData?.emailAddress}</td>
                                    <td className="px-4 py-3 hidden md:table-cell">{vendor?.bioData?.phoneNumber || '-'}</td>
                                    <td className="px-4 py-3 hidden lg:table-cell">{vendor?.category?.name}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs ${vendor?.status?.toLowerCase() === 'approved' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                                            {vendor.status.charAt(0).toUpperCase() + vendor?.status?.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">{formatDate(vendor?.createdAt) || '-'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-4 py-3 text-center">
                                    <div className="flex flex-col items-center justify-center py-6">
                                        <p className="text-gray-400 mb-4">No vendors found</p>
                                        <button
                                            className="flex items-center text-purple-400 hover:text-purple-300"
                                            onClick={() => setSearchTerm('')}
                                        >
                                            <FiRefreshCw className="mr-2" /> Clear search
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add New Vendor Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
                    <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 animate-scaleIn">
                        <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Add New Vendor
                        </h3>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Vendor Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData?.name}
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
                                        value={formData?.email}
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
                                        value={formData?.phone}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData?.address}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={formData?.category}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                                    <select
                                        name="status"
                                        value={formData?.status}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    >
                                        <option value="active">Active</option>
                                    </select>
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
                                    Add Vendor
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VendorsManagement;

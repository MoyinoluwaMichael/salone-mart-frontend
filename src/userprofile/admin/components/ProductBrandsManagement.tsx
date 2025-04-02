import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiCheck } from 'react-icons/fi';

interface Brand {
    id: string;
    name: string;
    logo: string;
    description: string;
    createdAt: string;
    status: 'active' | 'inactive';
}

const ProductBrandsManagement: React.FC = () => {
    // Sample data for demonstration
    const [brands, setBrands] = useState<Brand[]>([
        {
            id: '1',
            name: 'TechGear',
            logo: 'https://via.placeholder.com/50',
            description: 'Premium tech accessories',
            createdAt: '2024-12-15',
            status: 'active'
        },
        {
            id: '2',
            name: 'HomeEssentials',
            logo: 'https://via.placeholder.com/50',
            description: 'Quality home products',
            createdAt: '2024-11-28',
            status: 'active'
        },
        {
            id: '3',
            name: 'FreshFoods',
            logo: 'https://via.placeholder.com/50',
            description: 'Organic food products',
            createdAt: '2024-10-05',
            status: 'inactive'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        logo: '',
        description: '',
        status: 'active' as 'active' | 'inactive'
    });

    // Filter brands based on search term
    const filteredBrands = brands.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newBrand: Brand = {
            id: Date.now().toString(),
            name: formData.name,
            logo: formData.logo || 'https://via.placeholder.com/50',
            description: formData.description,
            createdAt: new Date().toISOString().split('T')[0],
            status: formData.status
        };

        setBrands([...brands, newBrand]);
        setIsAddModalOpen(false);
        resetForm();
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentBrand) {
            const updatedBrands = brands.map(brand =>
                brand.id === currentBrand.id ?
                    {
                        ...brand,
                        name: formData.name,
                        logo: formData.logo,
                        description: formData.description,
                        status: formData.status
                    } : brand
            );

            setBrands(updatedBrands);
            setIsEditModalOpen(false);
            resetForm();
        }
    };

    const handleDeleteConfirm = () => {
        if (currentBrand) {
            setBrands(brands.filter(brand => brand.id !== currentBrand.id));
            setIsDeleteModalOpen(false);
            setCurrentBrand(null);
        }
    };

    const openEditModal = (brand: Brand) => {
        setCurrentBrand(brand);
        setFormData({
            name: brand.name,
            logo: brand.logo,
            description: brand.description,
            status: brand.status
        });
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (brand: Brand) => {
        setCurrentBrand(brand);
        setIsDeleteModalOpen(true);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            logo: '',
            description: '',
            status: 'active'
        });
        setCurrentBrand(null);
    };

    // Animation variants
    const tableRowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.3
            }
        }),
        exit: { opacity: 0, x: -20 }
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between items-center"
            >
                <h2 className="text-2xl font-bold text-white">
          <span className="text-2xl font-bold text-white mb-2 md:mb-0">
            Product Brands Management
          </span>
                </h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center space-x-2 hover:shadow-lg hover:shadow-purple-500/20 transition duration-300"
                >
                    <FiPlus /> <span>Add Brand</span>
                </motion.button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
            >
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search brands..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200"
                />
            </motion.div>

            <div className="bg-gray-700 rounded-lg overflow-hidden shadow-xl shadow-purple-500/5">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-600">
                        <thead className="bg-gray-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Brand</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Created</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-600 bg-gray-700">
                        <AnimatePresence>
                            {filteredBrands.length > 0 ? (
                                filteredBrands.map((brand, index) => (
                                    <motion.tr
                                        key={brand.id}
                                        custom={index}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        variants={tableRowVariants}
                                        className="hover:bg-gray-650 transition duration-150"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-10 w-10 rounded-full object-cover border border-gray-600" src={brand.logo} alt={brand.name} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-white">{brand.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-300">{brand.description}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {brand.createdAt}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            brand.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {brand.status}
                        </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-3">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => openEditModal(brand)}
                                                    className="text-indigo-400 hover:text-indigo-300 transition"
                                                >
                                                    <FiEdit2 className="h-5 w-5" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => openDeleteModal(brand)}
                                                    className="text-red-400 hover:text-red-300 transition"
                                                >
                                                    <FiTrash2 className="h-5 w-5" />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <motion.tr
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
                                        No brands found matching your search.
                                    </td>
                                </motion.tr>
                            )}
                        </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Brand Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-purple-500 shadow-lg shadow-purple-500/20"
                        >
                            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-3">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                  Add New Brand
                </span>
                            </h3>
                            <form onSubmit={handleAddSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 mb-2">Brand Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Logo URL</label>
                                    <input
                                        type="text"
                                        name="logo"
                                        value={formData.logo}
                                        onChange={handleInputChange}
                                        placeholder="https://example.com/logo.png"
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                                <div className="flex justify-end space-x-3 mt-6">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition duration-200"
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition duration-200"
                                    >
                                        Add Brand
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Edit Brand Modal */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-purple-500 shadow-lg shadow-purple-500/20"
                        >
                            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-3">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
                  Edit Brand: {currentBrand?.name}
                </span>
                            </h3>
                            <form onSubmit={handleEditSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 mb-2">Brand Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Logo URL</label>
                                    <input
                                        type="text"
                                        name="logo"
                                        value={formData.logo}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2">Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                                <div className="flex justify-end space-x-3 mt-6">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="button"
                                        onClick={() => setIsEditModalOpen(false)}
                                        className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition duration-200"
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition duration-200"
                                    >
                                        Save Changes
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-red-500 shadow-lg shadow-red-500/20"
                        >
                            <div className="flex items-center justify-center mb-4 text-red-500">
                                <FiTrash2 className="h-12 w-12" />
                            </div>
                            <h3 className="text-xl font-bold text-white text-center mb-2">Confirm Deletion</h3>
                            <p className="text-gray-300 text-center mb-6">
                                Are you sure you want to delete the brand "{currentBrand?.name}"? This action cannot be undone.
                            </p>
                            <div className="flex justify-center space-x-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="px-5 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition duration-200 flex items-center space-x-1"
                                >
                                    <FiX /> <span>Cancel</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleDeleteConfirm}
                                    className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-200 flex items-center space-x-1"
                                >
                                    <FiCheck /> <span>Delete</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductBrandsManagement;

import React, { useState, useEffect } from 'react';
import { FiUsers, FiSearch, FiUserPlus, FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    joinDate: string;
    orders: number;
    totalSpent: number;
}

const CustomersManagement: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    useEffect(() => {
        // Mock data - replace with actual API call
        const mockCustomers: Customer[] = [
            { id: 'CUST-001', name: 'John Doe', email: 'john@example.com', phone: '+1 234-567-8901', joinDate: '2024-10-15', orders: 5, totalSpent: 2450.99 },
            { id: 'CUST-002', name: 'Jane Smith', email: 'jane@example.com', phone: '+1 234-567-8902', joinDate: '2024-09-22', orders: 3, totalSpent: 1280.50 },
            { id: 'CUST-003', name: 'Robert Johnson', email: 'robert@example.com', phone: '+1 234-567-8903', joinDate: '2024-11-05', orders: 8, totalSpent: 4320.75 },
            { id: 'CUST-004', name: 'Sarah Williams', email: 'sarah@example.com', phone: '+1 234-567-8904', joinDate: '2024-08-18', orders: 2, totalSpent: 890.25 },
            { id: 'CUST-005', name: 'Michael Brown', email: 'michael@example.com', phone: '+1 234-567-8905', joinDate: '2024-12-01', orders: 1, totalSpent: 350.00 },
        ];

        setTimeout(() => {
            setCustomers(mockCustomers);
            setLoading(false);
        }, 1000);
    }, []);

    const filteredCustomers = customers.filter(customer => {
        return customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.includes(searchTerm);
    });

    const handleAddCustomer = (e: React.FormEvent) => {
        e.preventDefault();
        const newId = `CUST-${(customers.length + 1).toString().padStart(3, '0')}`;

        const customerToAdd: Customer = {
            id: newId,
            name: newCustomer.name,
            email: newCustomer.email,
            phone: newCustomer.phone,
            joinDate: new Date().toISOString().split('T')[0],
            orders: 0,
            totalSpent: 0
        };

        setCustomers([...customers, customerToAdd]);
        setNewCustomer({ name: '', email: '', phone: '' });
        setIsAddModalOpen(false);
    };

    const handleViewCustomer = (customer: Customer) => {
        setSelectedCustomer(customer);
        setIsViewModalOpen(true);
    };

    const handleDeleteCustomer = (id: string) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            setCustomers(customers.filter(customer => customer.id !== id));
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <div className="h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <FiUsers className="text-purple-500 text-2xl mr-2" />
                    <h2 className="text-2xl font-bold text-white mb-2 md:mb-0">
                        Customers Management
                    </h2>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search customers..."
                            className="bg-gray-700 text-white px-4 py-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FiSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md hover:from-blue-700 hover:to-purple-700 transition-colors"
                    >
                        <FiUserPlus className="mr-2" />
                        Add Customer
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-gray-700 h-12 w-12"></div>
                        <div className="flex-1 space-y-4 py-1">
                            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-700 rounded"></div>
                                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-gray-900 rounded-lg overflow-hidden shadow-xl"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="bg-gray-800 text-left">
                                <th className="py-3 px-6 text-sm font-medium text-gray-300">ID</th>
                                <th className="py-3 px-6 text-sm font-medium text-gray-300">Name</th>
                                <th className="py-3 px-6 text-sm font-medium text-gray-300">Email</th>
                                <th className="py-3 px-6 text-sm font-medium text-gray-300">Phone</th>
                                <th className="py-3 px-6 text-sm font-medium text-gray-300">Joined</th>
                                <th className="py-3 px-6 text-sm font-medium text-gray-300">Orders</th>
                                <th className="py-3 px-6 text-sm font-medium text-gray-300">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer, index) => (
                                    <motion.tr
                                        key={customer.id}
                                        variants={itemVariants}
                                        className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
                                    >
                                        <td className="py-4 px-6 font-medium">{customer.id}</td>
                                        <td className="py-4 px-6">{customer.name}</td>
                                        <td className="py-4 px-6">{customer.email}</td>
                                        <td className="py-4 px-6">{customer.phone}</td>
                                        <td className="py-4 px-6">{customer.joinDate}</td>
                                        <td className="py-4 px-6">{customer.orders}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleViewCustomer(customer)}
                                                    className="p-1 text-blue-400 hover:text-blue-600 transition-colors"
                                                    title="View Customer"
                                                >
                                                    <FiEye />
                                                </button>
                                                <button
                                                    className="p-1 text-green-400 hover:text-green-600 transition-colors"
                                                    title="Edit Customer"
                                                >
                                                    <FiEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCustomer(customer.id)}
                                                    className="p-1 text-red-400 hover:text-red-600 transition-colors"
                                                    title="Delete Customer"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-4 px-6 text-center text-gray-500">
                                        No customers found matching your criteria
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}

            {/* Add Customer Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                    Add New Customer
                                </h3>
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleAddCustomer}>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                        value={newCustomer.name}
                                        onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                        value={newCustomer.email}
                                        onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        required
                                        value={newCustomer.phone}
                                        onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-md transition-colors"
                                    >
                                        Add Customer
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* View Customer Modal */}
            <AnimatePresence>
                {isViewModalOpen && selectedCustomer && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                    Customer Profile: {selectedCustomer.name}
                                </h3>
                                <button
                                    onClick={() => setIsViewModalOpen(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <p className="text-gray-400 text-sm">Customer ID</p>
                                    <p className="font-medium">{selectedCustomer.id}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Join Date</p>
                                    <p className="font-medium">{selectedCustomer.joinDate}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Email</p>
                                    <p className="font-medium">{selectedCustomer.email}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Phone</p>
                                    <p className="font-medium">{selectedCustomer.phone}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Total Orders</p>
                                    <p className="font-medium">{selectedCustomer.orders}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Total Spent</p>
                                    <p className="font-medium text-lg">${selectedCustomer.totalSpent.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-700 pt-4 mb-4">
                                <h4 className="font-medium mb-2">Recent Orders</h4>
                                <div className="bg-gray-900 rounded p-3 text-sm text-gray-300">
                                    {selectedCustomer.orders > 0 ? (
                                        <p>Recent order details would appear here...</p>
                                    ) : (
                                        <p>No orders yet.</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setIsViewModalOpen(false)}
                                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                                >
                                    Close
                                </button>
                                <button
                                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-md transition-colors"
                                >
                                    Edit Customer
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomersManagement;

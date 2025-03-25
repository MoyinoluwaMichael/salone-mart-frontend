import React, { useState, useEffect } from 'react';
import { FiPackage, FiFilter, FiSearch, FiEye, FiEdit, FiXCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface Order {
    id: string;
    customerName: string;
    amount: number;
    status: 'pending' | 'processing' | 'completed' | 'cancelled';
    date: string;
    items: number;
}

const OrdersManagement: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    useEffect(() => {
        // Mock data - replace with actual API call
        const mockOrders: Order[] = [
            { id: 'ORD-001', customerName: 'John Doe', amount: 1250.99, status: 'pending', date: '2025-03-15', items: 3 },
            { id: 'ORD-002', customerName: 'Jane Smith', amount: 845.50, status: 'processing', date: '2025-03-14', items: 2 },
            { id: 'ORD-003', customerName: 'Robert Johnson', amount: 2199.00, status: 'completed', date: '2025-03-12', items: 5 },
            { id: 'ORD-004', customerName: 'Sarah Williams', amount: 499.99, status: 'cancelled', date: '2025-03-10', items: 1 },
            { id: 'ORD-005', customerName: 'Michael Brown', amount: 1799.00, status: 'pending', date: '2025-03-09', items: 4 },
        ];

        setTimeout(() => {
            setOrders(mockOrders);
            setLoading(false);
        }, 1000);
    }, []);

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || order.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    const handleViewOrder = (order: Order) => {
        setSelectedOrder(order);
        setIsViewModalOpen(true);
    };

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'pending': return 'bg-yellow-500';
            case 'processing': return 'bg-blue-500';
            case 'completed': return 'bg-green-500';
            case 'cancelled': return 'bg-red-500';
            default: return 'bg-gray-500';
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
                    <FiPackage className="text-purple-500 text-2xl mr-2" />
                    <h2 className="text-2xl font-bold text-white mb-2 md:mb-0">
                        Orders Management
                    </h2>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="bg-gray-700 text-white px-4 py-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FiSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    <div className="relative">
                        <select
                            className="bg-gray-700 text-white px-4 py-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <FiFilter className="absolute left-3 top-3 text-gray-400" />
                    </div>
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
                                <th className="py-3 px-6 text-sm font-medium text-gray-300">Order ID</th>
                                <th className="py-3 px-6 text-sm font-medium text-gray-300">Customer</th>
                                <th className="py-3 px-6 text-sm font-medium text-gray-300">Amount</th>
                                <th className="py-3 px-6 text-sm font-medium text-gray-300">Status</th>
                                <th className="py-3 px-6 text-sm font-medium text-gray-300">Date</th>
                                <th className="py-3 px-6 text-sm font-medium text-gray-300">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order, index) => (
                                    <motion.tr
                                        key={order.id}
                                        variants={itemVariants}
                                        className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
                                    >
                                        <td className="py-4 px-6 font-medium">{order.id}</td>
                                        <td className="py-4 px-6">{order.customerName}</td>
                                        <td className="py-4 px-6">${order.amount.toFixed(2)}</td>
                                        <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)} text-white`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                                        </td>
                                        <td className="py-4 px-6">{order.date}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleViewOrder(order)}
                                                    className="p-1 text-blue-400 hover:text-blue-600 transition-colors"
                                                    title="View Order"
                                                >
                                                    <FiEye />
                                                </button>
                                                <button
                                                    className="p-1 text-green-400 hover:text-green-600 transition-colors"
                                                    title="Edit Order"
                                                >
                                                    <FiEdit />
                                                </button>
                                                <button
                                                    className="p-1 text-red-400 hover:text-red-600 transition-colors"
                                                    title="Cancel Order"
                                                >
                                                    <FiXCircle />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-4 px-6 text-center text-gray-500">
                                        No orders found matching your criteria
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}

            {/* Order Details Modal */}
            {isViewModalOpen && selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                Order Details: {selectedOrder.id}
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="text-gray-400 text-sm">Customer</p>
                                <p className="font-medium">{selectedOrder.customerName}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Order Date</p>
                                <p className="font-medium">{selectedOrder.date}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Status</p>
                                <p className="font-medium">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)} text-white`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Total Amount</p>
                                <p className="font-medium text-lg">${selectedOrder.amount.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="border-t border-gray-700 pt-4 mb-4">
                            <h4 className="font-medium mb-2">Order Items ({selectedOrder.items})</h4>
                            <div className="bg-gray-900 rounded p-3 text-sm text-gray-300">
                                <p>Item details would appear here...</p>
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
                                Update Status
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default OrdersManagement;

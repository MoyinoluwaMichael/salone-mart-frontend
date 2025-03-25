import React, { useState } from 'react';
import {
    Eye,
    Package,
    TruckIcon,
    CheckCircle2,
    XCircle,
    Filter,
    Search
} from 'lucide-react';

interface Order {
    id: number;
    orderNumber: string;
    customer: string;
    date: string;
    total: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    items: number;
}

const VendorOrderManagement: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([
        {
            id: 1,
            orderNumber: 'ORD-2024-001',
            customer: 'Emily Johnson',
            date: '2024-03-15',
            total: 124.50,
            status: 'Processing',
            items: 3
        },
        {
            id: 2,
            orderNumber: 'ORD-2024-002',
            customer: 'Michael Chen',
            date: '2024-03-16',
            total: 87.25,
            status: 'Shipped',
            items: 2
        },
        {
            id: 3,
            orderNumber: 'ORD-2024-003',
            customer: 'Sarah Martinez',
            date: '2024-03-17',
            total: 45.99,
            status: 'Pending',
            items: 1
        }
    ]);

    const [filter, setFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredOrders = orders.filter(order =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter === '' || order.status === filter)
    );

    const getStatusIcon = (status: string) => {
        switch(status) {
            case 'Pending': return <Package className="text-yellow-500" />;
            case 'Processing': return <TruckIcon className="text-blue-500" />;
            case 'Shipped': return <TruckIcon className="text-green-500" />;
            case 'Delivered': return <CheckCircle2 className="text-emerald-500" />;
            case 'Cancelled': return <XCircle className="text-red-500" />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            {/* Order Management Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Order Management</h1>
                <div className="flex space-x-4">
                    <button
                        className="bg-emerald-600 hover:bg-emerald-500 text-white
                        px-4 py-2 rounded-lg flex items-center transition-colors"
                    >
                        Export Orders
                    </button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="flex space-x-4 mb-6">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search orders..."
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

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2 bg-emerald-700 text-white rounded-lg"
                >
                    <option value="">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            {/* Orders Table */}
            <div className="bg-emerald-800 rounded-lg overflow-hidden shadow-md">
                <table className="w-full">
                    <thead className="bg-emerald-700 text-emerald-200">
                    <tr>
                        <th className="p-4 text-left">Order Number</th>
                        <th className="p-4 text-left">Customer</th>
                        <th className="p-4 text-left">Date</th>
                        <th className="p-4 text-left">Total</th>
                        <th className="p-4 text-left">Items</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredOrders.map(order => (
                        <tr
                            key={order.id}
                            className="border-b border-emerald-700 hover:bg-emerald-700 transition-colors"
                        >
                            <td className="p-4 font-medium">{order.orderNumber}</td>
                            <td className="p-4">{order.customer}</td>
                            <td className="p-4">{order.date}</td>
                            <td className="p-4">${order.total.toFixed(2)}</td>
                            <td className="p-4">{order.items}</td>
                            <td className="p-4 flex items-center">
                                {getStatusIcon(order.status)}
                                <span className="ml-2">{order.status}</span>
                            </td>
                            <td className="p-4 flex justify-center space-x-2">
                                <button
                                    className="text-emerald-400 hover:text-emerald-300"
                                    title="View Order Details"
                                >
                                    <Eye size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Order Summary */}
            <div className="grid md:grid-cols-4 gap-4 sm:grid-cols-2">
                {[
                    { label: 'Total Orders', value: filteredOrders.length, icon: <Package /> },
                    {
                        label: 'Total Revenue',
                        value: `$${filteredOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}`,
                        icon: <CheckCircle2 />
                    },
                    {
                        label: 'Pending Orders',
                        value: filteredOrders.filter(o => o.status === 'Pending').length,
                        icon: <TruckIcon />
                    },
                    {
                        label: 'Shipped Orders',
                        value: filteredOrders.filter(o => o.status === 'Shipped').length,
                        icon: <TruckIcon />
                    }
                ].map((stat, index) => (
                    <div
                        key={index}
                        className="bg-emerald-700 rounded-lg p-4 flex items-center space-x-4 shadow-md"
                    >
                        <div className="bg-emerald-600 p-3 rounded-full">
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-emerald-300 text-sm">{stat.label}</p>
                            <p className="text-white text-xl font-bold">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VendorOrderManagement;

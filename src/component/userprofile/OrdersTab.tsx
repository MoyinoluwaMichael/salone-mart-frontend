import React from 'react';
import { Package } from 'lucide-react';

const OrdersTab = () => {
    return (
        <div className="animate-fadeIn">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-bold mb-4">Your Orders</h2>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="text-black border-b">
                            <th className="py-3 text-left">Order</th>
                            <th className="py-3 text-left">Date</th>
                            <th className="py-3 text-left">Status</th>
                            <th className="py-3 text-left">Total</th>
                            <th className="py-3 text-left">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {[1, 2, 3, 4].map((_, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="py-4">
                                    <p className="text-black font-medium">#23456{index}</p>
                                </td>
                                <td className="py-4 text-sm text-gray-500">
                                    March {5 + index}, 2025
                                </td>
                                <td className="py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                        index === 0 ? 'bg-green-100 text-green-700' :
                            index === 1 ? 'bg-blue-100 text-blue-700' :
                                index === 2 ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-gray-100 text-gray-700'
                    }`}>
                      {
                          index === 0 ? 'Delivered' :
                              index === 1 ? 'In Transit' :
                                  index === 2 ? 'Processing' :
                                      'Cancelled'
                      }
                    </span>
                                </td>
                                <td className="py-4 font-medium">
                                    ${(49.99 + (index * 10)).toFixed(2)}
                                </td>
                                <td className="py-4">
                                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty state if no orders */}
                {false && (
                    <div className="py-12 text-center">
                        <div className="bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                            <Package size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                        <p className="text-gray-500 mb-6">When you place an order, it will appear here</p>
                        <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-md hover:from-blue-700 hover:to-green-700 transition-colors duration-300">
                            Start Shopping
                        </button>
                    </div>
                )}
            </div>

            <OrderTracking />
        </div>
    );
};

const OrderTracking = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Order Tracking</h3>

        <div className="border p-4 rounded-lg mb-4">
            <div className="text-black flex flex-col sm:flex-row justify-between mb-4">
                <div>
                    <p className="text-sm text-gray-500">Order #234560</p>
                    <p className="font-medium">Estimated delivery: Mar 21</p>
                </div>
                <button className="text-blue-600 text-sm hover:underline mt-2 sm:mt-0">
                    View Details
                </button>
            </div>

            <div className="relative pt-8">
                <div className="flex items-center justify-between mb-2">
                    {['Ordered', 'Processed', 'Shipped', 'Delivered'].map((step, i) => (
                        <div key={i} className="flex flex-col items-center w-1/4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                i <= 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                            }`}>
                                {i <= 1 ? '✓' : i + 1}
                            </div>
                            <p className="text-black text-xs text-center mt-1">{step}</p>
                        </div>
                    ))}
                </div>

                {/* Progress bar */}
                <div className="absolute top-11 left-0 right-0 h-0.5 bg-gray-200">
                    <div className="h-full bg-green-500" style={{ width: '40%' }}></div>
                </div>
            </div>
        </div>
    </div>
);

export default OrdersTab;

import React, { useState } from 'react';
import {
    Plus,
    Edit,
    Trash2,
    Search
} from 'lucide-react';
import AddProductModal from './AddProductModal';



interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: 'Active' | 'Out of Stock' | 'Discontinued';
}

const VendorProductManagement: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([
        {
            id: 1,
            name: "Organic Green Tea",
            category: "Beverages",
            price: 12.99,
            stock: 50,
            status: "Active"
        },
        {
            id: 2,
            name: "Artisan Honey",
            category: "Food",
            price: 9.50,
            stock: 0,
            status: "Out of Stock"
        },
        {
            id: 3,
            name: "Lavender Essential Oil",
            category: "Wellness",
            price: 15.75,
            stock: 25,
            status: "Active"
        }
    ]);

    const [filter, setFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter === '' || product.status === filter)
    );

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Active': return 'text-green-500';
            case 'Out of Stock': return 'text-red-500';
            case 'Discontinued': return 'text-gray-500';
            default: return 'text-gray-500';
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProduct = (productData) => {
    // Logic to add product to your system
    console.log(productData);
  };


    return (
        <div className="space-y-6">
            {/* Product Management Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">My Products</h1>
                <button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white
                    px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                    <Plus className="mr-2" /> Add New Product
                </button>
            </div>

            {/* Filters and Search */}
            <div className="flex space-x-4 mb-6">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-white
                        rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <Search
                        className="absolute left-3 top-3 text-gray-300"
                        size={20}
                    />
                </div>

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700
                     hover:to-purple-700 text-white rounded-lg"
                >
                    <option value="">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Discontinued">Discontinued</option>
                </select>
            </div>

            {/* Product Table */}
            <div className="bg-gray-700 rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-blue-800 to-purple-800 text-emerald-200">
                    <tr>
                        <th className="p-4 text-left">Product Name</th>
                        <th className="p-4 text-left">Category</th>
                        <th className="p-4 text-left">Price</th>
                        <th className="p-4 text-left">Stock</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredProducts.map(product => (
                        <tr
                            key={product.id}
                            className="  border-gray-600 border-b-[.5px] hover:bg-gray-600 transition-colors"
                        >
                            <td className="p-4">{product.name}</td>
                            <td className="p-4">{product.category}</td>
                            <td className="p-4">${product.price.toFixed(2)}</td>
                            <td className="p-4">{product.stock}</td>
                            <td className={`p-4 ${getStatusColor(product.status)}`}>
                                {product.status}
                            </td>
                            <td className="p-4 flex justify-center space-x-2">
                                <button
                                    className="text-emerald-400 hover:text-emerald-300"
                                    title="Edit Product"
                                >
                                    <Edit size={20} />
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-400"
                                    title="Delete Product"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <AddProductModal 
             isOpen={isModalOpen} 
             onClose={() => setIsModalOpen(false)}
             onAddProduct={handleAddProduct}
            />
        </div>
    );
};

export default VendorProductManagement;

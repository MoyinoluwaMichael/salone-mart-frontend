import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCategory {
    id: string;
    name: string;
    description: string;
    parentId: string | null;
    subcategories?: ProductCategory[];
    createdAt: string;
    status: 'active' | 'inactive';
}

const ProductCategoryManagement: React.FC = () => {
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentItem, setCurrentItem] = useState<ProductCategory | null>(null);
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        parentId: '',
        status: 'active' as 'active' | 'inactive'
    });

    // Mock data - replace with actual API call
    useEffect(() => {
        const fetchData = async () => {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1200));

            const mockCategories = [
                {
                    id: '1',
                    name: 'Electronics',
                    description: 'Electronic devices and accessories',
                    parentId: null,
                    createdAt: '2024-02-15T10:30:00Z',
                    status: 'active' as const
                },
                {
                    id: '2',
                    name: 'Smartphones',
                    description: 'Mobile phones and accessories',
                    parentId: '1',
                    createdAt: '2024-02-16T14:20:00Z',
                    status: 'active' as const
                },
                {
                    id: '3',
                    name: 'Laptops',
                    description: 'Notebooks and accessories',
                    parentId: '1',
                    createdAt: '2024-02-17T09:15:00Z',
                    status: 'active' as const
                },
                {
                    id: '4',
                    name: 'Clothing',
                    description: 'Apparel and fashion items',
                    parentId: null,
                    createdAt: '2024-02-18T11:40:00Z',
                    status: 'active' as const
                },
                {
                    id: '5',
                    name: "Men's Wear",
                    description: 'Clothing for men',
                    parentId: '4',
                    createdAt: '2024-02-19T13:25:00Z',
                    status: 'active' as const
                },
                {
                    id: '6',
                    name: "Women's Wear",
                    description: 'Clothing for women',
                    parentId: '4',
                    createdAt: '2024-02-20T15:10:00Z',
                    status: 'active' as const
                },
                {
                    id: '7',
                    name: 'Smart Watches',
                    description: 'Wearable smart devices',
                    parentId: '1',
                    createdAt: '2024-02-21T16:45:00Z',
                    status: 'inactive' as const
                }
            ];

            // Process into hierarchical structure
            const rootCategories = mockCategories.filter(cat => cat.parentId === null);

            const processedCategories = rootCategories.map(root => {
                const children = mockCategories.filter(cat => cat.parentId === root.id);
                return {
                    ...root,
                    subcategories: children
                };
            });

            setCategories(processedCategories);
            setLoading(false);
        };

        fetchData();
    }, []);

    const toggleExpand = (id: string) => {
        setExpandedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newCategory: ProductCategory = {
            id: currentItem?.id || Date.now().toString(),
            name: formData.name,
            description: formData.description,
            parentId: formData.parentId || null,
            createdAt: currentItem?.createdAt || new Date().toISOString(),
            status: formData.status
        };

        if (currentItem) {
            // Update existing category
            if (currentItem.parentId === null) {
                // Update root category
                setCategories(categories.map(cat =>
                    cat.id === currentItem.id ? { ...newCategory, subcategories: cat.subcategories } : cat
                ));
            } else {
                // Update subcategory
                setCategories(categories.map(cat => {
                    if (cat.subcategories?.some(sub => sub.id === currentItem.id)) {
                        return {
                            ...cat,
                            subcategories: cat.subcategories.map(sub =>
                                sub.id === currentItem.id ? newCategory : sub
                            )
                        };
                    }
                    return cat;
                }));
            }
        } else {
            // Add new category
            if (!formData.parentId) {
                // Add as root category
                setCategories([...categories, { ...newCategory, subcategories: [] }]);
            } else {
                // Add as subcategory
                setCategories(categories.map(cat => {
                    if (cat.id === formData.parentId) {
                        return {
                            ...cat,
                            subcategories: [...(cat.subcategories || []), newCategory]
                        };
                    }
                    return cat;
                }));
                // Ensure parent category is expanded
                setExpandedCategories(prev => new Set([...prev, formData.parentId]));
            }
        }

        resetForm();
    };

    const editItem = (item: ProductCategory) => {
        setCurrentItem(item);
        setFormData({
            name: item.name,
            description: item.description,
            parentId: item.parentId || '',
            status: item.status
        });
        setShowForm(true);
    };

    const deleteItem = (id: string, parentId: string | null) => {
        if (parentId === null) {
            // Delete root category and all its subcategories
            setCategories(categories.filter(cat => cat.id !== id));
        } else {
            // Delete subcategory
            setCategories(categories.map(cat => {
                if (cat.id === parentId) {
                    return {
                        ...cat,
                        subcategories: cat.subcategories?.filter(sub => sub.id !== id) || []
                    };
                }
                return cat;
            }));
        }
    };

    const resetForm = () => {
        setFormData({ name: '', description: '', parentId: '', status: 'active' });
        setCurrentItem(null);
        setShowForm(false);
    };

    // Get all categories for parent selection
    const allCategories = categories.flatMap(cat => [
        cat,
        ...(cat.subcategories || [])
    ]);

    // Filter categories based on search term
    const filteredCategories = searchTerm
        ? allCategories.filter(cat =>
            cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cat.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : categories;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white mb-2 md:mb-0">
                    Product Categories Management
                </h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? (
                        <>
                            <FiX /> Cancel
                        </>
                    ) : (
                        <>
                            <FiPlus /> Add Category
                        </>
                    )}
                </motion.button>
            </div>

            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-gray-700 p-6 rounded-lg shadow-lg"
                    >
                        <h3 className="text-xl font-semibold mb-4 text-blue-400">
                            {currentItem ? 'Edit Category' : 'Add New Category'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Parent Category (optional)
                                </label>
                                <select
                                    name="parentId"
                                    value={formData.parentId}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                                >
                                    <option value="">None (Root Category)</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Status
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    type="submit"
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg flex-1"
                                >
                                    {currentItem ? 'Update' : 'Create'}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-lg flex-1"
                                >
                                    Cancel
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="bg-gray-700 p-4 rounded-lg flex items-center">
                <FiSearch className="text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search categories..."
                    className="bg-transparent border-none w-full focus:outline-none text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="flex items-center justify-center p-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="overflow-x-auto bg-gray-700 rounded-lg">
                    {searchTerm ? (
                        // Flat list for search results
                        <table className="min-w-full">
                            <thead className="bg-gradient-to-r from-blue-800 to-purple-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                                    Parent
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-200 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-600">
                            {filteredCategories.map((item) => (
                                <motion.tr
                                    key={item.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="hover:bg-gray-600"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {item.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                          item.status === 'active'
                              ? 'bg-green-900 text-green-300'
                              : 'bg-red-900 text-red-300'
                      }`}>
                        {item.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {item.parentId
                                            ? allCategories.find(c => c.id === item.parentId)?.name || '-'
                                            : 'None'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-3">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => editItem(item)}
                                                className="text-blue-400 hover:text-blue-300"
                                            >
                                                <FiEdit2 />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => deleteItem(item.id, item.parentId)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                <FiTrash2 />
                                            </motion.button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                            {filteredCategories.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                        No categories found matching your search
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    ) : (
                        // Hierarchical view for normal browsing
                        <table className="min-w-full">
                            <thead className="bg-gradient-to-r from-blue-800 to-purple-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                                    Created
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-200 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-600">
                            {categories.length > 0 ? (
                                categories.map((category, index) => (
                                    <React.Fragment key={category.id}>
                                        <motion.tr
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                transition: { delay: index * 0.05 }
                                            }}
                                            className="hover:bg-gray-600"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                                <div className="flex items-center">
                                                    {category.subcategories && category.subcategories.length > 0 && (
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => toggleExpand(category.id)}
                                                            className="mr-2 text-blue-400"
                                                        >
                                                            {expandedCategories.has(category.id) ? (
                                                                <FiChevronUp />
                                                            ) : (
                                                                <FiChevronDown />
                                                            )}
                                                        </motion.button>
                                                    )}
                                                    {category.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {category.description}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                              category.status === 'active'
                                  ? 'bg-green-900 text-green-300'
                                  : 'bg-red-900 text-red-300'
                          }`}>
                            {category.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                {new Date(category.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-3">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => editItem(category)}
                                                        className="text-blue-400 hover:text-blue-300"
                                                    >
                                                        <FiEdit2 />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => deleteItem(category.id, category.parentId)}
                                                        className="text-red-400 hover:text-red-300"
                                                    >
                                                        <FiTrash2 />
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>

                                        {/* Subcategories */}
                                        {expandedCategories.has(category.id) && category.subcategories?.map((subcat, subIndex) => (
                                            <motion.tr
                                                key={subcat.id}
                                                initial={{ opacity: 0, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                                                animate={{
                                                    opacity: 1,
                                                    transition: { delay: 0.1 + (subIndex * 0.03) }
                                                }}
                                                className="bg-gray-800 hover:bg-gray-700"
                                            >
                                                <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-200">
                                                    <div className="flex items-center pl-6 border-l-2 border-blue-500">
                                                        {subcat.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-400">
                                                    {subcat.description}
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                                subcat.status === 'active'
                                    ? 'bg-green-900 text-green-300'
                                    : 'bg-red-900 text-red-300'
                            }`}>
                              {subcat.status === 'active' ? 'Active' : 'Inactive'}
                            </span>
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-400">
                                                    {new Date(subcat.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex justify-end gap-3">
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => editItem(subcat)}
                                                            className="text-blue-400 hover:text-blue-300"
                                                        >
                                                            <FiEdit2 />
                                                        </motion.button>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => deleteItem(subcat.id, subcat.parentId)}
                                                            className="text-red-400 hover:text-red-300"
                                                        >
                                                            <FiTrash2 />
                                                        </motion.button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </React.Fragment>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                        No categories available
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductCategoryManagement;

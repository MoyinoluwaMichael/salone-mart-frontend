import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface DocumentType {
    id: string;
    name: string;
    description: string;
    required: boolean;
    createdAt: string;
}

const DocumentTypesManagement: React.FC = () => {
    const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentItem, setCurrentItem] = useState<DocumentType | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        required: false
    });

    // Mock data - replace with actual API call
    useEffect(() => {
        const fetchData = async () => {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            setDocumentTypes([
                {
                    id: '1',
                    name: 'Invoice',
                    description: 'Official invoice document',
                    required: true,
                    createdAt: '2024-03-15T10:30:00Z'
                },
                {
                    id: '2',
                    name: 'Receipt',
                    description: 'Payment receipt',
                    required: true,
                    createdAt: '2024-03-14T09:45:00Z'
                },
                {
                    id: '3',
                    name: 'Contract',
                    description: 'Legal contract document',
                    required: true,
                    createdAt: '2024-03-13T14:20:00Z'
                },
                {
                    id: '4',
                    name: 'Warranty',
                    description: 'Product warranty information',
                    required: false,
                    createdAt: '2024-03-12T16:10:00Z'
                }
            ]);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (currentItem) {
            // Update existing item
            setDocumentTypes(documentTypes.map(item =>
                item.id === currentItem.id ?
                    { ...item, name: formData.name, description: formData.description, required: formData.required } :
                    item
            ));
        } else {
            // Add new item
            const newItem: DocumentType = {
                id: Date.now().toString(),
                name: formData.name,
                description: formData.description,
                required: formData.required,
                createdAt: new Date().toISOString()
            };
            setDocumentTypes([...documentTypes, newItem]);
        }

        resetForm();
    };

    const editItem = (item: DocumentType) => {
        setCurrentItem(item);
        setFormData({
            name: item.name,
            description: item.description,
            required: item.required
        });
        setShowForm(true);
    };

    const deleteItem = (id: string) => {
        setDocumentTypes(documentTypes.filter(item => item.id !== id));
    };

    const resetForm = () => {
        setFormData({ name: '', description: '', required: false });
        setCurrentItem(null);
        setShowForm(false);
    };

    const filteredItems = documentTypes.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white mb-2 md:mb-0">
                    Document Types Management
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
                            <FiPlus /> Add Document Type
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
                            {currentItem ? 'Edit Document Type' : 'Add New Document Type'}
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
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="required"
                                    name="required"
                                    checked={formData.required}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="required" className="ml-2 block text-sm text-gray-300">
                                    Required Document
                                </label>
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
                    placeholder="Search document types..."
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
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
                        <thead className="bg-gradient-to-r from-blue-800 to-purple-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                                Required
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                                Date Created
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-200 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-600">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, index) => (
                                <motion.tr
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: { delay: index * 0.05 }
                                    }}
                                    className="hover:bg-gray-600"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {item.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <span className={`px-2 py-1 rounded-full text-xs ${item.required ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                        {item.required ? 'Required' : 'Optional'}
                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {new Date(item.createdAt).toLocaleDateString()}
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
                                                onClick={() => deleteItem(item.id)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                <FiTrash2 />
                                            </motion.button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                    {searchTerm ? 'No document types found matching your search' : 'No document types available'}
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DocumentTypesManagement;

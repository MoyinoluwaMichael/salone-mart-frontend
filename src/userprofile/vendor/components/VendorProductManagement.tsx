import { useEffect, useState } from "react";
import { retrieveVendorProducts } from "@/userprofile/vendor/vendorService";
import { Product } from "@/product/productService";
import { AuthenticationResponse } from "@/authentication/authenticationService";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import AddProductModal from "@/userprofile/vendor/components/AddProductModal";
import { AppPageResponse, formatDate, sierraLeoneCurrencySymbol } from "@/utils/apputils";

interface VendorProductManagementProps {
    userData: AuthenticationResponse;
}

const VendorProductManagement: React.FC<VendorProductManagementProps> = ({ userData }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalFilteredItems, setTotalFilteredItems] = useState(0);
    const [rowSize, setRowSize] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [filter, setFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async (page: number, size: number) => {
            setIsLoading(true);
            let productResponse: AppPageResponse<Product> | null = await retrieveVendorProducts(userData.user.id, userData.accessToken, userData.user.bioData.roles, pageSize, pageNumber);
            if (productResponse != null) {
                setProducts(productResponse.data);
                setTotalFilteredItems(productResponse.totalFilteredItems);
                setRowSize(productResponse.rowSize);
            }
            setIsLoading(false);
            console.log("Userdata: ", productResponse.data);
        };

        fetchProducts(pageNumber, pageSize);
    }, [userData, pageNumber, pageSize]);

    const getProductStatus = (quantity: number): string => {
        return quantity > 0 ? 'Active' : 'Out of Stock';
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter === '' || getProductStatus(product.quantity) === filter)
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

    // const handleAddProduct = (productData: Product) => {
    const handleAddProduct = () => {
        // Logic to add product to your system
        // setIsModalOpen(true)
        // console.log(productData);
    };

    const handlePageChange = (newPage: number) => {
        setPageNumber(newPage);
    };

    return (
        <div className="space-y-6">
            {/* Product Management Header */}
            <div className="md:flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">My Products</h1>
                <button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white
                    px-4 py-2 rounded-lg flex items-center transition-colors mt-5 md:mt-0"
                    onClick={()=> setIsModalOpen(true)}
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

            {/* Loading Screen */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="text-white">Loading...</div>
                </div>
            ) : (
                <>
                    {/* Product Table */}
                    <div className="bg-gray-700 rounded-lg overflow-y-hidden overflow-x-scroll no-scrollbar">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-blue-800 to-purple-800 text-emerald-200">
                            <tr>
                                <th className="p-4 text-left">Product Name</th>
                                <th className="p-4 text-left">Category</th>
                                <th className="p-4 text-left">Price</th>
                                <th className="p-4 text-left">Stock</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-left">Date Created</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredProducts.map(product => (
                                <tr
                                    key={product.id}
                                    className="  border-gray-600 border-b-[.5px] hover:bg-gray-600 transition-colors"
                                >
                                    <td className="p-4">{product.name}</td>
                                    <td className="p-4">{product.category.name}</td>
                                    <td className="p-4">{sierraLeoneCurrencySymbol()+' '+ product.price.toFixed(2)}</td>
                                    <td className="p-4">{product.quantity}</td>
                                    <td className={`p-4 ${getStatusColor(getProductStatus(product.quantity))}`}>
                                        {getProductStatus(product.quantity)}
                                    </td>
                                    <td className="p-4">{formatDate(product.createdAt)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={() => handlePageChange(pageNumber - 1)}
                            disabled={pageNumber === 0}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                        >
                            Previous
                        </button>
                        <span className="text-white">
                            Page {pageNumber + 1} of {Math.ceil(rowSize / pageSize)}
                        </span>
                        <button
                            onClick={() => handlePageChange(pageNumber + 1)}
                            disabled={(pageNumber + 1) * pageSize >= rowSize}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}

            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddProduct={handleAddProduct}
            />
        </div>
    );
};

export default VendorProductManagement;

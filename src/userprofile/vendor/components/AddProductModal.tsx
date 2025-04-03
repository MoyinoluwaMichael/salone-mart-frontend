import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  brand: number;
  quantity: number;
  description: string;
  interest: number;
}

// Corrected type guard for the component props
interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void; // Typically a function that doesn't return anything
  // onAddProduct: (product: Product) => void;
  onAddProduct: () => void;
}

const AddProductModal = ({
  isOpen,
  onClose,
}: AddProductModalProps) => {
  const [productData, setProductData] = useState<Product>({
    name: "",
    category: "",
    price: 0,
    brand: 0,
    quantity: 0,
    id: 0,
    description: '',
    interest: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddProduct();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-2xl w-11/12 max-w-md p-6 relative overflow-y-scroll 
            md:h-[95vh] no-scrollbar my-10 h-[80vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Add New Product
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 ">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                   focus:ring-2 focus:ring-purple-500 text-black"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Description
                </label>
                <textarea
                  rows={4}
                  cols={5}
                  id="description"
                  name="description"
                  value={productData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none 
                  focus:ring-2 focus:ring-purple-500 text-black"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={productData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                   focus:ring-2 focus:ring-purple-500 text-black"
                >
                  <option value="" className="">Select Category</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Food">Food</option>
                  <option value="Wellness">Wellness</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Brand
                </label>
                <select
                  id="brand"
                  name="brand"
                  value={productData.brand}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                   focus:ring-2 focus:ring-purple-500 text-black"
                >
                  <option value="" className="">Select Brand</option>
                  <option value="Nike">Nike</option>
                  <option value="All stars">All stars</option>
                  <option value="Air">Air</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                     focus:ring-2 focus:ring-purple-500 text-black"
                  />
                </div>
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={productData.quantity}
                    onChange={handleInputChange}
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                     focus:ring-2 focus:ring-purple-500 text-black"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="interest"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  interest
                </label>
                <input
                    type="number"
                    id="interest"
                    name="interest"
                    value={productData.interest}
                    onChange={handleInputChange}
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none
                     focus:ring-2 focus:ring-purple-500 text-black"
                  />
              </div>

              <div className="flex justify-center mt-6">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  <Plus size={20} className="mr-2" />
                  Add Product
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddProductModal;

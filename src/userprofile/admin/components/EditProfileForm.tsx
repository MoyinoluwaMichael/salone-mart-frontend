import React from 'react';
import { motion } from 'framer-motion';
import { BioData } from '@/authentication/authenticationService';

interface EditProfileFormProps {
    editForm: BioData;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleEditSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setIsEditing: (value: boolean) => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
                                                             editForm,
                                                             handleInputChange,
                                                             handleEditSubmit,
                                                             setIsEditing
                                                         }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-purple-500 shadow-lg shadow-purple-500/20"
            >
                <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-3 flex items-center">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">Edit Profile</span>
                </h2>

                <form onSubmit={handleEditSubmit}>
                    <div className="space-y-4">
                        <div className="form-group">
                            <label className="block text-gray-300 mb-2">First Name</label>
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                type="text"
                                name="firstName"
                                value={editForm.firstName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-gray-300 mb-2">Last Name</label>
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                type="text"
                                name="lastName"
                                value={editForm.lastName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-gray-300 mb-2">Email Address</label>
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                type="email"
                                name="emailAddress"
                                value={editForm.emailAddress}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="block text-gray-300 mb-2">Phone Number</label>
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                type="text"
                                name="phoneNumber"
                                value={editForm.phoneNumber}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={() => setIsEditing(false)}
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
    );
};

export default EditProfileForm;

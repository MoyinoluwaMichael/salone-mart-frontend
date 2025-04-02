import React, { useState } from 'react';
import {
    FiAlertTriangle,
    FiCheckCircle,
    FiXCircle,
    FiPower
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmationModal = ({
                               isOpen,
                               onClose,
                               onConfirm,
                               action,
                               actionType = 'default'
                           }) => {
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const actionConfigs = {
        approve: {
            bgGradient: 'from-green-500 to-green-700',
            textColor: 'text-green-50',
            icon: <FiCheckCircle className="text-green-300 w-16 h-16" />,
            title: 'Approve Application',
            description: 'This vendor will be fully activated in the system.'
        },
        decline: {
            bgGradient: 'from-red-500 to-red-700',
            textColor: 'text-red-50',
            icon: <FiXCircle className="text-red-300 w-16 h-16" />,
            title: 'Decline Application',
            description: 'The vendor application will be rejected.'
        },
        deactivate: {
            bgGradient: 'from-yellow-500 to-yellow-700',
            textColor: 'text-yellow-50',
            icon: <FiPower className="text-yellow-300 w-16 h-16" />,
            title: 'Deactivate Vendor',
            description: 'This vendor will be temporarily suspended.'
        },
        default: {
            bgGradient: 'from-blue-500 to-blue-700',
            textColor: 'text-blue-50',
            icon: <FiAlertTriangle className="text-blue-300 w-16 h-16" />,
            title: 'Confirm Action',
            description: 'Are you sure you want to proceed with this action?'
        }
    };

    const config = actionConfigs[actionType] || actionConfigs.default;

    const handleConfirmClick = async () => {
        setIsLoading(true);
        await onConfirm();
        setIsLoading(false);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`
                        relative
                        w-full max-w-md
                        bg-gradient-to-br ${config.bgGradient}
                        rounded-2xl
                        shadow-2xl
                        overflow-hidden
                        ${config.textColor}
                    `}
                >
                    <div className="relative z-10 p-6 text-center">
                        <div className="flex justify-center mb-6">
                            {config.icon}
                        </div>

                        <h3 className="text-2xl font-bold mb-3">
                            {config.title}
                        </h3>

                        <p className="text-sm opacity-80 mb-6">
                            {config.description}
                        </p>

                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={onClose}
                                className="
                                    px-6 py-2
                                    bg-white
                                    text-black
                                    font-semibold
                                    rounded-lg
                                    hover:bg-opacity-90
                                    transition-all
                                "
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmClick}
                                className="
                                    px-6 py-2
                                    bg-white
                                    text-black
                                    font-semibold
                                    rounded-lg
                                    hover:bg-opacity-90
                                    transition-all
                                    flex items-center justify-center
                                "
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <svg
                                        className="animate-spin h-5 w-5 text-black"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 12a10 10 0 0010 10v-4a6 6 0 01-6-6H2z"
                                        ></path>
                                    </svg>
                                ) : (
                                    'Confirm'
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ConfirmationModal;

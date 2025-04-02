import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSettings, FiSave, FiRefreshCw, FiHelpCircle, FiAlertTriangle } from 'react-icons/fi';

interface SystemConfigOption {
    id: string;
    name: string;
    description: string;
    value: string | number | boolean;
    type: 'text' | 'number' | 'boolean' | 'select';
    options?: string[];
    category: 'general' | 'email' | 'security' | 'notifications' | 'integrations';
}

const SystemConfigManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('general');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);
    const [showTooltip, setShowTooltip] = useState<string | null>(null);

    // Sample data for system configuration options
    const [configOptions, setConfigOptions] = useState<SystemConfigOption[]>([
        {
            id: 'site_name',
            name: 'Site Name',
            description: 'Name of your site displayed in the header and emails',
            value: 'AdminDashboard',
            type: 'text',
            category: 'general'
        },
        {
            id: 'support_email',
            name: 'Support Email',
            description: 'Email address for customer support inquiries',
            value: 'support@example.com',
            type: 'text',
            category: 'general'
        },
        {
            id: 'maintenance_mode',
            name: 'Maintenance Mode',
            description: 'Enable maintenance mode to display a maintenance page to users',
            value: false,
            type: 'boolean',
            category: 'general'
        },
        {
            id: 'items_per_page',
            name: 'Items Per Page',
            description: 'Number of items to display per page in listings',
            value: 20,
            type: 'number',
            category: 'general'
        },
        {
            id: 'smtp_host',
            name: 'SMTP Host',
            description: 'SMTP server hostname for sending emails',
            value: 'smtp.example.com',
            type: 'text',
            category: 'email'
        },
        {
            id: 'smtp_port',
            name: 'SMTP Port',
            description: 'SMTP server port for sending emails',
            value: 587,
            type: 'number',
            category: 'email'
        },
        {
            id: 'smtp_encryption',
            name: 'SMTP Encryption',
            description: 'Encryption type for SMTP server',
            value: 'tls',
            type: 'select',
            options: ['none', 'ssl', 'tls'],
            category: 'email'
        },
        {
            id: 'email_sender',
            name: 'Email Sender',
            description: 'Email address used as the sender in outgoing emails',
            value: 'noreply@example.com',
            type: 'text',
            category: 'email'
        },
        {
            id: 'two_factor_auth',
            name: 'Two-Factor Authentication',
            description: 'Require two-factor authentication for admin users',
            value: true,
            type: 'boolean',
            category: 'security'
        },
        {
            id: 'password_expiry',
            name: 'Password Expiry Days',
            description: 'Number of days after which user passwords must be changed',
            value: 90,
            type: 'number',
            category: 'security'
        },
        {
            id: 'max_login_attempts',
            name: 'Max Login Attempts',
            description: 'Maximum number of failed login attempts before account lockout',
            value: 5,
            type: 'number',
            category: 'security'
        },
        {
            id: 'session_timeout',
            name: 'Session Timeout (minutes)',
            description: 'Time in minutes before inactive users are automatically logged out',
            value: 30,
            type: 'number',
            category: 'security'
        },
        {
            id: 'email_notifications',
            name: 'Email Notifications',
            description: 'Enable email notifications for system events',
            value: true,
            type: 'boolean',
            category: 'notifications'
        },
        {
            id: 'order_notifications',
            name: 'Order Notifications',
            description: 'Send notifications for new orders, order status changes, etc.',
            value: true,
            type: 'boolean',
            category: 'notifications'
        },
        {
            id: 'inventory_alerts',
            name: 'Inventory Alerts',
            description: 'Send alerts when product inventory falls below threshold',
            value: true,
            type: 'boolean',
            category: 'notifications'
        },
        {
            id: 'payment_gateway',
            name: 'Payment Gateway',
            description: 'Default payment gateway for processing payments',
            value: 'stripe',
            type: 'select',
            options: ['stripe', 'paypal', 'square', 'authorize.net'],
            category: 'integrations'
        },
        {
            id: 'shipping_api',
            name: 'Shipping API',
            description: 'API for calculating shipping rates',
            value: 'fedex',
            type: 'select',
            options: ['fedex', 'ups', 'usps', 'dhl'],
            category: 'integrations'
        },
        {
            id: 'analytics_id',
            name: 'Analytics ID',
            description: 'Tracking ID for analytics integration',
            value: 'UA-12345678-9',
            type: 'text',
            category: 'integrations'
        }
    ]);

    // Filter options by active tab
    const filteredOptions = configOptions.filter(option => option.category === activeTab);

    // Handle input changes
    const handleOptionChange = (id: string, newValue: string | number | boolean) => {
        setConfigOptions(prevOptions =>
            prevOptions.map(option =>
                option.id === id ? { ...option, value: newValue } : option
            )
        );
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSaveSuccess(true);

            // Reset success message after 3 seconds
            setTimeout(() => setSaveSuccess(null), 3000);
        } catch (error) {
            setSaveSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    const resetToDefaults = () => {
        // In a real app, this would reset to system defaults
        // For demo, we'll just show the loading state
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(null), 3000);
        }, 1500);
    };

    // Render the appropriate input field based on option type
    const renderInputField = (option: SystemConfigOption) => {
        switch (option.type) {
            case 'text':
                return (
                    <input
                        type="text"
                        value={option.value as string}
                        onChange={(e) => handleOptionChange(option.id, e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200"
                    />
                );
            case 'number':
                return (
                    <input
                        type="number"
                        value={option.value as number}
                        onChange={(e) => handleOptionChange(option.id, parseInt(e.target.value))}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200"
                    />
                );
            case 'boolean':
                return (
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={option.value as boolean}
                            onChange={(e) => handleOptionChange(option.id, e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                );
            case 'select':
                return (
                    <select
                        value={option.value as string}
                        onChange={(e) => handleOptionChange(option.id, e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition duration-200"
                    >
                        {option.options?.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between items-center"
            >
                <h2 className="text-2xl font-bold text-white">
          <span className="text-2xl font-bold text-white mb-2 md:mb-0">
            System Configuration
          </span>
                </h2>
            </motion.div>

            <div className="bg-gray-700 rounded-lg overflow-hidden shadow-xl">
                <div className="flex flex-wrap border-b border-gray-600">
                    {['general', 'email', 'security', 'notifications', 'integrations'].map((tab) => (
                        <motion.button
                            key={tab}
                            whileHover={{ backgroundColor: 'rgba(124, 58, 237, 0.2)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-3 font-medium capitalize transition-all ${
                                activeTab === tab
                                    ? 'text-white border-b-2 border-purple-500'
                                    : 'text-gray-300 hover:text-white'
                            }`}
                        >
                            {tab}
                        </motion.button>
                    ))}
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {filteredOptions.map((option) => (
                                <motion.div
                                    key={option.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-gray-800 p-4 rounded-lg border border-gray-700"
                                >
                                    <div className="mb-2 flex justify-between items-start">
                                        <div>
                                            <label className="text-white font-medium">{option.name}</label>
                                            <p className="text-gray-400 text-sm mt-1">{option.description}</p>
                                        </div>
                                        <div className="relative">
                                            <motion.button
                                                type="button"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onMouseEnter={() => setShowTooltip(option.id)}
                                                onMouseLeave={() => setShowTooltip(null)}
                                                className="text-gray-400 hover:text-gray-300"
                                            >
                                                <FiHelpCircle className="h-5 w-5" />
                                            </motion.button>

                                            <AnimatePresence>
                                                {showTooltip === option.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.8 }}
                                                        className="absolute right-0 top-8 z-10 w-64 p-3 bg-gray-900 text-gray-300 text-sm rounded-lg shadow-lg"
                                                    >
                                                        <p>{option.description}</p>
                                                        <div className="absolute right-2 top-0 transform -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                    <div>{renderInputField(option)}</div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-between">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                onClick={resetToDefaults}
                                className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition flex items-center space-x-2"
                                disabled={isLoading}
                            >
                                <FiRefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                                <span>Reset to Defaults</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition flex items-center space-x-2"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <FiRefreshCw className="h-5 w-5 animate-spin" />
                                        <span>Saving...</span>
                                    </>
                                ) : (
                                    <>
                                        <FiSave className="h-5 w-5" />
                                        <span>Save Changes</span>
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Success/Error Notification */}
            <AnimatePresence>
                {saveSuccess !== null && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-center space-x-3 ${
                            saveSuccess ? 'bg-green-500' : 'bg-red-500'
                        }`}
                    >
                        {saveSuccess ? (
                            <FiSettings className="h-5 w-5" />
                        ) : (
                            <FiAlertTriangle className="h-5 w-5" />
                        )}
                        <span>
              {saveSuccess
                  ? 'Configuration saved successfully!'
                  : 'Failed to save configuration. Please try again.'}
            </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SystemConfigManagement;

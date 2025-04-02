import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    FiArrowLeft,
    FiUser,
    FiMail,
    FiPhone,
    FiTag,
    FiCheckCircle,
    FiFileText,
    FiDownload,
    FiCalendar,
    FiBriefcase
} from 'react-icons/fi';
import {formatDate, processVendorCommand} from '@/userprofile/admin/adminProfileService';
import ConfirmationModal from "@/userprofile/admin/components/ConfirmationModal";
import {Vendor} from "@/utils/apputils";

const DocumentCard = ({ document, onView }) => {
    const formatFileSize = (bytes: number) => {
        if (!bytes) return 'N/A';
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Byte';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
        return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
    };

    return (
        <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                    <div className="bg-blue-900 p-3 rounded-lg">
                        <FiFileText className="text-blue-300" size={24} />
                    </div>
                    <div>
                        <h5 className="font-medium">{document.documentType?.name || 'Document'}</h5>
                        <p className="text-sm text-gray-400 mt-1">{document.fileName}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-300">
                            <span className="flex items-center gap-1">
                                <FiTag size={14} />
                                {document.fileType}
                            </span>
                            <span className="flex items-center gap-1">
                                <FiFileText size={14} />
                                {formatFileSize(document.fileSize)}
                            </span>
                            <span className="flex items-center gap-1">
                                <FiCalendar size={14} />
                                {formatDate(document.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 ml-auto">
                    <button
                        onClick={() => onView(document.secureUrl)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1"
                    >
                        View
                    </button>
                    <a
                        href={document.secureUrl}
                        download={document.fileName}
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors flex items-center gap-1"
                    >
                        <FiDownload size={14} />
                        Download
                    </a>
                </div>
            </div>

            <div className="mt-3">
                <p className="text-sm text-gray-400">{document.documentType?.description}</p>
            </div>
        </div>
    );
};

const InfoItem = ({ icon, label, value }) => {
    const Icon = icon;
    return (
        <div className="flex items-start gap-3">
            <div className="bg-gray-600 p-2 rounded-full mt-1">
                <Icon className="text-blue-400" />
            </div>
            <div>
                <p className="text-sm text-gray-400">{label}</p>
                <p className="text-white break-all">{value || 'N/A'}</p>
            </div>
        </div>
    );
};

const SectionHeader = ({ icon, title }) => {
    const Icon = icon;
    return (
        <div className="flex items-center gap-2 mb-4">
            <Icon className="text-purple-400" size={20} />
            <h4 className="text-lg font-semibold">{title}</h4>
        </div>
    );
};

const VendorDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [vendor, setVendor] = useState<Vendor | null>(location.state.vendor || {});
    const [loading, setLoading] = useState(!vendor);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [action, setAction] = useState('');

    useEffect(() => {
        if (!vendor) {
            const fetchVendorData = async () => {
                navigate('/auth')
            };
            fetchVendorData();
        }
    }, [id, vendor]);

    const handleViewDocument = (url) => {
        window.open(url, '_blank');
    };

    const goBack = () => {
        navigate('/admin-profile');
    };

    const handleActionClick = (action) => {
        setAction(action);
        setIsModalOpen(true);
    };

    const handleConfirmAction = async () => {
        console.log("Action: ", action);
        let updatedVendor: Vendor | null = await processVendorCommand(action, vendor?.id);
        if (!updatedVendor) {
            navigate('/auth');
        }
        setVendor(updatedVendor);
        setIsModalOpen(false);
    };

    if (loading) {
        return (
            <div className="w-full h-screen bg-gray-800 text-white flex items-center justify-center">
                <div className="animate-pulse">
                    <div className="h-8 w-32 bg-gray-700 rounded mb-4"></div>
                    <div className="h-64 w-full max-w-2xl bg-gray-700 rounded"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-screen bg-gray-800 text-white flex items-center justify-center">
                <div className="text-center p-6 bg-gray-700 rounded-lg">
                    <div className="text-red-400 text-4xl mb-4">⚠️</div>
                    <h3 className="text-xl font-bold mb-2">Error Loading Vendor Details</h3>
                    <p className="text-gray-300 mb-4">{error}</p>
                    <button
                        onClick={goBack}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const fullName = `${vendor?.bioData?.firstName || ''} ${vendor?.bioData?.lastName || ''}`.trim() || 'N/A';

    return (
        <div className="w-full min-h-screen bg-gray-800 text-white animate-fadeIn">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center">
                <button
                    onClick={goBack}
                    className="mr-4 text-white hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-black hover:bg-opacity-20"
                    aria-label="Go back"
                >
                    <FiArrowLeft size={20} />
                </button>
                <h2 className="text-xl font-bold">Vendor Details</h2>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="col-span-1">
                        <div className="bg-gray-700 rounded-lg p-6 h-full">
                            <div className="flex flex-col items-center text-center mb-6">
                                {vendor?.bioData?.media?.[0]?.secureUrl ? (
                                    <img
                                        src={vendor?.bioData?.media[0].secureUrl}
                                        alt={fullName}
                                        className="w-32 h-32 rounded-full object-cover border-4 border-purple-500 mb-4"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-full bg-gray-600 flex items-center justify-center mb-4">
                                        <FiUser size={48} className="text-gray-300" />
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                    {vendor?.businessName || 'Business Name N/A'}
                                </h3>
                                <p className="text-gray-300 mt-1">{fullName}</p>
                                <div className="mt-3">
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        vendor?.status === 'APPROVED'
                                            ? 'bg-green-900 text-green-300'
                                            : vendor?.status === 'PENDING_REVIEW'
                                                ? 'bg-yellow-900 text-yellow-300'
                                                : 'bg-red-900 text-red-300'
                                    }`}>
                                        {vendor?.status || 'Status N/A'}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold border-b border-gray-600 pb-2 mb-3">Contact Information</h4>
                                <InfoItem icon={FiMail} label="Email" value={vendor?.bioData?.emailAddress} />
                                <InfoItem icon={FiPhone} label="Phone" value={vendor?.bioData?.phoneNumber} />
                            </div>

                            <div className="mt-6">
                                <h4 className="text-lg font-semibold border-b border-gray-600 pb-2 mb-3">Roles</h4>
                                <div className="flex flex-wrap gap-2">
                                    {vendor?.bioData?.roles?.map((role, index) => (
                                        <span key={index} className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-sm">
                                            {role}
                                        </span>
                                    ))}
                                    {(!vendor?.bioData?.roles || vendor?.bioData?.roles?.length === 0) && (
                                        <span className="text-gray-400">No roles assigned</span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6">
                                {vendor?.status === 'REJECTED' || vendor?.status === 'DEACTIVATED' && (
                                    <button
                                        onClick={() => handleActionClick('approve')}
                                        className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors w-full"
                                    >
                                        Activate
                                    </button>
                                )}
                                {vendor?.status === 'APPROVED' && (
                                    <button
                                        onClick={() => handleActionClick('deactivate')}
                                        className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors w-full"
                                    >
                                        Deactivate
                                    </button>
                                )}
                                {vendor?.status === 'PENDING_REVIEW' && (
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleActionClick('approve')}
                                            className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors w-full"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleActionClick('decline')}
                                            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors w-full"
                                        >
                                            Decline
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 lg:col-span-2 space-y-6">
                        <div className="bg-gray-700 rounded-lg p-6">
                            <SectionHeader icon={FiBriefcase} title="Business Details" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Business Name</p>
                                    <p className="text-white font-medium">{vendor.businessName || 'N/A'}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Business ID</p>
                                    <p className="text-white font-medium">{vendor.id || 'N/A'}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Status</p>
                                    <div className="flex items-center gap-2">
                                        <FiCheckCircle className={
                                            vendor.status === 'APPROVED' ? 'text-green-400' :
                                                vendor.status === 'PENDING' ? 'text-yellow-400' : 'text-red-400'
                                        } />
                                        <p className="text-white font-medium">{vendor.status || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-700 rounded-lg p-6">
                            <SectionHeader icon={FiFileText} title="Business Documents" />

                            {vendor.media && vendor.media.length > 0 ? (
                                <div className="space-y-4">
                                    {vendor.media.map((document) => (
                                        <DocumentCard
                                            key={document.id}
                                            document={document}
                                            onView={handleViewDocument}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-gray-800 rounded-lg p-6 text-center">
                                    <p className="text-gray-400">No documents available for this vendor</p>
                                </div>
                            )}
                        </div>

                        <div className="bg-gray-700 rounded-lg p-6">
                            <SectionHeader icon={FiCalendar} title="Timestamps" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Created At</p>
                                    <p className="text-white">
                                        {formatDate(vendor.media?.[0]?.createdAt) || 'N/A'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Last Updated</p>
                                    <p className="text-white">
                                        {formatDate(vendor.media?.[0]?.updatedAt) || 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmAction}
                action={action}
            />
        </div>
    );
};

export default VendorDetails;

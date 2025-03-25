import axiosInstance from "@/utils/axiosInstance";
import {AxiosResponse} from "axios";
import {retrieveFromStorage} from "@/utils/storageservice";
import {AUTHENTICATION_RESPONSE_DATA, AuthenticationResponse} from "@/authentication/authenticationService";
import {AppPageResponse, Vendor} from "@/utils/apputils";

export interface Category {
    id: number;
    name: string;
    description: string;
}

export interface CategoryProductCount {
    category: Category;
    productCount: number;
}

export interface AdminDashboardResponse {
    totalOrders: number;
    totalCustomers: number;
    totalProducts: number;
    totalTransporters: number;
    totalVendors: number;
    categoryProductCount: CategoryProductCount[];
}

export const retrieveAdminDashboard = async (): Promise<AdminDashboardResponse | null> => {
    try {
        const response: AxiosResponse<AdminDashboardResponse> = await axiosInstance.get('/admin/dashboard', {
            headers: {
                'Authorization': `Bearer ${retrieveFromStorage(AUTHENTICATION_RESPONSE_DATA).accessToken}`
            }
        });
        console.log("Found admin: ", response.data);
        if (response.status === 200 && response.data) {
            return response.data;
        } else if (response.status === 401) {
            return null;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error retrieving admin dashboard:', error);
        return null;
    }
};

export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const retrieveVendors = async (): Promise<AppPageResponse<Vendor> | null> => {
    try {
        const response: AxiosResponse<AppPageResponse<Vendor>> = await axiosInstance.get('/vendors', {
            headers: {
                'Authorization': `Bearer ${retrieveFromStorage(AUTHENTICATION_RESPONSE_DATA).accessToken}`
            }
        });
        console.log("Found vendors: ", response.data);
        if (response.status === 200 && response.data) {
            return response.data;
        } else if (response.status === 401) {
            return null;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error retrieving admin dashboard:', error);
        return null;
    }
};


export const processVendorCommand = async (action: string, vendorId: number): Promise<Vendor | null> => {
    try {
        const authenticationResponse: AuthenticationResponse = retrieveFromStorage(AUTHENTICATION_RESPONSE_DATA);
        console.log("Authentication response: ", authenticationResponse);
        const formData = new FormData();
        formData.append('command', action);
        const response: AxiosResponse<AppPageResponse<Vendor>> = await axiosInstance.post(`/vendors/${vendorId}`, formData, {
            headers: {
                'Authorization': `Bearer ${authenticationResponse.accessToken}`
            }
        });
        console.log("Found vendors: ", response.data);
        if (response.status === 200 && response.data) {
            return response.data;
        } else if (response.status === 401) {
            return null;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error retrieving admin dashboard:', error);
        return null;
    }
};

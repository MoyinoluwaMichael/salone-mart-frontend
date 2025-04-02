import {mapRoleToEndpoint} from "@/userprofile/customer/customerProfileService";
import {User} from "@/authentication/authenticationService";
import {AxiosResponse} from "axios";
import axiosInstance from "@/utils/axiosInstance";
import {Product} from "@/product/productService";
import {AppPageResponse} from "@/utils/apputils";

export const retrieveVendorProducts = async (vendorId: number, accessToken: string, roles: string[]): Promise<AppPageResponse<Product> | null> => {
    try {
        let role = roles[0];
        let url: string = `${mapRoleToEndpoint(role)}/${vendorId}/products`;
        const response: AxiosResponse<AppPageResponse<Product> | null> = await axiosInstance.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.status === 200 && response.data) {
            console.log('response.data', response.data);
            return response.data;
        }

        return null;
    } catch (error: any) {
        console.error('Error finding user by ID:', error);

        if (error.response) {
            console.error('Response error:', error.response.data);
            console.error('Status:', error.response.status);

            if (error.response.status === 413) {
                throw new Error('Request entity too large. Please try again with a smaller request.');
            } else if (error.response.status === 415) {
                throw new Error('Unsupported media type. Please use a supported file format.');
            } else if (error.response.status === 401) {
                throw new Error('Unauthorized access. Please log in again.');
            } else if (error.response.data && error.response.data.message) {
                throw new Error(error.response.data.message);
            }
        } else if (error.request) {
            console.error('Request error:', error.request);
            throw new Error('Network error. Please check your connection and try again.');
        }

        throw error;
    }
};

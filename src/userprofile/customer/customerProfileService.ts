import axiosInstance from "@/utils/axiosInstance";
import {
    AuthenticationResponse,
    BioData,
    AUTHENTICATION_RESPONSE_DATA,
    getProfilePicture, retrieveAuthenticationResponse,
    User
} from "@/authentication/authenticationService";
import {AxiosResponse} from "axios";
import {saveToStorage} from "@/utils/storageservice";

const SUPER_ADMIN = "SUPER_ADMIN";
const ORDINARY_ADMIN = "ORDINARY_ADMIN";
const CUSTOMER = "CUSTOMER";
const VENDOR = "VENDOR";

export function mapRoleToEndpoint(role: string | undefined) {
    if (!role) {
        return '/customers';
    }
    switch (role) {
        case SUPER_ADMIN:
            return '/admin';
        case ORDINARY_ADMIN:
            return '/admin';
        case CUSTOMER:
            return '/customers';
        case VENDOR:
            return '/vendors';
        default:
            return '/customers';
    }
}

export interface FileMetaData {
    id: string;
    documentTypeId: number;
    mediaCategory: string;
}

export const uploadMedia = async (files: File[], fileMetaData: FileMetaData[], productId: number | null, userData: AuthenticationResponse): Promise<BioData | null> => {
    try {
        let url: string = 'media/upload';
        let token = userData.accessToken;
        let userId = userData.user.bioData.id;
        const formData = new FormData();
        files.forEach(file => formData.append('file', file));
        formData.append('fileMetaData', JSON.stringify(fileMetaData));
        formData.append('userId', userId.toString());
        if (productId) formData.append('productId', productId.toString());

        const response: AxiosResponse<BioData> = await axiosInstance.post(url, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 200 && response.data) {
            response.data.profilePicture = getProfilePicture(response.data);
            userData.user.bioData = response.data;
            saveToStorage(AUTHENTICATION_RESPONSE_DATA, userData);
            return response.data;
        }

        return null;
    } catch (error: any) {
        console.error('Error uploading media:', error);

        if (error.response) {
            console.error('Response error:', error.response.data);
            console.error('Status:', error.response.status);

            if (error.response.status === 413) {
                throw new Error('File is too large. Please upload a smaller image.');
            } else if (error.response.status === 415) {
                throw new Error('Unsupported file type. Please use JPEG, PNG, or GIF images.');
            } else if (error.response.status === 401) {
                throw new Error('Unauthorized. Please log in again.');
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

export const findUserById = async (userId: number, userData: AuthenticationResponse, role: string): Promise<AuthenticationResponse | null> => {
    try {
        let url: string = `${mapRoleToEndpoint(role)}/${userId}`;
        let token = userData.accessToken;

        const response: AxiosResponse<User> = await axiosInstance.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200 && response.data) {

            return retrieveAuthenticationResponse(response.data, token);
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

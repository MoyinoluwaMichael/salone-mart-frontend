import axiosInstance from '../utils/axiosInstance';
import {AxiosResponse} from "axios";

export const registerACustomer = async (customerData: {
    password: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}) => {
    try {
        const response = await axiosInstance.post('/customers', customerData);
        console.log("Registered customer: ", response.data);
        if (response.status === 200 && response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Error registering customer:', error);
        throw error;
    }
};

export const saveToStorage = (key: string, data: object): void => {
    sessionStorage.setItem(key, JSON.stringify(data));
};

export const retrieveFromStorage = (key: string): object | null => {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

export const removeFromStorage = (key: string): void => {
    sessionStorage.removeItem(key);
};

export const CUSTOMER_DATA = 'customerData';


export interface DocumentType {
    id: number;
    name: string;
    description: string;

}
export interface Media {
    id: number;
    type: string;
    documentType: DocumentType;
    publicId: string;
    secureUrl: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    createdAt: string;
    updatedAt: string;
    product: any;
}

export interface BioData {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    profilePicture: string | undefined;
    media: Media[];
    roles: string[];
    isEnabled: boolean;
}

export interface User {
    id: number;
    bioData: BioData;
}

export interface AuthenticationResponse {
    accessToken: string;
    user: User;
}

export const getProfilePicture = (bioData: BioData): string | undefined => {
    const profileMedia = bioData.media.find((media: Media) => media.type === 'USER' && media.documentType.name === 'DISPLAY_PICTURE');
    return profileMedia ? profileMedia.secureUrl : undefined;
};


export function retrieveAuthenticationResponse(data: User, token: string) {
    const user = data;
    const bioData = user?.bioData;
    const authResponse: AuthenticationResponse = {
        accessToken: token,
        user: {
            id: user?.id,
            bioData: {
                id: bioData?.id,
                firstName: bioData?.firstName,
                lastName: bioData?.lastName,
                phoneNumber: bioData?.phoneNumber,
                emailAddress: bioData?.emailAddress,
                profilePicture: getProfilePicture(bioData) || '',
                media: bioData.media,
                roles: bioData?.roles,
                isEnabled: bioData?.isEnabled
            }
        }
    };
    saveToStorage(CUSTOMER_DATA, authResponse);
    return authResponse;
}

export const login = async (customerData: {
    password: string;
    email: string;
}): Promise<AuthenticationResponse | null> => {
    try {
        const response: AxiosResponse<AuthenticationResponse> = await axiosInstance.post('/login', customerData);
        console.log("Logged in customer: ", response.data);
        if (response.status === 200 && response.data) {
            const data = response?.data;

            return retrieveAuthenticationResponse(data.user, data?.accessToken);
        }
    } catch (error) {
        console.error('Error logging in customer:', error);
        throw error;
    }
    return null;
};


import axiosInstance from '../utils/axiosInstance';

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


export interface BioData {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailAddress: string;
    profilePicture: string;
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

export const login = async (customerData: {
    password: string;
    email: string;
}): Promise<AuthenticationResponse | null> => {
    try {
        const response = await axiosInstance.post('/login', customerData);
        console.log("Logged in customer: ", response.data);
        if (response.status === 200 && response.data) {
            const data = response?.data;
            const user = data?.user;
            const bioData = user?.bioData;
            const authResponse: AuthenticationResponse = {
                accessToken: data?.accessToken,
                user: {
                    id: user?.id,
                    bioData: {
                        id: bioData?.id,
                        firstName: bioData?.firstName,
                        lastName: bioData?.lastName,
                        phoneNumber: bioData?.phoneNumber,
                        emailAddress: bioData?.emailAddress,
                        profilePicture: bioData?.profilePicture,
                        roles: bioData?.roles,
                        isEnabled: bioData?.isEnabled
                    }
                }
            };
            saveToStorage(CUSTOMER_DATA, authResponse);
            return authResponse;
        }
    } catch (error) {
        console.error('Error logging in customer:', error);
        throw error;
    }
    return null;
};


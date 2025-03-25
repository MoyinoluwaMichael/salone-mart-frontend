import React from "react";
import {FileMetaData, mapRoleToEndpoint, uploadMedia} from "@/userprofile/customer/customerProfileService";
import {AuthenticationResponse, retrieveAuthenticationResponse, User} from "@/authentication/authenticationService";
import {AxiosResponse} from "axios";
import axiosInstance from "@/utils/axiosInstance";

interface BioData {
    profilePicture?: string;
    // Add other properties of BioData if needed
}

export const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fileInputRef: React.RefObject<HTMLInputElement>,
    setAlert: (alert: { type: string; message: string } | null) => void,
    setIsUploading: (isUploading: boolean) => void,
    setBioData: (bioData: BioData | null) => void,
    userData: any,
    navigate: (path: string) => void
) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validFileTypes.includes(file.type)) {
        setAlert({
            type: 'error',
            message: 'Please upload a valid image file (JPEG, PNG, GIF, WEBP)'
        });
        return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
        setAlert({
            type: 'error',
            message: 'File size exceeds 5MB. Please upload a smaller image.'
        });
        return;
    }

    try {
        setIsUploading(true);
        setAlert(null);

        const files: File[] = [file];
        let metaData: FileMetaData = {
            id: file.name,
            documentTypeId: 1,
            mediaCategory: 'USER'
        };
        const fileMetaData: FileMetaData[] = [metaData];
        const response = await uploadMedia(files, fileMetaData, null, userData);

        if (response && response.profilePicture) {
            setBioData((prev: BioData | null) => {
                if (!prev) return null;
                return { ...prev, profilePicture: response.profilePicture };
            });

            setAlert({
                type: 'success',
                message: 'Profile picture updated successfully!'
            });
        }
    } catch (error: any) {
        console.error('Error uploading profile picture:', error);
        setAlert({
            type: 'error',
            message: 'Failed to upload profile picture. Please try again.'
        });
        if (error.response.status === 401 || error.response.status === 403) {
            navigate('/auth');
        }
    } finally {
        setIsUploading(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }
};

export const updateUserData = async (userId: number, bioData: BioData, accessToken: string, roles: string[]): Promise<AuthenticationResponse | null> => {
    try {
        let role = roles[0];
        let url: string = `${mapRoleToEndpoint(role)}/${userId}`;
        let token = accessToken;

        const response: AxiosResponse<User> = await axiosInstance.patch(url, bioData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200 && response.data) {
            console.log('response.data', response.data);
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

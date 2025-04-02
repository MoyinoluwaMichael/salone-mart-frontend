import {BioData} from "@/authentication/authenticationService";
import {ProductCategory} from "@/product/productService";

export interface AppPageResponse<T> {
    pageNumber: number;
    pageSize: number;
    totalFilteredItems: number;
    rowSize: number;
    data: T[];
}


export interface DocumentType {
    version: number;
    createdAt: string;
    lastModifiedAt: string;
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
}

export interface Vendor {
    id: number;
    bioData: BioData;
    businessName: string;
    status: string;
    category: ProductCategory
    media: Media[];
    createdAt: string;
}

export const sierraLeoneColors = {
    green: '#1EB53A',
    white: '#FFFFFF',
    blue: '#0072C6',
    darkBlue: '#005294',
    lightGreen: '#4ADE80',
    midGreen: '#16A34A'
};

import axiosInstance from '../utils/axiosInstance';
import images from "../constant/images.ts";

export interface ProductCategory {
    id: number;
    name: string;
    description: string;
    icon: string;
}

export const CATEGORIES_DATA_TYPE = {
    FASHION: "FASHION",
    ELECTRONICS: "ELECTRONICS",
    HOME_AND_OFFICE: "HOME_AND_OFFICE",
    PHONES_AND_TABLETS: "PHONES_AND_TABLETS",
    COMPUTING: "COMPUTING",
    SUPERMARKET: "SUPERMARKET"
}

export const fetchProductCategories = async () => {
    try {
        const response = await axiosInstance.get('/products/categories');
        console.log("Product categories: ",response.data);
        if (response.status === 200 && response.data) {
            response.data.productCategories.forEach((category: ProductCategory) => {
                category.icon = images.getIconByCategoryName(category.name);
            });
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

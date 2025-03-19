import axios from 'axios';

export interface Category {
    id: number;
    name: string;
    description: string;
    icon: string;
}

export const fetchProductCategories = async () => {
    try {
        const response = await axios.get('/api/product-categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

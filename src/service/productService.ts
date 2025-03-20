import axiosInstance from '../utils/axiosInstance';
import images from '../constant/images';

export interface ProductCategory {
    id: number;
    name: string;
    description: string;
    icon: string;
}

export enum CATEGORIES_DATA_TYPE {
    FASHION = "FASHION",
    ELECTRONICS = "ELECTRONICS",
    HOME_AND_OFFICE = "HOME_AND_OFFICE",
    PHONES_AND_TABLETS = "PHONES_AND_TABLETS",
    COMPUTING = "COMPUTING",
    SUPERMARKET = "SUPERMARKET"
}

export const CATEGORY_DETAILS = {
    [CATEGORIES_DATA_TYPE.FASHION]: {
        id : 1,
        name: CATEGORIES_DATA_TYPE.FASHION,
        description: "Fashion",
        icon: images.getIconByCategoryName(CATEGORIES_DATA_TYPE.FASHION)
    },
    [CATEGORIES_DATA_TYPE.ELECTRONICS]: {
        id : 2,
        name: CATEGORIES_DATA_TYPE.ELECTRONICS,
        description: "Electronics",
        icon: images.getIconByCategoryName(CATEGORIES_DATA_TYPE.ELECTRONICS)
    },
    [CATEGORIES_DATA_TYPE.HOME_AND_OFFICE]: {
        id : 3,
        name: CATEGORIES_DATA_TYPE.HOME_AND_OFFICE,
        description: "Home & Office",
        icon: images.getIconByCategoryName(CATEGORIES_DATA_TYPE.HOME_AND_OFFICE)
    },
    [CATEGORIES_DATA_TYPE.PHONES_AND_TABLETS]: {
        id : 4,
        name: CATEGORIES_DATA_TYPE.PHONES_AND_TABLETS,
        description: "Phones & Tablets",
        icon: images.getIconByCategoryName(CATEGORIES_DATA_TYPE.PHONES_AND_TABLETS)
    },
    [CATEGORIES_DATA_TYPE.COMPUTING]: {
        id : 5,
        name: CATEGORIES_DATA_TYPE.COMPUTING,
        description: "Computing",
        icon: images.getIconByCategoryName(CATEGORIES_DATA_TYPE.COMPUTING)
    },
    [CATEGORIES_DATA_TYPE.SUPERMARKET]: {
        id : 6,
        name: CATEGORIES_DATA_TYPE.SUPERMARKET,
        description: "Supermarket",
        icon: images.getIconByCategoryName(CATEGORIES_DATA_TYPE.SUPERMARKET)
    }
};

export const fetchCategoryDetails = (categoryName: string): ProductCategory => {
    return CATEGORY_DETAILS[categoryName as keyof typeof CATEGORY_DETAILS];
};

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

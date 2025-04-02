import axiosInstance from '../utils/axiosInstance';
import images from "../constant/images";
import {AppPageResponse} from "@/utils/apputils";

export const PRODUCT_LIST = 'PRODUCT_LIST';
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

export const CATEGORY_DETAILS: Record<CATEGORIES_DATA_TYPE, ProductCategory> = {
    [CATEGORIES_DATA_TYPE.FASHION]: {
        id: 1,
        name: CATEGORIES_DATA_TYPE.FASHION,
        description: "Fashion",
        icon: images.getIconByCategoryName(CATEGORIES_DATA_TYPE.FASHION)
    },
    [CATEGORIES_DATA_TYPE.ELECTRONICS]: {
        id: 2,
        name: CATEGORIES_DATA_TYPE.ELECTRONICS,
        description: "Electronics",
        icon: images.getIconByCategoryName(CATEGORIES_DATA_TYPE.ELECTRONICS)
    },
    [CATEGORIES_DATA_TYPE.HOME_AND_OFFICE]: {
        id: 3,
        name: CATEGORIES_DATA_TYPE.HOME_AND_OFFICE,
        description: "Home & Office",
        icon: images.getIconByCategoryName(CATEGORIES_DATA_TYPE.HOME_AND_OFFICE)
    },
    [CATEGORIES_DATA_TYPE.PHONES_AND_TABLETS]: {
        id: 4,
        name: CATEGORIES_DATA_TYPE.PHONES_AND_TABLETS,
        description: "Phones & Tablets",
        icon: images.getIconByCategoryName(CATEGORIES_DATA_TYPE.PHONES_AND_TABLETS)
    },
    [CATEGORIES_DATA_TYPE.COMPUTING]: {
        id: 5,
        name: CATEGORIES_DATA_TYPE.COMPUTING,
        description: "Computing",
        icon: images.getIconByCategoryName(CATEGORIES_DATA_TYPE.COMPUTING)
    },
    [CATEGORIES_DATA_TYPE.SUPERMARKET]: {
        id: 6,
        name: CATEGORIES_DATA_TYPE.SUPERMARKET,
        description: "Supermarket",
        icon: images.getIconByCategoryName(CATEGORIES_DATA_TYPE.SUPERMARKET)
    }
};

export const fetchCategoryDetails = (categoryName: CATEGORIES_DATA_TYPE): ProductCategory => {
    return CATEGORY_DETAILS[categoryName];
};

export const fetchProductCategories = async (): Promise<{ productCategories: ProductCategory[] }> => {
    try {
        const response = await axiosInstance.get('/products/categories');
        if (response.status === 200 && response.data) {
            response.data.productCategories.forEach((category: ProductCategory) => {
                category.icon = images.getIconByCategoryName(category.name);
            });
            return response.data;
        }
        throw new Error('Failed to fetch categories');
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export interface ProductMedia {
    id: number;
    secureUrl: string;
    fileName: string;
}

export interface ProductBrand {
    id: number;
    name: string;
    description: string;
}

export interface ProductInterest {
    id: number;
    active: boolean;
    priceInterest: number;
}

export interface SellerInfo {
    name: string;
    rating: number;
    responseRate: string;
    shipOnTime: string;
    memberSince: string;
}

export interface Review {
    id: number;
    comment: string;
    rating: number;
    customerName: string;
    createdAt: string;
}

export interface Specification {
    name: string;
    value: string;
}

export interface Product {
    sellerInfo: SellerInfo;
    deliveryTime: string;
    rating: number;
    reviews: Review[];
    sizes: string[];
    colors: string[];
    specifications: Specification[];
    features: string[];
    id: number;
    name: string;
    description: string;
    media: ProductMedia[];
    category: ProductCategory;
    brand: ProductBrand;
    price: number;
    originalPrice: number;
    discountedPrice?: number;
    discount?: number;
    quantity: number;
    image: string;
    interest: ProductInterest;
    isNew: boolean;
    createdAt: string;
}

export const searchProducts = async (size: number): Promise<AppPageResponse<Product>> => {
    try {
        const response = await axiosInstance.get('/products', {
            params: { size }
        });
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error('Failed to fetch products');
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductDetails = async (productId: number): Promise<Product> => {
    try {
        const response = await axiosInstance.get(`/products/${productId}`);
        if (response.status === 200 && response.data) {
            return response.data;
        }
        throw new Error(`Error fetching product with ID ${productId}`);
    } catch (error) {
        console.error(`Error fetching product ${productId}:`, error);
        throw error;
    }
};

export const calculateDiscount = (original: number, discounted: number): number => {
    if (original <= 0 || discounted >= original) {
        return 0;
    }
    return Math.round(((original - discounted) / original) * 100);
};

export const hasDiscount = (product: Product): boolean => {
    console.log("product.discountedPrice = ", product)
    return product.discountedPrice !== undefined && product.discountedPrice < product.price;
};

export const mapProductToCardProps = (product: Product): Product => {
    const image = product.media && product.media.length > 0 ? product.media[0].secureUrl : "";
    return {
        ...product,
        image: image,
        originalPrice: product.price,
        price: hasDiscount(product) && product.discountedPrice !== undefined ? product.discountedPrice : product.price,
        discount: hasDiscount(product) && product.discountedPrice !== undefined ?
            calculateDiscount(product.price, product.discountedPrice) : 0,
        isNew: product.isNew || false,
        sellerInfo: product.sellerInfo || {
            name: "",
            rating: 0,
            responseRate: "",
            shipOnTime: "",
            memberSince: ""
        }
    };
};


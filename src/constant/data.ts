import images from "./images";



interface ApplicationConstants {
    name: string;
    email: string;
    phone: string;
}

export
interface productDataType {
    id: number;
    name: string;
    price: number;
    description: string;
    rating: number;
    image: string;
    category: string;
}

export const applicationConstants: ApplicationConstants = {
    name: "Salone Mart",
    email: "info@salonemart.com",
    phone: "+232 76 123 456wdedefe"
};



export const products:productDataType[] = [
    {
      id: 1,
      name: 'Classic White T-Shirt',
      price: 29.99,
      description: 'Premium cotton t-shirt with a comfortable fit',
      rating: 4.5,
      image: images.productListing.whiteT_shirt,
      category: 'clothing'
    },
    {
      id: 2,
      name: 'Blue Denim Jeans',
      price: 59.99,
      description: 'Stylish slim-fit jeans for everyday wear',
      rating: 4.2,
      image: images.productListing.BlueDenimJeans,
      category: 'clothing'
    },
    {
      id: 3,
      name: 'Summer Floral Dress',
      price: 45.99,
      description: 'Light and airy dress perfect for summer days',
      rating: 4.8,
      image: images.productListing.SummerFloralDress,
      category: 'clothing'
    },
    {
      id: 4,
      name: 'Black Leather Jacket',
      price: 129.99,
      description: 'Classic leather jacket with modern details',
      rating: 4.7,
      image: images.productListing.BlackLeatherJacket,
      category: 'clothing'
    },
    {
      id: 5,
      name: 'Athletic Performance Hoodie',
      price: 49.99,
      description: 'Moisture-wicking hoodie for workouts and casual wear',
      rating: 4.3,
      image: images.productListing.AthleticPerformancHoodie,
      category: 'clothing'
    },
    {
      id: 6,
      name: 'Casual Plaid Shirt',
      price: 39.99,
      description: 'Soft cotton plaid shirt for a relaxed look',
      rating: 4.1,
      image: images.productListing.CasualPlaidShirt,
      category: 'clothing'
    }
  ];
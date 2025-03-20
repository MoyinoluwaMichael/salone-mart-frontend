import clothingcategory from "../assets/landinpage/clothingcategory.png";
import electroniccategory from "../assets/landinpage/electroniccategory.png";
import homeandofficecategory from "../assets/landinpage/homeandofficecategory.png";
import computingcategory from "../assets/landinpage/homeandofficecategory.png";
import supermarketcategory from "../assets/landinpage/supermarketcategory.png";
import phoneandtabletcategory from "../assets/landinpage/phoneandtabletcategory.png";
import whiteT_shirt from "../assets/productlisting/whiteT_shirt.jpeg";
import BlueDenimJeans from "../assets/productlisting/BlueDenimJeans.jpeg";
import SummerFloralDress from "../assets/productlisting/SummerFloralDress.png";
import BlackLeatherJacket from "../assets/productlisting/BlackLeatherJacket.jpeg";
import AthleticPerformancHoodie from "../assets/productlisting/AthleticPerformancHoodie.jpeg";
import CasualPlaidShirt from "../assets/productlisting/CasualPlaidShirt.jpeg";
import {CATEGORIES_DATA_TYPE} from "../service/productService";


const images = {
    landingPage: {
        clothingcategory,
        electroniccategory,
        homeandofficecategory,
        computingcategory,
        supermarketcategory,
        phoneandtabletcategory,
    },
    productListing: {
        whiteT_shirt,
        BlueDenimJeans,
        SummerFloralDress,
        BlackLeatherJacket,
        AthleticPerformancHoodie,
        CasualPlaidShirt
    },

    getIconByCategoryName: (categoryName: string) => {
        switch (categoryName) {
            case CATEGORIES_DATA_TYPE.FASHION:
                return clothingcategory;
            case CATEGORIES_DATA_TYPE.ELECTRONICS:
                return electroniccategory;
            case CATEGORIES_DATA_TYPE.HOME_AND_OFFICE:
                return homeandofficecategory;
            case CATEGORIES_DATA_TYPE.COMPUTING:
                return computingcategory;
            case CATEGORIES_DATA_TYPE.SUPERMARKET:
                return supermarketcategory;
            case CATEGORIES_DATA_TYPE.PHONES_AND_TABLETS:
                return phoneandtabletcategory;
            default:
                return '';
        }
    },
  
};

export default images;

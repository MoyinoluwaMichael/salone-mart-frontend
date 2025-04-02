import clothingcategory from "../assets/landinpage/clothingcategory.png";
import sale from "../assets/landinpage/sale.png";
import openshop from "../assets/landinpage/openshop.png";
import clothingShop from "../assets/landinpage/clothingShop.png";
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


const images = {
    landingPage: {
        clothingcategory,
        electroniccategory,
        homeandofficecategory,
        computingcategory,
        supermarketcategory,
        phoneandtabletcategory,
        sale,
        openshop,
        clothingShop,
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
            case "FASHION":
                return clothingcategory;
            case "ELECTRONICS":
                return electroniccategory;
            case "HOME_AND_OFFICE":
                return homeandofficecategory;
            case "COMPUTING":
                return computingcategory;
            case "SUPERMARKET":
                return supermarketcategory;
            case "PHONES_AND_TABLETS":
                return phoneandtabletcategory;
            default:
                return '';
        }
    },
  
};

export default images;

import clothingcategory from "../assets/landinpage/clothingcategory.png";
import electroniccategory from "../assets/landinpage/electroniccategory.png";
import homeandofficecategory from "../assets/landinpage/homeandofficecategory.png";
import computingcategory from "../assets/landinpage/homeandofficecategory.png";
import supermarketcategory from "../assets/landinpage/supermarketcategory.png";
import phoneandtabletcategory from "../assets/landinpage/phoneandtabletcategory.png";


const images = {
    landingPage: {
        clothingcategory,
        electroniccategory,
        homeandofficecategory,
        computingcategory,
        supermarketcategory,
        phoneandtabletcategory,
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
    }
};

export default images;

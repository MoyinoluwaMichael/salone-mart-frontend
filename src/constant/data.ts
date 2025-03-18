import images from "./images";

export 
interface categorySectionDataType { 
    name: string;
    icon: string;
}

export const categories: categorySectionDataType[] = [
    {
      name: 'Fashion',
      icon: images.landingPage.clothingcategory,
    },
    {
      name: 'Electronics',
      icon: images.landingPage.electroniccategory,
    },
    {
      name: 'Home & Office',
      icon: images.landingPage.homeandofficecategory,
    },
    {
      name: 'Phones & Tablets',
      icon: images.landingPage.computingcategory,
    },
    {
      name: 'Computing',
      icon: images.landingPage.supermarketcategory,
    },
    {
      name: 'Supermarket',
      icon: images.landingPage.phoneandtabletcategory,
    },
  ];

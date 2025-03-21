import ProductGrid from "@/product/productlist/component/ProductGrid";
import Footer from "@/common/Footer";
import Header from "@/home/component/Header";
// import HeroSection from "@/component/landinPage/HeroSection";

const ProductListing = () => {
  return (
    <>
      <Header />
      {/* <HeroSection /> */}
      <ProductGrid />
      <Footer />
    </>
  );
};

export default ProductListing;

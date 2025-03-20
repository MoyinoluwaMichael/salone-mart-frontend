import ProductGrid from "@/component/ProductListing/ProductGrid";
import Footer from "@/common/Footer";
import Header from "@/component/landinPage/Header";
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

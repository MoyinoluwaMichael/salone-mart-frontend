import Footer from "@/common/Footer";
import CategorySection from "@/component/landinPage/CategorySection";
import FeaturedProducts from "@/component/landinPage/FeaturedProduct";
import Features from "@/component/landinPage/Features";
import Header from "@/component/landinPage/Header";
import HeroSection from "@/component/landinPage/HeroSection";
import SpecialOffers from "@/component/landinPage/Specialoffer";



const LandingPage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <SpecialOffers />
      <Features />
      <Footer />
    </>
  );
};

export default LandingPage;

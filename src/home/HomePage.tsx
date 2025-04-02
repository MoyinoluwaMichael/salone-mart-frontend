import Footer from "@/common/Footer";
import CategorySection from "@/home/component/CategorySection";
import FeaturedProducts from "@/home/component/FeaturedProduct";
import Features from "@/home/component/Features";
import Header from "@/home/component/Header";
import HeroSection from "@/home/component/HeroSection";
import SpecialOffers from "@/home/component/Specialoffer";



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

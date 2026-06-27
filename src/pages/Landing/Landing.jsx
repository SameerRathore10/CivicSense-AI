import HowItWorksSection from "../../components/sections/HowItWorksSection";
import Navbar from "../../components/layout/Navbar";
import HeroSection from "../../components/sections/HeroSection";
import FeaturesSection from "../../components/sections/FeaturesSection";

const Landing = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
    </>
  );
};

export default Landing;

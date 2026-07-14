import BrandStory from "@/components/home/BrandStory";
import Experiences from "@/components/home/Experiences";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import Hero from "@/components/home/Hero";
import HospitalityConsulting from "@/components/home/HospitalityConsulting";
import MainCta from "@/components/home/MainCta";
import SpecialOffers from "@/components/home/SpecialOffers";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";


export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <BrandStory />
      <FeaturedProperties />
      <Experiences />
      <WhyChooseUs />
      <Testimonials />
      <SpecialOffers />
      <HospitalityConsulting />
      <MainCta />
    </main>
  );
}

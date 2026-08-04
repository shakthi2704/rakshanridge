import BrandStory from "@/components/home/BrandStory";
import Experiences from "@/components/home/Experiences";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import BrandFeatures from "@/components/home/BrandFeatures";
import Hero from "@/components/home/Hero";
import MarqueeStrip, { } from "@/components/home/MarqueeStrip";
import MeaningfulEncounters from "@/components/home/MeaningfulEncounters";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import SpecialOffers from "@/components/home/SpecialOffers";
import HospitalityConsulting from "@/components/home/HospitalityConsulting";
import MainCta from "@/components/ui/MainCta";


export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <MarqueeStrip />
      <BrandStory />
      <FeaturedProperties />
      <MeaningfulEncounters />
      <Experiences />
      <BrandFeatures />
      <WhyChooseUs />
      <Testimonials />
      <SpecialOffers />
      <HospitalityConsulting />
      <MainCta />
    </main>
  );
}

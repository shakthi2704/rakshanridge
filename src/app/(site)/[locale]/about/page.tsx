import AboutHero from "@/components/about/AboutHero";
import Milestones from "@/components/about/Milestones";
import OurStory from "@/components/about/OurStory";
import VisionMission from "@/components/about/VisionMission";
import Philosophy from "@/components/about/Philosophy";
import Team from "@/components/about/Team";
import MainCta from "@/components/ui/MainCta";

export default function About() {
    return (
        <main className="flex flex-1 flex-col">
            <AboutHero />
            <OurStory />
            <VisionMission />
            <Philosophy />
            <Team />
            <Milestones />
            <MainCta />
        </main>
    );
}
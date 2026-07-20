import AboutHero from "@/components/about/AboutHero";
import Milestones from "@/components/about/Milestones";
import OurStory from "@/components/about/OurStory";
import Philosophy from "@/components/about/Philosophy";
import Team from "@/components/about/Team";
import MainCta from "@/components/ui/MainCta";

export default function About() {
    return (
        <main className="flex flex-1 flex-col">
            <AboutHero />
            <OurStory />
            <Philosophy />
            <Team />
            <Milestones />
            <MainCta />
        </main>
    );
}
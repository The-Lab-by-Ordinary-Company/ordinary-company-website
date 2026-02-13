import { ThreeBackground } from "./components/ThreeBackground";
import { HeroSection } from "./components/HeroSection";
import { SideRailNav } from "./components/SideRailNav";
import { ProfileSection } from "./components/ProfileSection";
import { WorkSection } from "./components/WorkSection";
import { FooterSection } from "./components/FooterSection";
import { LogoLoader } from "./components/LogoLoader";

export default function LabPage() {
  return (
    <>
      <LogoLoader duration={3000} />
      <ThreeBackground />
      <SideRailNav />
      <HeroSection />
      <main id="main-content" className="relative z-20 bg-white">
        <ProfileSection />
        <WorkSection />
        <FooterSection />
      </main>
    </>
  );
}

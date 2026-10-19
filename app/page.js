import Hero from "@/components/Hero";
import ImpactStrip from "@/components/ImpactStrip";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Certifications from "@/components/Certifications";
import Timeline from "@/components/Timeline";
import Leadership from "@/components/Leadership";
import ResumeSection from "@/components/ResumeSection";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <ImpactStrip />
      <About />
      <Projects />
      <Skills />
      <Achievements />
      <Certifications />
      <Timeline />
      <Leadership />
      <ResumeSection />
      <Contact />
    </>
  );
}

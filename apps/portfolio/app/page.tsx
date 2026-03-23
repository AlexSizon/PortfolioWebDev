import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DemoShowcase from "@/components/DemoShowcase";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <DemoShowcase />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

import { useState } from "react";
import { CustomCursor } from "./components/Hero/CustomCursor";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero/Hero";
import { Services } from "./components/Services";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ContactModal } from "./components/ContactModal";
import { SocialDock } from "./components/SocialDock";

export default function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070708] text-[#f4f4f5] selection:bg-white selection:text-black">
      {/* Desktop-only inertial Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar onContactClick={() => setIsContactModalOpen(true)} />

      {/* Main Sections */}
      <main>
        {/* Editorial Interactive Hero Section */}
        <Hero onContactClick={() => setIsContactModalOpen(true)} />

        <About />

        {/* Scroll-Driven Sticky Services Section */}
        <Services onContactClick={() => setIsContactModalOpen(true)} />

        {/* Supporting Portfolio Sections */}

        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      {/* Floating social dock, bottom-right */}
      <SocialDock />

      {/* Minimal Footer */}
      <Footer />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}

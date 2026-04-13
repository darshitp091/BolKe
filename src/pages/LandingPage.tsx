import React from 'react';
import AnnouncementBar from '../components/AnnouncementBar';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import FeaturesSection from '../components/FeaturesSection';
import SetupShowcase from '../components/SetupShowcase';
import NicheGallery from '../components/NicheGallery';
import ProsConsSection from '../components/ProsConsSection';
import PricingSection from '../components/PricingSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-bg-base selection:bg-accent-saffron selection:text-white">
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <ProblemSection />
        <SolutionSection />
        <SetupShowcase />
        <NicheGallery />
        <FeaturesSection />
        <ProsConsSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default LandingPage;

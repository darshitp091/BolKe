import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Shield, FileText, Lock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LegalPage = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const content = {
    '/privacy': {
      title: 'Privacy Policy',
      icon: Lock,
      text: 'Hum aapka data bechte nahi hain. Aapka voice input sirf website banane ke liye use hota hai.'
    },
    '/terms': {
      title: 'Terms of Service',
      icon: FileText,
      text: 'BolKe use karne ke liye aapko hamari shartein manni padengi. Hum sirf ek zariya hain.'
    },
    '/security': {
      title: 'Security',
      icon: Shield,
      text: 'Aapki website SSL secure hai. Hum DPDP compliant hain.'
    }
  }[path] || { title: 'Legal', icon: FileText, text: 'Legal information for BolKe.' };

  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar />
      <div className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-accent-saffron hover:underline mb-12 font-bold">
          <ArrowLeft size={20} />
          Back to Home
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-bg-surface p-12 rounded-[3rem] border border-border-dark"
        >
          <div className="w-16 h-16 bg-accent-saffron/10 rounded-2xl flex items-center justify-center text-accent-saffron mb-8">
            <content.icon size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-8">{content.title}</h1>
          <div className="prose prose-invert max-w-none text-text-light/70 leading-relaxed text-lg">
            <p>{content.text}</p>
            <p className="mt-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h2 className="text-white mt-12 mb-4 font-display font-bold text-2xl">1. Aapka Data</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default LegalPage;

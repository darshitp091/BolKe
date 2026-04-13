import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { motion } from 'motion/react';
import { ChevronDown, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        'Aapki Dukan...',
        '...Sirf Bolne Se Online Ho Jaayegi.'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      backDelay: 2000,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  const languages = [
    'हिंदी', 'मराठी', 'தமிழ்', 'ગુજરાતી', 'বাংলা', 'ਪੰਜਾਬੀ', 'తెలుగు', 'English'
  ];

  return (
    <section 
      className="relative min-h-[95vh] pt-40 pb-24 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 dot-grid overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-saffron/5 blur-[160px] rounded-full pointer-events-none"></div>

      {/* Announcement Badge */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-10 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-border-warm bg-accent-saffron/5 text-accent-saffron text-xs font-bold uppercase tracking-widest"
      >
        <span className="flex h-2 w-2 rounded-full bg-accent-saffron animate-pulse"></span>
        India ke 63 million chhote dukandar — abhi online nahi hain
      </motion.div>

      {/* Main Heading */}
      <motion.h1 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white mb-8 max-w-6xl leading-[1.05] relative z-10"
      >
        <span ref={el}></span>
        <div className="relative inline-block ml-4">
          <span className="hand-drawn-underline text-accent-saffron"></span>
        </div>
      </motion.h1>

      {/* Sub-heading */}
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-xl md:text-2xl text-text-light/70 max-w-3xl mb-12 leading-relaxed relative z-10"
      >
        Na coding chahiye. Na English. Na designer.<br />
        Bas apni boli mein bolo — <span className="text-accent-saffron font-bold">BolKe</span> baaki sab sambhal lega.
      </motion.p>

      {/* CTAs */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex flex-col sm:flex-row items-center gap-6 mb-12 relative z-10 w-full sm:w-auto"
      >
        <Link 
          to="/auth"
          className="w-full sm:w-auto bg-accent-saffron hover:bg-accent-gold text-bg-base px-10 py-5 rounded-2xl text-xl font-extrabold transition-all hover:scale-105 shadow-2xl shadow-accent-saffron/40 flex items-center justify-center gap-3 group"
        >
          <Mic size={24} className="group-hover:scale-110 transition-transform" />
          Abhi Bolo, Website Banao
        </Link>
        <a 
          href="#how-it-works"
          className="w-full sm:w-auto border-2 border-white/10 hover:border-white/20 hover:bg-white/5 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all text-center"
        >
          Kaise Kaam Karta Hai?
        </a>
      </motion.div>

      {/* Trust Line */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="text-sm text-text-light/60 font-medium flex flex-wrap justify-center items-center gap-6 mb-16 relative z-10"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
          <span>Bilkul Free</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-saffron"></span>
          <span>Koi Credit Card Nahi</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-haldi"></span>
          <span>3 Minute Mein Ready</span>
        </div>
      </motion.div>

      {/* Language Selector */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex flex-col items-center gap-6 relative z-10"
      >
        <span className="text-sm text-text-light/60 font-bold uppercase tracking-widest">Apni boli chuniye:</span>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl">
          {languages.map((lang) => (
            <button 
              key={lang}
              className="px-6 py-2 rounded-xl border border-white/10 hover:border-accent-saffron hover:text-accent-saffron transition-all text-sm font-bold bg-white/5 hover:bg-accent-saffron/5"
            >
              {lang}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="mt-16 text-accent-saffron opacity-50"
      >
        <ChevronDown size={40} />
      </motion.div>
    </section>
  );
};

export default Hero;


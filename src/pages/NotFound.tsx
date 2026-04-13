import React from 'react';
import { motion } from 'motion/react';
import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <div className="relative mb-8">
            <h1 className="text-[10rem] md:text-[15rem] font-display font-black text-white/5 leading-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl md:text-5xl font-display font-black text-white">Oops!</div>
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-display font-black text-accent-saffron mb-6">Ye Rasta Band Hai</h2>
          <p className="text-text-light/60 font-bold mb-12 text-lg">
            Shayad aap galat gali mein aa gaye hain. Chaliye wapas chalta hain.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/"
              className="bg-accent-saffron text-bg-base px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-accent-gold transition-all"
            >
              <Home size={20} />
              Home Par Jayein
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="bg-white/5 text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 border border-white/10 hover:bg-white/10 transition-all"
            >
              <ArrowLeft size={20} />
              Wapas Jayein
            </button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;

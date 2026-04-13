import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface NicheCardProps {
  title: string;
  image: string;
  niche: string;
  delay: number;
  key?: number | string;
}

const NicheCard = ({ title, image, niche, delay }: NicheCardProps) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="group relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-border-dark"
  >
    <img 
      src={image} 
      alt={title} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      referrerPolicy="no-referrer"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
    
    <div className="absolute bottom-0 left-0 w-full p-8">
      <span className="inline-block px-4 py-1.5 bg-accent-saffron text-bg-base text-[10px] font-black uppercase tracking-widest rounded-full mb-4 shadow-lg">
        {niche}
      </span>
      <h3 className="text-3xl font-display font-black text-white leading-tight">{title}</h3>
      
      <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
        <span className="text-white font-bold text-sm">Design Dekhein</span>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-bg-base">
          <ArrowRight size={20} />
        </div>
      </div>
    </div>
  </motion.div>
);

const NicheGallery = () => {
  const niches = [
    {
      title: "Ramesh Kirana Store",
      niche: "Grocery / Kirana",
      image: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Style Icon Salon",
      niche: "Salon & Beauty",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Bikaner Sweets",
      niche: "Halwai / Sweets",
      image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Fashion Hub",
      niche: "Clothing / Boutique",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    }
  ];

  return (
    <section id="designs" className="py-32 bg-bg-warm relative overflow-hidden ink-texture">
      {/* Diagonal Bottom Divider */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-bg-base transform skew-y-3 translate-y-16"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-12">
          <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-accent-saffron font-bold text-sm tracking-[0.4em] uppercase mb-6 block"
            >
              Niche Designs
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-8xl font-display font-black text-text-dark leading-[1.1]"
            >
              Aapki Niche, <br />
              <span className="hand-drawn-underline text-accent-saffron">Aapka Design.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl text-text-dark-muted max-w-sm leading-relaxed text-center lg:text-left mx-auto lg:mx-0"
          >
            Har business alag hota hai. Isliye BolKe har niche ke liye unique aur creative design generate karta hai jo customers ka trust jeete.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {niches.map((niche, i) => (
            <NicheCard key={i} {...niche} delay={i * 0.1} />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-24 text-center"
        >
          <button className="bg-text-dark text-white px-12 py-6 rounded-2xl font-black text-xl hover:bg-accent-saffron transition-all hover:scale-105 shadow-2xl">
            Saare Designs Dekhein →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default NicheGallery;

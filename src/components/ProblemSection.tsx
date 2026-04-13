import React from 'react';
import { motion } from 'motion/react';
import { Globe, Laptop, IndianRupee } from 'lucide-react';

const ProblemCard = ({ icon: Icon, title, desc, tag, delay = 0 }: { icon: any, title: string, desc: string, tag: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col gap-5 hover:shadow-2xl transition-all group"
  >
    <div className="w-14 h-14 bg-accent-saffron/10 rounded-2xl flex items-center justify-center text-accent-saffron group-hover:scale-110 transition-transform">
      <Icon size={32} />
    </div>
    <h3 className="text-2xl font-display font-bold text-text-dark">{title}</h3>
    <p className="text-text-dark-muted leading-relaxed text-sm md:text-base">{desc}</p>
    <div className="mt-auto pt-4">
      <span className="px-4 py-1.5 bg-danger/10 text-danger text-[10px] font-bold uppercase tracking-widest rounded-full border border-danger/20">
        {tag}
      </span>
    </div>
  </motion.div>
);

const ProblemSection = () => {
  return (
    <section className="bg-bg-warm py-32 relative overflow-hidden ink-texture">
      {/* Diagonal Top Divider */}
      <div className="absolute top-0 left-0 w-full h-32 bg-bg-base transform -skew-y-3 -translate-y-16"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 mb-24 items-center lg:items-end">
          <div className="flex-1 text-center lg:text-left">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-accent-saffron font-bold text-sm tracking-[0.3em] uppercase mb-6 block"
            >
              The Problem
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-display font-extrabold text-text-dark leading-[1.1]"
            >
              Ramesh Bhai ki <br />
              <span className="hand-drawn-underline">problem</span> — aur <br />
              lakho logon ki bhi.
            </motion.h2>
          </div>
          <div className="flex-1 text-center lg:text-left">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-text-dark-muted leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Ramesh Bhai 15 saalon se Jaipur mein kapde ki dukan chalaate hain. Unke paas ek Android phone hai. WhatsApp pe voice note bhej lete hain. Par jab bhi website banane ki sochi — kuch na kuch aad aa jaata hai.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <ProblemCard 
            icon={Globe}
            title="Sab Kuch English Mein"
            desc="Wix, Squarespace, WordPress — sab ka interface English mein. Ramesh Bhai ke liye yeh sab ek foreign language hai."
            tag="Bahut Common"
            delay={0.1}
          />
          <ProblemCard 
            icon={Laptop}
            title="Coding Chahiye — Jo Aati Nahi"
            desc="HTML, CSS, domain, hosting, SSL — yeh words sunke hi log dar jaate hain. 'Mujhse nahi hoga' — yahi sochte hain."
            tag="Sabse Badi Rukawat"
            delay={0.2}
          />
          <ProblemCard 
            icon={IndianRupee}
            title="Mehnga Hai, Dhoka Bhi"
            desc="Freelancer se banwaao — ₹8,000 minimum. Fir bhi 3 mahine wait. Update karwana ho? Fir paise. Fir wait."
            tag="Dil Pe Laga Hua"
            delay={0.3}
          />
        </div>

        {/* Pullquote */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-bg-base p-10 md:p-20 rounded-[3rem] relative overflow-hidden shadow-2xl bazaar-pattern"
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-accent-saffron"></div>
          <blockquote className="text-2xl md:text-5xl font-display font-medium text-white italic leading-tight mb-10">
            "Meri dukan mein roz 100 log aate hain. Online? Zero. Kyunki online hona mujhe koi sikhaaega nahi..."
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent-saffron/20 flex items-center justify-center text-accent-saffron font-bold">R</div>
            <cite className="text-text-muted not-italic font-bold text-xl">
              — Ramesh, Jaipur <span className="font-normal text-sm opacity-60 block md:inline md:ml-2">(Kapde Ki Dukan)</span>
            </cite>
          </div>
          
          <div className="mt-16 pt-10 border-t border-white/10 text-center">
            <p className="text-base text-text-muted">
              Ek survey mein <span className="text-white font-bold">78%</span> chhote dukaanon ke maalik ne kaha: <br />
              <span className="italic text-accent-haldi">"Hamne try kiya tha. Ek ghante baad chhor diya."</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;

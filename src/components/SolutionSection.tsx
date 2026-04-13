import React from 'react';
import { motion } from 'motion/react';
import { Mic, Brain, Globe, CheckCircle2 } from 'lucide-react';

const StepItem = ({ number, title, desc, icon: Icon, visual: Visual, delay = 0 }: { number: string, title: string, desc: string, icon: any, visual: React.ReactNode, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="flex flex-col gap-8 relative group p-8 rounded-[2.5rem] bg-bg-surface/30 border border-border-dark hover:border-accent-saffron/30 transition-all"
  >
    <div className="relative">
      <div className="w-20 h-20 bg-bg-surface rounded-3xl border border-border-dark flex items-center justify-center text-accent-saffron group-hover:scale-110 group-hover:bg-accent-saffron group-hover:text-bg-base transition-all duration-500">
        <Icon size={40} />
      </div>
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent-saffron rounded-full flex items-center justify-center text-bg-base font-display font-black text-xl border-4 border-bg-base shadow-lg">
        {number}
      </div>
    </div>
    <div>
      <h3 className="text-3xl font-display font-black text-white mb-4 leading-tight">{title}</h3>
      <p className="text-lg text-text-light/60 leading-relaxed mb-8">{desc}</p>
    </div>
    <div className="mt-auto p-8 bg-bg-base rounded-[2rem] border border-border-dark shadow-inner">
      {Visual}
    </div>
  </motion.div>
);

const SolutionSection = () => {
  return (
    <section id="how-it-works" className="bg-bg-base py-32 relative overflow-hidden bazaar-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent-saffron font-bold text-sm tracking-[0.4em] uppercase mb-6 block"
          >
            The Magic Process
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-display font-black text-white mb-8 leading-[1.1]"
          >
            Aap Bolo. <br />
            <span className="hand-drawn-underline text-accent-saffron">BolKe Karega.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-text-light/70 max-w-4xl mx-auto leading-relaxed"
          >
            Hum jaante hain aap designer nahi hain. Hum jaante hain aap coder nahi hain. Isliye BolKe ne ek aisa system banaya jisme aapko kuch jaanna hi nahi padta. Bas apni dukan ke baare mein apni zubaan mein baat karo.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[15%] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-accent-saffron/20 -z-10"></div>

          <StepItem 
            number="01"
            title="Boliye"
            desc="Apna phone uthaiye. Ek button dabaiye. Apni boli mein boliye: 'Mera naam Ram hai. Meri mithai ki dukan hai...' Bas itna kaafi hai."
            icon={Mic}
            delay={0.1}
            visual={
              <div className="flex items-center justify-center h-32">
                <div className="relative">
                  <div className="w-12 h-12 bg-accent-saffron rounded-full animate-ping absolute inset-0 opacity-40"></div>
                  <div className="w-12 h-12 bg-accent-saffron rounded-full flex items-center justify-center relative z-10 shadow-xl shadow-accent-saffron/40">
                    <Mic className="text-bg-base" size={24} />
                  </div>
                </div>
                <div className="ml-8 flex gap-2 items-center">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <motion.div 
                      key={i} 
                      animate={{ height: [12, 40, 12] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1.5 bg-accent-saffron rounded-full"
                    />
                  ))}
                </div>
              </div>
            }
          />

          <StepItem 
            number="02"
            title="AI Samjhega"
            desc="BolKe ka AI aapki baat sunega. Hindi, Marathi, Tamil — jo bhi aap bol rahe hain. Woh khud samjhega: naam, products, timing, location — kuch chhutha nahi."
            icon={Brain}
            delay={0.2}
            visual={
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3 text-xs font-mono text-accent-haldi font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-haldi animate-pulse"></span>
                  Processing Audio...
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-white/10 rounded-full w-full overflow-hidden">
                    <motion.div 
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="h-full bg-gradient-to-r from-transparent via-accent-saffron to-transparent w-[40%]"
                    />
                  </div>
                  <div className="h-2 bg-white/10 rounded-full w-[85%] overflow-hidden">
                    <motion.div 
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-transparent via-accent-saffron to-transparent w-[40%]"
                    />
                  </div>
                </div>
              </div>
            }
          />

          <StepItem 
            number="03"
            title="Website Ready"
            desc="3 minute mein aapki dukan ki website ban jaati hai. Mobile-friendly. Google pe dhundhne wali. WhatsApp link wali. Aap sirf 'Haan' boliye — website live ho jaayegi."
            icon={Globe}
            delay={0.3}
            visual={
              <div className="relative bg-white/5 rounded-2xl p-6 border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-danger/50"></div>
                    <div className="w-2 h-2 rounded-full bg-accent-gold/50"></div>
                    <div className="w-2 h-2 rounded-full bg-success/50"></div>
                  </div>
                  <div className="text-[10px] text-text-muted font-bold">ram-mithai.bolke.in</div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-white/10 rounded-lg w-3/4"></div>
                  <div className="h-2 bg-white/5 rounded-full w-full"></div>
                  <div className="h-2 bg-white/5 rounded-full w-[90%]"></div>
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="h-10 bg-accent-saffron/20 rounded-xl w-full flex items-center justify-center border border-accent-saffron/30"
                  >
                    <CheckCircle2 className="text-success" size={20} />
                  </motion.div>
                </div>
              </div>
            }
          />
        </div>

        {/* Demo CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center p-12 md:p-24 bg-bg-surface rounded-[4rem] border border-border-dark relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-accent-saffron/5 pointer-events-none"></div>
          <div className="relative z-10">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 bg-accent-saffron/20 rounded-full flex items-center justify-center mx-auto mb-10 border border-accent-saffron/30"
            >
              <Mic className="text-accent-saffron" size={48} />
            </motion.div>
            <h3 className="text-3xl md:text-5xl font-display font-black text-white mb-8">Dekhna chahte hain kaise kaam karta hai?</h3>
            <button className="bg-accent-saffron hover:bg-accent-gold text-bg-base px-12 py-6 rounded-2xl text-2xl font-black transition-all hover:scale-105 mb-8 shadow-2xl shadow-accent-saffron/40">
              Live Demo Try Karo →
            </button>
            <p className="text-sm text-text-light/60 font-bold uppercase tracking-widest opacity-80">
              Note: Demo mein aap Hindi mein bologe — AI real time mein website generate karega
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;

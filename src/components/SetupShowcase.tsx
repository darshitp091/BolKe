import React from 'react';
import { motion } from 'motion/react';
import { Globe, Server, Shield, Smartphone, MessageCircle, CreditCard, Package, ShoppingBag, Tag, Truck } from 'lucide-react';

const SetupStep = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="bg-bg-surface/50 p-8 rounded-[2.5rem] border border-border-dark hover:border-accent-saffron/30 transition-all group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-accent-saffron/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-accent-saffron/10 transition-colors"></div>
    <div className="w-16 h-16 bg-accent-saffron/10 rounded-2xl flex items-center justify-center text-accent-saffron mb-6 group-hover:scale-110 group-hover:bg-accent-saffron group-hover:text-bg-base transition-all duration-500">
      <Icon size={32} />
    </div>
    <h3 className="text-2xl font-display font-black text-white mb-4 leading-tight">{title}</h3>
    <p className="text-base text-text-light/60 leading-relaxed">{desc}</p>
  </motion.div>
);

const SetupShowcase = () => {
  return (
    <section id="setup" className="py-32 bg-bg-base relative overflow-hidden bazaar-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent-saffron font-bold text-sm tracking-[0.4em] uppercase mb-6 block"
          >
            Automatic Setup
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-display font-black text-white leading-tight mb-8"
          >
            Aap Sirf Boliye, <br />
            <span className="hand-drawn-underline text-accent-haldi">Setup Hum Karenge.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-text-light/70 max-w-3xl mx-auto leading-relaxed"
          >
            Domain se lekar payment tak — sab kuch automatically configure ho jaata hai. Aapko ek button bhi nahi dabana padega.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          <SetupStep 
            icon={Globe}
            title="Free Subdomain"
            desc="Aapki dukan ke naam ka .bolke.in subdomain turant ready. Koi domain kharidne ka jhanjhat nahi."
            delay={0.1}
          />
          <SetupStep 
            icon={Server}
            title="Cloud Hosting"
            desc="Duniya ke sabse fast servers pe aapki site host hogi. Blazing fast speed, 99.9% uptime guaranteed."
            delay={0.2}
          />
          <SetupStep 
            icon={Smartphone}
            title="Language Setup"
            desc="22+ Indian languages automatically detect aur set ho jaati hain. Aapki boli, aapki website."
            delay={0.3}
          />
          <SetupStep 
            icon={Shield}
            title="Analytics Setup"
            desc="Kitne log aaye, kahan se aaye — sab kuch dashboard pe dikhega. Google Analytics pre-configured."
            delay={0.4}
          />
          <SetupStep 
            icon={MessageCircle}
            title="WhatsApp Integration"
            desc="Direct WhatsApp button setup. Customer ka message seedha aapke phone pe aayega."
            delay={0.5}
          />
          <SetupStep 
            icon={CreditCard}
            title="Online Payment"
            desc="UPI, Credit Card, Debit Card — sab kuch automatically enable ho jaata hai. Paisa seedha bank account mein."
            delay={0.6}
          />
        </div>

        {/* 3D Motion Visual - Refined */}
        <div className="relative h-[700px] flex items-center justify-center">
          <motion.div 
            style={{ 
              perspective: "2000px",
              transformStyle: "preserve-3d"
            }}
            className="relative z-10"
          >
            <motion.div 
              animate={{ 
                rotateY: [-10, 10, -10],
                rotateX: [5, -5, 5],
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative w-80 h-[580px] bg-[#0F1115] rounded-[3.5rem] border-[10px] border-[#1A1D23] shadow-[0_0_150px_rgba(232,115,42,0.15)] flex flex-col overflow-hidden"
            >
              {/* Status Bar */}
              <div className="h-8 w-full flex items-center justify-between px-8 pt-4">
                <div className="text-[10px] text-white/40 font-bold">9:41</div>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                  <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                </div>
              </div>

              {/* Website Content Mockup */}
              <div className="flex-1 p-5 flex flex-col gap-4">
                {/* Shop Header */}
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="bg-white/5 p-4 rounded-2xl border border-white/10"
                >
                  <div className="text-accent-saffron font-display font-black text-lg leading-none mb-1">Ramesh Kirana</div>
                  <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Sanganer, Jaipur</div>
                </motion.div>

                {/* Shop Banner */}
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="h-32 bg-gradient-to-br from-accent-saffron/20 to-accent-haldi/20 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/shop/400/200')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all"></div>
                  <div className="relative z-10 text-white font-display font-black text-center px-4">
                    <div className="text-xs uppercase tracking-[0.2em] mb-1 opacity-60">Special Offer</div>
                    <div className="text-lg leading-tight">Fresh Atta & Dal <br/> @ Best Price</div>
                  </div>
                </motion.div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Aashirvaad Atta", price: "₹450", icon: Package },
                    { name: "Toor Dal 1kg", price: "₹160", icon: ShoppingBag },
                    { name: "Basmati Rice", price: "₹120", icon: Tag },
                    { name: "Fortune Oil", price: "₹145", icon: Truck }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.5 + i * 0.1 }}
                      className="bg-white/5 p-3 rounded-xl border border-white/10 flex flex-col gap-2"
                    >
                      <div className="h-16 bg-white/5 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-accent-saffron/20 rounded-full flex items-center justify-center">
                          <item.icon size={16} className="text-accent-saffron" />
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-white font-bold leading-tight">{item.name}</div>
                        <div className="text-[10px] text-success font-black">{item.price}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Voice Interaction Overlay */}
                <motion.div 
                  animate={{ 
                    y: [0, -5, 0],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-auto bg-accent-saffron/10 p-3 rounded-2xl border border-accent-saffron/30 flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-accent-saffron rounded-full flex items-center justify-center shrink-0">
                    <div className="w-1 h-3 bg-white rounded-full animate-pulse"></div>
                    <div className="w-1 h-5 bg-white rounded-full animate-pulse mx-0.5"></div>
                    <div className="w-1 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-[10px] text-white font-medium italic">"Aashirvaad Atta ka price ₹450 kar do..."</div>
                </motion.div>
              </div>

              {/* Home Indicator */}
              <div className="h-1 w-24 bg-white/20 rounded-full mx-auto mb-3"></div>
            </motion.div>

            {/* Floating Badges with Business Context */}
            <motion.div 
              animate={{ 
                y: [0, -30, 0],
                x: [0, 10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -left-40 bg-bg-surface p-5 rounded-3xl border border-accent-haldi/40 shadow-2xl z-20 backdrop-blur-md hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent-haldi/20 rounded-2xl flex items-center justify-center text-accent-haldi">
                  <Globe size={24} />
                </div>
                <div className="text-left">
                  <div className="text-white font-black text-lg">ramesh.bolke.in</div>
                  <div className="text-accent-haldi text-[10px] font-black uppercase tracking-widest">Domain Live</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ 
                y: [0, 30, 0],
                x: [0, -10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -right-40 bg-bg-surface p-5 rounded-3xl border border-success/40 shadow-2xl z-20 backdrop-blur-md hidden md:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-success/20 rounded-2xl flex items-center justify-center text-success">
                  <CreditCard size={24} />
                </div>
                <div className="text-left">
                  <div className="text-white font-black text-lg">UPI Payments</div>
                  <div className="text-success text-[10px] font-black uppercase tracking-widest">Auto-Configured</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/2 -right-52 -translate-y-1/2 bg-accent-saffron p-5 rounded-3xl shadow-2xl z-30 hidden lg:block border border-white/20"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Shield className="text-white" size={20} />
                </div>
                <div className="text-left">
                  <div className="text-white font-black text-sm uppercase tracking-widest">Setup Complete</div>
                  <div className="text-white/60 text-[10px] font-bold">100% Automatic</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-accent-saffron/5 blur-[150px] rounded-full -z-10"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-haldi/10 blur-[100px] rounded-full -z-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-success/10 blur-[100px] rounded-full -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default SetupShowcase;

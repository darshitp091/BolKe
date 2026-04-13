import React from 'react';
import { motion } from 'motion/react';
import { Mic2, Zap, Smartphone, MessageCircle, RefreshCw, MapPin, ShoppingBag } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc, tag, className, delay = 0 }: { icon: any, title: string, desc: string, tag?: string, className?: string, delay?: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -10 }}
      className={`bg-bg-surface p-10 rounded-[3rem] border border-border-dark flex flex-col gap-6 group transition-all hover:border-accent-saffron/50 hover:shadow-2xl hover:shadow-accent-saffron/10 relative overflow-hidden ${className}`}
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-accent-saffron/5 blur-3xl rounded-full -mr-20 -mt-20 group-hover:bg-accent-saffron/10 transition-colors"></div>
      
      <div className="w-16 h-16 bg-accent-saffron/10 rounded-2xl flex items-center justify-center text-accent-saffron group-hover:scale-110 group-hover:bg-accent-saffron group-hover:text-bg-base transition-all duration-500">
        <Icon size={36} />
      </div>
      
      <div>
        <h3 className="text-3xl font-display font-black text-white mb-4 leading-tight">{title}</h3>
        <p className="text-lg text-text-muted leading-relaxed">{desc}</p>
      </div>

      {tag && (
        <div className="mt-auto pt-6">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-haldi bg-accent-haldi/10 px-4 py-1.5 rounded-full border border-accent-haldi/20 shadow-lg">
            {tag}
          </span>
        </div>
      )}
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-bg-base py-32 relative bazaar-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-24 text-center lg:text-left">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-accent-saffron font-bold text-sm tracking-[0.4em] uppercase mb-6 block"
          >
            Powerful Features
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-display font-black text-white leading-[1.1]"
          >
            Ek Baar Setup, <br />
            <span className="hand-drawn-underline text-accent-haldi">Hamesha Ka Faayda.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card A: Wide */}
          <FeatureCard 
            className="md:col-span-2"
            icon={Mic2}
            title="Multi-Bhasha Voice Input"
            desc="22+ Indian languages. Whisper AI use karta hai jo bilkul sahi sunta hai. Hindi bolne wale alag. Tamil bolne wale alag. Dono ko apna-apna lagta hai."
            tag="Open Source — Whisper by OpenAI"
            delay={0.1}
          />

          {/* Card B: Tall */}
          <FeatureCard 
            className="lg:row-span-2"
            icon={Zap}
            title="3 Minute Website"
            desc="Duniya ke kisi bhi website builder se tez. Aap bolna band karte ho — site ban jaati hai."
            tag="3:00 → 0:00 Countdown"
            delay={0.2}
          />

          {/* Card C */}
          <FeatureCard 
            icon={Smartphone}
            title="Mobile-First Design"
            desc="Aapke customers phones pe dekhenge. Website wahi perfect dikhegi. Auto-generated responsive layout."
            delay={0.3}
          />

          {/* Card D */}
          <FeatureCard 
            icon={MessageCircle}
            title="WhatsApp Connect"
            desc="Aapki website pe seedha WhatsApp button. Customer click kare — aapke phone pe message aa jaaye. Koi middleman nahi."
            delay={0.4}
          />

          {/* Card E: Wide */}
          <FeatureCard 
            className="md:col-span-2"
            icon={RefreshCw}
            title="Voice Se Update Bhi"
            desc="&quot;Kal se dukan band rahegi&quot; → boliye → website update ho jaayegi. Koi login, koi dashboard, koi typing nahi."
            delay={0.5}
          />

          {/* Card F */}
          <FeatureCard 
            icon={MapPin}
            title="Google Maps Auto-Link"
            desc="Address boliye — maps automatically attach ho jaata hai. Customers ko raasta dhundhne mein problem nahi."
            delay={0.6}
          />

          {/* Card G */}
          <FeatureCard 
            icon={ShoppingBag}
            title="ONDC Ready"
            desc="India ke Open Network for Digital Commerce se connected. Flipkart, Meesho pe bhi dikh sakte ho — alag se kuch nahi karna."
            tag="Government Backed — Free"
            delay={0.7}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

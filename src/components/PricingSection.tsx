import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, X, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PricingCard = ({ plan, price, features, notFeatures, cta, popular, note, delay = 0, planKey }: { plan: string, price: string, features: string[], notFeatures?: string[], cta: string, popular?: boolean, note?: string, delay?: number, planKey: string }) => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (planKey === 'free') {
      navigate('/dashboard');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/payments/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ plan: planKey })
      });

      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.message || "Payment failed to start");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className={`relative p-10 rounded-[3rem] border flex flex-col gap-8 transition-all hover:scale-[1.02] ${
        popular ? "bg-white border-accent-saffron shadow-2xl shadow-accent-saffron/10 z-10" : "bg-bg-surface border-border-dark"
      }`}
    >
      {popular && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-accent-saffron text-bg-base px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest shadow-xl">
          Sabse Popular
        </div>
      )}
      
      <div>
        <h3 className={`text-2xl font-display font-black mb-4 ${popular ? 'text-text-dark' : 'text-white'}`}>{plan}</h3>
        <div className="flex items-baseline gap-1">
          <span className={`text-5xl font-display font-black ${popular ? 'text-accent-saffron' : 'text-accent-gold'}`}>{price}</span>
          {price !== "₹0" && <span className={`text-sm font-bold ${popular ? 'text-text-dark-muted' : 'text-text-light/60'}`}>/month</span>}
        </div>
      </div>

      <div className="space-y-5 my-4 flex-grow">
        {features.map((f, i) => (
          <div key={i} className="flex gap-4 text-base">
            <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${popular ? 'bg-success/20 text-success' : 'bg-white/10 text-accent-saffron'}`}>
              <Check size={14} />
            </div>
            <span className={`font-medium leading-tight ${popular ? 'text-text-dark' : 'text-text-light'}`}>{f}</span>
          </div>
        ))}
        {notFeatures?.map((f, i) => (
          <div key={i} className="flex gap-4 text-base opacity-40">
            <div className="mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-white/5 text-text-light/40">
              <X size={14} />
            </div>
            <span className={`font-medium leading-tight ${popular ? 'text-text-dark-muted' : 'text-text-light/40'}`}>{f}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={handleSubscribe}
        disabled={isLoading}
        className={`w-full py-5 rounded-2xl font-black text-xl transition-all shadow-xl hover:scale-105 text-center flex items-center justify-center gap-2 ${
          popular ? "bg-accent-saffron text-bg-base hover:bg-accent-gold" : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
        }`}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : cta}
      </button>
      
      {note && <p className={`text-xs text-center italic font-bold ${popular ? 'text-text-dark-muted' : 'text-text-light/60'}`}>{note}</p>}
    </motion.div>
  );
};

const PricingSection = () => {
  return (
    <section id="pricing" className="bg-bg-base py-32 relative overflow-hidden bazaar-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-24 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent-saffron font-bold text-sm tracking-[0.4em] uppercase mb-6 block"
          >
            Simple Pricing
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-display font-black text-white leading-[1.1] mb-8"
          >
            Sasta Bhi, <br />
            <span className="hand-drawn-underline text-accent-haldi">Sabse Achha Bhi.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-text-light/70 max-w-3xl mx-auto leading-relaxed"
          >
            Koi hidden charges nahi. Koi setup fee nahi. Bas ek simple monthly plan jo aapki dukan ko badhaayega.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <PricingCard 
            planKey="free"
            plan="Bolke Shuru Karo"
            price="₹0"
            features={[
              "1 website",
              "Voice input (Hindi + English)",
              "yourname.bolke.in subdomain",
              "Mobile-friendly design",
              "Google Maps link",
              "Custom Domain support",
              "Online Payment (UPI/Cards)"
            ]}
            notFeatures={[
              "Multiple languages",
              "WhatsApp auto-reply bot",
              "Product listings with photos",
              "Advanced Analytics"
            ]}
            cta="Free Mein Banao →"
            delay={0.1}
          />
          <PricingCard 
            planKey="dukan"
            popular
            plan="Dukan Wala Plan"
            price="₹199"
            features={[
              "Sab Free wala",
              "22 Indian languages support",
              "20 voice updates / month",
              "Basic analytics",
              "WhatsApp bot integration",
              "10 product listings with photos",
              "Custom domain & Payment gateway"
            ]}
            notFeatures={[
              "WhatsApp Auto-Reply Bot (AI)",
              "Priority support"
            ]}
            cta="Shuru Karein →"
            note="Best for local shops"
            delay={0.2}
          />
          <PricingCard 
            planKey="brand"
            plan="Vyaapari Plan"
            price="₹699"
            features={[
              "Sab Dukan Wala wala",
              "WhatsApp Auto-Reply Bot (AI)",
              "Unlimited product listings",
              "Advanced business analytics",
              "Priority support (Hindi/English)",
              "Custom domain & Payment gateway"
            ]}
            cta="Try Karo →"
            delay={0.3}
          />
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-24 text-center"
        >
          <div className="inline-block p-8 rounded-[2rem] bg-bg-surface border border-border-dark max-w-2xl">
            <p className="text-xl text-text-light/70 leading-relaxed">
              💡 <span className="text-white font-bold">Zyaatar Dukaandaron Ke Liye Free Plan Kafi Hai.</span> <br />
              Upstart kar lo. Jab business grow kare, tab upgrade karo. Koi pressure nahi.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;

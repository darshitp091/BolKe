import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

const ProsConsSection = () => {
  const pros = [
    { title: "Koi Coding Nahi", desc: "Literally zero. Na HTML, na CSS, na JavaScript. Sirf bol do — kaam ho jaata hai." },
    { title: "Koi English Nahi", desc: "22+ Indian languages. App bhi aapki boli mein. Website bhi. Updates bhi." },
    { title: "3 Minute Mein Live", desc: "Duniya ke kisi bhi website builder se tez. Koi 'drag and drop' nahi — direct voice to live." },
    { title: "Free Mein Shuru Karo", desc: "Basic plan ₹0. Domain bhi free (.bolke.in subdomain). Koi credit card nahi maangte." },
    { title: "Open Source Foundation", desc: "Technology kisi ek company ki nahi. Kal hum band bhi ho jaayein — aapka data safe hai." },
    { title: "Auto-Update by Voice", desc: "\"Kal Diwali pe band rahegi\" → bol do → website update. Koi login, koi typing nahi." },
    { title: "ONDC Connected", desc: "Ek baar register karo — multiple platforms pe visibility. Flipkart, Meesho — sab free mein." }
  ];

  const cons = [
    { title: "Internet Zaroor Chahiye", desc: "Voice processing ke liye internet connection zaroori hai. Offline mode abhi nahi hai." },
    { title: "Complex Products Ke Liye Limited", desc: "Agar 500+ products hain with variants, filters — yeh platform unke liye nahi. Shopify better rahega." },
    { title: "Custom Design Nahi Milegi", desc: "BolKe ek standard design deta hai — aap colors change kar sakte ho, lekin complete custom design nahi." },
    { title: "E-commerce Abhi Limited Hai", desc: "Basic plan mein sirf display website hai. Online payment, cart, checkout — Dukan Wala plan mein milega (₹499/month)." },
    { title: "AI Galti Bhi Kar Sakta Hai", desc: "Agar aap bahut tez bolte ho ya accent strong hai — kabhi kabhi AI galat samjhta hai. Confirm step hai." },
    { title: "Custom Domain Ke Liye Paid", desc: "Free mein milega: yourshop.bolke.in. Khud ka domain (www.rameshkapde.com) ke liye Dukan Wala plan chahiye." },
    { title: "Naya Platform Hai", desc: "Hum abhi grow kar rahe hain. Bade brands ka track record nahi hai humara. Apna risk leke aao." }
  ];

  return (
    <section id="pros-cons" className="bg-bg-base py-32 relative overflow-hidden bazaar-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-24 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent-saffron font-bold text-sm tracking-[0.4em] uppercase mb-6 block"
          >
            Pros & Cons
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-display font-black text-white leading-[1.1] mb-8"
          >
            Hum Chhupaate Nahi. <br />
            <span className="hand-drawn-underline text-accent-haldi">Yeh Hai Sach.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-text-light/70 max-w-3xl mx-auto leading-relaxed"
          >
            Jo platform apne khud ke cons nahi bataata — woh trust ke laayak nahi. Yahan hum bilkul seedha baat karte hain.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border-dark rounded-[3rem] overflow-hidden shadow-2xl">
          {/* Pros Column */}
          <div className="p-10 md:p-16 border-b lg:border-b-0 lg:border-r border-border-dark bg-success/5">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-success/20 rounded-2xl flex items-center justify-center text-success">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-3xl font-display font-black text-white uppercase tracking-widest">Pros</h3>
            </div>
            <div className="space-y-10">
              {pros.map((pro, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="text-success text-2xl mt-1">✅</div>
                  <div>
                    <h4 className="text-xl font-display font-black text-white mb-2 leading-tight">{pro.title}</h4>
                    <p className="text-base text-text-light/60 leading-relaxed">{pro.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cons Column */}
          <div className="p-10 md:p-16 bg-danger/5">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 bg-danger/20 rounded-2xl flex items-center justify-center text-danger">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-3xl font-display font-black text-white uppercase tracking-widest">Cons</h3>
            </div>
            <div className="space-y-10">
              {cons.map((con, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="text-danger text-2xl mt-1">⚠</div>
                  <div>
                    <h4 className="text-xl font-display font-black text-white mb-2 leading-tight">{con.title}</h4>
                    <p className="text-base text-text-light/60 leading-relaxed">{con.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProsConsSection;

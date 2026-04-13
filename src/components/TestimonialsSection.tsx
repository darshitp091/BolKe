import React from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle2 } from 'lucide-react';

const TestimonialCard = ({ name, shop, lang, quote, result, initial, delay = 0 }: { name: string, shop: string, lang: string, quote: string, result: string, initial: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-black/5 border border-gray-100 flex flex-col gap-8 relative group hover:border-accent-saffron/30 transition-all"
  >
    <div className="absolute top-8 right-8 text-accent-gold flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
    </div>
    
    <div className="flex items-center gap-5">
      <div className="w-16 h-16 bg-accent-saffron/10 rounded-2xl flex items-center justify-center text-accent-saffron font-display font-black text-2xl border border-accent-saffron/20">
        {initial}
      </div>
      <div>
        <h4 className="text-xl font-display font-black text-text-dark flex items-center gap-2">
          {name}
          <CheckCircle2 size={16} className="text-success" />
        </h4>
        <p className="text-sm text-text-dark-muted font-bold uppercase tracking-wider">{shop} • {lang}</p>
      </div>
    </div>

    <p className="text-lg text-text-dark leading-relaxed font-medium italic">"{quote}"</p>
    
    <div className="mt-auto pt-6 border-t border-gray-50">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
        <span className="text-sm font-black text-success uppercase tracking-widest">
          {result}
        </span>
      </div>
    </div>
  </motion.div>
);

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="bg-bg-warm py-32 relative overflow-hidden ink-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-24 text-center lg:text-left flex flex-col lg:flex-row items-end justify-between gap-12">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-accent-saffron font-bold text-sm tracking-[0.4em] uppercase mb-6 block"
            >
              Real Stories
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-8xl font-display font-black text-text-dark leading-[1.1]"
            >
              Asli Log. <br />
              <span className="hand-drawn-underline text-accent-saffron">Asli Results.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-text-dark-muted max-w-sm leading-relaxed text-center lg:text-left mx-auto lg:mx-0"
          >
            Hum jaante hain trust kamana mushkil hai. Isliye humne real dukaandaron se pucha ki BolKe ne unki life kaise badli.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            initial="RB"
            name="Ramesh Bhai"
            shop="Ramesh Kapde Bhandar"
            lang="Hindi"
            quote="Maine socha tha website banana bahut mushkil hoga. Mere bete ne kaha try karo. 5 minute mein ho gaya. Ab roz 2-3 nayi enquiries aati hain WhatsApp pe."
            result="+67% Enquiries in First Month"
            delay={0.1}
          />
          <TestimonialCard 
            initial="ST"
            name="Sunita Tai"
            shop="Sunita's Homemade Pickles"
            lang="Marathi"
            quote="मला वाटलं होतं वेबसाइट फक्त मोठ्या लोकांसाठी असते. BolKe ने दाखवलं की आपणही करू शकतो. मराठीत बोललो — website झाली!"
            result="Pune ke 3 new delivery orders/week"
            delay={0.2}
          />
          <TestimonialCard 
            initial="M"
            name="Muthusamy"
            shop="Muthusamy Tiffin Centre"
            lang="Tamil"
            quote="என் மகன் என்னிடம் சொன்னான் 'அப்பா, இப்போது Google Maps-ல நம் கடை தெரிகிறது!' அன்று என்னால் நம்பவே முடியவில்லை."
            result="Google Maps se 8 new customers in Week 1"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

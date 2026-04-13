import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface FAQItemProps {
  question: string;
  answer: string;
  key?: number | string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border-dark last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left group"
      >
        <span className="text-xl md:text-2xl font-display font-black text-white group-hover:text-accent-saffron transition-colors leading-tight pr-8">{question}</span>
        <div className={cn(
          "w-10 h-10 rounded-full border border-border-dark flex items-center justify-center shrink-0 transition-all duration-300",
          isOpen ? "bg-accent-saffron border-accent-saffron text-bg-base" : "text-text-light/40 group-hover:border-accent-saffron group-hover:text-accent-saffron"
        )}>
          <ChevronDown 
            size={20} 
            className={cn("transition-transform duration-500", isOpen && "rotate-180")} 
          />
        </div>
      </button>
      <div className={cn(
        "grid transition-all duration-500 ease-in-out",
        isOpen ? "grid-rows-[1fr] opacity-100 mb-8" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden">
          <p className="text-lg text-text-light/60 leading-relaxed max-w-3xl">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    { question: "Kya mujhe smartphone chahiye?", answer: "Haan, koi bhi Android ya iPhone chalega. ₹5,000 wala phone bhi. Browser pe kaam karta hai — koi app download karna zaroori nahi." },
    { question: "Agar meri boli mein AI galat samjhe?", answer: "Hum ek confirm step dete hain. Preview dekho, sunno — galat hai toh bol do kya galat hai. AI correct kar lega. Unlimited corrections." },
    { question: "Website pe photos kaise dalunga?", answer: "Phone se photo kheencho — seedha upload karo. Ya boliye 'meri dukan ki photo daalo' — camera open ho jaayega. Simple." },
    { question: "Kya website delete ho sakti hai agar main payment nahi karta?", answer: "Free plan hamesha free rehta hai. Paid plan cancel karo toh Free plan pe wapas aa jaate ho. Website kabhi delete nahi hoti." },
    { question: "Mera data safe hai?", answer: "Haan. Voice data process hote hi delete ho jaata hai. Hum kisi ko nahi bechte aapka data. DPDP Act (India) comply hai. Open source technology use karte hain." },
    { question: "Kya main ek se zyada dukan bana sakta hoon?", answer: "Free plan: 1 website. Paid plans pe additional websites ₹49/month each." },
    { question: "English mein bhi bol sakta hoon?", answer: "Haan bilkul. BolKe English bhi perfectly samajhta hai. Hinglish (Hindi + English mix) bhi — jaise hum baat karte hain!" },
    { question: "Support kahan se milega?", answer: "WhatsApp pe Hindi/regional language support available hai. Response time: 2 hours (weekdays), 4 hours (weekends)." }
  ];

  return (
    <section id="faq" className="bg-bg-base py-32 relative overflow-hidden bazaar-pattern">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-24 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent-saffron font-bold text-sm tracking-[0.4em] uppercase mb-6 block"
          >
            Clear Doubts
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-display font-black text-white leading-tight"
          >
            Sawal Jawab
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-bg-surface/30 rounded-[3rem] border border-border-dark p-10 md:p-16 shadow-2xl"
        >
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

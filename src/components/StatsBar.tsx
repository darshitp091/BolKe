import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { CountUp } from 'countup.js';
import { useInView } from 'react-intersection-observer';

const StatItem = ({ value, suffix = "", label, prefix = "", delay = 0 }: { value: number, suffix?: string, label: string, prefix?: string, delay?: number }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const countRef = useRef<HTMLSpanElement>(null);
  const countUpInstance = useRef<CountUp | null>(null);

  useEffect(() => {
    if (inView && countRef.current) {
      countUpInstance.current = new CountUp(countRef.current, value, {
        startVal: 0,
        duration: 2.5,
        prefix,
        suffix,
      });
      if (!countUpInstance.current.error) {
        countUpInstance.current.start();
      }
    }
  }, [inView, value, prefix, suffix]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center text-center p-6 md:p-8 relative group"
    >
      <div className="absolute inset-0 bg-accent-saffron/5 rounded-3xl scale-0 group-hover:scale-100 transition-transform duration-500 -z-10"></div>
      <span ref={countRef} className="font-display text-5xl md:text-8xl font-black text-accent-saffron mb-4 drop-shadow-2xl">0</span>
      <span className="text-xs md:text-sm text-text-light/60 font-black uppercase tracking-[0.3em] leading-tight max-w-[120px]">{label}</span>
    </motion.div>
  );
};

const StatsBar = () => {
  return (
    <section className="relative bg-bg-surface py-20 md:py-32 border-y border-border-dark overflow-hidden bazaar-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10">
        <StatItem value={63} suffix="M+" label="Dukaanein Offline" delay={0.1} />
        <StatItem value={22} suffix="+" label="Indian Languages" delay={0.2} />
        <StatItem value={3} suffix=" min" label="Website Ready" delay={0.3} />
        <StatItem value={0} prefix="₹" label="Basic Plan Cost" delay={0.4} />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent-saffron/20 to-transparent transform -skew-y-3 origin-top-left"></div>
      </div>
    </section>
  );
};

export default StatsBar;

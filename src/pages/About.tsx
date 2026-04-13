import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'motion/react';
import { Users, Target, Shield, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar />
      
      <div className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-black text-white mb-6"
          >
            Hamaari <span className="text-accent-saffron">Kahani</span>
          </motion.h1>
          <p className="text-xl text-text-light/60 font-bold max-w-3xl mx-auto leading-relaxed">
            BolKe ka maksad hai Bharat ke har chote vyapaari ko digital shakti dena. 
            Hamara maanna hai ki technology sabke liye aasaan honi chahiye.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="bg-bg-surface p-12 rounded-[3rem] border border-border-dark flex flex-col justify-center">
            <h2 className="text-3xl font-display font-black text-white mb-6">Hamara Mission</h2>
            <p className="text-text-light/60 font-medium text-lg leading-relaxed">
              Bharat mein 6 crore se jyada MSMEs hain, lekin unmein se bahut kam online hain. 
              Language barrier aur complex tools ke wajah se unhe mushkil hoti hai. 
              BolKe iss gap ko khatam karta hai AI aur voice ki madad se.
            </p>
          </div>
          <div className="bg-accent-saffron/10 border border-accent-saffron/20 p-12 rounded-[3rem] flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Target size={120} />
            </div>
            <h2 className="text-3xl font-display font-black text-white mb-6">Hamara Vision</h2>
            <p className="text-text-light/60 font-medium text-lg leading-relaxed">
              Hum ek aisa bhavishya dekhte hain jahan ek chota mithai wala ho ya kapde ki dukan, 
              har koi apni digital dukan khol sake bas bolke. Hamara vision hai "Vocal for Local" ko haqiqat banana.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Users, title: "Owner-First", desc: "Vyapaariyon ki zarurat ko dhyan mein rakh kar banaya gaya." },
            { icon: Shield, title: "Bharosemand", desc: "Aapka data aur aapki dukan hamesha surakshit." },
            { icon: Zap, title: "Tez Raftaar", desc: "Sirf 30 seconds mein website taiyar." },
            { icon: Globe, title: "Har Bhasha Mein", desc: "Local languages ka pura support." }
          ].map((item, idx) => (
            <div key={idx} className="bg-bg-surface/30 p-8 rounded-3xl border border-white/5 text-center">
              <div className="w-14 h-14 bg-white/5 text-accent-saffron rounded-2xl flex items-center justify-center mx-auto mb-6">
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-display font-black text-white mb-2">{item.title}</h3>
              <p className="text-text-light/40 text-sm font-bold">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;

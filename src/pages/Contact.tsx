import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'motion/react';
import { Mail, MessageCircle, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

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
            Sawaal <span className="text-accent-haldi">Poochein</span>
          </motion.h1>
          <p className="text-xl text-text-light/60 font-bold max-w-2xl mx-auto leading-relaxed">
            Hum aapki madad ke liye hamesha taiyar hain. Nimnlikhit tareekon se humse sampark karein.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-bg-surface p-8 rounded-[2.5rem] border border-border-dark group hover:border-accent-saffron/30 transition-all">
              <div className="w-14 h-14 bg-accent-saffron/10 text-accent-saffron rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Mail size={28} />
              </div>
              <h3 className="text-xl font-display font-black text-white mb-2">Email Karein</h3>
              <p className="text-text-light/40 font-bold text-sm mb-4">Hum 24 ghante ke andar jawaab dete hain.</p>
              <a href="mailto:support@bolke.in" className="text-white font-black hover:text-accent-saffron transition-colors">support@bolke.in</a>
            </div>

            <div className="bg-bg-surface p-8 rounded-[2.5rem] border border-border-dark group hover:border-success/30 transition-all">
              <div className="w-14 h-14 bg-success/10 text-success rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle size={28} />
              </div>
              <h3 className="text-xl font-display font-black text-white mb-2">WhatsApp</h3>
              <p className="text-text-light/40 font-bold text-sm mb-4">Turant madad ke liye message karein.</p>
              <a href="https://wa.me/919876543210" className="text-white font-black hover:text-success transition-colors">+91 98765 43210</a>
            </div>

            <div className="bg-bg-surface p-8 rounded-[2.5rem] border border-border-dark group hover:border-accent-haldi/30 transition-all">
              <div className="w-14 h-14 bg-accent-haldi/10 text-accent-haldi rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" >
                <MapPin size={28} />
              </div>
              <h3 className="text-xl font-display font-black text-white mb-2">Office</h3>
              <p className="text-text-light/40 font-bold text-sm mb-4">Hamara head office yahan mojud hai.</p>
              <p className="text-white font-black leading-relaxed">H-Block, Sector 62, Noida, Uttar Pradesh 201301</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-bg-surface p-8 md:p-12 rounded-[3.5rem] border border-border-dark relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-saffron/5 blur-[100px] pointer-events-none"></div>
              
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-8 border border-success/20">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-4xl font-display font-black text-white mb-4">Shukriya!</h2>
                  <p className="text-xl text-text-light/60 font-bold mb-8">Aapka message humein mil gaya hai. Hum jald hi sampark karenge.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-accent-saffron text-bg-base px-10 py-4 rounded-2xl font-black transition-all hover:scale-105"
                  >
                    Naya Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-accent-saffron uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Darshit Patel"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-accent-saffron outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-accent-saffron uppercase tracking-widest ml-1">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="darshit@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-accent-saffron outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-accent-saffron uppercase tracking-widest ml-1">Subject</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Dukan setup karne mein madad chahiye"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-accent-saffron outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-accent-saffron uppercase tracking-widest ml-1">Message</label>
                    <textarea 
                      required
                      rows={5}
                      placeholder="Aapka message yahan likhein..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-accent-saffron outline-none transition-all resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-accent-saffron hover:bg-accent-gold text-bg-base px-12 py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-accent-saffron/20 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={24} />}
                    Message Bhejein
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;

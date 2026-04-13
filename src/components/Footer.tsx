import React from 'react';
import { Github, Twitter, Linkedin, Youtube, MessageCircle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-bg-base py-32 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent-saffron/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand */}
          <div className="flex flex-col gap-8">
            <Link to="/" className="font-display text-5xl font-black">
              Bol<span className="text-accent-saffron">Ke</span>
            </Link>
            <p className="text-text-muted text-lg leading-relaxed">
              "Bolo, Banao, Badho"<br />
              India ke chhote dukaandaron ke liye banaya gaya. Made with <Heart size={16} className="inline text-accent-saffron fill-accent-saffron" /> in India.
            </p>
            <div className="flex gap-6">
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-accent-saffron transition-all"><Github size={24} /></a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-accent-saffron transition-all"><Twitter size={24} /></a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-white hover:bg-accent-saffron transition-all"><Linkedin size={24} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-display font-black text-xl mb-8">Quick Links</h4>
            <ul className="space-y-5 text-base text-text-muted font-bold">
              <li><a href="#features" className="hover:text-accent-saffron transition-colors">Features</a></li>
              <li><a href="#setup" className="hover:text-accent-saffron transition-colors">Setup Process</a></li>
              <li><a href="#designs" className="hover:text-accent-saffron transition-colors">Design Gallery</a></li>
              <li><a href="#pricing" className="hover:text-accent-saffron transition-colors">Pricing Plans</a></li>
              <li><Link to="/privacy" className="hover:text-accent-saffron transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-accent-saffron transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-white font-display font-black text-xl mb-8">Community</h4>
            <ul className="space-y-5 text-base text-text-muted font-bold">
              <li><a href="#" className="hover:text-accent-saffron transition-colors">GitHub (Open Source)</a></li>
              <li><a href="#" className="hover:text-accent-saffron transition-colors">Blog / Updates</a></li>
              <li className="flex items-center gap-3 text-accent-haldi">
                <MessageCircle size={20} />
                <a href="#" className="hover:underline">WhatsApp Group</a>
              </li>
              <li><a href="#" className="hover:text-accent-saffron transition-colors">Report a Bug</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-display font-black text-xl mb-8">Contact Us</h4>
            <ul className="space-y-5 text-base text-text-light/60 font-bold">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-success">
                  <MessageCircle size={20} />
                </div>
                <span className="text-white">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-saffron/10 flex items-center justify-center text-accent-saffron">
                  <Heart size={20} />
                </div>
                <span className="text-white">help@bolke.in</span>
              </li>
              <li className="text-accent-haldi font-black tracking-widest uppercase text-xs pt-4">Made in India for Bharat</li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-12 py-12 border-y border-white/5 mb-12 opacity-50 hover:opacity-100 transition-opacity">
          <Link to="/security" className="flex items-center gap-2 grayscale brightness-200">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-bg-base font-black text-[10px]">ONDC</div>
            <span className="text-white text-[10px] font-black uppercase tracking-widest">Ready</span>
          </Link>
          <Link to="/security" className="flex items-center gap-2 grayscale brightness-200">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-bg-base font-black text-[10px]">DPDP</div>
            <span className="text-white text-[10px] font-black uppercase tracking-widest">Compliant</span>
          </Link>
          <Link to="/security" className="flex items-center gap-2 grayscale brightness-200">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-bg-base font-black text-[10px]">SSL</div>
            <span className="text-white text-[10px] font-black uppercase tracking-widest">Secure</span>
          </Link>
        </div>

        <div className="pt-12 flex flex-col lg:flex-row items-center justify-between gap-8 text-xs text-text-light/40 uppercase tracking-[0.3em] font-black">
          <div>© 2025 BolKe. Proudly Open Source.</div>
          <div className="text-accent-haldi text-center lg:text-right">"Aapka data aapka — hum sirf zariya hain."</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

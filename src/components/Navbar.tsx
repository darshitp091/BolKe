import React, { useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import { Menu, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Kaise Kaam Karta Hai', href: '#how-it-works' },
    { name: 'Setup', href: '#setup' },
    { name: 'Designs', href: '#designs' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-[36px] left-0 w-full z-[90] transition-all duration-300 border-b border-border-dark bg-bg-base/85 backdrop-blur-xl",
        isScrolled ? "h-14" : "h-20"
      )}
    >
      <div className="max-w-7xl mx-auto h-full px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col">
          <div className="font-display text-xl md:text-2xl font-bold leading-none">
            Bol<span className="text-accent-saffron">Ke</span>
          </div>
          <span className="text-[9px] md:text-[10px] text-text-muted font-medium tracking-tight">Bolo, Banao, Badho</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={window.location.pathname === '/' ? link.href : `/${link.href}`}
              className="text-xs xl:text-sm font-medium text-text-light/60 hover:text-accent-saffron transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          {user ? (
            <Link 
              to="/dashboard"
              className="hidden sm:flex items-center gap-2 bg-bg-surface border border-border-dark text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all hover:border-accent-saffron"
            >
              <User size={16} />
              Dashboard
            </Link>
          ) : (
            <Link 
              to="/auth"
              className="hidden sm:block bg-accent-saffron hover:bg-accent-gold text-white px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all hover:scale-105 shadow-lg shadow-accent-saffron/20"
            >
              Free Mein Try Karo →
            </Link>
          )}
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-text-light p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-[2px] bg-accent-saffron transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[calc(36px+5rem)] bg-bg-base z-[100] p-6 flex flex-col gap-6 lg:hidden animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={window.location.pathname === '/' ? link.href : `/${link.href}`}
              className="text-xl font-display font-bold text-text-light hover:text-accent-saffron transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <Link 
              to="/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-bg-surface border border-border-dark text-white py-4 rounded-lg text-lg font-bold mt-4 text-center"
            >
              Dashboard
            </Link>
          ) : (
            <Link 
              to="/auth"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full bg-accent-saffron text-white py-4 rounded-lg text-lg font-bold mt-4 text-center"
            >
              Free Mein Try Karo →
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

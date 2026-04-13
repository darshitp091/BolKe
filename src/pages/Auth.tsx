import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, ArrowRight, Mail, Lock, User, Phone, LogIn, ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import VoiceRecorder from '../components/VoiceRecorder';
import FormBuilder from '../components/FormBuilder';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [step, setStep] = useState(1); // 1: Auth, 2: Method Choice, 3: Voice, 4: Form
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        login(data);
        if (isLogin) {
          navigate('/dashboard');
        } else {
          setStep(2);
        }
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError("Server connection failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center p-4 relative overflow-hidden dot-grid">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-saffron/5 blur-[160px] rounded-full pointer-events-none"></div>
      
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div 
            key="auth-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="max-w-5xl w-full h-[700px] bg-bg-surface/50 backdrop-blur-xl rounded-[3.5rem] border border-border-dark overflow-hidden shadow-2xl relative z-10 flex"
          >
            {/* Info Panel (Sliding) */}
            <motion.div 
              animate={{ 
                x: isLogin ? "100%" : "0%",
                borderTopLeftRadius: isLogin ? "0" : "3.5rem",
                borderBottomLeftRadius: isLogin ? "0" : "3.5rem",
                borderTopRightRadius: isLogin ? "3.5rem" : "0",
                borderBottomRightRadius: isLogin ? "3.5rem" : "0",
              }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-accent-saffron to-accent-gold text-bg-base z-30 p-16 flex flex-col justify-center"
            >
              <div className="mb-12">
                <Link to="/" className="font-display text-4xl font-black flex items-center gap-2 group">
                  <ArrowLeft size={24} className="group-hover:-translate-x-2 transition-transform" />
                  Bol<span className="text-white">Ke</span>
                </Link>
              </div>
              
              <h2 className="text-5xl font-display font-black mb-8 leading-tight">
                {isLogin ? "Welcome Back, Vyaapari!" : "Bharat ki Sabse Tez Website Builder."}
              </h2>
              <p className="text-xl font-medium opacity-90 mb-12 leading-relaxed">
                {isLogin 
                  ? "Apne dukan ka dashboard access karein aur naye orders dekhein." 
                  : "Bas 3 minute mein apni dukan online le jaaiye. Na coding, na designer."}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Mic size={24} />
                  </div>
                  <span className="font-bold text-lg">Voice-to-Website Magic</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Phone size={24} />
                  </div>
                  <span className="font-bold text-lg">WhatsApp Integration</span>
                </div>
              </div>
            </motion.div>

            {/* Signup Form (Right Side) */}
            <div className="w-1/2 ml-auto h-full p-16 flex flex-col justify-center">
              <h3 className="text-4xl font-display font-black text-white mb-2">Account Banayein</h3>
              <p className="text-text-light/60 mb-6 font-bold text-lg">Shuru karne ke liye details bharein</p>
              
              {error && <div className="mb-4 p-3 bg-danger/10 border border-danger/20 text-danger rounded-xl text-sm font-bold">{error}</div>}

              <form className="space-y-6" onSubmit={handleAuthSubmit}>
                <div className="space-y-2">
                  <label className="text-xs font-black text-accent-saffron uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light/40" size={20} />
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ramesh Kumar" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 text-white focus:border-accent-saffron outline-none transition-all text-lg"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-black text-accent-saffron uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light/40" size={20} />
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="ramesh@dukan.com" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 text-white focus:border-accent-saffron outline-none transition-all text-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-accent-saffron uppercase tracking-widest ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light/40" size={20} />
                    <input 
                      type="password" 
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="••••••••" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 text-white focus:border-accent-saffron outline-none transition-all text-lg"
                    />
                  </div>
                </div>

                <button type="submit" disabled={isLoading} className="w-full bg-accent-saffron hover:bg-accent-gold text-bg-base py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-accent-saffron/20 flex items-center justify-center gap-2 group">
                  {isLoading ? <Loader2 className="animate-spin" /> : "Free Mein Try Karo"}
                  {!isLoading && <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
              
              <div className="mt-10 text-center">
                <p className="text-text-light/60 font-bold text-lg">
                  Pehle se account hai?{" "}
                  <button 
                    onClick={() => { setIsLogin(true); setError(null); }}
                    className="text-accent-saffron hover:underline font-black"
                  >
                    Login Karein
                  </button>
                </p>
              </div>
            </div>

            {/* Login Form (Left Side) */}
            <div className="absolute top-0 left-0 w-1/2 h-full p-16 flex flex-col justify-center">
              <h3 className="text-4xl font-display font-black text-white mb-2">Wapas Aaiye</h3>
              <p className="text-text-light/60 mb-6 font-bold text-lg">Apne details se login karein</p>
              
              {error && <div className="mb-4 p-3 bg-danger/10 border border-danger/20 text-danger rounded-xl text-sm font-bold">{error}</div>}

              <form className="space-y-6" onSubmit={handleAuthSubmit}>
                <div className="space-y-2">
                  <label className="text-xs font-black text-accent-saffron uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light/40" size={20} />
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="ramesh@dukan.com" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 text-white focus:border-accent-saffron outline-none transition-all text-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-accent-saffron uppercase tracking-widest ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light/40" size={20} />
                    <input 
                      type="password" 
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="••••••••" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 text-white focus:border-accent-saffron outline-none transition-all text-lg"
                    />
                  </div>
                </div>

                <button type="submit" disabled={isLoading} className="w-full bg-accent-saffron hover:bg-accent-gold text-bg-base py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-accent-saffron/20 flex items-center justify-center gap-2 group">
                  {isLoading ? <Loader2 className="animate-spin" /> : "Login Karein"}
                  {!isLoading && <LogIn size={24} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </form>
              
              <div className="mt-10 text-center">
                <p className="text-text-light/60 font-bold text-lg">
                  Naya account chahiye?{" "}
                  <button 
                    onClick={() => { setIsLogin(false); setError(null); }}
                    className="text-accent-saffron hover:underline font-black"
                  >
                    Signup Karein
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        ) : step === 2 ? (
          <motion.div 
            key="choice-step"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl text-center"
          >
            <h2 className="text-5xl font-display font-black text-white mb-4">Kaise Banayein?</h2>
            <p className="text-xl text-text-light/60 font-bold mb-12">Apna pasandida tareeka chunein.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <button 
                onClick={() => setStep(3)}
                className="bg-bg-surface/50 backdrop-blur-xl border border-border-dark p-12 rounded-[3rem] hover:border-accent-saffron transition-all group text-left"
              >
                <div className="w-20 h-20 bg-accent-saffron rounded-[2rem] flex items-center justify-center text-bg-base mb-8 group-hover:scale-110 transition-transform">
                  <Mic size={40} />
                </div>
                <h3 className="text-3xl font-display font-black text-white mb-4">Bol Ke Banao</h3>
                <p className="text-text-light/60 font-bold text-lg leading-relaxed">
                  Bas apni dukan ke baare mein boliye, AI sab kuch khud bana dega. Sabse tez!
                </p>
              </button>

              <button 
                onClick={() => setStep(4)}
                className="bg-bg-surface/50 backdrop-blur-xl border border-border-dark p-12 rounded-[3rem] hover:border-accent-gold transition-all group text-left"
              >
                <div className="w-20 h-20 bg-accent-gold rounded-[2rem] flex items-center justify-center text-bg-base mb-8 group-hover:scale-110 transition-transform">
                  <User size={40} />
                </div>
                <h3 className="text-3xl font-display font-black text-white mb-4">Form Bhar Ke</h3>
                <p className="text-text-light/60 font-bold text-lg leading-relaxed">
                  Details khud bharein aur apni pasand ki bhasha chunein. Bilkul simple.
                </p>
              </button>
            </div>
          </motion.div>
        ) : step === 3 ? (
          <motion.div 
            key="voice-step"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl text-center"
          >
            <div className="mb-12">
              <h2 className="text-5xl font-display font-black text-white mb-4">Boliye...</h2>
              <p className="text-xl text-text-light/60 font-bold">Apni dukan ke baare mein batayein.</p>
            </div>
            <VoiceRecorder onComplete={() => navigate('/dashboard')} />
            <button onClick={() => setStep(2)} className="mt-12 text-text-light/40 hover:text-white font-black uppercase tracking-widest text-xs transition-colors">Change Method</button>
          </motion.div>
        ) : (
          <motion.div 
            key="form-step"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl text-center"
          >
            <div className="mb-12">
              <h2 className="text-5xl font-display font-black text-white mb-4">Details Bharein</h2>
              <p className="text-xl text-text-light/60 font-bold">Bas kuch sawalon ke jawab dein.</p>
            </div>
            <FormBuilder onComplete={() => navigate('/dashboard')} />
            <button onClick={() => setStep(2)} className="mt-12 text-text-light/40 hover:text-white font-black uppercase tracking-widest text-xs transition-colors">Change Method</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Auth;

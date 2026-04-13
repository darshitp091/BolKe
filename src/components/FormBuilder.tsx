import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Save, Globe, MessageSquare, MapPin, Store, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface FormBuilderProps {
  onComplete: (data: any) => void;
}

const FormBuilder = ({ onComplete }: FormBuilderProps) => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    location: '',
    description: '',
    whatsapp_number: '',
    language: 'Hindi'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/generate-site-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        onComplete(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-bg-surface/50 backdrop-blur-xl rounded-[3rem] border border-border-dark p-8 md:p-12 text-left"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-accent-saffron uppercase tracking-widest ml-1">Dukan ka Naam</label>
            <div className="relative">
              <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light/40" size={20} />
              <input 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Ramesh Sweets"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-accent-saffron outline-none transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-accent-saffron uppercase tracking-widest ml-1">Language</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light/40" size={20} />
              <select 
                value={formData.language}
                onChange={(e) => setFormData({...formData, language: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-accent-saffron outline-none transition-all appearance-none"
              >
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
                <option value="Marathi">Marathi</option>
                <option value="Bengali">Bengali</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-accent-saffron uppercase tracking-widest ml-1">WhatsApp Number</label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light/40" size={20} />
              <input 
                required
                value={formData.whatsapp_number}
                onChange={(e) => setFormData({...formData, whatsapp_number: e.target.value})}
                placeholder="+91 98765 43210"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-accent-saffron outline-none transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-accent-saffron uppercase tracking-widest ml-1">Location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light/40" size={20} />
              <input 
                required
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Jaipur, Rajasthan"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-accent-saffron outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-accent-saffron uppercase tracking-widest ml-1">Dukan ke baare mein batayein</label>
          <textarea 
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Hamare yahan asli Rajasthani swaad milta hai..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-accent-saffron outline-none transition-all resize-none"
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-accent-saffron hover:bg-accent-gold text-bg-base py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-accent-saffron/20 flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <Save size={24} />}
          Website Banayein
        </button>
      </form>
    </motion.div>
  );
};

export default FormBuilder;

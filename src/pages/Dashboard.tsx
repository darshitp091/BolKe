import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { Globe, Settings, ExternalLink, Plus, CreditCard, Layout, Zap, X, Mic, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VoiceRecorder from '../components/VoiceRecorder';
import { MOCK_SHOPS } from '../services/mockData';

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const [shops, setShops] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [creationMode, setCreationMode] = useState<'selection' | 'voice' | 'form'>('selection');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await fetch('/api/shops', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          // Merge real shops with sample mock shops for demo
          setShops([...data, MOCK_SHOPS[0], MOCK_SHOPS[1], MOCK_SHOPS[3]]);
        } else {
          // If server is down, show mock shops only
          setShops([MOCK_SHOPS[0], MOCK_SHOPS[1], MOCK_SHOPS[3]]);
        }
      } catch (err) {
        setShops([MOCK_SHOPS[0], MOCK_SHOPS[1], MOCK_SHOPS[3]]);
      } finally {
        setIsLoading(false);
      }
    };
    if (token) fetchShops();
  }, [token]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar />
      
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-2">
              Namaste, <span className="text-accent-saffron">{user.name}</span>!
            </h1>
            <p className="text-text-light/60 font-bold text-lg">Aapka BolKe Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-bg-surface p-4 rounded-2xl border border-border-dark flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${user.plan === 'free' ? 'bg-text-muted' : 'bg-success shadow-[0_0_10px_rgba(34,197,94,0.5)]'}`}></div>
              <span className="text-white font-black uppercase tracking-widest text-xs">Plan: {user.plan}</span>
            </div>
            <button onClick={logout} className="text-danger font-black uppercase tracking-widest text-xs hover:underline">Logout</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Shops */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-display font-black text-white">Aapki Websites</h2>
              <button 
                onClick={() => {
                  setCreationMode('selection');
                  setShowModal(true);
                }}
                className="bg-accent-saffron text-bg-base px-6 py-3 rounded-xl font-black flex items-center gap-2 hover:bg-accent-gold transition-all"
              >
                <Plus size={20} />
                Nayi Website
              </button>
            </div>

            {isLoading ? (
              <div className="h-64 bg-bg-surface/30 rounded-[2.5rem] border border-dashed border-border-dark flex items-center justify-center">
                <div className="animate-spin text-accent-saffron">
                  <Zap size={32} />
                </div>
              </div>
            ) : shops.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {shops.map((shop) => (
                  <motion.div 
                    key={shop.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-bg-surface p-8 rounded-[2.5rem] border border-border-dark hover:border-accent-saffron/30 transition-all group"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-accent-saffron/10 rounded-2xl flex items-center justify-center text-accent-saffron">
                          <Globe size={32} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-display font-black text-white mb-1">{shop.name}</h3>
                          <p className="text-text-light/40 font-mono text-sm">{shop.slug}.bolke.in</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <Link 
                          to={`/s/${shop.slug}`} 
                          target="_blank" 
                          className="flex-1 md:flex-none bg-white/5 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                        >
                          <ExternalLink size={18} />
                          Visit
                        </Link>
                        <Link 
                          to={`/dashboard/edit/${shop.id}`}
                          className="flex-1 md:flex-none bg-accent-saffron/10 text-accent-saffron px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent-saffron/20 transition-all"
                        >
                          <Settings size={18} />
                          Edit
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="h-64 bg-bg-surface/30 rounded-[2.5rem] border border-dashed border-border-dark flex flex-col items-center justify-center text-center p-8">
                <p className="text-text-light/40 font-bold text-lg mb-6">Abhi tak koi website nahi banayi.</p>
                <button className="text-accent-saffron font-black uppercase tracking-widest text-sm hover:underline">Pehli Website Banao →</button>
              </div>
            )}
          </div>

          {/* Sidebar: Plan & Stats */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-accent-saffron to-accent-gold p-8 rounded-[2.5rem] text-bg-base relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 opacity-10 rotate-12">
                <Zap size={200} />
              </div>
              <h3 className="text-2xl font-display font-black mb-4">Upgrade Karein</h3>
              <p className="font-bold mb-8 opacity-90 leading-relaxed">
                {user.plan === 'free' 
                  ? "Premium features unlock karein aur apni dukan ko brand banayein." 
                  : "Aap ek premium member hain! Naye features ka maza lein."}
              </p>
              {user.plan === 'free' && (
                <button className="w-full bg-bg-base text-white py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl">
                  View Plans
                </button>
              )}
            </div>

            <div className="bg-bg-surface p-8 rounded-[2.5rem] border border-border-dark">
              <h3 className="text-xl font-display font-black text-white mb-6">Quick Stats</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-text-light/60">
                    <Layout size={18} />
                    <span className="font-bold">Websites</span>
                  </div>
                  <span className="text-white font-black">{shops.length} / {user.plan === 'free' ? '1' : 'Unlimited'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-text-light/60">
                    <CreditCard size={18} />
                    <span className="font-bold">Plan</span>
                  </div>
                  <span className="text-accent-saffron font-black uppercase">{user.plan}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Creation Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-bg-base/90 backdrop-blur-md"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-bg-surface border border-border-dark rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-8 right-8 text-text-light/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="p-12">
                {creationMode === 'selection' && (
                  <div className="text-center">
                    <h2 className="text-4xl font-display font-black text-white mb-4">Kaise Banana Chahte Hain?</h2>
                    <p className="text-text-light/60 font-bold mb-12">Chonhiye aapke liye sabse aasaan tareeka.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <button 
                        onClick={() => setCreationMode('voice')}
                        className="group p-8 bg-white/5 border border-white/10 rounded-[2.5rem] text-left hover:border-accent-saffron transition-all"
                      >
                        <div className="w-16 h-16 bg-accent-saffron/10 text-accent-saffron rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <Mic size={32} />
                        </div>
                        <h4 className="text-2xl font-display font-black text-white mb-2">BolKe Banao</h4>
                        <p className="text-text-light/40 font-bold text-sm">Bas apni dukan ke baare mein boliye aur AI website bana dega.</p>
                      </button>

                      <button 
                        onClick={() => navigate('/form-builder')}
                        className="group p-8 bg-white/5 border border-white/10 rounded-[2.5rem] text-left hover:border-accent-haldi transition-all"
                      >
                        <div className="w-16 h-16 bg-accent-haldi/10 text-accent-haldi rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <FileText size={32} />
                        </div>
                        <h4 className="text-2xl font-display font-black text-white mb-2">Likh Kar Banao</h4>
                        <p className="text-text-light/40 font-bold text-sm">Ek simple form bhariye aur manually apni details daaliye.</p>
                      </button>
                    </div>
                  </div>
                )}

                {creationMode === 'voice' && (
                  <div className="py-4">
                    <VoiceRecorder 
                      onComplete={() => {
                        setShowModal(false);
                        window.location.reload();
                      }} 
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { 
  Save, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  ArrowLeft, 
  Package, 
  Layout, 
  MessageSquare,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ShopAdmin = () => {
  const { shopId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  
  const [shop, setShop] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('details'); // 'details', 'products', 'design'
  const [selectedTheme, setSelectedTheme] = useState('modern-saffron');
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [shopRes, productsRes] = await Promise.all([
          fetch(`/api/shops/${shopId}`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`/api/shops/${shopId}/products`, { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        if (shopRes.ok) {
          const shopData = await shopRes.json();
          setShop(shopData);
          if (shopData.config_json) {
            const config = JSON.parse(shopData.config_json);
            setSelectedTheme(config.theme || 'modern-saffron');
          }
        }
        if (productsRes.ok) setProducts(await productsRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (token) fetchData();
  }, [shopId, token]);

  const handleShopUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch(`/api/shops/${shopId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(shop)
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Shop details updated successfully!' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update shop.' });
    } finally {
      setIsSaving(false);
    }
  };

  const addProduct = () => {
    setProducts([...products, { name: '', price: 0, description: '', image_url: '', isNew: true }]);
  };

  const handleProductSave = async (index: number) => {
    const product = products[index];
    setIsSaving(true);
    try {
      const method = product.id ? 'PUT' : 'POST';
      const url = product.id ? `/api/products/${product.id}` : `/api/shops/${shopId}/products`;
      
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product)
      });
      
      if (res.ok) {
        const savedProduct = await res.json();
        const newProducts = [...products];
        newProducts[index] = savedProduct;
        setProducts(newProducts);
        setMessage({ type: 'success', text: 'Product saved!' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save product.' });
    } finally {
      setIsSaving(false);
    }
  };

  const themes = [
    { id: 'modern-saffron', name: 'Premium Saffron', color: '#F15A24', description: 'Royal Indian feel with saffron accents.' },
    { id: 'royal-blue', name: 'Corporate Blue', color: '#2563EB', description: 'Professional and trust-building blue.' },
    { id: 'minimal-dark', name: 'Sleek Dark', color: '#ffffff', description: 'Modern dark theme for high-end brands.' },
    { id: 'nature-green', name: 'Organic Green', color: '#10B981', description: 'Fresh look for groceries and boutiques.' },
  ];

  const handleThemeUpdate = async (themeId: string) => {
    setSelectedTheme(themeId);
    setIsSaving(true);
    try {
      const config = shop.config_json ? JSON.parse(shop.config_json) : {};
      config.theme = themeId;
      
      const res = await fetch(`/api/shops/${shopId}/theme`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ config_json: config })
      });
      
      if (res.ok) {
        setMessage({ type: 'success', text: 'Design updated!' });
        setShop({ ...shop, config_json: JSON.stringify(config) });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update design.' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="min-h-screen bg-bg-base flex items-center justify-center"><Loader2 className="animate-spin text-accent-saffron" size={48} /></div>;

  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar />
      
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-text-light/60 hover:text-white mb-8 font-bold transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Tabs */}
          <div className="lg:w-64 space-y-2">
            {[
              { id: 'details', label: 'Shop Details', icon: Layout },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'design', label: 'Design & Colors', icon: ImageIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                  activeTab === tab.id 
                    ? 'bg-accent-saffron text-bg-base shadow-lg shadow-accent-saffron/20' 
                    : 'text-text-light/40 hover:bg-white/5 hover:text-white'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-bg-surface/50 backdrop-blur-xl rounded-[3rem] border border-border-dark p-8 md:p-12">
            {message && (
              <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 font-bold ${
                message.type === 'success' ? 'bg-success/10 text-success border border-success/20' : 'bg-danger/10 text-danger border border-danger/20'
              }`}>
                {message.type === 'success' ? <CheckCircle2 size={20} /> : <Trash2 size={20} />}
                {message.text}
              </div>
            )}

            {activeTab === 'details' && (
              <form onSubmit={handleShopUpdate} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-accent-saffron uppercase tracking-widest ml-1">Shop Name</label>
                    <input 
                      type="text" 
                      value={shop?.name || ''}
                      onChange={(e) => setShop({...shop, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-accent-saffron outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-accent-saffron uppercase tracking-widest ml-1">Category</label>
                    <input 
                      type="text" 
                      value={shop?.category || ''}
                      onChange={(e) => setShop({...shop, category: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-accent-saffron outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-accent-saffron uppercase tracking-widest ml-1">WhatsApp Number</label>
                    <input 
                      type="text" 
                      value={shop?.whatsapp_number || ''}
                      onChange={(e) => setShop({...shop, whatsapp_number: e.target.value})}
                      placeholder="+91 98765 43210"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-accent-saffron outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-accent-saffron uppercase tracking-widest ml-1">Location</label>
                    <input 
                      type="text" 
                      value={shop?.location || ''}
                      onChange={(e) => setShop({...shop, location: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-accent-saffron outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-accent-saffron uppercase tracking-widest ml-1">Description</label>
                  <textarea 
                    rows={4}
                    value={shop?.description || ''}
                    onChange={(e) => setShop({...shop, description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-accent-saffron outline-none transition-all resize-none"
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="bg-accent-saffron text-bg-base px-10 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-accent-gold transition-all disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                  Save Changes
                </button>
              </form>
            )}

            {activeTab === 'products' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-display font-black text-white">Manage Products</h3>
                  <button 
                    onClick={addProduct}
                    className="bg-white/5 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/10 transition-all"
                  >
                    <Plus size={20} />
                    Add Product
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {products.map((product, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-[2rem] p-6 flex flex-col md:flex-row gap-6 items-start">
                      <div className="w-full md:w-32 h-32 bg-white/5 rounded-2xl flex items-center justify-center text-text-light/20 overflow-hidden">
                        {product.image_url ? <img src={product.image_url} alt="" className="w-full h-full object-cover" /> : <ImageIcon size={32} />}
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <input 
                          placeholder="Product Name"
                          value={product.name}
                          onChange={(e) => {
                            const newProducts = [...products];
                            newProducts[idx].name = e.target.value;
                            setProducts(newProducts);
                          }}
                          className="bg-transparent border-b border-white/10 py-2 text-white outline-none focus:border-accent-saffron"
                        />
                        <input 
                          placeholder="Price (₹)"
                          type="number"
                          value={product.price}
                          onChange={(e) => {
                            const newProducts = [...products];
                            newProducts[idx].price = e.target.value;
                            setProducts(newProducts);
                          }}
                          className="bg-transparent border-b border-white/10 py-2 text-white outline-none focus:border-accent-saffron"
                        />
                        <textarea 
                          placeholder="Short description..."
                          value={product.description}
                          onChange={(e) => {
                            const newProducts = [...products];
                            newProducts[idx].description = e.target.value;
                            setProducts(newProducts);
                          }}
                          className="bg-transparent border-b border-white/10 py-2 text-white outline-none focus:border-accent-saffron md:col-span-2 resize-none"
                        />
                      </div>
                      <div className="flex md:flex-col gap-2 w-full md:w-auto">
                        <button 
                          onClick={() => handleProductSave(idx)}
                          className="flex-1 bg-accent-saffron/10 text-accent-saffron p-3 rounded-xl hover:bg-accent-saffron/20 transition-all"
                        >
                          <Save size={20} />
                        </button>
                        <button className="flex-1 bg-danger/10 text-danger p-3 rounded-xl hover:bg-danger/20 transition-all">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'design' && (
              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl font-display font-black text-white mb-2">Choose Your Vibe</h3>
                  <p className="text-text-light/40 font-bold mb-8">Apni dukan ka rang aur style choose karein.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {themes.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => handleThemeUpdate(theme.id)}
                        className={`p-6 rounded-[2rem] border-2 text-left transition-all ${
                          selectedTheme === theme.id 
                            ? 'bg-white/10 border-accent-saffron shadow-xl shadow-accent-saffron/10' 
                            : 'bg-white/5 border-transparent hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10" style={{ backgroundColor: theme.color + '20' }}>
                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.color }}></div>
                          </div>
                          <div>
                            <div className="text-white font-black">{theme.name}</div>
                            <div className="text-text-light/40 text-xs font-bold uppercase tracking-widest">{theme.id}</div>
                          </div>
                          {selectedTheme === theme.id && <div className="ml-auto bg-accent-saffron text-bg-base p-1 rounded-full"><CheckCircle2 size={16} /></div>}
                        </div>
                        <p className="text-text-light/60 text-sm font-bold">{theme.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-accent-saffron/5 border border-accent-saffron/20 p-8 rounded-[2.5rem]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-accent-saffron/10 text-accent-saffron rounded-2xl flex items-center justify-center">
                      <Layout size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-display font-black text-white">Live Preview</h4>
                      <p className="text-text-light/40 text-sm font-bold">See how your dukan looks right now.</p>
                    </div>
                  </div>
                  <a 
                    href={`/s/${shop?.slug}`}
                    target="_blank"
                    className="w-full bg-white text-bg-base py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-accent-saffron hover:text-white transition-all shadow-xl"
                  >
                    View Live Website
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShopAdmin;

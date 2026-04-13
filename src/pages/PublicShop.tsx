import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { getMockShopBySlug } from '../services/mockData';
import { 
  ShoppingBag, 
  MapPin, 
  Phone, 
  MessageCircle, 
  ExternalLink, 
  ArrowRight,
  Loader2,
  Package,
  Star,
  Info
} from 'lucide-react';

const PublicShop = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [shop, setShop] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        // Try mock data first for demo speed and resilience
        const mockData = getMockShopBySlug(slug || "");
        if (mockData) {
          setShop(mockData.shop);
          setProducts(mockData.products);
          setIsLoading(false);
          return;
        }

        // Fallback to API
        const response = await fetch(`/api/public/shop/${slug}`);
        if (!response.ok) throw new Error('Shop not found');
        
        const data = await response.json();
        setShop(data.shop);
        setProducts(data.products);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchShopData();
  }, [slug]);

  const handleWhatsAppOrder = (product?: any) => {
    const number = shop.whatsapp_number || "919876543210";
    const text = product 
      ? `Namaste! Mujhe aapki dukan "${shop.name}" se ye product chahiye: ${product.name} (Price: ₹${product.price}).`
      : `Namaste! Main aapki dukan "${shop.name}" se kuch poochna chahta hoon.`;
    
    window.open(`https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-orange-600" size={48} />
        <p className="font-bold text-gray-500 animate-pulse uppercase tracking-widest text-xs">Dukan Taiyar Ho Rahi Hai...</p>
      </div>
    );
  }

  if (error || !shop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Info size={48} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-4">Ye dukan abhi mojud nahi hai.</h1>
          <p className="text-gray-600 font-medium mb-8">Shayad link galat hai ya dukan ko hata diya gaya hai.</p>
          <a href="/" className="inline-block bg-orange-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-orange-600/20">Aapni Dukan Banayein</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-orange-100">
      {/* Premium Header/Hero */}
      <div className="relative h-[60vh] md:h-[70vh] bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src={`https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2000&auto=format&fit=crop`} 
            alt={shop.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/60 to-white"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <div className="inline-block px-4 py-1.5 bg-orange-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
            {shop.category || 'General Store'}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 drop-shadow-2xl">
            {shop.name}
          </h1>
          <p className="text-lg md:text-2xl font-bold text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            {shop.description}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => handleWhatsAppOrder()}
              className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-all shadow-xl"
            >
              <MessageCircle size={20} className="text-green-600" />
              Sawaal Poochein
            </button>
            <div className="flex items-center gap-2 px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl text-white font-bold border border-white/20">
              <MapPin size={20} className="text-orange-400" />
              {shop.location}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <h2 className="text-xs font-black text-orange-600 uppercase tracking-[0.3em] mb-3">Hamaare Products</h2>
            <h3 className="text-4xl md:text-6xl font-black text-gray-900">Sabse Behtareen <br/>Chiyein</h3>
          </div>
          <div className="h-px bg-gray-100 flex-1 hidden md:block mb-6 mx-12"></div>
          <div className="flex items-center gap-2 text-gray-400 font-bold">
            <Package size={20} />
            <span>{products.length} Items Available</span>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-2 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-orange-200 transition-all"
              >
                <div className="h-80 bg-gray-200 rounded-[2rem] overflow-hidden mb-6 relative">
                  <img 
                    src={product.image_url || `https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop`} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl font-black text-orange-600 shadow-sm">
                    ₹{product.price}
                  </div>
                </div>
                <div className="px-6 pb-8">
                  <div className="flex items-center gap-1 text-orange-400 mb-2">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                  <h4 className="text-2xl font-black text-gray-900 mb-2">{product.name}</h4>
                  <p className="text-gray-500 font-medium mb-8 line-clamp-2">{product.description}</p>
                  
                  <button 
                    onClick={() => handleWhatsAppOrder(product)}
                    className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 group-hover:bg-orange-600 transition-colors shadow-lg"
                  >
                    Order On WhatsApp
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <ShoppingBag className="mx-auto text-gray-300 mb-6" size={64} />
            <p className="text-xl font-bold text-gray-400">Abhi koi product nahi hai.</p>
          </div>
        )}
      </div>

      {/* Footer / About Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
                Asli Quality Aur Bharosa, <br/>Har Kadam Par.
              </h2>
              <p className="text-lg text-gray-600 font-medium mb-12 leading-relaxed">
                Hamari dukan {shop.location} mein pichle kaafi samay se aapki seva mein hai. Quality aur imandaari hamara udeshya hai.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-600 border border-gray-100">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h5 className="font-black text-xs uppercase tracking-widest text-gray-400">Address</h5>
                    <p className="font-bold text-gray-900">{shop.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-orange-600 border border-gray-100">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h5 className="font-black text-xs uppercase tracking-widest text-gray-400">WhatsApp</h5>
                    <p className="font-bold text-gray-900">{shop.whatsapp_number || "+91 98765 43210"}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-[3rem] shadow-2xl shadow-orange-600/5 rotate-2">
              <div className="rounded-[2.5rem] overflow-hidden">
                <img src={`https://source.unsplash.com/featured/?building,${encodeURIComponent(shop.category || 'store')}`} alt="Shop exterior" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Branding */}
      <div className="py-12 border-t border-gray-100 text-center">
        <p className="text-gray-400 font-bold text-sm">
          Made with <span className="text-orange-600">BolKe</span> - India's #1 Voice Website Builder
        </p>
      </div>

      {/* Sticky Floating Action Button */}
      <button 
        onClick={() => handleWhatsAppOrder()}
        className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-2xl shadow-2xl hover:scale-110 transition-all z-[100] group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Chat Karein
        </span>
      </button>
    </div>
  );
};

export default PublicShop;

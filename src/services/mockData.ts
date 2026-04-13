export interface Product {
  id: number | string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
}

export interface Shop {
  id: number | string;
  name: string;
  slug: string;
  category: string;
  location: string;
  description: string;
  whatsapp_number: string;
  config_json: string;
}

export const MOCK_SHOPS: Shop[] = [
  {
    id: "m1",
    name: "Ethnic Edit Boutique",
    slug: "ethnic-edit",
    category: "Clothing",
    location: "Lajpat Nagar, Delhi",
    description: "Premium handcrafted ethnic wear for women. Specializing in Chikankari and Phulkari designs for every occasion.",
    whatsapp_number: "919876543210",
    config_json: JSON.stringify({ theme: "modern-saffron", accent: "#F15A24" })
  },
  {
    id: "m2",
    name: "Apex Auto Garage",
    slug: "apex-garage",
    category: "Mechanic/Garage",
    location: "Sector 18, Noida",
    description: "Professional car repair and detailing services. From engine tuning to high-end ceramic coating, we fix it all with precision.",
    whatsapp_number: "919988776655",
    config_json: JSON.stringify({ theme: "minimal-dark", accent: "#3b82f6" })
  },
  {
    id: "m3",
    name: "Dhanvantari Dental Clinic",
    slug: "dhanvantari-clinic",
    category: "Healthcare/Doctor",
    location: "Andheri West, Mumbai",
    description: "Complete dental care family clinic. Painless procedures, braces, and cosmetic dentistry by experts with 15+ years experience.",
    whatsapp_number: "919122334455",
    config_json: JSON.stringify({ theme: "royal-blue", accent: "#2563EB" })
  },
  {
    id: "m4",
    name: "Sone Ki Chidiya Jewels",
    slug: "sone-jewels",
    category: "Jewellery",
    location: "Zaveri Bazaar, Mumbai",
    description: "Legacy jewellers since 1950. 24K Gold, Certified Diamonds, and Exquisite Antique Collections for the modern Indian bride.",
    whatsapp_number: "919000012345",
    config_json: JSON.stringify({ theme: "modern-saffron", accent: "#c5a059" })
  },
  {
    id: "m5",
    name: "Bharat Foundry Supplies",
    slug: "bharat-foundry",
    category: "Manufacturing",
    location: "Peenya Industrial Area, Bangalore",
    description: "ISO certified precision machinery parts and foundry solutions. Premium materials and engineering excellence for global industries.",
    whatsapp_number: "919845012345",
    config_json: JSON.stringify({ theme: "nature-green", accent: "#059669" })
  },
  {
    id: "m6",
    name: "QuickFix Plumbing",
    slug: "quickfix-plumbing",
    category: "Services",
    location: "HSR Layout, Bangalore",
    description: "Emergency plumbing and installation services. Available 24/7 for house leaks, new fittings, and maintenance.",
    whatsapp_number: "919123456789",
    config_json: JSON.stringify({ theme: "royal-blue", accent: "#3b82f6" })
  }
];

export const MOCK_PRODUCTS: Record<string, Product[]> = {
  "m1": [
    { id: 1, name: "Hand-painted Silk Saree", price: 4500, description: "Authentic Chanderi silk with intricate floral art.", image_url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c", category: "Sarees" },
    { id: 2, name: "Embroidered Kurta Set", price: 2999, description: "Soft cotton kurta with heavy Zardosi work.", image_url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b", category: "Kuitas" }
  ],
  "m2": [
    { id: 3, name: "Full Body Ceramic Coating", price: 12000, description: "Premium 9H coating with 3-year warranty.", image_url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d", category: "Detailing" },
    { id: 4, name: "Synthetic Oil Change", price: 3500, description: "High-grade engine oil with filter replacement.", image_url: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d", category: "Maintenance" }
  ],
  "m3": [
    { id: 5, name: "Teeth Whitening Session", price: 1500, description: "Professional bleaching for a brighter smile.", image_url: "https://images.unsplash.com/photo-1588776814546-1ffce47267a5", category: "Cosmetic" },
    { id: 6, name: "Regular Dental Checkup", price: 250, description: "Full oral scanning and consultation.", image_url: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95", category: "Consultation" }
  ],
  "m4": [
    { id: 7, name: "Gold Choker Necklace", price: 85000, description: "22K Hallmark gold with temple designs.", image_url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338", category: "Gold" },
    { id: 8, name: "Diamond Stud Earrings", price: 42000, description: "VVS Quality diamonds in 18K white gold.", image_url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908", category: "Diamonds" }
  ]
};

export const getMockShopBySlug = (slug: string) => {
  const shop = MOCK_SHOPS.find(s => s.slug === slug);
  if (!shop) return null;
  return {
    shop,
    products: MOCK_PRODUCTS[shop.id] || []
  };
};

export const generateMockFromText = (text: string) => {
  const lowerText = text.toLowerCase();
  
  // Keyword detection logic
  if (lowerText.includes("kapde") || lowerText.includes("clothing") || lowerText.includes("boutique")) return MOCK_SHOPS[0];
  if (lowerText.includes("car") || lowerText.includes("mechanic") || lowerText.includes("garage")) return MOCK_SHOPS[1];
  if (lowerText.includes("doctor") || lowerText.includes("clinic") || lowerText.includes("dentist")) return MOCK_SHOPS[2];
  if (lowerText.includes("sona") || lowerText.includes("jewel") || lowerText.includes("gold")) return MOCK_SHOPS[3];
  if (lowerText.includes("machine") || lowerText.includes("manufacturing") || lowerText.includes("factory")) return MOCK_SHOPS[4];
  
  // Default to first mock shop if no keywords found
  return MOCK_SHOPS[Math.floor(Math.random() * MOCK_SHOPS.length)];
};

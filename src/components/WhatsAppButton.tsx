import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = "919876543210"; // Placeholder
  const message = encodeURIComponent("Namaste! Mujhe BolKe ke baare mein aur jaanna hai.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 group"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={32} className="group-hover:animate-pulse" />
      <div className="absolute right-full mr-4 bg-white text-text-dark px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl border border-gray-100 pointer-events-none">
        Help chahiye? WhatsApp karein!
      </div>
    </motion.a>
  );
};

export default WhatsAppButton;

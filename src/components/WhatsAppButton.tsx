import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/message/62SCPG5X7JK3A1"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-20 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-2xl p-4 transition-all duration-300 hover:scale-105"
      style={{ boxShadow: '0 8px 24px -4px rgba(37, 211, 102, 0.4)' }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      data-cursor-hover
    >
      <MessageCircle size={28} fill="white" strokeWidth={0} />
    </motion.a>
  );
};

export default WhatsAppButton;

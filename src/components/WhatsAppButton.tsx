import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/message/62SCPG5X7JK3A1"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-20 right-6 z-50 rounded-2xl p-4 transition-all duration-300 hover:scale-105"
      style={{
        background: 'hsl(152 32% 36%)',
        color: 'white',
        boxShadow: '0 6px 20px -4px hsl(152 32% 28% / 0.30), 0 2px 8px -2px hsl(152 32% 28% / 0.12)',
        border: '1px solid hsl(152 32% 42% / 0.25)',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      data-cursor-hover
    >
      <MessageCircle size={26} fill="white" strokeWidth={0} />
    </motion.a>
  );
};

export default WhatsAppButton;

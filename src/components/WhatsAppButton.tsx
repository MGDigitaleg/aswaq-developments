import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/message/62SCPG5X7JK3A1"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-2xl p-4 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
      style={{ boxShadow: '0 4px 20px -4px rgba(37, 211, 102, 0.4)' }}
    >
      <MessageCircle size={28} fill="white" strokeWidth={0} />
    </a>
  );
};

export default WhatsAppButton;

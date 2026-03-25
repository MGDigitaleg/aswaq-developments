import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/message/62SCPG5X7JK3A1"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-24 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe57] text-white rounded-full p-3.5 shadow-premium-lg hover:shadow-premium-xl transition-all duration-300 hover:scale-110"
    >
      <MessageCircle size={24} fill="white" strokeWidth={0} />
    </a>
  );
};

export default WhatsAppButton;

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, FileText, MessageSquare, Building2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const StickyActionBar = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const location = useLocation();
  const isArabic = location.pathname.startsWith("/ar");
  const prefix = isArabic ? "/ar" : "";

  // Hide on admin pages
  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdmin) return;
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAdmin]);

  if (isAdmin || dismissed) return null;

  const actions = [
    {
      icon: FileText,
      label: isArabic ? "بروشور" : "Brochure",
      href: `${prefix}/contact`,
      isLink: true,
    },
    {
      icon: MessageSquare,
      label: isArabic ? "واتساب" : "WhatsApp",
      href: "https://wa.me/message/62SCPG5X7JK3A1",
      isExternal: true,
    },
    {
      icon: Phone,
      label: isArabic ? "اتصل" : "Call",
      href: "tel:19474",
      isExternal: true,
    },
    {
      icon: Building2,
      label: isArabic ? "الوحدات" : "Units",
      href: `${prefix}/units`,
      isLink: true,
    },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 glass-dark rounded-2xl px-2 py-2 flex items-center gap-1"
          style={{ boxShadow: "var(--shadow-premium)" }}
        >
          {actions.map((action) => {
            const content = (
              <div className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl hover:bg-primary-foreground/10 transition-colors duration-200 cursor-pointer">
                <action.icon size={18} className="text-primary-foreground" />
                <span className="text-[10px] font-body font-medium text-primary-foreground/70">{action.label}</span>
              </div>
            );
            if (action.isLink) {
              return <Link key={action.label} to={action.href}>{content}</Link>;
            }
            return (
              <a key={action.label} href={action.href} target={action.isExternal ? "_blank" : undefined} rel="noopener noreferrer">
                {content}
              </a>
            );
          })}
          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 rounded-full hover:bg-primary-foreground/10 transition-colors ml-1"
            aria-label="Dismiss"
          >
            <X size={14} className="text-primary-foreground/40" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyActionBar;

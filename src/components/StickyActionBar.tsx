import { Link, useLocation } from "react-router-dom";
import { Download, MessageCircle, Phone, Building2 } from "lucide-react";
import { useState, useEffect } from "react";

const StickyActionBar = () => {
  const location = useLocation();
  const isArabic = location.pathname.startsWith("/ar");
  const prefix = isArabic ? "/ar" : "";
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const current = window.scrollY;
      setVisible(current > 400);
      // Hide when near bottom (footer area)
      const nearBottom = current + window.innerHeight > document.body.scrollHeight - 200;
      setHidden(nearBottom);
      lastScroll = current;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible || hidden) return null;

  const actions = [
    {
      icon: Building2,
      label: isArabic ? "استكشف المشاريع" : "Explore Projects",
      href: `${prefix}/projects`,
      type: "link" as const,
    },
    {
      icon: Phone,
      label: isArabic ? "اتصل بنا" : "Request Availability",
      href: `${prefix}/contact`,
      type: "link" as const,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/message/62SCPG5X7JK3A1",
      type: "external" as const,
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-slide-up">
      <div className="glass-dark rounded-2xl border border-primary-foreground/10 px-2 py-2 flex items-center gap-1.5 shadow-premium-xl">
        {actions.map((action) =>
          action.type === "external" ? (
            <a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/5 transition-all duration-300 font-body whitespace-nowrap"
            >
              <action.icon size={16} />
              <span className="hidden sm:inline">{action.label}</span>
            </a>
          ) : (
            <Link
              key={action.label}
              to={action.href}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/5 transition-all duration-300 font-body whitespace-nowrap"
            >
              <action.icon size={16} />
              <span className="hidden sm:inline">{action.label}</span>
            </Link>
          )
        )}
        <Link
          to={`${prefix}/contact`}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-accent text-accent-foreground hover:bg-gold-light transition-all duration-300 font-body whitespace-nowrap"
        >
          <Download size={16} />
          <span className="hidden sm:inline">{isArabic ? "تواصل معنا" : "Get Brochure"}</span>
        </Link>
      </div>
    </div>
  );
};

export default StickyActionBar;

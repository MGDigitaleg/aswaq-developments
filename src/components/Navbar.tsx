import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import aswaqLogo from "@/assets/aswaq-logo.webp";


interface NavChild {
  label: string;
  href: string;
  children?: NavChild[];
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

const getNavLinks = (prefix: string): NavItem[] => [
  { label: prefix ? "الرئيسية" : "Home", href: `${prefix}/` },
  { label: prefix ? "من نحن" : "About Us", href: `${prefix}/about` },
  {
    label: prefix ? "المشاريع" : "Projects",
    href: `${prefix}/projects`,
    children: [
      { label: prefix ? "سيتي هب مول" : "City Hub Mall", href: `${prefix}/projects/city-hub-mall` },
      { label: prefix ? "مريكادو مول" : "Mercado Mall", href: `${prefix}/projects/mercado-mall` },
      { label: prefix ? "أرينا مول" : "Arena Mall", href: `${prefix}/projects/arena-mall` },
      { label: prefix ? "سولاريا مول" : "Solaria Mall", href: `${prefix}/projects/solaria-mall` },
    ],
  },
  {
    label: prefix ? "اختر وحدتك" : "Choose your Unit",
    href: `${prefix}/units`,
    children: [
      {
        label: prefix ? "وحدات للبيع" : "Units for Sale",
        href: `${prefix}/units/for-sale`,
        children: [
          { label: prefix ? "وحدات تجارية للبيع" : "Commercial Units for Sale", href: `${prefix}/units/commercial-for-sale` },
          { label: prefix ? "وحدات إدارية للبيع" : "Administrative Units for Sale", href: `${prefix}/units/administrative-for-sale` },
          { label: prefix ? "وحدات طبية للبيع" : "Medical Units for Sale", href: `${prefix}/units/medical-for-sale` },
        ],
      },
      {
        label: prefix ? "وحدات للاستثمار" : "Units for Investment",
        href: `${prefix}/units/for-investment`,
        children: [
          { label: prefix ? "وحدات تجارية للاستثمار" : "Commercial Units for Investment", href: `${prefix}/units/commercial-for-investment` },
          { label: prefix ? "وحدات إدارية للاستثمار" : "Administrative Units for Investment", href: `${prefix}/units/administrative-for-investment` },
          { label: prefix ? "وحدات طبية للاستثمار" : "Medical Units for Investment", href: `${prefix}/units/medical-for-investment` },
        ],
      },
      {
        label: prefix ? "وحدات للإيجار" : "Units for Rent",
        href: `${prefix}/units/for-rent`,
        children: [
          { label: prefix ? "وحدات تجارية للإيجار" : "Commercial Units for Rent", href: `${prefix}/units/commercial-for-rent` },
          { label: prefix ? "وحدات إدارية للإيجار" : "Administrative Units for Rent", href: `${prefix}/units/administrative-for-rent` },
          { label: prefix ? "وحدات طبية للإيجار" : "Medical Units for Rent", href: `${prefix}/units/medical-for-rent` },
        ],
      },
    ],
  },
  { label: prefix ? "الأخبار" : "News", href: `${prefix}/news` },
  { label: prefix ? "معرض الصور" : "Gallery", href: `${prefix}/gallery` },
  { label: prefix ? "الوظائف" : "Careers", href: `${prefix}/careers` },
  { label: prefix ? "تواصل معنا" : "Contact Us", href: `${prefix}/contact` },
];

const isPathInTree = (pathname: string, item: NavItem | NavChild): boolean => {
  if (pathname === item.href) return true;
  return item.children?.some((c) => isPathInTree(pathname, c)) ?? false;
};

/* ── Desktop Dropdown (simple) ── */
const SimpleDropdown = ({ item, isActive }: { item: NavItem; isActive: boolean }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <div className="flex items-center gap-1">
        <Link
          to={item.href}
          className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-accent ${isActive ? "text-accent" : "text-primary-foreground/80"}`}
        >
          {item.label}
        </Link>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isActive ? "text-accent" : "text-primary-foreground/80"} ${open ? "rotate-180" : ""}`} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-4 w-56 bg-background rounded-xl border border-border py-2 z-50"
            style={{ boxShadow: 'var(--shadow-xl)' }}
          >
            {item.children?.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                className="block px-5 py-2.5 text-sm font-medium text-foreground hover:bg-cream hover:text-accent transition-colors duration-200"
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Desktop Mega Menu (for Choose your Unit) ── */
const MegaMenu = ({ item, isActive }: { item: NavItem; isActive: boolean }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <div className="flex items-center gap-1">
        <Link
          to={item.href}
          className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-accent ${isActive ? "text-accent" : "text-primary-foreground/80"}`}
        >
          {item.label}
        </Link>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isActive ? "text-accent" : "text-primary-foreground/80"} ${open ? "rotate-180" : ""}`} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-background rounded-xl border border-border py-5 px-7 z-50 min-w-[540px]"
            style={{ boxShadow: 'var(--shadow-xl)' }}
          >
            <div className="grid grid-cols-3 gap-7">
              {item.children?.map((group) => (
                <div key={group.href}>
                  <Link
                    to={group.href}
                    className="block font-display font-bold text-sm text-foreground hover:text-accent transition-colors mb-3 pb-2 border-b border-border"
                  >
                    {group.label}
                  </Link>
                  {group.children?.map((sub) => (
                    <Link
                      key={sub.href}
                      to={sub.href}
                      className="block text-xs text-muted-foreground hover:text-accent transition-colors py-1.5"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Mobile Accordion ── */
const MobileAccordion = ({ item, pathname, onClose }: { item: NavItem; pathname: string; onClose: () => void }) => {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState<string | null>(null);
  const active = isPathInTree(pathname, item);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between text-sm font-medium py-3 transition-colors ${active ? "text-accent" : "text-primary-foreground/80"}`}
      >
        {item.label}
        <ChevronDown size={16} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pl-4"
          >
            {item.children?.map((child) =>
              child.children ? (
                <div key={child.href}>
                  <button
                    onClick={() => setSubOpen(subOpen === child.href ? null : child.href)}
                    className={`w-full flex items-center justify-between text-sm font-medium py-2.5 transition-colors ${isPathInTree(pathname, child) ? "text-accent" : "text-primary-foreground/60"}`}
                  >
                    {child.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${subOpen === child.href ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {subOpen === child.href && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-4"
                      >
                        {child.children.map((sub) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            onClick={onClose}
                            className={`block text-sm py-2 transition-colors ${pathname === sub.href ? "text-accent" : "text-primary-foreground/50"}`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={child.href}
                  to={child.href}
                  onClick={onClose}
                  className={`block text-sm font-medium py-2.5 transition-colors ${pathname === child.href ? "text-accent" : "text-primary-foreground/60"}`}
                >
                  {child.label}
                </Link>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Navbar ── */
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isArabic = location.pathname.startsWith("/ar");
  const prefix = isArabic ? "/ar" : "";
  const navLinks = getNavLinks(prefix);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLanguage = () => {
    if (isArabic) {
      const enPath = location.pathname.replace(/^\/ar/, "") || "/";
      navigate(enPath);
    } else {
      navigate(`/ar${location.pathname === "/" ? "" : location.pathname}`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-primary/95 backdrop-blur-lg shadow-lg"
          : "bg-primary"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <Link to={isArabic ? "/ar" : "/"}>
          <img src={aswaqLogo} alt="ASWAQ Developments" className="w-[200px]" width={200} height={79} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const active = isPathInTree(location.pathname, link);
            if (!link.children) {
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-accent ${active ? "text-accent" : "text-primary-foreground/80"}`}
                >
                  {link.label}
                </Link>
              );
            }
            const hasSubs = link.children.some((c) => c.children);
            if (hasSubs) return <MegaMenu key={link.href} item={link} isActive={active} />;
            return <SimpleDropdown key={link.href} item={link} isActive={active} />;
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          
          <button
            onClick={switchLanguage}
            className="flex items-center gap-1.5 text-sm font-medium text-primary-foreground/80 hover:text-accent transition-colors duration-300"
            aria-label="Switch language"
          >
            <Globe size={16} />
            {isArabic ? "EN" : "عربي"}
          </button>
          <Link
            to={`${prefix}/contact`}
            className="bg-accent text-accent-foreground px-6 py-2.5 text-sm font-semibold rounded-md hover:bg-gold-light transition-all duration-300"
          >
            {isArabic ? "تواصل معنا" : "Contact Us"}
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-primary-foreground" aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-primary border-t border-primary-foreground/10"
          >
            <nav className="container mx-auto py-4 px-4 flex flex-col gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <MobileAccordion
                    key={link.href}
                    item={link}
                    pathname={location.pathname}
                    onClose={() => setOpen(false)}
                  />
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-sm font-medium py-3 transition-colors ${location.pathname === link.href ? "text-accent" : "text-primary-foreground/80"}`}
                  >
                    {link.label}
                  </Link>
                ),
              )}
              <button
                onClick={() => { switchLanguage(); setOpen(false); }}
                className="flex items-center gap-2 text-sm font-medium text-primary-foreground/80 hover:text-accent transition-colors py-3"
              >
                <Globe size={16} />
                {isArabic ? "English" : "عربي"}
              </button>
              <Link
                to={`${prefix}/contact`}
                onClick={() => setOpen(false)}
                className="bg-accent text-accent-foreground px-6 py-2.5 text-sm font-semibold rounded-md text-center hover:bg-gold-light transition-colors mt-2"
              >
                {isArabic ? "تواصل معنا" : "Contact Us"}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

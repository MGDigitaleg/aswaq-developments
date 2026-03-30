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
          className={`text-[13px] font-medium tracking-[0.04em] transition-colors duration-300 hover:text-accent ${isActive ? "text-accent" : "text-primary-foreground/75"}`}
        >
          {item.label}
        </Link>
        <ChevronDown size={12} className={`transition-transform duration-300 ${isActive ? "text-accent" : "text-primary-foreground/50"} ${open ? "rotate-180" : ""}`} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 mt-5 w-56 rounded-xl border py-2 z-50 backdrop-blur-xl"
            style={{
              background: 'hsl(var(--background) / 0.97)',
              borderColor: 'hsl(var(--border) / 0.6)',
              boxShadow: '0 20px 50px -12px hsl(227 51% 10% / 0.25), 0 8px 20px -8px hsl(227 51% 10% / 0.12)',
            }}
          >
            {item.children?.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                className="block px-5 py-2.5 text-[13px] font-medium text-foreground hover:bg-cream hover:text-accent transition-all duration-200"
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
          className={`text-[13px] font-medium tracking-[0.04em] transition-colors duration-300 hover:text-accent ${isActive ? "text-accent" : "text-primary-foreground/75"}`}
        >
          {item.label}
        </Link>
        <ChevronDown size={12} className={`transition-transform duration-300 ${isActive ? "text-accent" : "text-primary-foreground/50"} ${open ? "rotate-180" : ""}`} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-5 rounded-xl border py-6 px-8 z-50 min-w-[560px] backdrop-blur-xl"
            style={{
              background: 'hsl(var(--background) / 0.97)',
              borderColor: 'hsl(var(--border) / 0.6)',
              boxShadow: '0 20px 50px -12px hsl(227 51% 10% / 0.25), 0 8px 20px -8px hsl(227 51% 10% / 0.12)',
            }}
          >
            <div className="grid grid-cols-3 gap-8">
              {item.children?.map((group) => (
                <div key={group.href}>
                  <Link
                    to={group.href}
                    className="block font-display font-bold text-[13px] text-foreground hover:text-accent transition-colors mb-3 pb-2.5 border-b border-border/60"
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
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        background: scrolled
          ? 'linear-gradient(180deg, hsl(227 51% 12% / 0.97) 0%, hsl(227 51% 14% / 0.95) 100%)'
          : 'linear-gradient(180deg, hsl(227 51% 14%) 0%, hsl(227 51% 16%) 100%)',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'none',
        boxShadow: scrolled
          ? '0 1px 0 0 hsl(var(--accent) / 0.08), 0 8px 32px -8px hsl(227 51% 8% / 0.4)'
          : '0 1px 0 0 hsl(var(--primary-foreground) / 0.04)',
      }}
    >
      {/* Subtle top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 10%, hsl(var(--accent) / 0.2) 50%, transparent 90%)' }}
      />

      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        {/* Logo */}
        <Link to={isArabic ? "/ar" : "/"} className="relative group shrink-0">
          <div
            className="absolute -inset-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'radial-gradient(ellipse at center, hsl(var(--accent) / 0.06), transparent 70%)' }}
          />
          <img src={aswaqLogo} alt="ASWAQ Developments" className="w-[200px] relative" width={200} height={79} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
          {navLinks.map((link) => {
            const active = isPathInTree(location.pathname, link);
            if (!link.children) {
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative text-[13px] font-medium tracking-[0.04em] transition-all duration-300 hover:text-accent ${active ? "text-accent" : "text-primary-foreground/75 hover:text-primary-foreground"}`}
                >
                  {link.label}
                  {/* Active indicator dot */}
                  {active && (
                    <span
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ backgroundColor: 'hsl(var(--accent))', boxShadow: '0 0 6px hsl(var(--accent) / 0.5)' }}
                    />
                  )}
                </Link>
              );
            }
            const hasSubs = link.children.some((c) => c.children);
            if (hasSubs) return <MegaMenu key={link.href} item={link} isActive={active} />;
            return <SimpleDropdown key={link.href} item={link} isActive={active} />;
          })}
        </nav>

        {/* Right: Language + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={switchLanguage}
            className="flex items-center gap-1.5 text-[13px] font-medium text-primary-foreground/60 hover:text-primary-foreground transition-all duration-300 px-2.5 py-1.5 rounded-md hover:bg-primary-foreground/5"
            aria-label={isArabic ? "Switch to English - EN" : "التبديل إلى العربية - عربي"}
          >
            <Globe size={14} className="opacity-70" />
            {isArabic ? "EN" : "عربي"}
          </button>

          {/* Separator */}
          <div className="w-px h-5" style={{ background: 'hsl(var(--primary-foreground) / 0.1)' }} />

          <Link
            to={`${prefix}/contact`}
            className="relative text-[13px] font-semibold rounded-md transition-all duration-300 font-body overflow-hidden group px-7 py-2.5"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(40 76% 45%) 100%)',
              color: 'hsl(var(--accent-foreground))',
              boxShadow: '0 2px 12px -2px hsl(var(--accent) / 0.3)',
            }}
          >
            <span className="relative z-10">{isArabic ? "تواصل معنا" : "Contact Us"}</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, hsl(40 76% 55%) 0%, hsl(var(--accent)) 100%)' }}
            />
          </Link>
        </div>

        {/* Mobile toggle */}
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
            className="lg:hidden border-t border-primary-foreground/[0.06]"
            style={{ background: 'linear-gradient(180deg, hsl(227 51% 13%) 0%, hsl(227 51% 15%) 100%)' }}
          >
            <nav className="container mx-auto py-5 px-4 flex flex-col gap-1">
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
              <div className="h-px my-2" style={{ background: 'hsl(var(--primary-foreground) / 0.06)' }} />
              <button
                onClick={() => { switchLanguage(); setOpen(false); }}
                className="flex items-center gap-2 text-sm font-medium text-primary-foreground/70 hover:text-accent transition-colors py-3"
              >
                <Globe size={16} />
                {isArabic ? "English" : "عربي"}
              </button>
              <Link
                to={`${prefix}/contact`}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold rounded-md text-center py-3 mt-1 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(40 76% 45%) 100%)',
                  color: 'hsl(var(--accent-foreground))',
                }}
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

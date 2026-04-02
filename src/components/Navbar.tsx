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
      <div className="flex items-center gap-1.5 cursor-pointer">
        <Link
          to={item.href}
          className={`text-[13px] font-medium tracking-[0.02em] transition-colors duration-300 hover:text-primary-foreground ${isActive ? "text-primary-foreground" : "text-primary-foreground/65"}`}
        >
          {item.label}
        </Link>
        <ChevronDown size={11} className={`transition-transform duration-300 ${isActive ? "text-primary-foreground/60" : "text-primary-foreground/35"} ${open ? "rotate-180" : ""}`} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 mt-5 w-56 rounded-2xl py-2.5 z-50"
            style={{
              background: 'hsl(226 76% 10% / 0.96)',
              backdropFilter: 'blur(28px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(28px) saturate(1.4)',
              border: '1px solid hsl(39 38% 93% / 0.07)',
              boxShadow: '0 24px 60px -12px hsl(226 76% 6% / 0.7), 0 0 0 1px hsl(39 38% 93% / 0.03)',
            }}
          >
            {item.children?.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                className="block px-5 py-2.5 text-[13px] font-medium text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/[0.04] transition-all duration-200 mx-1.5 rounded-lg"
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
      <div className="flex items-center gap-1.5 cursor-pointer">
        <Link
          to={item.href}
          className={`text-[13px] font-medium tracking-[0.02em] transition-colors duration-300 hover:text-primary-foreground ${isActive ? "text-primary-foreground" : "text-primary-foreground/65"}`}
        >
          {item.label}
        </Link>
        <ChevronDown size={11} className={`transition-transform duration-300 ${isActive ? "text-primary-foreground/60" : "text-primary-foreground/35"} ${open ? "rotate-180" : ""}`} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-5 rounded-2xl py-6 px-7 z-50 min-w-[560px]"
            style={{
              background: 'hsl(226 76% 10% / 0.96)',
              backdropFilter: 'blur(28px) saturate(1.4)',
              WebkitBackdropFilter: 'blur(28px) saturate(1.4)',
              border: '1px solid hsl(39 38% 93% / 0.07)',
              boxShadow: '0 24px 60px -12px hsl(226 76% 6% / 0.7), 0 0 0 1px hsl(39 38% 93% / 0.03)',
            }}
          >
            <div className="grid grid-cols-3 gap-7">
              {item.children?.map((group) => (
                <div key={group.href}>
                  <Link
                    to={group.href}
                    className="block font-display font-bold text-[11px] uppercase tracking-[0.15em] mb-4 pb-2.5 border-b transition-colors"
                    style={{ color: 'hsl(var(--gold) / 0.7)', borderColor: 'hsl(var(--gold) / 0.1)' }}
                  >
                    {group.label}
                  </Link>
                  {group.children?.map((sub) => (
                    <Link
                      key={sub.href}
                      to={sub.href}
                      className="block text-[12px] text-primary-foreground/50 hover:text-primary-foreground transition-colors py-1.5 leading-relaxed"
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
        className={`w-full flex items-center justify-between text-sm font-medium py-3.5 transition-colors ${active ? "text-primary-foreground" : "text-primary-foreground/75"}`}
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
                    className={`w-full flex items-center justify-between text-sm font-medium py-2.5 transition-colors ${isPathInTree(pathname, child) ? "text-primary-foreground" : "text-primary-foreground/55"}`}
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
                            className={`block text-sm py-2 transition-colors ${pathname === sub.href ? "text-primary-foreground" : "text-primary-foreground/45"}`}
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
                  className={`block text-sm font-medium py-2.5 transition-colors ${pathname === child.href ? "text-primary-foreground" : "text-primary-foreground/55"}`}
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
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();
  const isArabic = location.pathname.startsWith("/ar");
  const prefix = isArabic ? "/ar" : "";
  const navLinks = getNavLinks(prefix);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);

      if (currentY <= 300) {
        setVisible(true);
      } else if (currentY < lastScrollY.current) {
        setVisible(true);
      } else if (currentY > lastScrollY.current) {
        setVisible(false);
      }

      lastScrollY.current = currentY;
    };
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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.div
        className="pointer-events-auto relative mx-4 lg:mx-8 mt-4 lg:mt-5 w-full"
        style={{ maxWidth: '1360px' }}
        initial={false}
        animate={{
          y: visible ? 0 : -120,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="relative rounded-full overflow-visible px-5 lg:px-8 transition-all duration-500"
          style={{
            background: scrolled
              ? 'hsl(226 76% 9% / 0.95)'
              : 'hsl(226 76% 10% / 0.7)',
            backdropFilter: 'blur(32px) saturate(1.5)',
            WebkitBackdropFilter: 'blur(32px) saturate(1.5)',
            border: `1px solid ${scrolled ? 'hsl(39 38% 93% / 0.06)' : 'hsl(39 38% 93% / 0.08)'}`,
            boxShadow: scrolled
              ? '0 8px 40px -8px hsl(226 76% 6% / 0.65), inset 0 1px 0 0 hsl(39 38% 93% / 0.03)'
              : '0 4px 24px -4px hsl(226 76% 6% / 0.3), inset 0 1px 0 0 hsl(39 38% 93% / 0.05)',
          }}
        >
          {/* Subtle gold accent line at top */}
          <div
            className="absolute top-0 left-[20%] right-[20%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--gold) / 0.12), transparent)' }}
          />

          <div className="flex items-center justify-between py-3 lg:py-3.5">
            {/* Logo */}
            <Link to={isArabic ? "/ar" : "/"} className="relative group shrink-0">
              <img
                src={aswaqLogo}
                alt="ASWAQ Developments"
                className="w-[140px] lg:w-[155px] relative transition-opacity duration-300 group-hover:opacity-90"
                width={155}
                height={61}
              />
            </Link>

            {/* Desktop Nav — centered */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => {
                const active = isPathInTree(location.pathname, link);
                if (!link.children) {
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`relative text-[13px] font-medium tracking-[0.02em] transition-all duration-300 whitespace-nowrap ${
                        active
                          ? "text-primary-foreground"
                          : "text-primary-foreground/65 hover:text-primary-foreground"
                      }`}
                    >
                      {link.label}
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                          style={{ background: 'hsl(var(--gold))' }}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
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
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              <button
                onClick={switchLanguage}
                className="flex items-center gap-1.5 text-[12px] font-medium text-primary-foreground/45 hover:text-primary-foreground transition-all duration-300 px-2.5 py-1.5 rounded-full hover:bg-primary-foreground/[0.05]"
                aria-label={isArabic ? "Switch to English - EN" : "التبديل إلى العربية - عربي"}
              >
                <Globe size={13} className="opacity-50" />
                {isArabic ? "EN" : "عربي"}
              </button>

              {/* Divider */}
              <div className="w-px h-5 bg-primary-foreground/10" />

              <Link
                to={`${prefix}/contact`}
                className="relative text-[12px] font-semibold rounded-full transition-all duration-300 font-body overflow-hidden group px-6 py-2.5"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(41 56% 45%) 100%)',
                  color: 'hsl(226 76% 10%)',
                  boxShadow: '0 2px 12px -2px hsl(var(--gold) / 0.35)',
                }}
              >
                <span className="relative z-10 tracking-[0.03em]">{isArabic ? "تواصل معنا" : "Contact Us"}</span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, hsl(41 63% 61%) 0%, hsl(var(--gold)) 100%)' }}
                />
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-primary-foreground/80 hover:text-primary-foreground transition-colors p-1.5"
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden mt-2 mx-1 rounded-3xl overflow-hidden"
              style={{
                background: 'hsl(226 76% 9% / 0.96)',
                backdropFilter: 'blur(32px) saturate(1.5)',
                WebkitBackdropFilter: 'blur(32px) saturate(1.5)',
                border: '1px solid hsl(39 38% 93% / 0.06)',
                boxShadow: '0 16px 48px -8px hsl(226 76% 6% / 0.7)',
              }}
            >
              <nav className="py-5 px-6 flex flex-col gap-0.5">
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
                      className={`text-sm font-medium py-3.5 transition-colors ${location.pathname === link.href ? "text-primary-foreground" : "text-primary-foreground/75"}`}
                    >
                      {link.label}
                    </Link>
                  ),
                )}
                <div className="h-px my-3" style={{ background: 'hsl(39 38% 93% / 0.06)' }} />
                <button
                  onClick={() => { switchLanguage(); setOpen(false); }}
                  className="flex items-center gap-2 text-sm font-medium text-primary-foreground/60 hover:text-primary-foreground transition-colors py-3"
                >
                  <Globe size={16} />
                  {isArabic ? "English" : "عربي"}
                </button>
                <Link
                  to={`${prefix}/contact`}
                  onClick={() => setOpen(false)}
                  className="text-sm font-semibold rounded-full text-center py-3.5 mt-2 transition-all duration-300 tracking-wide"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--gold)) 0%, hsl(41 56% 45%) 100%)',
                    color: 'hsl(226 76% 10%)',
                  }}
                >
                  {isArabic ? "تواصل معنا" : "Contact Us"}
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Navbar;

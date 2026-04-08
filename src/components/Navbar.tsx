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
  priority?: "primary" | "secondary";
}

const getNavLinks = (prefix: string): NavItem[] => [
  { label: prefix ? "الرئيسية" : "Home", href: `${prefix}/`, priority: "primary" },
  { label: prefix ? "من نحن" : "About Us", href: `${prefix}/about`, priority: "primary" },
  {
    label: prefix ? "المشاريع" : "Projects",
    href: `${prefix}/projects`,
    priority: "primary",
    children: [
      { label: prefix ? "سيتي هب مول" : "City Hub Mall", href: `${prefix}/projects/city-hub-mall` },
      { label: prefix ? "مريكادو مول" : "Mercado Mall", href: `${prefix}/projects/mercado-mall` },
      { label: prefix ? "أرينا مول" : "Arena Mall", href: `${prefix}/projects/arena-mall` },
      { label: prefix ? "سولاريا مول" : "Solaria Mall", href: `${prefix}/projects/solaria-mall` },
    ],
  },
  {
    label: prefix ? "اختر وحدتك" : "Units",
    href: `${prefix}/units`,
    priority: "primary",
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
  { label: prefix ? "الأخبار" : "News", href: `${prefix}/news`, priority: "primary" },
  { label: prefix ? "معرض الصور" : "Gallery", href: `${prefix}/gallery`, priority: "secondary" },
  { label: prefix ? "الوظائف" : "Careers", href: `${prefix}/careers`, priority: "secondary" },
];

const isPathInTree = (pathname: string, item: NavItem | NavChild): boolean => {
  if (pathname === item.href) return true;
  return item.children?.some((c) => isPathInTree(pathname, c)) ?? false;
};

/* ── Desktop Dropdown ── */
const SimpleDropdown = ({ item, isActive }: { item: NavItem; isActive: boolean }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setOpen(true); };
  const handleLeave = () => { timeoutRef.current = setTimeout(() => setOpen(false), 150); };

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <div className="flex items-center gap-1 cursor-pointer">
        <Link
          to={item.href}
          className={`text-[12.5px] font-medium tracking-wide transition-colors duration-300 hover:text-primary-foreground ${isActive ? "text-primary-foreground" : "text-primary-foreground/50"}`}
        >
          {item.label}
        </Link>
        <ChevronDown size={9} className={`transition-transform duration-200 ${isActive ? "text-primary-foreground/35" : "text-primary-foreground/20"} ${open ? "rotate-180" : ""}`} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 mt-4 w-52 rounded-xl py-2 z-50"
            style={{
              background: 'hsl(222 47% 8% / 0.97)',
              backdropFilter: 'blur(24px) saturate(1.3)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.3)',
              border: '1px solid hsl(0 0% 100% / 0.05)',
              boxShadow: '0 16px 40px -10px hsl(222 47% 4% / 0.6)',
            }}
          >
            {item.children?.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                className="block px-4 py-2 text-[12px] font-medium text-primary-foreground/45 hover:text-primary-foreground hover:bg-primary-foreground/[0.03] transition-all duration-200 mx-1.5 rounded-lg"
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

/* ── Desktop Mega Menu ── */
const MegaMenu = ({ item, isActive }: { item: NavItem; isActive: boolean }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleEnter = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setOpen(true); };
  const handleLeave = () => { timeoutRef.current = setTimeout(() => setOpen(false), 150); };

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <div className="flex items-center gap-1 cursor-pointer">
        <Link
          to={item.href}
          className={`text-[12.5px] font-medium tracking-wide transition-colors duration-300 hover:text-primary-foreground ${isActive ? "text-primary-foreground" : "text-primary-foreground/50"}`}
        >
          {item.label}
        </Link>
        <ChevronDown size={9} className={`transition-transform duration-200 ${isActive ? "text-primary-foreground/35" : "text-primary-foreground/20"} ${open ? "rotate-180" : ""}`} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 rounded-xl py-5 px-6 z-50 min-w-[500px]"
            style={{
              background: 'hsl(222 47% 8% / 0.97)',
              backdropFilter: 'blur(24px) saturate(1.3)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.3)',
              border: '1px solid hsl(0 0% 100% / 0.05)',
              boxShadow: '0 16px 40px -10px hsl(222 47% 4% / 0.6)',
            }}
          >
            <div className="grid grid-cols-3 gap-6">
              {item.children?.map((group) => (
                <div key={group.href}>
                  <Link
                    to={group.href}
                    className="block font-body font-semibold text-[10px] uppercase tracking-[0.15em] mb-2.5 pb-2 border-b transition-colors text-primary-foreground/40 border-primary-foreground/[0.06] hover:text-primary-foreground/60"
                  >
                    {group.label}
                  </Link>
                  {group.children?.map((sub) => (
                    <Link
                      key={sub.href}
                      to={sub.href}
                      className="block text-[11.5px] text-primary-foreground/38 hover:text-primary-foreground transition-colors py-1.5 leading-relaxed"
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
        className={`w-full flex items-center justify-between text-[15px] font-medium py-3 transition-colors ${active ? "text-primary-foreground" : "text-primary-foreground/60"}`}
      >
        {item.label}
        <ChevronDown size={13} className={`transition-transform duration-200 ${open ? "rotate-180" : ""} text-primary-foreground/20`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pl-4 border-l border-primary-foreground/[0.06] ml-1">
              {item.children?.map((child) =>
                child.children ? (
                  <div key={child.href}>
                    <button
                      onClick={() => setSubOpen(subOpen === child.href ? null : child.href)}
                      className={`w-full flex items-center justify-between text-[13px] font-medium py-2 transition-colors ${isPathInTree(pathname, child) ? "text-primary-foreground" : "text-primary-foreground/40"}`}
                    >
                      {child.label}
                      <ChevronDown
                        size={11}
                        className={`transition-transform duration-200 ${subOpen === child.href ? "rotate-180" : ""} text-primary-foreground/18`}
                      />
                    </button>
                    <AnimatePresence>
                      {subOpen === child.href && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 border-l border-primary-foreground/[0.04]">
                            {child.children.map((sub) => (
                              <Link
                                key={sub.href}
                                to={sub.href}
                                onClick={onClose}
                                className={`block text-[12px] py-1.5 transition-colors ${pathname === sub.href ? "text-primary-foreground" : "text-primary-foreground/30"}`}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={child.href}
                    to={child.href}
                    onClick={onClose}
                    className={`block text-[13px] font-medium py-2 transition-colors ${pathname === child.href ? "text-primary-foreground" : "text-primary-foreground/40"}`}
                  >
                    {child.label}
                  </Link>
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ═════════════════════════════════════════════════
   NAVBAR — Premium Institutional Header
   ═════════════════════════════════════════════════ */
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

      if (currentY <= 200) {
        setVisible(true);
      } else if (currentY < lastScrollY.current - 5) {
        setVisible(true);
      } else if (currentY > lastScrollY.current + 5) {
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
        className="pointer-events-auto relative mx-4 lg:mx-8 mt-3 lg:mt-4 w-full"
        style={{ maxWidth: '1240px' }}
        initial={false}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      >
        <div
          className="relative rounded-xl overflow-visible transition-all duration-500"
          style={{
            background: scrolled
              ? 'hsl(222 47% 7% / 0.97)'
              : 'hsl(222 47% 9% / 0.72)',
            backdropFilter: 'blur(28px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(28px) saturate(1.4)',
            border: `1px solid hsl(0 0% 100% / ${scrolled ? '0.03' : '0.05'})`,
            boxShadow: scrolled
              ? '0 6px 24px -6px hsl(222 47% 4% / 0.45)'
              : '0 4px 20px -6px hsl(222 47% 4% / 0.15)',
          }}
        >
          <div className="flex items-center justify-between px-5 lg:px-7 py-2.5 lg:py-2.5">
            {/* Logo */}
            <Link to={isArabic ? "/ar" : "/"} className="relative group shrink-0">
              <img
                src={aswaqLogo}
                alt="ASWAQ Developments"
                className="w-[110px] lg:w-[120px] relative transition-opacity duration-300 group-hover:opacity-80"
                width={120}
                height={48}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-7 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => {
                const active = isPathInTree(location.pathname, link);
                const isSecondary = link.priority === "secondary";
                if (!link.children) {
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`relative text-[12.5px] font-medium tracking-wide transition-all duration-300 whitespace-nowrap ${
                        active
                          ? "text-primary-foreground"
                          : isSecondary
                            ? "text-primary-foreground/35 hover:text-primary-foreground/65"
                            : "text-primary-foreground/50 hover:text-primary-foreground"
                      }`}
                    >
                      {link.label}
                      {active && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-steel-light"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
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
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <button
                onClick={switchLanguage}
                className="text-[10.5px] font-semibold text-primary-foreground/30 hover:text-primary-foreground/60 transition-all duration-300 px-2 py-1.5 rounded-md hover:bg-primary-foreground/[0.03] uppercase tracking-[0.12em]"
                aria-label={isArabic ? "Switch to English - EN" : "التبديل إلى العربية - عربي"}
              >
                {isArabic ? "EN" : "عربي"}
              </button>

              <div className="w-px h-3 bg-primary-foreground/[0.06]" />

              <Link
                to={`${prefix}/contact`}
                className="text-[11px] font-semibold tracking-[0.05em] uppercase rounded-lg transition-all duration-300 font-body px-5 py-2 border border-primary-foreground/12 text-primary-foreground/70 hover:bg-primary-foreground/[0.05] hover:border-primary-foreground/20 hover:text-primary-foreground"
              >
                {isArabic ? "تواصل معنا" : "Contact Us"}
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-primary-foreground/55 hover:text-primary-foreground transition-colors p-1.5"
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:hidden mt-1.5 rounded-xl overflow-hidden"
              style={{
                background: 'hsl(222 47% 7% / 0.97)',
                backdropFilter: 'blur(28px) saturate(1.4)',
                WebkitBackdropFilter: 'blur(28px) saturate(1.4)',
                border: '1px solid hsl(0 0% 100% / 0.04)',
                boxShadow: '0 16px 40px -10px hsl(222 47% 4% / 0.5)',
              }}
            >
              <nav className="py-4 px-5 flex flex-col">
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
                      className={`text-[14px] font-medium py-3 transition-colors ${location.pathname === link.href ? "text-primary-foreground" : "text-primary-foreground/55"}`}
                    >
                      {link.label}
                    </Link>
                  ),
                )}

                <div className="h-px my-3" style={{ background: 'hsl(0 0% 100% / 0.04)' }} />

                <button
                  onClick={() => { switchLanguage(); setOpen(false); }}
                  className="flex items-center gap-2 text-[12px] font-semibold text-primary-foreground/40 hover:text-primary-foreground transition-colors py-2"
                >
                  <Globe size={13} className="opacity-40" />
                  {isArabic ? "English" : "عربي"}
                </button>

                <Link
                  to={`${prefix}/contact`}
                  onClick={() => setOpen(false)}
                  className="text-[11px] font-semibold uppercase tracking-[0.05em] rounded-lg text-center py-3 mt-3 transition-all duration-300 border border-primary-foreground/12 text-primary-foreground/70 hover:bg-primary-foreground/[0.04] hover:border-primary-foreground/20"
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

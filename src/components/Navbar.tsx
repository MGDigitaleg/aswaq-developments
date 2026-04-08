import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, ArrowRight, ArrowLeft } from "lucide-react";
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
  dropdownType?: "simple" | "tabbed";
}

const getNavLinks = (prefix: string): NavItem[] => [
  { label: prefix ? "الرئيسية" : "Home", href: `${prefix}/`, priority: "primary" },
  { label: prefix ? "من نحن" : "About Us", href: `${prefix}/about`, priority: "primary" },
  {
    label: prefix ? "المشاريع" : "Projects",
    href: `${prefix}/projects`,
    priority: "primary",
    dropdownType: "simple",
    children: [
      { label: prefix ? "جميع المشاريع" : "All Projects", href: `${prefix}/projects` },
      { label: prefix ? "سيتي هب مول" : "City Hub Mall", href: `${prefix}/projects/city-hub-mall` },
      { label: prefix ? "مريكادو مول" : "Mercado Mall", href: `${prefix}/projects/mercado-mall` },
      { label: prefix ? "أرينا مول" : "Arena Mall", href: `${prefix}/projects/arena-mall` },
      { label: prefix ? "سولاريا مول" : "Solaria Mall", href: `${prefix}/projects/solaria-mall` },
    ],
  },
  {
    label: prefix ? "الوحدات" : "Units",
    href: `${prefix}/units`,
    priority: "primary",
    dropdownType: "tabbed",
    children: [
      {
        label: prefix ? "للبيع" : "For Sale",
        href: `${prefix}/units/for-sale`,
        children: [
          { label: prefix ? "تجارية" : "Commercial", href: `${prefix}/units/commercial-for-sale` },
          { label: prefix ? "إدارية" : "Administrative", href: `${prefix}/units/administrative-for-sale` },
          { label: prefix ? "طبية" : "Medical", href: `${prefix}/units/medical-for-sale` },
        ],
      },
      {
        label: prefix ? "للإيجار" : "For Rent",
        href: `${prefix}/units/for-rent`,
        children: [
          { label: prefix ? "تجارية" : "Commercial", href: `${prefix}/units/commercial-for-rent` },
          { label: prefix ? "إدارية" : "Administrative", href: `${prefix}/units/administrative-for-rent` },
          { label: prefix ? "طبية" : "Medical", href: `${prefix}/units/medical-for-rent` },
        ],
      },
      {
        label: prefix ? "للاستثمار" : "For Investment",
        href: `${prefix}/units/for-investment`,
        children: [
          { label: prefix ? "تجارية" : "Commercial", href: `${prefix}/units/commercial-for-investment` },
          { label: prefix ? "إدارية" : "Administrative", href: `${prefix}/units/administrative-for-investment` },
          { label: prefix ? "طبية" : "Medical", href: `${prefix}/units/medical-for-investment` },
        ],
      },
    ],
  },
  { label: prefix ? "الأخبار" : "News", href: `${prefix}/news`, priority: "primary" },
  { label: prefix ? "تواصل معنا" : "Contact", href: `${prefix}/contact`, priority: "primary" },
  { label: prefix ? "معرض الصور" : "Gallery", href: `${prefix}/gallery`, priority: "secondary" },
  { label: prefix ? "الوظائف" : "Careers", href: `${prefix}/careers`, priority: "secondary" },
];

const isPathInTree = (pathname: string, item: NavItem | NavChild): boolean => {
  if (pathname === item.href) return true;
  return item.children?.some((c) => isPathInTree(pathname, c)) ?? false;
};

const dropdownStyle = {
  background: 'hsl(44 30% 97% / 0.98)',
  backdropFilter: 'blur(20px) saturate(1.2)',
  WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
  border: '1px solid hsl(230 15% 86% / 0.6)',
  boxShadow: '0 12px 36px -8px hsl(222 47% 10% / 0.12), 0 4px 12px -4px hsl(222 47% 10% / 0.06)',
};

/* ── Projects Dropdown (compact) ── */
const ProjectsDropdown = ({ item, isActive }: { item: NavItem; isActive: boolean }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleEnter = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setOpen(true); };
  const handleLeave = () => { timeoutRef.current = setTimeout(() => setOpen(false), 120); };

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button className="flex items-center gap-1 cursor-pointer">
        <Link
          to={item.href}
          className={`text-[12px] font-medium tracking-wide transition-colors duration-300 hover:text-primary-foreground ${isActive ? "text-primary-foreground" : "text-primary-foreground/50"}`}
        >
          {item.label}
        </Link>
        <ChevronDown size={9} className={`transition-transform duration-200 ${open ? "rotate-180" : ""} ${isActive ? "text-primary-foreground/30" : "text-primary-foreground/18"}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 rounded-lg py-1.5 z-50"
            style={dropdownStyle}
          >
            {item.children?.map((child, i) => (
              <Link
                key={child.href}
                to={child.href}
                className={`block px-4 py-2 text-[12px] font-medium transition-all duration-200 rounded mx-1 ${
                  i === 0
                    ? "text-foreground/80 hover:text-foreground hover:bg-foreground/[0.04] border-b border-border/30 mb-0.5 pb-2.5"
                    : "text-foreground/55 hover:text-foreground hover:bg-foreground/[0.04]"
                }`}
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

/* ── Units Tabbed Dropdown ── */
const UnitsTabbedDropdown = ({ item, isActive, isArabic }: { item: NavItem; isActive: boolean; isArabic: boolean }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleEnter = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setOpen(true); };
  const handleLeave = () => { timeoutRef.current = setTimeout(() => setOpen(false), 120); setActiveTab(0); };

  const tabs = item.children || [];

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button className="flex items-center gap-1 cursor-pointer">
        <Link
          to={item.href}
          className={`text-[12px] font-medium tracking-wide transition-colors duration-300 hover:text-primary-foreground ${isActive ? "text-primary-foreground" : "text-primary-foreground/50"}`}
        >
          {item.label}
        </Link>
        <ChevronDown size={9} className={`transition-transform duration-200 ${open ? "rotate-180" : ""} ${isActive ? "text-primary-foreground/30" : "text-primary-foreground/18"}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 rounded-lg z-50 w-[260px]"
            style={dropdownStyle}
          >
            {/* Tabs */}
            <div className="flex border-b border-border/40 px-1 pt-1">
              {tabs.map((tab, i) => (
                <button
                  key={tab.href}
                  onMouseEnter={() => setActiveTab(i)}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 text-[11px] font-semibold font-body py-2.5 px-2 transition-all duration-200 rounded-t-md ${
                    activeTab === i
                      ? "text-foreground bg-foreground/[0.04] border-b-2 border-foreground/20"
                      : "text-foreground/40 hover:text-foreground/65"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="py-2 px-1">
              {tabs[activeTab]?.children?.map((sub) => (
                <Link
                  key={sub.href}
                  to={sub.href}
                  className="block px-3.5 py-2 text-[12px] font-medium text-foreground/55 hover:text-foreground hover:bg-foreground/[0.04] transition-all duration-200 rounded mx-0.5"
                >
                  {sub.label}
                </Link>
              ))}

              {/* View all */}
              <div className="border-t border-border/30 mt-1.5 pt-1.5 mx-0.5">
                <Link
                  to={item.href}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-semibold text-foreground/45 hover:text-foreground transition-colors rounded font-body`}
                >
                  {isArabic ? "عرض جميع الوحدات" : "View All Units"}
                  {isArabic ? <ArrowLeft size={10} /> : <ArrowRight size={10} />}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Mobile Accordion ── */
const MobileAccordion = ({ item, pathname, onClose, isArabic }: { item: NavItem; pathname: string; onClose: () => void; isArabic: boolean }) => {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState<string | null>(null);
  const active = isPathInTree(pathname, item);
  const isTabbed = item.dropdownType === "tabbed";

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between text-[14px] font-medium py-3 transition-colors ${active ? "text-primary-foreground" : "text-primary-foreground/55"}`}
      >
        {item.label}
        <ChevronDown size={12} className={`transition-transform duration-200 ${open ? "rotate-180" : ""} text-primary-foreground/18`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className={`${isArabic ? 'pr-4 border-r mr-1' : 'pl-4 border-l ml-1'} border-primary-foreground/[0.06]`}>
              {isTabbed ? (
                // For Units: show groups with sub-items
                <>
                  {item.children?.map((group) => (
                    <div key={group.href}>
                      <button
                        onClick={() => setSubOpen(subOpen === group.href ? null : group.href)}
                        className={`w-full flex items-center justify-between text-[13px] font-medium py-2 transition-colors ${isPathInTree(pathname, group) ? "text-primary-foreground" : "text-primary-foreground/40"}`}
                      >
                        {group.label}
                        <ChevronDown size={10} className={`transition-transform duration-200 ${subOpen === group.href ? "rotate-180" : ""} text-primary-foreground/15`} />
                      </button>
                      <AnimatePresence>
                        {subOpen === group.href && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden"
                          >
                            <div className={`${isArabic ? 'pr-3 border-r' : 'pl-3 border-l'} border-primary-foreground/[0.04]`}>
                              {group.children?.map((sub) => (
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
                  ))}
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className="block text-[12px] font-medium text-primary-foreground/30 py-2 mt-1 border-t border-primary-foreground/[0.04]"
                  >
                    {isArabic ? "عرض جميع الوحدات" : "View All Units"}
                  </Link>
                </>
              ) : (
                // For Projects: simple list
                item.children?.map((child) => (
                  <Link
                    key={child.href}
                    to={child.href}
                    onClick={onClose}
                    className={`block text-[13px] font-medium py-2 transition-colors ${pathname === child.href ? "text-primary-foreground" : "text-primary-foreground/38"}`}
                  >
                    {child.label}
                  </Link>
                ))
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

  // Primary links only for desktop nav
  const primaryLinks = navLinks.filter(l => l.priority === "primary");
  const secondaryLinks = navLinks.filter(l => l.priority === "secondary");

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 40);

      if (currentY <= 180) {
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
        className="pointer-events-auto relative mx-3 lg:mx-6 mt-2.5 lg:mt-3.5 w-full"
        style={{ maxWidth: '1200px' }}
        initial={false}
        animate={{
          y: visible ? 0 : -90,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      >
        <div
          className="relative rounded-xl overflow-visible"
          style={{
            background: scrolled
              ? 'hsl(222 47% 7% / 0.97)'
              : 'hsl(222 47% 8% / 0.75)',
            backdropFilter: 'blur(24px) saturate(1.3)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.3)',
            border: `1px solid hsl(0 0% 100% / ${scrolled ? '0.03' : '0.05'})`,
            boxShadow: scrolled
              ? '0 4px 20px -4px hsl(222 47% 4% / 0.4)'
              : '0 2px 16px -4px hsl(222 47% 4% / 0.12)',
            transition: 'background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
          }}
        >
          <div className={`flex items-center justify-between px-4 lg:px-6 ${scrolled ? 'py-2' : 'py-2.5'}`} style={{ transition: 'padding 0.4s ease' }}>
            {/* Logo */}
            <Link to={isArabic ? "/ar" : "/"} className="relative group shrink-0">
              <img
                src={aswaqLogo}
                alt="ASWAQ Developments"
                className={`relative transition-all duration-400 group-hover:opacity-80 ${scrolled ? 'w-[100px] lg:w-[108px]' : 'w-[108px] lg:w-[118px]'}`}
                width={118}
                height={47}
              />
            </Link>

            {/* Desktop Nav — primary links only */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
              {primaryLinks.map((link) => {
                const active = isPathInTree(location.pathname, link);

                // Tabbed dropdown for Units
                if (link.dropdownType === "tabbed") {
                  return <UnitsTabbedDropdown key={link.href} item={link} isActive={active} isArabic={isArabic} />;
                }

                // Simple dropdown for Projects
                if (link.dropdownType === "simple") {
                  return <ProjectsDropdown key={link.href} item={link} isActive={active} />;
                }

                // Plain link
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`relative text-[12px] font-medium tracking-wide transition-all duration-300 whitespace-nowrap ${
                      active
                        ? "text-primary-foreground"
                        : "text-primary-foreground/50 hover:text-primary-foreground/85"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-0.5 rounded-full bg-primary-foreground/40"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* Secondary links — lighter weight */}
              {secondaryLinks.length > 0 && (
                <>
                  <div className="w-px h-3 bg-primary-foreground/[0.06]" />
                  {secondaryLinks.map((link) => {
                    const active = isPathInTree(location.pathname, link);
                    return (
                      <Link
                        key={link.href}
                        to={link.href}
                        className={`text-[11px] font-medium tracking-wide transition-all duration-300 whitespace-nowrap ${
                          active
                            ? "text-primary-foreground/70"
                            : "text-primary-foreground/30 hover:text-primary-foreground/55"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </>
              )}
            </nav>

            {/* Right: Language + CTA */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              <button
                onClick={switchLanguage}
                className="flex items-center gap-1 text-[11px] font-semibold text-primary-foreground/35 hover:text-primary-foreground/65 transition-all duration-300 px-2.5 py-1.5 rounded-md hover:bg-primary-foreground/[0.04] tracking-[0.06em]"
                aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}
              >
                <Globe size={11} className="opacity-50" />
                {isArabic ? "EN" : "عربي"}
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-primary-foreground/50 hover:text-primary-foreground transition-colors p-1"
              aria-label="Toggle menu"
            >
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="lg:hidden mt-1.5 rounded-xl overflow-hidden"
              style={{
                background: 'hsl(222 47% 7% / 0.97)',
                backdropFilter: 'blur(24px) saturate(1.3)',
                WebkitBackdropFilter: 'blur(24px) saturate(1.3)',
                border: '1px solid hsl(0 0% 100% / 0.04)',
                boxShadow: '0 12px 32px -8px hsl(222 47% 4% / 0.45)',
              }}
            >
              <nav className="py-3.5 px-4.5 flex flex-col">
                {/* Primary links */}
                {primaryLinks.map((link) =>
                  link.children ? (
                    <MobileAccordion
                      key={link.href}
                      item={link}
                      pathname={location.pathname}
                      onClose={() => setOpen(false)}
                      isArabic={isArabic}
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

                {/* Secondary links — smaller */}
                <div className="h-px my-2" style={{ background: 'hsl(0 0% 100% / 0.04)' }} />
                <div className="flex gap-4 py-2">
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setOpen(false)}
                      className={`text-[12px] font-medium transition-colors ${location.pathname === link.href ? "text-primary-foreground/65" : "text-primary-foreground/30"}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="h-px my-2" style={{ background: 'hsl(0 0% 100% / 0.04)' }} />

                {/* Language + CTA row */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() => { switchLanguage(); setOpen(false); }}
                    className="flex items-center gap-1.5 text-[12px] font-semibold text-primary-foreground/35 hover:text-primary-foreground transition-colors py-2"
                  >
                    <Globe size={12} className="opacity-40" />
                    {isArabic ? "English" : "عربي"}
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Navbar;

import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, ArrowRight, ArrowLeft, Building2 } from "lucide-react";
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

/* Project metadata for the rich Projects dropdown */
const projectMeta: Record<string, { type: string; typeAr: string; desc: string; descAr: string }> = {
  "city-hub-mall": { type: "Mixed-Use", typeAr: "متعدد الاستخدامات", desc: "Premium retail & office destination", descAr: "وجهة تجارية وإدارية متميزة" },
  "mercado-mall": { type: "Commercial", typeAr: "تجاري", desc: "Modern commercial hub", descAr: "مركز تجاري عصري" },
  "arena-mall": { type: "Retail & Medical", typeAr: "تجاري وطبي", desc: "Integrated retail & medical complex", descAr: "مجمع تجاري وطبي متكامل" },
  "solaria-mall": { type: "Commercial", typeAr: "تجاري", desc: "Flagship commercial landmark", descAr: "معلم تجاري رائد" },
};

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
  boxShadow: '0 16px 48px -12px hsl(222 47% 10% / 0.18), 0 6px 16px -6px hsl(222 47% 10% / 0.08)',
};

/* ── Projects Dropdown — Rich Mega Menu ── */
const ProjectsDropdown = ({ item, isActive, isArabic }: { item: NavItem; isActive: boolean; isArabic: boolean }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleEnter = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setOpen(true); };
  const handleLeave = () => { timeoutRef.current = setTimeout(() => setOpen(false), 150); };

  const projects = item.children?.filter((_, i) => i > 0) || []; // skip "All Projects"
  const allProjectsLink = item.children?.[0];

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button className="flex items-center gap-1 cursor-pointer">
        <Link
          to={item.href}
          className={`text-[12.5px] font-semibold tracking-wide transition-colors duration-300 hover:text-primary-foreground ${isActive ? "text-primary-foreground" : "text-primary-foreground/70"}`}
        >
          {item.label}
        </Link>
        <ChevronDown size={10} className={`transition-transform duration-200 ${open ? "rotate-180" : ""} ${isActive ? "text-primary-foreground/50" : "text-primary-foreground/35"}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 rounded-xl z-50 w-[380px] p-4"
            style={dropdownStyle}
          >
            {/* Project cards */}
            <div className="grid grid-cols-2 gap-2.5">
              {projects.map((child) => {
                const slug = child.href.split('/').pop() || '';
                const meta = projectMeta[slug];
                return (
                  <Link
                    key={child.href}
                    to={child.href}
                    className="group flex flex-col gap-1.5 p-3 rounded-lg transition-all duration-200 hover:bg-foreground/[0.06] border border-transparent hover:border-border/50"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-foreground/[0.05] border border-border/40 flex items-center justify-center shrink-0 group-hover:bg-foreground/[0.10] transition-colors">
                        <Building2 size={13} className="text-foreground/50 group-hover:text-foreground/75 transition-colors" />
                      </div>
                      <div>
                        <p className="text-[12.5px] font-semibold text-foreground/85 group-hover:text-foreground transition-colors leading-tight">
                          {child.label}
                        </p>
                        {meta && (
                          <p className="text-[10px] font-medium text-foreground/45 uppercase tracking-wider mt-0.5">
                            {isArabic ? meta.typeAr : meta.type}
                          </p>
                        )}
                      </div>
                    </div>
                    {meta && (
                      <p className="text-[11px] text-foreground/50 leading-snug">
                        {isArabic ? meta.descAr : meta.desc}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* All Projects link */}
            {allProjectsLink && (
              <div className="border-t border-border/40 mt-3 pt-2.5">
                <Link
                  to={allProjectsLink.href}
                  className="flex items-center gap-1.5 px-3 py-2 text-[11.5px] font-semibold text-foreground/60 hover:text-foreground transition-colors rounded-md hover:bg-foreground/[0.05]"
                >
                  {allProjectsLink.label}
                  {isArabic ? <ArrowLeft size={10} /> : <ArrowRight size={10} />}
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Units Tabbed Dropdown — Improved ── */
const UnitsTabbedDropdown = ({ item, isActive, isArabic }: { item: NavItem; isActive: boolean; isArabic: boolean }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleEnter = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setOpen(true); };
  const handleLeave = () => { timeoutRef.current = setTimeout(() => setOpen(false), 150); setActiveTab(0); };

  const tabs = item.children || [];

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button className="flex items-center gap-1 cursor-pointer">
        <Link
          to={item.href}
          className={`text-[12.5px] font-semibold tracking-wide transition-colors duration-300 hover:text-primary-foreground ${isActive ? "text-primary-foreground" : "text-primary-foreground/70"}`}
        >
          {item.label}
        </Link>
        <ChevronDown size={10} className={`transition-transform duration-200 ${open ? "rotate-180" : ""} ${isActive ? "text-primary-foreground/50" : "text-primary-foreground/35"}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 rounded-xl z-50 w-[300px]"
            style={dropdownStyle}
          >
            {/* Tabs */}
            <div className="flex border-b border-border/40 px-1.5 pt-1.5">
              {tabs.map((tab, i) => (
                <button
                  key={tab.href}
                  onMouseEnter={() => setActiveTab(i)}
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 text-[11.5px] font-bold font-body py-3 px-2.5 transition-all duration-200 rounded-t-lg relative ${
                    activeTab === i
                      ? "text-foreground"
                      : "text-foreground/45 hover:text-foreground/70"
                  }`}
                >
                  {tab.label}
                  {activeTab === i && (
                    <motion.span
                      layoutId="units-tab-indicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                      style={{ background: 'hsl(232 78% 10% / 0.25)' }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="py-2.5 px-2">
              {tabs[activeTab]?.children?.map((sub) => (
                <Link
                  key={sub.href}
                  to={sub.href}
                  className="block px-4 py-2.5 text-[12.5px] font-medium text-foreground/55 hover:text-foreground hover:bg-foreground/[0.04] transition-all duration-200 rounded-lg"
                >
                  {sub.label}
                </Link>
              ))}

              {/* View all */}
              <div className="border-t border-border/30 mt-2 pt-2 mx-1">
                <Link
                  to={item.href}
                  className="flex items-center gap-1.5 px-3 py-2.5 text-[11.5px] font-bold text-foreground/45 hover:text-foreground transition-colors rounded-lg hover:bg-foreground/[0.03] font-body"
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
        className={`w-full flex items-center justify-between text-[15px] font-semibold py-3.5 transition-colors ${active ? "text-primary-foreground" : "text-primary-foreground/60"}`}
      >
        {item.label}
        <ChevronDown size={13} className={`transition-transform duration-200 ${open ? "rotate-180" : ""} text-primary-foreground/25`} />
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
            <div className={`${isArabic ? 'pr-4 border-r mr-1' : 'pl-4 border-l ml-1'} border-primary-foreground/[0.08] pb-2`}>
              {isTabbed ? (
                <>
                  {item.children?.map((group) => (
                    <div key={group.href}>
                      <button
                        onClick={() => setSubOpen(subOpen === group.href ? null : group.href)}
                        className={`w-full flex items-center justify-between text-[13.5px] font-semibold py-2.5 transition-colors ${isPathInTree(pathname, group) ? "text-primary-foreground" : "text-primary-foreground/45"}`}
                      >
                        {group.label}
                        <ChevronDown size={11} className={`transition-transform duration-200 ${subOpen === group.href ? "rotate-180" : ""} text-primary-foreground/20`} />
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
                            <div className={`${isArabic ? 'pr-3 border-r' : 'pl-3 border-l'} border-primary-foreground/[0.06] pb-1`}>
                              {group.children?.map((sub) => (
                                <Link
                                  key={sub.href}
                                  to={sub.href}
                                  onClick={onClose}
                                  className={`block text-[13px] py-2 transition-colors ${pathname === sub.href ? "text-primary-foreground" : "text-primary-foreground/35 hover:text-primary-foreground/60"}`}
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
                    className="block text-[12.5px] font-semibold text-primary-foreground/35 hover:text-primary-foreground/60 py-2.5 mt-1 border-t border-primary-foreground/[0.06] transition-colors"
                  >
                    {isArabic ? "عرض جميع الوحدات" : "View All Units"}
                  </Link>
                </>
              ) : (
                item.children?.map((child) => (
                  <Link
                    key={child.href}
                    to={child.href}
                    onClick={onClose}
                    className={`block text-[13.5px] font-medium py-2.5 transition-colors ${pathname === child.href ? "text-primary-foreground" : "text-primary-foreground/40 hover:text-primary-foreground/70"}`}
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
              : 'hsl(222 47% 8% / 0.80)',
            backdropFilter: 'blur(24px) saturate(1.3)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.3)',
            border: `1px solid hsl(0 0% 100% / ${scrolled ? '0.04' : '0.06'})`,
            boxShadow: scrolled
              ? '0 4px 24px -4px hsl(222 47% 4% / 0.45)'
              : '0 2px 16px -4px hsl(222 47% 4% / 0.15)',
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

            {/* Desktop Nav — primary links */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
              {primaryLinks.map((link) => {
                const active = isPathInTree(location.pathname, link);

                if (link.dropdownType === "tabbed") {
                  return <UnitsTabbedDropdown key={link.href} item={link} isActive={active} isArabic={isArabic} />;
                }

                if (link.dropdownType === "simple") {
                  return <ProjectsDropdown key={link.href} item={link} isActive={active} isArabic={isArabic} />;
                }

                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`relative text-[12.5px] font-semibold tracking-wide transition-all duration-300 whitespace-nowrap ${
                      active
                        ? "text-primary-foreground"
                        : "text-primary-foreground/65 hover:text-primary-foreground"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-foreground/50"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* Secondary links — lighter weight */}
              {secondaryLinks.length > 0 && (
                <>
                  <div className="w-px h-3.5 bg-primary-foreground/[0.08]" />
                  {secondaryLinks.map((link) => {
                    const active = isPathInTree(location.pathname, link);
                    return (
                      <Link
                        key={link.href}
                        to={link.href}
                        className={`text-[11.5px] font-medium tracking-wide transition-all duration-300 whitespace-nowrap ${
                          active
                            ? "text-primary-foreground/75"
                            : "text-primary-foreground/40 hover:text-primary-foreground/70"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </>
              )}
            </nav>

            {/* Right: Language switch */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <button
                onClick={switchLanguage}
                className="flex items-center gap-1.5 text-[11.5px] font-bold text-primary-foreground/45 hover:text-primary-foreground/80 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-primary-foreground/[0.06] tracking-[0.05em] border border-primary-foreground/[0.06] hover:border-primary-foreground/[0.12]"
                aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}
              >
                <Globe size={12} className="opacity-60" />
                {isArabic ? "EN" : "عربي"}
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-primary-foreground/60 hover:text-primary-foreground transition-colors p-1"
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
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
                border: '1px solid hsl(0 0% 100% / 0.05)',
                boxShadow: '0 12px 32px -8px hsl(222 47% 4% / 0.45)',
              }}
            >
              <nav className="py-4 px-5 flex flex-col">
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
                      className={`text-[15px] font-semibold py-3.5 transition-colors ${location.pathname === link.href ? "text-primary-foreground" : "text-primary-foreground/60 active:text-primary-foreground"}`}
                    >
                      {link.label}
                    </Link>
                  ),
                )}

                {/* Secondary links */}
                <div className="h-px my-2.5" style={{ background: 'hsl(0 0% 100% / 0.06)' }} />
                <div className="flex gap-5 py-2.5">
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setOpen(false)}
                      className={`text-[13px] font-medium transition-colors ${location.pathname === link.href ? "text-primary-foreground/70" : "text-primary-foreground/35 active:text-primary-foreground/60"}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="h-px my-2.5" style={{ background: 'hsl(0 0% 100% / 0.06)' }} />

                {/* Language row */}
                <div className="flex items-center gap-3 pt-1.5">
                  <button
                    onClick={() => { switchLanguage(); setOpen(false); }}
                    className="flex items-center gap-1.5 text-[13px] font-bold text-primary-foreground/45 hover:text-primary-foreground transition-colors py-2.5 px-3 rounded-lg border border-primary-foreground/[0.08]"
                  >
                    <Globe size={13} className="opacity-50" />
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

import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import aswaqLogo from "@/assets/aswaq-logo.png";

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

const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Projects",
    href: "/projects",
    children: [
      { label: "City Hub Mall", href: "/projects/city-hub-mall" },
      { label: "Mercado Mall", href: "/projects/mercado-mall" },
      { label: "Arena Mall", href: "/projects/arena-mall" },
      { label: "Solaria Mall", href: "/projects/solaria-mall" },
    ],
  },
  {
    label: "Choose your Unit",
    href: "/units",
    children: [
      {
        label: "Units for Sale",
        href: "/units/for-sale",
        children: [
          { label: "Commercial Units for Sale", href: "/units/commercial-for-sale" },
          { label: "Administrative Units for Sale", href: "/units/administrative-for-sale" },
          { label: "Medical Units for Sale", href: "/units/medical-for-sale" },
        ],
      },
      {
        label: "Units for Investment",
        href: "/units/for-investment",
        children: [
          { label: "Commercial Units for Investment", href: "/units/commercial-for-investment" },
          { label: "Administrative Units for Investment", href: "/units/administrative-for-investment" },
          { label: "Medical Units for Investment", href: "/units/medical-for-investment" },
        ],
      },
      {
        label: "Units for Rent",
        href: "/units/for-rent",
        children: [
          { label: "Commercial Units for Rent", href: "/units/commercial-for-rent" },
          { label: "Administrative Units for Rent", href: "/units/administrative-for-rent" },
          { label: "Medical Units for Rent", href: "/units/medical-for-rent" },
        ],
      },
    ],
  },
  { label: "News", href: "/news" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
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
          className={`text-sm font-medium tracking-wide transition-colors hover:text-accent ${isActive ? "text-accent" : "text-primary-foreground/80"}`}
        >
          {item.label}
        </Link>
        <ChevronDown size={14} className={`transition-transform ${isActive ? "text-accent" : "text-primary-foreground/80"} ${open ? "rotate-180" : ""}`} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-3 w-52 bg-background rounded-lg shadow-xl border border-border py-2 z-50"
          >
            {item.children?.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                className="block px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted hover:text-accent transition-colors"
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
          className={`text-sm font-medium tracking-wide transition-colors hover:text-accent ${isActive ? "text-accent" : "text-primary-foreground/80"}`}
        >
          {item.label}
        </Link>
        <ChevronDown size={14} className={`transition-transform ${isActive ? "text-accent" : "text-primary-foreground/80"} ${open ? "rotate-180" : ""}`} />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-background rounded-lg shadow-xl border border-border py-4 px-6 z-50 min-w-[520px]"
          >
            <div className="grid grid-cols-3 gap-6">
              {item.children?.map((group) => (
                <div key={group.href}>
                  <Link
                    to={group.href}
                    className="block font-display font-bold text-sm text-foreground hover:text-accent transition-colors mb-3"
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
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
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
                      className={`transition-transform ${subOpen === child.href ? "rotate-180" : ""}`}
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 200);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-primary/80 backdrop-blur-md" : "bg-primary"}`}>
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <Link to="/">
          <img src={aswaqLogo} alt="ASWAQ Developments" className="w-[200px]" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = isPathInTree(location.pathname, link);
            if (!link.children) {
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-accent ${active ? "text-accent" : "text-primary-foreground/80"}`}
                >
                  {link.label}
                </Link>
              );
            }
            // Check if any child has children (mega menu) vs simple dropdown
            const hasSubs = link.children.some((c) => c.children);
            if (hasSubs) return <MegaMenu key={link.href} item={link} isActive={active} />;
            return <SimpleDropdown key={link.href} item={link} isActive={active} />;
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/units"
            className="bg-accent text-accent-foreground px-6 py-2.5 text-sm font-semibold rounded hover:bg-gold-light transition-colors"
          >
            Request a Unit
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
              <Link
                to="/units"
                onClick={() => setOpen(false)}
                className="bg-accent text-accent-foreground px-6 py-2.5 text-sm font-semibold rounded text-center hover:bg-gold-light transition-colors mt-2"
              >
                Request a Unit
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

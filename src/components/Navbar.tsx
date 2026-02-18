import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import aswaqLogo from "@/assets/aswaq-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
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
      { label: "Units for Sale", href: "/units/for-sale" },
      { label: "Units for Investment", href: "/units/for-investment" },
      { label: "Units for Rent", href: "/units/for-rent" },
    ],
  },
  { label: "About Us", href: "/about" },
];

const DropdownMenu = ({
  item,
  isActive,
}: {
  item: (typeof navLinks)[0];
  isActive: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors hover:text-accent ${
          isActive ? "text-accent" : "text-primary-foreground/80"
        }`}
      >
        {item.label}
        <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
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
                onClick={() => setOpen(false)}
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

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isPathActive = (href: string, children?: { href: string }[]) => {
    if (location.pathname === href) return true;
    return children?.some((c) => location.pathname === c.href) ?? false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <Link to="/">
          <img src={aswaqLogo} alt="ASWAQ Developments" className="w-[150px] brightness-0 invert" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) =>
            link.children ? (
              <DropdownMenu
                key={link.href}
                item={link}
                isActive={isPathActive(link.href, link.children)}
              />
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-accent ${
                  location.pathname === link.href
                    ? "text-accent"
                    : "text-primary-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/units"
            className="bg-accent text-accent-foreground px-6 py-2.5 text-sm font-semibold rounded hover:bg-gold-light transition-colors"
          >
            Request a Unit
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-primary-foreground"
          aria-label="Toggle menu"
        >
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
                  <div key={link.href}>
                    <button
                      onClick={() =>
                        setMobileDropdown(
                          mobileDropdown === link.href ? null : link.href
                        )
                      }
                      className={`w-full flex items-center justify-between text-sm font-medium py-3 transition-colors ${
                        isPathActive(link.href, link.children)
                          ? "text-accent"
                          : "text-primary-foreground/80"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          mobileDropdown === link.href ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileDropdown === link.href && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              onClick={() => {
                                setOpen(false);
                                setMobileDropdown(null);
                              }}
                              className={`block text-sm font-medium py-2.5 transition-colors ${
                                location.pathname === child.href
                                  ? "text-accent"
                                  : "text-primary-foreground/60"
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-sm font-medium py-3 transition-colors ${
                      location.pathname === link.href
                        ? "text-accent"
                        : "text-primary-foreground/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
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

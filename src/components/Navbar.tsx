import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import aswaqLogo from "@/assets/aswaq-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Projects", href: "/projects" },
  { label: "Available Units", href: "/units" },
  { label: "About Us", href: "/about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <Link to="/">
          <img src={aswaqLogo} alt="ASWAQ Developments" className="w-[150px] brightness-0 invert" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
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
          ))}
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
            <nav className="container mx-auto py-4 px-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium py-2 transition-colors ${
                    location.pathname === link.href
                      ? "text-accent"
                      : "text-primary-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/units"
                onClick={() => setOpen(false)}
                className="bg-accent text-accent-foreground px-6 py-2.5 text-sm font-semibold rounded text-center hover:bg-gold-light transition-colors"
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

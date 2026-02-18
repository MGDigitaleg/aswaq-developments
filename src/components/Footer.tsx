import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold tracking-wider mb-4">ASWAQ</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed font-body">
              A forward-thinking real estate developer specializing in commercial, administrative, and medical projects across East Cairo.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 font-body">
              {[
                { label: "Home", href: "/" },
                { label: "Our Projects", href: "/projects" },
                { label: "Available Units", href: "/units" },
                { label: "About Us", href: "/about" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Projects */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Our Projects</h4>
            <ul className="space-y-3 font-body">
              {["City Hub Mall", "Mercado Mall", "Arena Mall", "Solaria Mall"].map((name) => (
                <li key={name}>
                  <Link
                    to="/projects"
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 font-body">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                Shorouk City, East Cairo, Egypt
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone size={16} className="shrink-0 text-accent" />
                +20 123 456 789
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail size={16} className="shrink-0 text-accent" />
                info@aswaq-egypt.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-sm text-primary-foreground/50 font-body">
            © {new Date().getFullYear()} ASWAQ Developments. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

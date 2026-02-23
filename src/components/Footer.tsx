import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import aswaqLogo from "@/assets/aswaq-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img src={aswaqLogo} alt="ASWAQ Developments" className="w-[200px] mb-4" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed font-body">
              A forward-thinking real estate developer specializing in commercial, administrative, and medical projects
              across East Cairo.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-primary-foreground">Quick Links</h4>
            <ul className="space-y-3 font-body">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Our Projects", href: "/projects" },
                { label: "Choose your Unit", href: "/units" },
                { label: "News", href: "/news" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact Us", href: "/contact" },
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
            <h4 className="font-display text-lg font-semibold mb-4 text-primary-foreground">Our Projects</h4>
            <ul className="space-y-3 font-body">
              {[
                { name: "City Hub Mall", href: "/projects/city-hub-mall" },
                { name: "Mercado Mall", href: "/projects/mercado-mall" },
                { name: "Arena Mall", href: "/projects/arena-mall" },
                { name: "Solaria Mall", href: "/projects/solaria-mall" },
              ].map((project) => (
                <li key={project.name}>
                  <Link
                    to={project.href}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-primary-foreground">Contact Us</h4>
            <ul className="space-y-3 font-body">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                Villa 1/127 - Al-Nsoor complex, Al Moltaqa Neighborhood, Otostrad road - Sheraton
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone size={16} className="shrink-0 text-accent" />
                19474
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail size={16} className="shrink-0 text-accent" />
                marketing@aswaqdev.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-sm text-primary-foreground/50 font-body">
            © {new Date().getFullYear()} ASWAQ Developments. All rights reserved. | Developed By{" "}
            <a href="https://mg.digital/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">MG Digital</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

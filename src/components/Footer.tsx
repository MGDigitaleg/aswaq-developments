import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import aswaqLogo from "@/assets/aswaq-logo.png";

const Footer = () => {
  const location = useLocation();
  const isArabic = location.pathname.startsWith("/ar");
  const prefix = isArabic ? "/ar" : "";

  const quickLinks = isArabic
    ? [
        { label: "الرئيسية", href: "/ar" },
        { label: "من نحن", href: "/ar/about" },
        { label: "المشاريع", href: "/ar/projects" },
        { label: "اختر وحدتك", href: "/ar/units" },
        { label: "الأخبار", href: "/ar/news" },
        { label: "معرض الصور", href: "/ar/gallery" },
        { label: "وظائف", href: "/ar/careers" },
        { label: "تواصل معنا", href: "/ar/contact" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Our Projects", href: "/projects" },
        { label: "Choose your Unit", href: "/units" },
        { label: "News", href: "/news" },
        { label: "Gallery", href: "/gallery" },
        { label: "Careers", href: "/careers" },
        { label: "Contact Us", href: "/contact" },
      ];

  const projectLinks = [
    { name: isArabic ? "سيتي هب مول" : "City Hub Mall", href: `${prefix}/projects/city-hub-mall` },
    { name: isArabic ? "ميركادو مول" : "Mercado Mall", href: `${prefix}/projects/mercado-mall` },
    { name: isArabic ? "أرينا مول" : "Arena Mall", href: `${prefix}/projects/arena-mall` },
    { name: isArabic ? "سولاريا مول" : "Solaria Mall", href: `${prefix}/projects/solaria-mall` },
  ];

  const socialLinks = [
    { href: "https://www.facebook.com/AswaqDev", icon: Facebook, label: "Facebook" },
    { href: "https://www.instagram.com/aswaqdev/", icon: Instagram, label: "Instagram" },
    { href: "https://www.youtube.com/@aswaqdevelopments3057", icon: Youtube, label: "YouTube" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img src={aswaqLogo} alt="ASWAQ Developments" className="w-[200px] mb-5" />
            <p className="text-primary-foreground/60 text-sm leading-relaxed font-body mb-6">
              {isArabic
                ? "شركة تطوير عقاري متطلعة متخصصة في المشاريع التجارية والإدارية والطبية في شرق القاهرة."
                : "A forward-thinking real estate developer specializing in commercial, administrative, and medical projects across East Cairo."}
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/60 hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-base font-semibold mb-5 text-primary-foreground uppercase tracking-wide">
              {isArabic ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-2.5 font-body">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Projects */}
          <div>
            <h4 className="font-display text-base font-semibold mb-5 text-primary-foreground uppercase tracking-wide">
              {isArabic ? "مشاريعنا" : "Our Projects"}
            </h4>
            <ul className="space-y-2.5 font-body">
              {projectLinks.map((project) => (
                <li key={project.name}>
                  <Link
                    to={project.href}
                    className="text-sm text-primary-foreground/60 hover:text-accent transition-colors"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-base font-semibold mb-5 text-primary-foreground uppercase tracking-wide">
              {isArabic ? "تواصل معنا" : "Contact Us"}
            </h4>
            <ul className="space-y-4 font-body">
              <li>
                <a href="tel:19474" className="flex items-center gap-3 text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                  <Phone size={16} className="shrink-0 text-accent" />
                  19474
                </a>
              </li>
              <li>
                <a href="mailto:marketing@aswaqdev.com" className="flex items-center gap-3 text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                  <Mail size={16} className="shrink-0 text-accent" />
                  marketing@aswaqdev.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/60">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>
                  {isArabic
                    ? "فيلا 1/127 - مجمع النسور، حي الملتقى، طريق الأوتوستراد - شيراتون"
                    : "Villa 1/127 - Al-Nsoor complex, Al Moltaqa Neighborhood, Otostrad road - Sheraton"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-foreground/40 font-body">
            © {new Date().getFullYear()} {isArabic ? "أسواق للتطوير العقاري. جميع الحقوق محفوظة." : "ASWAQ Developments. All rights reserved."}
          </p>
          <p className="text-xs text-primary-foreground/40 font-body">
            {isArabic ? "تطوير بواسطة" : "Developed By"}{" "}
            <a href="https://mg.digital/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              MG Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

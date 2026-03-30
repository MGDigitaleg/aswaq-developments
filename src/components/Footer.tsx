import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Star, ExternalLink } from "lucide-react";
import aswaqLogo from "@/assets/aswaq-logo.webp";

const reviews = [
  {
    name: "Abdo Elkattan",
    rating: 5,
    text: "The best shop for Japanese sweets, boba and mochi 🍡🧁",
    textAr: "أفضل محل للحلويات اليابانية والبوبا والموتشي 🍡🧁",
  },
  {
    name: "Ahmad Halawa",
    rating: 5,
    text: "Whatever you want in one place ♥",
    textAr: "كل اللي تحتاجه في مكان واحد ♥",
  },
  {
    name: "Basmala Mohamed",
    rating: 5,
    text: "Food: 5 · Service: 5 · Atmosphere: 5",
    textAr: "الطعام: 5 · الخدمة: 5 · الأجواء: 5",
  },
  {
    name: "Trendy Cakes With Eman",
    rating: 5,
    text: "Food: 5 · Service: 5 · Atmosphere: 5",
    textAr: "الطعام: 5 · الخدمة: 5 · الأجواء: 5",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? "fill-accent text-primary-foreground" : "text-primary-foreground/20"}
      />
    ))}
  </div>
);

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
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div>
            <img src={aswaqLogo} alt="ASWAQ Developments" className="w-[200px] mb-6" width={200} height={79} />
            <p className="text-primary-foreground/50 text-sm leading-relaxed font-body mb-6">
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
                  className="w-10 h-10 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 flex items-center justify-center text-primary-foreground/50 hover:bg-primary-foreground/10 hover:text-primary-foreground hover:border-primary-foreground/20 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-sm font-semibold mb-6 text-primary-foreground uppercase tracking-[0.15em]">
              {isArabic ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-3 font-body">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Projects */}
          <div>
            <h3 className="font-display text-sm font-semibold mb-6 text-primary-foreground uppercase tracking-[0.15em]">
              {isArabic ? "مشاريعنا" : "Our Projects"}
            </h3>
            <ul className="space-y-3 font-body">
              {projectLinks.map((project) => (
                <li key={project.name}>
                  <Link
                    to={project.href}
                    className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-300"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-semibold mb-6 text-primary-foreground uppercase tracking-[0.15em]">
              {isArabic ? "تواصل معنا" : "Contact Us"}
            </h3>
            <ul className="space-y-4 font-body">
              <li>
                <a href="tel:19474" className="flex items-center gap-3 text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-300">
                  <Phone size={16} className="shrink-0 text-primary-foreground/40" />
                  19474
                </a>
              </li>
              <li>
                <a href="mailto:marketing@aswaqdev.com" className="flex items-center gap-3 text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors duration-300">
                  <Mail size={16} className="shrink-0 text-primary-foreground/40" />
                  marketing@aswaqdev.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/50">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary-foreground/40" />
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

      {/* Google Reviews Section */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} className={i < 5 ? "fill-accent text-primary-foreground" : "text-primary-foreground/20"} />
                ))}
              </div>
              <span className="text-2xl font-bold text-primary-foreground font-display">4.6</span>
              <span className="text-sm text-primary-foreground/65 font-body">
                {isArabic ? "بناءً على تقييمات Google" : "based on Google Reviews"}
              </span>
            </div>
            <a
              href="https://maps.app.goo.gl/6jGACMa9mZKx5sYp9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary-foreground/60 hover:underline flex items-center gap-1.5 font-body transition-colors duration-300"
            >
              {isArabic ? "اترك تقييم" : "Leave a Review"}
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Review Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-primary-foreground/[0.03] rounded-xl p-5 border border-primary-foreground/[0.07] hover:border-primary-foreground/15 transition-all duration-300"
              >
                <StarRating rating={review.rating} />
                <p className="text-sm text-primary-foreground/60 mt-3 mb-4 font-body leading-relaxed min-h-[40px]">
                  "{isArabic ? review.textAr : review.text}"
                </p>
                <p className="text-sm font-semibold text-primary-foreground font-body">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-foreground/60 font-body">
            © {new Date().getFullYear()} {isArabic ? "أسواق للتطوير العقاري. جميع الحقوق محفوظة." : "ASWAQ Developments. All rights reserved."}
          </p>
          <p className="text-xs text-primary-foreground/60 font-body">
            {isArabic ? "تطوير بواسطة" : "Developed By"}{" "}
            <a href="https://mg.digital/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 underline hover:no-underline">
              MG Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

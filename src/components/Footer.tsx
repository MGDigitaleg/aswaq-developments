import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Star, ExternalLink, ArrowRight, ArrowLeft } from "lucide-react";
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
        size={13}
        className={i < rating ? "fill-steel text-steel" : "text-primary-foreground/15"}
      />
    ))}
  </div>
);

const Footer = () => {
  const location = useLocation();
  const isArabic = location.pathname.startsWith("/ar");
  const prefix = isArabic ? "/ar" : "";
  const fontClass = isArabic ? "font-arabic" : "font-body";

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

  const unitLinks = [
    { name: isArabic ? "وحدات للبيع" : "Units for Sale", href: `${prefix}/units/for-sale` },
    { name: isArabic ? "وحدات للاستثمار" : "Units for Investment", href: `${prefix}/units/for-investment` },
    { name: isArabic ? "وحدات للإيجار" : "Units for Rent", href: `${prefix}/units/for-rent` },
  ];

  const socialLinks = [
    { href: "https://www.facebook.com/AswaqDev", icon: Facebook, label: "Facebook" },
    { href: "https://www.instagram.com/aswaqdev/", icon: Instagram, label: "Instagram" },
    { href: "https://www.youtube.com/@aswaqdevelopments3057", icon: Youtube, label: "YouTube" },
  ];

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Pre-footer CTA stripe */}
      <div
        className="border-b border-primary-foreground/[0.06]"
        style={{ background: 'linear-gradient(135deg, hsl(226 63% 11%) 0%, hsl(228 50% 14%) 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className={`font-display text-xl md:text-2xl font-bold text-primary-foreground mb-1`}>
              {isArabic ? "ابدأ رحلتك العقارية اليوم" : "Start Your Real Estate Journey Today"}
            </h3>
            <p className={`text-primary-foreground/50 text-sm ${fontClass}`}>
              {isArabic ? "اكتشف وحدات تجارية وإدارية وطبية متميزة في مدينة الشروق." : "Discover premium commercial, administrative & medical units in Shorouk City."}
            </p>
          </div>
          <Link
            to={`${prefix}/units`}
            className="btn-premium px-8 py-3.5 text-sm shrink-0"
          >
            {isArabic ? "استكشف الوحدات" : "Explore Units"}
            <ArrowIcon size={14} />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand — takes 2 cols on lg */}
          <div className="lg:col-span-2 lg:pr-8">
            <img src={aswaqLogo} alt="ASWAQ Developments" className="w-[180px] mb-6" width={180} height={71} />
            <p className={`text-primary-foreground/50 text-sm leading-[1.8] ${fontClass} mb-8 max-w-sm`}>
              {isArabic
                ? "شركة تطوير عقاري رائدة متخصصة في المشاريع التجارية والإدارية والطبية في شرق القاهرة. أكثر من 20 عاماً من التميز في مدينة الشروق."
                : "A leading real estate developer specializing in commercial, administrative, and medical projects across East Cairo. Over 20 years of excellence in Shorouk City."}
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-primary-foreground/[0.04] border border-primary-foreground/[0.08] flex items-center justify-center text-primary-foreground/40 hover:bg-primary-foreground/[0.08] hover:text-primary-foreground/80 hover:border-primary-foreground/15 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`font-display text-xs font-semibold mb-6 text-primary-foreground/80 uppercase tracking-[0.2em]`}>
              {isArabic ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className={`space-y-3 ${fontClass}`}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/45 hover:text-primary-foreground/90 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Projects */}
          <div>
            <h3 className={`font-display text-xs font-semibold mb-6 text-primary-foreground/80 uppercase tracking-[0.2em]`}>
              {isArabic ? "مشاريعنا" : "Our Projects"}
            </h3>
            <ul className={`space-y-3 ${fontClass}`}>
              {projectLinks.map((project) => (
                <li key={project.name}>
                  <Link
                    to={project.href}
                    className="text-sm text-primary-foreground/45 hover:text-primary-foreground/90 transition-colors duration-300"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className={`font-display text-xs font-semibold mt-8 mb-4 text-primary-foreground/80 uppercase tracking-[0.2em]`}>
              {isArabic ? "الوحدات" : "Units"}
            </h3>
            <ul className={`space-y-3 ${fontClass}`}>
              {unitLinks.map((u) => (
                <li key={u.href}>
                  <Link to={u.href} className="text-sm text-primary-foreground/45 hover:text-primary-foreground/90 transition-colors duration-300">{u.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={`font-display text-xs font-semibold mb-6 text-primary-foreground/80 uppercase tracking-[0.2em]`}>
              {isArabic ? "تواصل معنا" : "Contact Us"}
            </h3>
            <ul className={`space-y-5 ${fontClass}`}>
              <li>
                <a href="tel:19474" className="flex items-center gap-3 text-sm text-primary-foreground/45 hover:text-primary-foreground/90 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-lg bg-primary-foreground/[0.04] border border-primary-foreground/[0.08] flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-primary-foreground/40" />
                  </div>
                  <span className="font-['Montserrat'] font-semibold">19474</span>
                </a>
              </li>
              <li>
                <a href="mailto:marketing@aswaqdev.com" className="flex items-center gap-3 text-sm text-primary-foreground/45 hover:text-primary-foreground/90 transition-colors duration-300">
                  <div className="w-8 h-8 rounded-lg bg-primary-foreground/[0.04] border border-primary-foreground/[0.08] flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-primary-foreground/40" />
                  </div>
                  marketing@aswaqdev.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-primary-foreground/45">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/[0.04] border border-primary-foreground/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={14} className="text-primary-foreground/40" />
                </div>
                <span className="leading-relaxed">
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
      <div className="border-t border-primary-foreground/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < 5 ? "fill-steel text-steel" : "text-primary-foreground/20"} />
                ))}
              </div>
              <span className="text-xl font-bold text-primary-foreground font-['Montserrat']">4.6</span>
              <span className={`text-sm text-primary-foreground/50 ${fontClass}`}>
                {isArabic ? "بناءً على تقييمات Google" : "based on Google Reviews"}
              </span>
            </div>
            <a
              href="https://maps.app.goo.gl/6jGACMa9mZKx5sYp9"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm text-primary-foreground/50 hover:text-primary-foreground/80 flex items-center gap-1.5 ${fontClass} transition-colors duration-300`}
            >
              {isArabic ? "اترك تقييم" : "Leave a Review"}
              <ExternalLink size={12} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-primary-foreground/[0.02] rounded-xl p-5 border border-primary-foreground/[0.05] hover:border-primary-foreground/10 transition-all duration-300"
              >
                <StarRating rating={review.rating} />
                <p className={`text-sm text-primary-foreground/50 mt-3 mb-4 ${fontClass} leading-relaxed min-h-[40px]`}>
                  "{isArabic ? review.textAr : review.text}"
                </p>
                <p className={`text-sm font-semibold text-primary-foreground/80 ${fontClass}`}>{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className={`text-xs text-primary-foreground/40 ${fontClass}`}>
            © {new Date().getFullYear()} {isArabic ? "أسواق للتطوير العقاري. جميع الحقوق محفوظة." : "ASWAQ Developments. All rights reserved."}
          </p>
          <p className={`text-xs text-primary-foreground/40 ${fontClass}`}>
            {isArabic ? "تطوير بواسطة" : "Developed By"}{" "}
            <a href="https://mg.digital/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 underline hover:no-underline">
              MG Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

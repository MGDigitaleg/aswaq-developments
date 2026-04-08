import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Star, ExternalLink, ArrowRight, ArrowLeft } from "lucide-react";
import aswaqLogo from "@/assets/aswaq-logo.webp";

const reviews = [
  { name: "Abdo Elkattan", rating: 5, text: "The best shop for Japanese sweets, boba and mochi 🍡🧁", textAr: "أفضل محل للحلويات اليابانية والبوبا والموتشي 🍡🧁" },
  { name: "Ahmad Halawa", rating: 5, text: "Whatever you want in one place ♥", textAr: "كل اللي تحتاجه في مكان واحد ♥" },
  { name: "Basmala Mohamed", rating: 5, text: "Food: 5 · Service: 5 · Atmosphere: 5", textAr: "الطعام: 5 · الخدمة: 5 · الأجواء: 5" },
  { name: "Trendy Cakes With Eman", rating: 5, text: "Food: 5 · Service: 5 · Atmosphere: 5", textAr: "الطعام: 5 · الخدمة: 5 · الأجواء: 5" },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={12} className={i < rating ? "fill-steel text-steel" : "text-primary-foreground/12"} />
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
        { label: "الرئيسية", href: "/ar" }, { label: "من نحن", href: "/ar/about" },
        { label: "المشاريع", href: "/ar/projects" }, { label: "اختر وحدتك", href: "/ar/units" },
        { label: "الأخبار", href: "/ar/news" }, { label: "معرض الصور", href: "/ar/gallery" },
        { label: "وظائف", href: "/ar/careers" }, { label: "تواصل معنا", href: "/ar/contact" },
      ]
    : [
        { label: "Home", href: "/" }, { label: "About Us", href: "/about" },
        { label: "Our Projects", href: "/projects" }, { label: "Choose your Unit", href: "/units" },
        { label: "News", href: "/news" }, { label: "Gallery", href: "/gallery" },
        { label: "Careers", href: "/careers" }, { label: "Contact Us", href: "/contact" },
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
      {/* Pre-footer CTA */}
      <div className="border-b border-primary-foreground/[0.06]" style={{ background: 'linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(222 38% 15%) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-1">
              {isArabic ? "ابدأ رحلتك العقارية اليوم" : "Start Your Real Estate Journey Today"}
            </h3>
            <p className={`text-primary-foreground/55 text-sm ${fontClass}`}>
              {isArabic ? "اكتشف وحدات تجارية وإدارية وطبية متميزة في مدينة الشروق." : "Discover premium commercial, administrative & medical units in Shorouk City."}
            </p>
          </div>
          <Link to={`${prefix}/units`} className="btn-outline-light px-8 py-3.5 text-[13px] shrink-0 rounded-lg font-body">
            {isArabic ? "استكشف الوحدات" : "Explore Units"}
            <ArrowIcon size={13} />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 lg:pr-10">
            <img src={aswaqLogo} alt="ASWAQ Developments" className="w-[170px] mb-7" width={170} height={67} />
            <p className={`text-primary-foreground/55 text-sm leading-[1.85] ${fontClass} mb-8 max-w-sm`}>
              {isArabic
                ? "شركة تطوير عقاري رائدة متخصصة في المشاريع التجارية والإدارية والطبية في شرق القاهرة. أكثر من 20 عاماً من التميز في مدينة الشروق."
                : "A leading real estate developer specializing in commercial, administrative, and medical projects across East Cairo. Over 20 years of excellence in Shorouk City."}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-primary-foreground/[0.06] border border-primary-foreground/[0.10] flex items-center justify-center text-primary-foreground/55 hover:bg-primary-foreground/[0.12] hover:text-primary-foreground/90 hover:border-primary-foreground/20 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-body text-[10px] font-bold mb-6 text-primary-foreground/70 uppercase tracking-[0.2em]">
              {isArabic ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className={`space-y-3 ${fontClass}`}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-[13px] text-primary-foreground/55 hover:text-primary-foreground/90 transition-colors duration-300">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects + Units */}
          <div>
            <h3 className="font-body text-[10px] font-bold mb-6 text-primary-foreground/70 uppercase tracking-[0.2em]">
              {isArabic ? "مشاريعنا" : "Our Projects"}
            </h3>
            <ul className={`space-y-3 ${fontClass}`}>
              {projectLinks.map((p) => (
                <li key={p.name}><Link to={p.href} className="text-[13px] text-primary-foreground/55 hover:text-primary-foreground/90 transition-colors duration-300">{p.name}</Link></li>
              ))}
            </ul>
            <h3 className="font-body text-[10px] font-bold mt-8 mb-4 text-primary-foreground/70 uppercase tracking-[0.2em]">
              {isArabic ? "الوحدات" : "Units"}
            </h3>
            <ul className={`space-y-3 ${fontClass}`}>
              {unitLinks.map((u) => (
                <li key={u.href}><Link to={u.href} className="text-[13px] text-primary-foreground/55 hover:text-primary-foreground/90 transition-colors duration-300">{u.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-body text-[10px] font-bold mb-6 text-primary-foreground/70 uppercase tracking-[0.2em]">
              {isArabic ? "تواصل معنا" : "Contact Us"}
            </h3>
            <ul className={`space-y-5 ${fontClass}`}>
              {/* Hotline — prominent */}
              <li>
                <a href="tel:19474" className="flex items-center gap-3 group transition-colors duration-300">
                  <div className="w-9 h-9 rounded-lg bg-primary-foreground/[0.06] border border-primary-foreground/[0.10] flex items-center justify-center shrink-0 group-hover:bg-primary-foreground/[0.10] transition-colors">
                    <Phone size={14} className="text-primary-foreground/50" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-primary-foreground/50 mb-0.5">
                      {isArabic ? "الخط الساخن" : "Hotline"}
                    </span>
                    <span className="font-['Montserrat'] font-extrabold text-[16px] text-primary-foreground/90">19474</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:marketing@aswaqdev.com" className="flex items-center gap-3 text-[13px] text-primary-foreground/45 hover:text-primary-foreground/80 transition-colors duration-300">
                  <div className="w-9 h-9 rounded-lg bg-primary-foreground/[0.06] border border-primary-foreground/[0.10] flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-primary-foreground/50" />
                  </div>
                  marketing@aswaqdev.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-[13px] text-primary-foreground/45">
                <div className="w-9 h-9 rounded-lg bg-primary-foreground/[0.06] border border-primary-foreground/[0.10] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={14} className="text-primary-foreground/50" />
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

      {/* Google Reviews */}
      <div className="border-t border-primary-foreground/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-7">
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < 5 ? "fill-steel text-steel" : "text-primary-foreground/15"} />
                ))}
              </div>
              <span className="text-lg font-bold text-primary-foreground/90 font-['Montserrat']">4.6</span>
              <span className={`text-[12px] text-primary-foreground/45 ${fontClass}`}>
                {isArabic ? "بناءً على تقييمات Google" : "based on Google Reviews"}
              </span>
            </div>
            <a
              href="https://maps.app.goo.gl/6jGACMa9mZKx5sYp9"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[12px] text-primary-foreground/45 hover:text-primary-foreground/75 flex items-center gap-1.5 ${fontClass} transition-colors duration-300`}
            >
              {isArabic ? "اترك تقييم" : "Leave a Review"}
              <ExternalLink size={11} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-primary-foreground/[0.03] rounded-xl p-4.5 border border-primary-foreground/[0.06] hover:border-primary-foreground/[0.10] transition-all duration-300"
              >
                <StarRating rating={review.rating} />
                <p className={`text-[12.5px] text-primary-foreground/50 mt-2.5 mb-3 ${fontClass} leading-relaxed min-h-[36px]`}>
                  "{isArabic ? review.textAr : review.text}"
                </p>
                <p className={`text-[12px] font-semibold text-primary-foreground/70 ${fontClass}`}>{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-primary-foreground/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className={`text-[11px] text-primary-foreground/35 ${fontClass}`}>
            © {new Date().getFullYear()} {isArabic ? "أسواق للتطوير العقاري. جميع الحقوق محفوظة." : "ASWAQ Developments. All rights reserved."}
          </p>
          <p className={`text-[11px] text-primary-foreground/35 ${fontClass}`}>
            {isArabic ? "تطوير بواسطة" : "Developed By"}{" "}
            <a href="https://mg.digital/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 underline hover:no-underline">MG Digital</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

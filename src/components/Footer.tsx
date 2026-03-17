import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, Star, ExternalLink } from "lucide-react";
import aswaqLogo from "@/assets/aswaq-logo.png";

const reviews = [
  {
    name: "Ahmed Hassan",
    nameAr: "أحمد حسن",
    rating: 5,
    text: "City Hub is an excellent commercial destination. The location is prime, and the variety of shops and restaurants is impressive. Highly recommend for investors.",
    textAr: "سيتي هب وجهة تجارية ممتازة. الموقع متميز وتنوع المحلات والمطاعم رائع. أنصح بشدة للمستثمرين.",
  },
  {
    name: "Sara Mohamed",
    nameAr: "سارة محمد",
    rating: 5,
    text: "Amazing experience with Aswaq Developments. Professional team and great after-sales service. The mall design is modern and welcoming.",
    textAr: "تجربة رائعة مع أسواق للتطوير العقاري. فريق محترف وخدمة ما بعد البيع ممتازة. تصميم المول عصري ومريح.",
  },
  {
    name: "Omar Khalil",
    nameAr: "عمر خليل",
    rating: 5,
    text: "One of the best commercial projects in Nasr City. Great foot traffic and excellent facilities. The food court is always busy which is great for business.",
    textAr: "من أفضل المشاريع التجارية في مدينة نصر. حركة زوار ممتازة ومرافق رائعة. منطقة المطاعم دائماً مزدحمة وده ممتاز للأعمال.",
  },
];

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
        { label: "وظائف", href: "/ar/careers" },
        { label: "تواصل معنا", href: "/ar/contact" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Our Projects", href: "/projects" },
        { label: "Choose your Unit", href: "/units" },
        { label: "News", href: "/news" },
        { label: "Careers", href: "/careers" },
        { label: "Contact Us", href: "/contact" },
      ];

  const projectLinks = [
    { name: isArabic ? "سيتي هب مول" : "City Hub Mall", href: `${prefix}/projects/city-hub-mall` },
    { name: isArabic ? "ميركادو مول" : "Mercado Mall", href: `${prefix}/projects/mercado-mall` },
    { name: isArabic ? "أرينا مول" : "Arena Mall", href: `${prefix}/projects/arena-mall` },
    { name: isArabic ? "سولاريا مول" : "Solaria Mall", href: `${prefix}/projects/solaria-mall` },
  ];

  const unitLinks = isArabic
    ? [
        { label: "تجاري للبيع", href: "/ar/units/commercial-for-sale" },
        { label: "إداري للبيع", href: "/ar/units/administrative-for-sale" },
        { label: "طبي للبيع", href: "/ar/units/medical-for-sale" },
        { label: "للإيجار", href: "/ar/units/commercial-for-rent" },
        { label: "للاستثمار", href: "/ar/units/commercial-for-investment" },
      ]
    : [
        { label: "Commercial for Sale", href: "/units/commercial-for-sale" },
        { label: "Administrative for Sale", href: "/units/administrative-for-sale" },
        { label: "Medical for Sale", href: "/units/medical-for-sale" },
        { label: "For Rent", href: "/units/commercial-for-rent" },
        { label: "For Investment", href: "/units/commercial-for-investment" },
      ];

  return (
    <>
      {/* Reviews Section */}
      <section className="bg-primary/[0.03] border-t border-border py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Rating Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={22} className="fill-accent text-accent" />
                ))}
              </div>
              <span className="text-2xl font-bold text-foreground">4.6</span>
              <span className="text-sm text-muted-foreground">
                {isArabic ? "بناءً على تقييمات Google" : "based on Google Reviews"}
              </span>
            </div>
            <a
              href="https://www.google.com/maps/place/City+Hub/@30.0611569,31.3494288,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
            >
              {isArabic ? "اترك تقييم" : "Leave a Review"}
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} size={16} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  "{isArabic ? review.textAr : review.text}"
                </p>
                <p className="text-sm font-semibold text-accent">
                  {isArabic ? review.nameAr : review.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <img src={aswaqLogo} alt="ASWAQ Developments" className="w-[180px] mb-4" />
              <p className="text-primary-foreground/70 text-sm leading-relaxed font-body">
                {isArabic
                  ? "شركة تطوير عقاري متطلعة متخصصة في المشاريع التجارية والإدارية والطبية في شرق القاهرة."
                  : "A forward-thinking real estate developer specializing in commercial, administrative, and medical projects across East Cairo."}
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-3 mt-6">
                <a
                  href="https://www.facebook.com/AswaqDev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="https://www.instagram.com/aswaqdev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://www.youtube.com/@aswaqdevelopments3057"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={16} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-4 text-primary-foreground">
                {isArabic ? "روابط سريعة" : "Quick Links"}
              </h4>
              <ul className="space-y-2.5 font-body">
                {quickLinks.map((link) => (
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
              <h4 className="font-display text-lg font-semibold mb-4 text-primary-foreground">
                {isArabic ? "مشاريعنا" : "Our Projects"}
              </h4>
              <ul className="space-y-2.5 font-body">
                {projectLinks.map((project) => (
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

              <h4 className="font-display text-lg font-semibold mb-4 mt-8 text-primary-foreground">
                {isArabic ? "الوحدات" : "Units"}
              </h4>
              <ul className="space-y-2.5 font-body">
                {unitLinks.map((link) => (
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

            {/* Contact */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-4 text-primary-foreground">
                {isArabic ? "تواصل معنا" : "Contact Us"}
              </h4>
              <ul className="space-y-3 font-body">
                <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                  <Phone size={16} className="shrink-0 text-accent" />
                  <a href="tel:19474" className="hover:text-accent transition-colors">19474</a>
                </li>
                <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                  <Mail size={16} className="shrink-0 text-accent" />
                  <a href="mailto:marketing@aswaqdev.com" className="hover:text-accent transition-colors">marketing@aswaqdev.com</a>
                </li>
                <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                  <span>
                    {isArabic
                      ? "فيلا 1/127 - مجمع النسور، حي الملتقى، طريق الأوتوستراد - شيراتون"
                      : "Villa 1/127 - Al-Nsoor complex, Al Moltaqa Neighborhood, Otostrad road - Sheraton"}
                  </span>
                </li>
              </ul>
            </div>

            {/* Map */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-4 text-primary-foreground">
                {isArabic ? "موقعنا" : "Our Location"}
              </h4>
              <div className="rounded-lg overflow-hidden border border-primary-foreground/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.123!2d31.3494288!3d30.0611569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f6d0024fbe5%3A0xa28dc2865dabbf10!2sCity%20Hub!5e0!3m2!1sen!2seg!4v1"
                  width="100%"
                  height="180"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="City Hub Location"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center">
            <p className="text-sm text-primary-foreground/50 font-body">
              © {new Date().getFullYear()} {isArabic ? "أسواق للتطوير العقاري. جميع الحقوق محفوظة." : "ASWAQ Developments. All rights reserved."} | {isArabic ? "تطوير بواسطة" : "Developed By"}{" "}
              <a href="https://mg.digital/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">MG Digital</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

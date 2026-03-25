import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ArrowUpRight } from "lucide-react";
import { useLatestNews } from "@/hooks/useNewsArticles";
import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import UserJourneyPaths from "@/components/UserJourneyPaths";
import TrustSection from "@/components/TrustSection";
import useSEO from "@/hooks/useSEO";
import heroBg from "@/assets/hero-building.jpg";
import heroMercado from "@/assets/hero-mercado.jpg";
import heroArena from "@/assets/hero-arena.jpg";
import heroSolaria from "@/assets/hero-solaria.jpg";
import cityhubImg from "@/assets/cityhub-mall.jpg";
import mercadoImg from "@/assets/mercado-mall.jpg";
import arenaImg from "@/assets/arena-mall.jpg";
import solariaImg from "@/assets/solaria-mall.jpg";

const heroSlides = [
  { image: heroBg, label: "سيتي هب مول" },
  { image: heroMercado, label: "ميركادو مول" },
  { image: heroArena, label: "أرينا مول" },
  { image: heroSolaria, label: "سولاريا مول" },
];

const projects = [
  {
    name: "سيتي هب مول",
    image: cityhubImg,
    href: "/ar/projects/city-hub-mall",
    description: "بموقع متميز في قلب منطقة الشروق أمام نادي سيتي كلوب.",
    location: "مدينة الشروق، شرق القاهرة",
    unitTypes: ["تجاري"],
  },
  {
    name: "ميركادو مول",
    image: mercadoImg,
    href: "/ar/projects/mercado-mall",
    description: "أكبر مول تجاري في مدينة الشروق، يمتد على ثلاث طوابق.",
    location: "مدينة الشروق، شرق القاهرة",
    unitTypes: ["تجاري"],
  },
  {
    name: "أرينا مول",
    image: arenaImg,
    href: "/ar/projects/arena-mall",
    description: "مول حديث بموقع استراتيجي أمام الجامعة، يوفر وحدات متنوعة.",
    location: "مدينة الشروق، شرق القاهرة",
    unitTypes: ["تجاري", "إداري", "طبي"],
  },
  {
    name: "سولاريا مول",
    image: solariaImg,
    href: "/ar/projects/solaria-mall",
    description: "تحفة معمارية تغطي 6,400 م² مع أفضل المنشآت الطبية والتجزئة.",
    location: "مدينة الشروق، شرق القاهرة",
    unitTypes: ["تجاري", "إداري", "طبي"],
  },
];

const faqs = [
  {
    question: "ما أنواع العقارات التي تقدمها شركة أسواق للتطوير العقاري؟",
    answer: "تقدم شركة أسواق مجموعة متنوعة من خيارات العقارات التجارية، بما في ذلك وحدات تجارية للبيع، وحدات للإيجار، مساحات إدارية، وعيادات طبية.",
  },
  {
    question: "كيف يمكنني شراء وحدة أو عقار في مدينة الشروق؟",
    answer: "لشراء عقار في مدينة الشروق، عليك أولاً تحديد نوع العقار الذي يناسب احتياجاتك، ثم زيارة موقعنا لاستكشاف المواقع والأنواع، وبعد ذلك يمكنك التواصل معنا.",
  },
  {
    question: "أين يمكنني شراء وحدة في مدينة الشروق؟",
    answer: "شركة أسواق توفر مساحات تجارية ومساحات تجزئة للبيع عبر وجهاتها الأربع: سولاريا مول، أرينا مول، ميركادو مول، وسيتي هب مول. تتراوح المساحات من 24 م² إلى 300 م².",
  },
  {
    question: "كم عدد المولات التي تمتلك فيها شركة أسواق وحدات متاحة؟",
    answer: "تمتلك شركة أسواق حالياً وحدات في أربعة مولات رئيسية بمدينة الشروق: سولاريا مول، أرينا مول، ميركادو مول، وسيتي هب مول.",
  },
  {
    question: "ما هي المساحات المعتادة للوحدات المتاحة؟",
    answer: "تتراوح مساحات وحداتنا من 30 م² إلى 300 م²، مما يوفر مرونة كافية للمحلات الصغيرة والمتوسطة والكبرى.",
  },
  {
    question: "هل الوحدات التجارية متاحة للبيع والإيجار؟",
    answer: "نعم، توفر شركة أسواق كلاً من الوحدات التجارية للبيع والوحدات للإيجار في جميع مشاريعنا.",
  },
  {
    question: "هل توجد خطط سداد مرنة لشراء الوحدات؟",
    answer: "نعم، توفر شركة أسواق خطط سداد وتقسيط مرنة للمشترين الراغبين في تملك وحدة.",
  },
];

const IndexAr = () => {
  useSEO(
    "أسواق للتطوير العقاري | مطور عقاري متميز في مصر",
    "أسواق للتطوير العقاري تقدم وحدات متميزة للإيجار وعقارات للبيع في مصر، مع عقارات متعددة الاستخدامات في مدينة الشروق."
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const { articles: latestNews } = useLatestNews("ar", 3);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <Layout>
      {/* ═══ PREMIUM HERO ═══ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 gradient-hero-overlay" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[90vh] py-24">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-accent font-arabic font-semibold tracking-[0.15em] text-xs mb-5">
                مطور عقاري متميز
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
                مستقبل التطوير
              </h1>
              <p className="text-primary-foreground/70 font-arabic text-base md:text-lg max-w-lg mb-8 leading-relaxed">
                مشاريع متعددة الاستخدامات في مدينة الشروق — وحدات تجارية وإدارية وطبية مصممة للنمو والعوائد القوية.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  to="/ar/projects"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 font-arabic text-sm shadow-gold"
                >
                  استكشف المشاريع
                  <ArrowUpRight size={16} />
                </Link>
                <Link
                  to="/ar/contact"
                  className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-3.5 font-semibold rounded-lg hover:bg-primary-foreground/10 transition-all duration-300 font-arabic text-sm"
                >
                  استفسر الآن
                </Link>
              </div>

              <div className="flex flex-wrap gap-8">
                {[
                  { value: "20+", label: "سنة" },
                  { value: "15+", label: "مشروع" },
                  { value: "400+", label: "عميل" },
                  { value: "3B+", label: "جنيه" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-2xl md:text-3xl font-bold text-accent">{stat.value}</div>
                    <div className="text-primary-foreground/50 text-xs font-arabic tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="hidden lg:flex flex-col items-start justify-end pb-12">
              <div className="flex flex-col gap-2">
                {heroSlides.map((slide, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`group flex items-center gap-3 transition-all duration-300 ${
                      i === currentSlide ? "opacity-100" : "opacity-50 hover:opacity-80"
                    }`}
                    aria-label={`الانتقال إلى ${slide.label}`}
                  >
                    <div
                      className={`rounded-full transition-all duration-300 ${
                        i === currentSlide ? "w-3 h-8 bg-accent" : "w-3 h-3 bg-primary-foreground/40"
                      }`}
                    />
                    <span
                      className={`text-xs font-arabic text-primary-foreground transition-all duration-300 ${
                        i === currentSlide ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {slide.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 lg:hidden">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentSlide ? "bg-accent w-8 h-3" : "bg-primary-foreground/50 w-3 h-3"
              }`}
              aria-label={`الشريحة ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ═══ USER JOURNEY PATHS ═══ */}
      <UserJourneyPaths />

      {/* ═══ PROJECTS ═══ */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-accent font-arabic font-semibold tracking-widest text-xs mb-3">مشاريعنا</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              مشاريع متميزة
            </h2>
            <p className="text-muted-foreground font-arabic max-w-2xl mx-auto">
              أربعة مولات في مواقع استراتيجية بمدينة الشروق، مصممة للأعمال والمستثمرين ومقدمي الرعاية الصحية.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={project.href}
                  className="group block relative rounded-2xl overflow-hidden shadow-premium-md card-premium"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                    <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
                      {project.unitTypes.map((type) => (
                        <span
                          key={type}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-primary-foreground/15 text-primary-foreground/90 backdrop-blur-sm border border-primary-foreground/10 font-arabic"
                        >
                          {type}
                        </span>
                      ))}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-1.5 text-primary-foreground/60 text-xs font-arabic mb-2">
                        <span className="w-1 h-1 rounded-full bg-accent" />
                        {project.location}
                      </div>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-2">
                        {project.name}
                      </h3>
                      <p className="text-primary-foreground/70 font-arabic text-sm line-clamp-2 mb-3 max-w-sm">
                        {project.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm font-arabic group-hover:gap-3 transition-all duration-300">
                        استكشف المشروع
                        <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRUST SECTION ═══ */}
      <TrustSection />

      {/* ═══ UNITS CTA ═══ */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent font-arabic font-semibold tracking-widest text-xs mb-3">متاح الآن</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              اعثر على مساحتك المثالية
            </h2>
            <p className="text-muted-foreground font-arabic max-w-2xl mx-auto mb-8">
              تصفح وحداتنا المتاحة واختر ما يناسب خطتك التجارية أو الاستثمارية.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {[
                { label: "وحدات للبيع", href: "/ar/units/for-sale" },
                { label: "وحدات تجارية", href: "/ar/units/commercial-for-sale" },
                { label: "وحدات إدارية", href: "/ar/units/administrative-for-sale" },
                { label: "وحدات طبية", href: "/ar/units/medical-for-sale" },
                { label: "وحدات للإيجار", href: "/ar/units/for-rent" },
              ].map((tag) => (
                <Link
                  key={tag.label}
                  to={tag.href}
                  className="border border-border text-foreground/70 px-5 py-2 rounded-full text-sm font-arabic hover:border-accent hover:text-accent transition-all duration-300"
                >
                  {tag.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/ar/units"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 font-semibold rounded-lg hover:bg-navy-light transition-all duration-300 font-arabic text-sm"
              >
                تصفح جميع الوحدات
              </Link>
              <Link
                to="/ar/contact"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 font-arabic text-sm shadow-gold"
              >
                استفسر عن التوافر
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ LATEST NEWS ═══ */}
      {latestNews.length > 0 && (
        <section className="py-24 bg-surface">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="text-accent font-arabic font-semibold tracking-widest text-xs mb-3">ابقَ على اطلاع</p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">آخر الأخبار</h2>
              </div>
              <Link
                to="/ar/news"
                className="text-accent font-semibold font-arabic text-sm inline-flex items-center gap-1 hover:gap-2 transition-all duration-300"
              >
                عرض الكل <ChevronLeft size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={`/ar/news/${article.id}`}
                    className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-premium-lg transition-all duration-500 card-premium"
                  >
                    {article.image && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-display text-lg font-semibold text-foreground mt-1 group-hover:text-accent transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-arabic mt-2 line-clamp-2">{article.excerpt}</p>
                      <span className="inline-flex items-center gap-1 text-sm text-accent mt-4 font-arabic font-semibold group-hover:gap-2 transition-all duration-300">
                        اقرأ المزيد <ChevronLeft size={14} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ FAQs ═══ */}
      <FAQSection faqs={faqs} title="أسئلة شائعة" />

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-premium" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent font-arabic font-semibold tracking-widest text-xs mb-3">ابدأ الآن</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              ابدأ خطوتك العقارية القادمة
            </h2>
            <p className="text-primary-foreground/60 font-arabic max-w-2xl mx-auto mb-8">
              سواء كنت مستثمراً أو تفتتح عملاً تجارياً أو تبحث عن مساحة طبية — أسواق لديها الوحدة المناسبة لك.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/ar/contact"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 font-arabic text-sm shadow-gold"
              >
                احجز استشارة
              </Link>
              <Link
                to="/ar/projects"
                className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-3.5 font-semibold rounded-lg hover:bg-primary-foreground/10 transition-all duration-300 font-arabic text-sm"
              >
                عرض جميع المشاريع
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexAr;

import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, TrendingUp, Layers, ShieldCheck, Building2, ChevronLeft, ArrowLeft } from "lucide-react";
import { useLatestNews } from "@/hooks/useNewsArticles";
import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import ROICalculator from "@/components/ROICalculator";
import TrustedBySection from "@/components/TrustedBySection";
import AnimatedCounter from "@/components/AnimatedCounter";
import useSEO from "@/hooks/useSEO";
import JsonLd, { organizationSchema, websiteSchema, buildFaqSchema } from "@/components/JsonLd";
import heroBg from "@/assets/hero-building.webp";
import heroMercado from "@/assets/hero-mercado.webp";
import heroArena from "@/assets/hero-arena.webp";
import heroSolaria from "@/assets/hero-solaria.webp";
import cityhubImg from "@/assets/cityhub-mall.webp";
import mercadoImg from "@/assets/mercado-mall.webp";
import arenaImg from "@/assets/arena-mall.webp";
import solariaImg from "@/assets/solaria-mall.webp";

const heroSlides = [heroBg, heroMercado, heroArena, heroSolaria];

const stats = [
  { value: "20+", label: "سنوات من الخبرة" },
  { value: "15+", label: "مشروع ناجح" },
  { value: "400+", label: "عميل راضٍ" },
  { value: "3+", label: "مليار جنيه استثمارات" },
];

const projects = [
  {
    name: "سيتي هب مول",
    slug: "city-hub-mall",
    image: cityhubImg,
    description: "بموقع متميز في قلب منطقة الشروق أمام نادي سيتي كلوب. المول يوفر وحدات للإيجار وعقارات استثنائية للبيع.",
  },
  {
    name: "ميركادو مول",
    slug: "mercado-mall",
    image: mercadoImg,
    description: "أكبر مول تجاري في مدينة الشروق، يمتد على ثلاث طوابق ويقدم مجموعة واسعة من الوحدات التجارية.",
  },
  {
    name: "أرينا مول",
    slug: "arena-mall",
    image: arenaImg,
    description: "مول حديث بموقع استراتيجي أمام الجامعة، يوفر مجموعة واسعة من الوحدات التجارية والطبية والإدارية.",
  },
  {
    name: "سولاريا مول",
    slug: "solaria-mall",
    image: solariaImg,
    description: "تحفة معمارية تغطي مساحة 6,400 متر مربع، يقدم أفضل المنشآت الطبية والتجزئة بالقرب من موقعه الاستراتيجي.",
  },
];

const whyInvest = [
  { icon: MapPin, title: "مواقع استراتيجية", text: "مواقع رئيسية في أسرع ممرات شرق القاهرة نمواً" },
  { icon: Layers, title: "خطط مرنة", text: "خطط سداد مصممة للمستثمرين وأصحاب الأعمال" },
  { icon: Building2, title: "وحدات متنوعة", text: "تجارية وإدارية وطبية — من 30 إلى 300 م²" },
  { icon: TrendingUp, title: "عائد مرتفع", text: "طلب إيجاري قوي وارتفاع مستمر في قيمة العقارات" },
  { icon: ShieldCheck, title: "إدارة كاملة", text: "إدارة عقارية احترافية لتملك بدون عناء" },
];

const faqs = [
  {
    question: "ما أنواع العقارات التي تقدمها شركة أسواق للتطوير العقاري؟",
    answer: "تقدم شركة أسواق مجموعة متنوعة من خيارات العقارات التجارية، بما في ذلك وحدات تجارية للبيع، وحدات للإيجار، مساحات إدارية، وعيادات طبية تقع داخل مولات ووجهات تجارية استراتيجية.",
  },
  {
    question: "كيف يمكنني شراء وحدة أو عقار في مدينة الشروق؟",
    answer: "لشراء عقار في مدينة الشروق، عليك أولاً تحديد نوع العقار الذي يناسب احتياجاتك، ثم زيارة موقعنا الإلكتروني لاستكشاف المواقع والأنواع التي نقدمها، وبعد ذلك يمكنك التواصل معنا لطلب وحدتك الخاصة.",
  },
  {
    question: "أين يمكنني شراء وحدة في مدينة الشروق؟",
    answer: "إذا كنت ترغب في شراء وحدة في مدينة الشروق، فإن شركة أسواق للتطوير العقاري توفر مجموعة من المساحات التجارية ومساحات التجزئة للبيع عبر وجهاتها الأربع الكبرى: سولاريا مول، أرينا مول، ميركادو مول، وسيتي هب مول.",
  },
  {
    question: "كم عدد المولات التي تمتلك فيها شركة أسواق وحدات متاحة؟",
    answer: "تمتلك شركة أسواق للتطوير العقاري حالياً وحدات في أربعة مولات رئيسية بمدينة الشروق: سولاريا مول، أرينا مول، ميركادو مول، وسيتي هب مول.",
  },
  {
    question: "ما هي المساحات المعتادة للوحدات المتاحة؟",
    answer: "تتراوح مساحات وحداتنا من 30 م² إلى 300 م²، مما يوفر مرونة كافية للمحلات الصغيرة، والمنافذ متوسطة الحجم، والمتاجر الكبرى.",
  },
  {
    question: "هل الوحدات التجارية متاحة للبيع والإيجار؟",
    answer: "نعم، توفر شركة أسواق للتطوير العقاري كلاً من الوحدات التجارية للبيع والوحدات للإيجار في جميع مشاريعنا (المولات الأربعة).",
  },
  {
    question: "هل توجد خطط سداد مرنة لشراء الوحدات؟",
    answer: "نعم، توفر شركة أسواق خطط سداد وتقسيط مرنة للمشترين الراغبين في تملك وحدة.",
  },
];

const IndexAr = () => {
  useSEO("أسواق للتطوير العقاري | مطور عقاري في مصر", "أسواق للتطوير العقاري تقدم وحدات متميزة للإيجار وعقارات للبيع في مصر، مع عقارات متعددة الاستخدامات في مدينة الشروق وخطط سداد مرنة.");
  const { articles: latestNews } = useLatestNews("ar", 3);
  const faqSchemaData = buildFaqSchema(faqs.map(f => ({ question: f.question, answer: f.answer })));

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <Layout>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={faqSchemaData} />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[700px] overflow-hidden" style={{ height: 'calc(100vh + 50px)', maxHeight: '1000px' }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide]}
              alt=""
              className="w-full h-full object-cover object-center"
              fetchPriority={currentSlide === 0 ? "high" : "auto"}
              loading={currentSlide === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, hsl(var(--navy) / 0.35) 0%, hsl(var(--navy) / 0.15) 40%, hsl(var(--navy) / 0.5) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 50%, hsl(var(--navy) / 0.4) 0%, transparent 70%)' }} />

        <div className="relative z-10 h-full flex items-center pt-[100px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[640px] lg:max-w-[680px] rounded-3xl p-8 md:p-10 lg:p-12 text-center"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--navy) / 0.65) 0%, hsl(var(--navy) / 0.45) 100%)',
                  backdropFilter: 'blur(24px) saturate(1.4)',
                  WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
                  border: '1px solid hsl(0 0% 100% / 0.08)',
                  boxShadow: '0 32px 80px -12px hsl(var(--navy) / 0.5), inset 0 1px 0 hsl(0 0% 100% / 0.06)',
                }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-primary-foreground/60 font-arabic font-semibold tracking-[0.15em] text-[11px] mb-6"
                >
                  أسواق للتطوير العقاري
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground leading-[1.08] mb-6"
                >
                  مستقبل التطوير
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.75 }}
                  className="text-primary-foreground/65 font-arabic text-sm md:text-base leading-[1.8] mb-10 max-w-[420px] mx-auto"
                >
                  مشاريع تجارية وإدارية وطبية متميزة في أكثر مواقع مصر طلبًا.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                  <Link
                    to="/ar/projects"
                    className="btn-premium px-8 py-3.5 text-sm rounded-lg font-arabic inline-flex items-center justify-center gap-2"
                  >
                    استكشف المشاريع
                    <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                  </Link>
                  <Link
                    to="/ar/about"
                    className="btn-outline-light px-8 py-3.5 text-sm rounded-lg font-arabic text-center"
                  >
                    اعرف المزيد عن أسواق
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                  className="flex items-center justify-center gap-8 mt-10 pt-8 border-t border-primary-foreground/[0.08]"
                >
                  {[
                    { value: "20+", label: "سنة" },
                    { value: "15+", label: "مشروع" },
                    { value: "3B+", label: "ج.م" },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="font-['Montserrat'] text-xl lg:text-2xl font-extrabold tracking-tight text-primary-foreground" style={{ letterSpacing: '-0.02em' }}>
                        <AnimatedCounter value={s.value} className="text-primary-foreground" />
                      </div>
                      <div className="text-[10px] text-primary-foreground/45 font-arabic tracking-[0.15em] mt-1">{s.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Slide navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ background: 'hsl(0 0% 100% / 0.1)', backdropFilter: 'blur(8px)', border: '1px solid hsl(0 0% 100% / 0.12)' }}
            aria-label="الشريحة التالية"
          >
            <ChevronLeft size={18} className="text-primary-foreground/80 rotate-180" />
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`rounded-full transition-all duration-500 ${i === currentSlide ? "w-8 h-2" : "w-2 h-2 hover:bg-primary-foreground/50"}`}
                style={{
                  backgroundColor: i === currentSlide ? 'hsl(var(--accent))' : 'hsl(0 0% 100% / 0.3)',
                  boxShadow: i === currentSlide ? '0 0 14px hsl(var(--accent) / 0.5)' : 'none',
                }}
                aria-label={`الانتقال إلى الشريحة ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{ background: 'hsl(0 0% 100% / 0.1)', backdropFilter: 'blur(8px)', border: '1px solid hsl(0 0% 100% / 0.12)' }}
            aria-label="الشريحة السابقة"
          >
            <ChevronLeft size={18} className="text-primary-foreground/80" />
          </button>
        </div>

        <div className="absolute bottom-8 left-8 z-20 hidden md:flex items-baseline gap-1 font-arabic">
          <span className="text-2xl font-display font-bold text-primary-foreground/90">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="text-primary-foreground/30 text-sm mx-1">/</span>
          <span className="text-sm text-primary-foreground/40">{String(heroSlides.length).padStart(2, '0')}</span>
        </div>
      </section>

      {/* ═══════════════ STATS + ABOUT ═══════════════ */}
      <section className="py-20 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="section-label mb-4">تميّز راسخ</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-5 leading-tight">
                المطور العقاري الموثوق في مصر
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto font-arabic text-base md:text-lg leading-relaxed">
                تعد شركة أسواق للتطوير العقاري مطوراً عقارياً يتطلع للمستقبل، متخصصاً في المشاريع التجارية والإدارية والطبية في منطقة شرق القاهرة.
              </p>
              <p className="text-muted-foreground max-w-3xl mx-auto font-arabic mt-3 leading-relaxed">
                سواء كنت تبحث عن عقار للبيع، أو وحدة للإيجار، أو مشروع متعدد الاستخدامات، فإن "أسواق" تقدم مشاريع في مواقع استراتيجية مدعومة بتخطيط ذكي وتصميم يواكب احتياجات السوق.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group text-center p-6 md:p-8 rounded-xl bg-background border border-border/50 hover:-translate-y-2 hover:border-accent/40 transition-all duration-500 ease-out"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="font-['Montserrat'] text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-2">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-sm text-muted-foreground font-arabic">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PROJECTS ═══════════════ */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="section-label mb-4">محفظة مشاريعنا</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground">
              4 مولات بارزة في مدينة الشروق
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link to={`/ar/projects/${project.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3]" style={{ boxShadow: 'var(--shadow-md)' }}>
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent group-hover:from-primary/60 transition-all duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-display text-lg font-bold text-primary-foreground drop-shadow-sm">
                        {project.name}
                      </h3>
                    </div>
                    <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                      <span className="text-primary-foreground font-arabic font-semibold text-sm inline-flex items-center gap-1.5">
                        عرض المشروع <ArrowLeft size={14} />
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground font-arabic line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/ar/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold font-arabic text-foreground hover:text-accent transition-colors duration-300"
            >
              عرض جميع المشاريع <ArrowLeft size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY INVEST ═══════════════ */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="section-label mb-4">مزايا الاستثمار</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground">
              لماذا تستثمر مع أسواق للتطوير العقاري
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {whyInvest.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group text-center p-6 rounded-2xl bg-card border border-border/30 hover:border-accent/20 transition-all duration-500"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center mx-auto mb-4 border border-border/50 group-hover:border-accent/30 transition-colors duration-300">
                  <item.icon size={24} className="text-foreground" />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground mb-1.5">{item.title}</h3>
                <p className="text-xs text-muted-foreground font-arabic leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <TrustedBySection lang="ar" />

      {/* ═══════════════ UNITS CTA + ROI ═══════════════ */}
      <section className="relative py-20 md:py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <p className="text-xs font-semibold tracking-[0.2em] uppercase font-arabic text-accent mb-4">متاح الآن</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-primary-foreground mb-5">
                الوحدات تُباع بسرعة، لا تفوّت الفرصة!
              </h2>
              <p className="text-primary-foreground/70 font-arabic max-w-2xl mx-auto mb-6 text-base leading-relaxed">
                تصفح وحداتنا المتاحة واختر ما يناسب خطتك التجارية أو الاستثمارية.
              </p>
              <div className="flex flex-wrap gap-3 justify-center mb-10">
                {[
                  { label: "عقارات متعددة الاستخدامات", href: "/ar/units" },
                  { label: "وحدات تجارية", href: "/ar/units/commercial-for-sale" },
                  { label: "وحدات إدارية", href: "/ar/units/administrative-for-sale" },
                  { label: "وحدات طبية", href: "/ar/units/medical-for-sale" },
                ].map((tag) => (
                  <Link
                    key={tag.label}
                    to={tag.href}
                    className="border border-primary-foreground/20 text-primary-foreground/80 px-6 py-2 rounded-full text-sm font-arabic hover:border-accent hover:text-accent hover:bg-accent/10 transition-colors duration-300"
                  >
                    {tag.label}
                  </Link>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-5xl mx-auto"
            >
              <ROICalculator isArabic wide />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                to="/ar/units"
                className="btn-premium px-8 py-3.5 text-sm rounded-lg font-arabic group"
              >
                احجز وحدتك
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ LATEST NEWS ═══════════════ */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-14">
            <div>
              <p className="section-label mb-3">أخبار وتحديثات</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                آخر الأخبار
              </h2>
            </div>
            <Link to="/ar/news" className="text-foreground font-semibold font-arabic text-sm inline-flex items-center gap-1.5 hover:gap-2.5 hover:text-accent transition-all duration-300">
              عرض الكل <ChevronLeft size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {latestNews.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={`/ar/news/${article.id}`}
                  className="group block premium-card overflow-hidden"
                >
                  {article.image && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        width={400}
                        height={250}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground mt-1 group-hover:text-accent transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-arabic mt-3 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm text-foreground mt-4 font-arabic font-semibold group-hover:gap-2.5 group-hover:text-accent transition-all duration-300">
                      اقرأ المزيد <ChevronLeft size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection faqs={faqs} title="تسأل، ونحن نجيب" />

      {/* Bottom CTA */}
      <CTASection
        title="ابدأ خطوتك العقارية القادمة مع أسواق للتطوير العقاري"
        subtitle="تبحث عن مطور عقاري موثوق يقدم عقارات متميزة للبيع أو الوحدة المناسبة للإيجار؟"
        buttonText="اطلب تفاصيل الوحدة"
        buttonLink="/ar/units"
      />
    </Layout>
  );
};

export default IndexAr;

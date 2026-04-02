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

const heroSlides = [
  { image: heroBg, label: "سيتي هب مول" },
  { image: heroMercado, label: "ميركادو مول" },
  { image: heroArena, label: "أرينا مول" },
  { image: heroSolaria, label: "سولاريا مول" },
];

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
    tag: "تجاري وتجزئة",
  },
  {
    name: "ميركادو مول",
    slug: "mercado-mall",
    image: mercadoImg,
    description: "أكبر مول تجاري في مدينة الشروق، يمتد على ثلاث طوابق ويقدم مجموعة واسعة من الوحدات التجارية.",
    tag: "متعدد الاستخدامات",
  },
  {
    name: "أرينا مول",
    slug: "arena-mall",
    image: arenaImg,
    description: "مول حديث بموقع استراتيجي أمام الجامعة، يوفر مجموعة واسعة من الوحدات التجارية والطبية والإدارية.",
    tag: "تجاري وطبي",
  },
  {
    name: "سولاريا مول",
    slug: "solaria-mall",
    image: solariaImg,
    description: "تحفة معمارية تغطي مساحة 6,400 متر مربع، يقدم أفضل المنشآت الطبية والتجزئة بالقرب من موقعه الاستراتيجي.",
    tag: "تجزئة وطبي",
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
      <section className="relative min-h-[600px] overflow-hidden" style={{ height: '100vh', maxHeight: '920px' }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt={`أسواق للتطوير العقاري - ${heroSlides[currentSlide].label}`}
              className="w-full h-full object-cover object-center"
              fetchPriority={currentSlide === 0 ? "high" : "auto"}
              loading={currentSlide === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, hsl(226 76% 6% / 0.5) 0%, hsl(226 76% 6% / 0.15) 35%, hsl(226 76% 6% / 0.6) 75%, hsl(226 76% 6% / 0.85) 100%)' }} />

        <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl mr-auto">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-arabic text-[11px] md:text-xs tracking-[0.15em] font-semibold mb-5"
                style={{ color: 'hsl(var(--gold) / 0.8)' }}
              >
                أسواق للتطوير العقاري وإدارة المشروعات
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.15] mb-5"
              >
                4 مولات بارزة{" "}
                <span className="block text-primary-foreground/70 text-3xl md:text-4xl lg:text-[2.75rem] mt-1">
                  في الشروق، شرق القاهرة
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="text-primary-foreground/55 font-arabic text-sm md:text-[15px] leading-[1.9] mb-8 max-w-lg"
              >
                مشاريع تجارية وإدارية وطبية متميزة مدعومة بأكثر من 20 عامًا من الخبرة واستثمارات تتجاوز 3 مليارات جنيه.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.75 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link
                  to="/ar/projects"
                  className="btn-premium px-8 py-3.5 text-sm rounded-lg font-arabic inline-flex items-center justify-center gap-2 group"
                >
                  استكشف المشاريع
                  <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
                </Link>
                <Link
                  to="/ar/contact"
                  className="btn-outline-light px-8 py-3.5 text-sm rounded-lg font-arabic text-center"
                >
                  اطلب استشارة
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex items-center gap-8 md:gap-12 mt-12 pt-8 border-t border-primary-foreground/[0.08]"
            >
              {[
                { value: "20+", label: "سنة" },
                { value: "4", label: "مولات" },
                { value: "3B+", label: "ج.م استثمارات" },
                { value: "400+", label: "عميل" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-['Montserrat'] text-xl md:text-2xl font-extrabold text-primary-foreground" style={{ letterSpacing: '-0.02em' }}>
                    <AnimatedCounter value={s.value} className="text-primary-foreground" />
                  </div>
                  <div className="text-[10px] text-primary-foreground/35 font-arabic tracking-[0.05em] mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-8 left-4 md:left-8 z-20 flex items-center gap-3">
          <div className="flex gap-1.5">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`rounded-full transition-all duration-500 ${i === currentSlide ? "w-7 h-1.5" : "w-1.5 h-1.5 hover:bg-primary-foreground/50"}`}
                style={{
                  backgroundColor: i === currentSlide ? 'hsl(var(--gold))' : 'hsl(0 0% 100% / 0.25)',
                }}
                aria-label={`الانتقال إلى الشريحة ${i + 1}`}
              />
            ))}
          </div>
          <span className="text-[11px] text-primary-foreground/30 font-['Montserrat'] font-semibold ml-1">
            {String(currentSlide + 1).padStart(2, '0')}/{String(heroSlides.length).padStart(2, '0')}
          </span>
        </div>
      </section>

      {/* ═══════════════ STATS + ABOUT ═══════════════ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-20">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group text-center p-6 md:p-8 rounded-2xl bg-card border border-border/40 hover:-translate-y-1 hover:border-accent/30 transition-all duration-500 ease-out"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="font-['Montserrat'] text-3xl md:text-4xl lg:text-[3.25rem] font-extrabold tracking-tight text-foreground mb-2">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-xs text-muted-foreground font-arabic">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <p className="section-label mb-4">تميّز راسخ</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-6 leading-[1.2]">
                المطور العقاري الموثوق في مصر
              </h2>
              <p className="text-muted-foreground font-arabic text-[15px] leading-[1.9] mb-6">
                تعد شركة أسواق للتطوير العقاري مطوراً عقارياً يتطلع للمستقبل، متخصصاً في المشاريع التجارية والإدارية والطبية في منطقة شرق القاهرة.
              </p>
              <p className="text-muted-foreground font-arabic text-[15px] leading-[1.9] mb-8">
                سواء كنت تبحث عن عقار للبيع، أو وحدة للإيجار، أو مشروع متعدد الاستخدامات، فإن "أسواق" تقدم مشاريع في مواقع استراتيجية مدعومة بتخطيط ذكي وتصميم يواكب احتياجات السوق.
              </p>
              <Link
                to="/ar/about"
                className="inline-flex items-center gap-2 text-sm font-semibold font-arabic text-foreground hover:text-accent transition-colors duration-300 group"
              >
                اعرف المزيد عن أسواق
                <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-3">
                {projects.slice(0, 4).map((p) => (
                  <Link
                    key={p.slug}
                    to={`/ar/projects/${p.slug}`}
                    className="group relative aspect-square rounded-xl overflow-hidden"
                    style={{ boxShadow: 'var(--shadow-md)' }}
                  >
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                    <span className="absolute bottom-3 left-3 right-3 text-primary-foreground text-xs font-arabic font-semibold">{p.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PROJECTS ═══════════════ */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14"
          >
            <div>
              <p className="section-label mb-3">محفظة مشاريعنا</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-tight">
                4 مولات بارزة في مدينة الشروق
              </h2>
            </div>
            <Link
              to="/ar/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold font-arabic text-foreground hover:text-accent transition-colors duration-300 group shrink-0"
            >
              عرض جميع المشاريع <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            {projects.slice(0, 2).map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link to={`/ar/projects/${project.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl aspect-[16/10]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                    <img
                      src={project.image}
                      alt={`${project.name} - أسواق للتطوير العقاري`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <span className="inline-block text-[10px] font-arabic font-semibold tracking-[0.08em] text-accent mb-2">{project.tag}</span>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-1.5">
                        {project.name}
                      </h3>
                      <p className="text-primary-foreground/55 text-sm font-arabic line-clamp-2 max-w-md">{project.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.slice(2).map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link to={`/ar/projects/${project.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl aspect-[16/10]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                    <img
                      src={project.image}
                      alt={`${project.name} - أسواق للتطوير العقاري`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block text-[10px] font-arabic font-semibold tracking-[0.08em] text-accent mb-2">{project.tag}</span>
                      <h3 className="font-display text-lg md:text-xl font-bold text-primary-foreground mb-1">
                        {project.name}
                      </h3>
                      <p className="text-primary-foreground/55 text-sm font-arabic line-clamp-2">{project.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY INVEST ═══════════════ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="section-label mb-3">مزايا الاستثمار</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground">
              لماذا تستثمر مع أسواق للتطوير العقاري
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {whyInvest.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="group text-center p-6 md:p-7 rounded-2xl bg-card border border-border/30 hover:border-accent/20 transition-all duration-500"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/15 transition-colors duration-300">
                  <item.icon size={22} className="text-accent" />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground font-arabic leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <TrustedBySection lang="ar" />

      {/* ═══════════════ UNITS CTA + ROI ═══════════════ */}
      <section className="relative py-20 md:py-28 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent" />
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
              <p className="text-[10px] font-semibold tracking-[0.15em] font-arabic text-accent mb-4">متاح الآن</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-primary-foreground mb-5 leading-tight">
                الوحدات تُباع بسرعة، لا تفوّت الفرصة
              </h2>
              <p className="text-primary-foreground/55 font-arabic max-w-2xl mx-auto mb-8 text-[15px] leading-relaxed">
                تصفح وحداتنا المتاحة واختر ما يناسب خطتك التجارية أو الاستثمارية.
              </p>
              <div className="flex flex-wrap gap-2.5 justify-center">
                {[
                  { label: "عقارات متعددة الاستخدامات", href: "/ar/units" },
                  { label: "وحدات تجارية", href: "/ar/units/commercial-for-sale" },
                  { label: "وحدات إدارية", href: "/ar/units/administrative-for-sale" },
                  { label: "وحدات طبية", href: "/ar/units/medical-for-sale" },
                ].map((tag) => (
                  <Link
                    key={tag.label}
                    to={tag.href}
                    className="border border-primary-foreground/15 text-primary-foreground/65 px-5 py-2 rounded-full text-[13px] font-arabic font-medium hover:border-accent/50 hover:text-accent transition-colors duration-300"
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
                className="btn-premium px-9 py-4 text-sm rounded-lg font-arabic group"
              >
                احجز وحدتك
                <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ LATEST NEWS ═══════════════ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="section-label mb-3">أخبار وتحديثات</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                آخر الأخبار
              </h2>
            </div>
            <Link to="/ar/news" className="text-foreground font-semibold font-arabic text-sm inline-flex items-center gap-1.5 hover:gap-2.5 hover:text-accent transition-all duration-300 group">
              عرض الكل <ChevronLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {latestNews.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link
                  to={`/ar/news/${article.id}`}
                  className="group block rounded-2xl overflow-hidden bg-card border border-border/30 hover:border-accent/15 transition-all duration-500 hover:-translate-y-1"
                  style={{ boxShadow: 'var(--shadow-sm)' }}
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
                  <div className="p-5 md:p-6">
                    <h3 className="font-display text-base md:text-lg font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-arabic mt-2.5 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-[13px] text-foreground mt-4 font-arabic font-semibold group-hover:gap-2 group-hover:text-accent transition-all duration-300">
                      اقرأ المزيد <ChevronLeft size={13} />
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

import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, TrendingUp, Layers, ShieldCheck, Building2, ChevronLeft, ArrowLeft, Landmark, Train, GraduationCap, HeartPulse } from "lucide-react";
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

const whyElShorouk = [
  { icon: MapPin, title: "بوابة استراتيجية", text: "تقع في قلب ممر شرق القاهرة المتنامي، مع وصول مباشر لطريق القاهرة-السويس والطريق الدائري." },
  { icon: Landmark, title: "استثمار حكومي", text: "ترقيات ضخمة في البنية التحتية تشمل طرقاً جديدة ومونوريل ومرافق عامة تعزز القيمة طويلة الأمد." },
  { icon: GraduationCap, title: "مركز تعليمي", text: "موطن لجامعات ومدارس كبرى، مما يخلق طلباً مستداماً على الخدمات والنشاط التجاري." },
  { icon: HeartPulse, title: "طلب على الرعاية الصحية", text: "سكان متزايدون يحتاجون إلى مرافق طبية ومساحات تجارية متعلقة بالرعاية الصحية." },
  { icon: Train, title: "مونوريل شرق القاهرة", text: "مونوريل شرق القاهرة القادم يربط الشروق بالعاصمة الإدارية الجديدة والقاهرة الكبرى." },
  { icon: TrendingUp, title: "ارتفاع قيم العقارات", text: "ارتفاع مستمر سنوياً مدفوع بالنمو السكاني وزخم التنمية العمرانية." },
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
    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <Layout>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={faqSchemaData} />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[550px] overflow-hidden" style={{ height: '100vh', maxHeight: '900px' }}>
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

        {/* Strong right-to-left gradient for RTL text readability */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `
            linear-gradient(to left, hsl(222 47% 5% / 0.88) 0%, hsl(222 47% 5% / 0.72) 30%, hsl(222 47% 5% / 0.35) 55%, hsl(222 47% 5% / 0.08) 80%, transparent 100%),
            linear-gradient(to top, hsl(222 47% 5% / 0.75) 0%, transparent 40%)
          `
        }} />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-14 md:pb-18 lg:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl mr-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3 mb-5"
              >
                <div className="w-7 h-px bg-primary-foreground/25" />
                <p className="font-arabic text-[10px] md:text-[11px] tracking-[0.15em] text-primary-foreground/50 font-semibold">
                  أسواق للتطوير العقاري وإدارة المشروعات
                </p>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-display text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] font-bold text-primary-foreground leading-[1.15] mb-5"
              >
                4 مولات بارزة
                <span className="block text-primary-foreground/50 text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] mt-2 font-display font-medium">
                  في الشروق، شرق القاهرة
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-primary-foreground/50 font-arabic text-sm md:text-[15px] leading-[1.8] mb-8 max-w-md"
              >
                مشاريع تجارية وإدارية وطبية متميزة مدعومة بأكثر من 20 عامًا من الخبرة واستثمارات تتجاوز 3 مليارات جنيه.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link
                  to="/ar/projects"
                  className="btn-premium px-8 py-3 text-[12.5px] rounded-lg font-arabic inline-flex items-center justify-center gap-2 group"
                >
                  استكشف المشاريع
                  <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
                </Link>
                <Link
                  to="/ar/contact"
                  className="btn-outline-light px-8 py-3 text-[12.5px] rounded-lg font-arabic text-center"
                >
                  اطلب استشارة
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-4 md:left-10 z-20 flex items-center gap-3">
          <div className="flex gap-1.5">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`rounded-full transition-all duration-500 ${i === currentSlide ? "w-7 h-1 bg-primary-foreground/60" : "w-1 h-1 bg-primary-foreground/20 hover:bg-primary-foreground/35"}`}
                aria-label={`الانتقال إلى الشريحة ${i + 1}`}
              />
            ))}
          </div>
          <span className="text-[9px] text-primary-foreground/20 font-['Montserrat'] font-semibold tabular-nums">
            {String(currentSlide + 1).padStart(2, '0')}/{String(heroSlides.length).padStart(2, '0')}
          </span>
        </div>
      </section>

      {/* ═══════════════ SLIM PROOF BAR ═══════════════ */}
      <section className="bg-primary border-t border-primary-foreground/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center md:justify-between items-center py-6 md:py-7 gap-6 md:gap-4">
            {[
              { value: "20+", label: "سنوات من الخبرة" },
              { value: "15+", label: "مشروع ناجح" },
              { value: "400+", label: "عميل راضٍ" },
              { value: "3B+", label: "مليار ج.م استثمارات" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex items-center gap-3 md:gap-4"
              >
                <span className="font-['Montserrat'] text-lg md:text-xl font-extrabold text-primary-foreground tracking-tight">
                  <AnimatedCounter value={stat.value} className="text-primary-foreground" />
                </span>
                <span className="text-[10px] md:text-[11px] text-primary-foreground/30 font-arabic leading-tight">
                  {stat.label}
                </span>
                {i < 3 && <div className="hidden md:block w-px h-6 bg-primary-foreground/[0.06] mr-4" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ABOUT / BRAND INTRO ═══════════════ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Image — order-2 on desktop for RTL */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-xl)' }}>
                <img src={cityhubImg} alt="أسواق للتطوير العقاري - مطور عقاري متميز" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
              </div>
              {/* Floating credential */}
              <div
                className="absolute -bottom-6 -right-4 md:right-6 rounded-xl px-6 py-4"
                style={{
                  background: 'hsl(var(--ivory))',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid hsl(var(--border) / 0.5)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="font-['Montserrat'] text-2xl font-extrabold text-foreground" style={{ letterSpacing: '-0.02em' }}>4</div>
                    <div className="text-[9px] text-muted-foreground font-arabic">مولات بارزة</div>
                  </div>
                  <div className="w-px h-8 bg-border/60" />
                  <div className="text-center">
                    <div className="font-['Montserrat'] text-2xl font-extrabold text-foreground" style={{ letterSpacing: '-0.02em' }}>20+</div>
                    <div className="text-[9px] text-muted-foreground font-arabic">سنة خبرة</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text — order-1 on desktop for RTL */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <p className="section-label mb-5">تميّز راسخ</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-foreground mb-6 leading-[1.2]">
                المطور العقاري الموثوق في مصر
              </h2>
              <p className="text-muted-foreground font-arabic text-[15px] leading-[1.85] mb-4">
                تعد شركة أسواق للتطوير العقاري مطوراً عقارياً يتطلع للمستقبل، متخصصاً في المشاريع التجارية والإدارية والطبية في منطقة شرق القاهرة.
              </p>
              <p className="text-muted-foreground font-arabic text-[15px] leading-[1.85] mb-8">
                سواء كنت تبحث عن عقار للبيع، أو وحدة للإيجار، أو مشروع متعدد الاستخدامات، فإن "أسواق" تقدم مشاريع في مواقع استراتيجية مدعومة بتخطيط ذكي وتصميم يواكب احتياجات السوق.
              </p>
              <Link
                to="/ar/about"
                className="btn-outline-dark px-6 py-2.5 text-[12.5px] rounded-lg font-arabic group"
              >
                اعرف المزيد عن أسواق
                <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 4 LANDMARK MALLS ═══════════════ */}
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
              <p className="section-label mb-4">محفظة مشاريعنا</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-foreground leading-tight">
                4 مولات بارزة في مدينة الشروق
              </h2>
            </div>
            <Link
              to="/ar/projects"
              className="inline-flex items-center gap-2 text-[12.5px] font-semibold font-arabic text-foreground hover:text-navy-rich transition-colors duration-300 group shrink-0"
            >
              عرض جميع المشاريع <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
            </Link>
          </motion.div>

          {/* Featured project large */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <Link to={`/ar/projects/${projects[0].slug}`} className="group block">
              <div className="relative overflow-hidden rounded-2xl aspect-[21/9]" style={{ boxShadow: 'var(--shadow-xl)' }}>
                <img
                  src={projects[0].image}
                  alt={`${projects[0].name} - أسواق للتطوير العقاري`}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-primary/80 via-primary/25 to-transparent" />
                <div className="absolute bottom-0 right-0 p-7 md:p-10 max-w-lg">
                  <span className="inline-block text-[9px] font-arabic font-semibold tracking-[0.08em] text-primary-foreground/40 mb-2">{projects[0].tag}</span>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-1.5">
                    {projects[0].name}
                  </h3>
                  <p className="text-primary-foreground/45 text-[13px] font-arabic leading-relaxed">{projects[0].description}</p>
                </div>
              </div>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.slice(1).map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link to={`/ar/projects/${project.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/5]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                    <img
                      src={project.image}
                      alt={`${project.name} - أسواق للتطوير العقاري`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/15 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <span className="inline-block text-[9px] font-arabic font-semibold tracking-[0.08em] text-primary-foreground/38 mb-1.5">{project.tag}</span>
                      <h3 className="font-display text-lg font-bold text-primary-foreground mb-1">
                        {project.name}
                      </h3>
                      <p className="text-primary-foreground/40 text-[12px] font-arabic line-clamp-2 leading-relaxed">{project.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY EL SHOROUK ═══════════════ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="w-8 h-px bg-steel/40" />
              <p className="section-label">ميزة الموقع</p>
              <div className="w-8 h-px bg-steel/40" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-foreground leading-[1.2] mb-4">
              لماذا الشروق؟
            </h2>
            <p className="text-muted-foreground font-arabic text-[15px] leading-relaxed max-w-2xl mx-auto">
              مدينة الشروق من أكثر ممرات شرق القاهرة ديناميكية — موقع استراتيجي تتلاقى فيه البنية التحتية والتعليم والطلب التجاري.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyElShorouk.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="p-6 rounded-xl bg-card border border-border/40 hover:border-border transition-all duration-500 group"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <item.icon size={17} className="text-foreground" />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-[12.5px] text-muted-foreground font-arabic leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY INVEST ═══════════════ */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="w-8 h-px bg-steel/40" />
              <p className="section-label">مزايا الاستثمار</p>
              <div className="w-8 h-px bg-steel/40" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-foreground leading-[1.2]">
              لماذا تستثمر مع أسواق
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {whyInvest.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="group text-center p-6 rounded-xl bg-card border border-border/40 hover:border-border transition-all duration-500"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-4">
                  <item.icon size={18} className="text-foreground" />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-[12px] text-muted-foreground font-arabic leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <TrustedBySection lang="ar" />

      {/* ═══════════════ UNITS CTA + ROI ═══════════════ */}
      <section className="relative py-20 md:py-28 bg-primary overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary-foreground/[0.02] to-transparent" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-primary-foreground/[0.01] blur-3xl" />
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
              <div className="flex items-center gap-3 justify-center mb-5">
                <div className="w-6 h-px bg-primary-foreground/15" />
                <p className="text-[10px] font-semibold tracking-[0.15em] font-arabic text-primary-foreground/40">متاح الآن</p>
                <div className="w-6 h-px bg-primary-foreground/15" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-primary-foreground mb-5 leading-tight">
                الوحدات تُباع بسرعة، لا تفوّت الفرصة
              </h2>
              <p className="text-primary-foreground/45 font-arabic max-w-xl mx-auto mb-8 text-[15px] leading-relaxed">
                تصفح وحداتنا المتاحة واختر ما يناسب خطتك التجارية أو الاستثمارية.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { label: "عقارات متعددة الاستخدامات", href: "/ar/units" },
                  { label: "وحدات تجارية", href: "/ar/units/commercial-for-sale" },
                  { label: "وحدات إدارية", href: "/ar/units/administrative-for-sale" },
                  { label: "وحدات طبية", href: "/ar/units/medical-for-sale" },
                ].map((tag) => (
                  <Link
                    key={tag.label}
                    to={tag.href}
                    className="border border-primary-foreground/10 text-primary-foreground/50 px-4 py-1.5 rounded-full text-[11px] font-arabic font-medium hover:border-primary-foreground/22 hover:text-primary-foreground/70 transition-colors duration-300"
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
              transition={{ duration: 0.6, delay: 0.15 }}
              className="w-full max-w-5xl mx-auto"
            >
              <ROICalculator isArabic wide />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <Link
                to="/ar/units"
                className="btn-outline-light px-9 py-3.5 text-[12.5px] rounded-lg font-arabic group"
              >
                احجز وحدتك
                <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
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
              <p className="section-label mb-4">أخبار وتحديثات</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                آخر الأخبار
              </h2>
            </div>
            <Link to="/ar/news" className="text-foreground font-semibold font-arabic text-[12.5px] inline-flex items-center gap-1.5 hover:gap-2.5 hover:text-navy-rich transition-all duration-300 group">
              عرض الكل <ChevronLeft size={12} className="transition-transform group-hover:-translate-x-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
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
                  className="group block rounded-xl overflow-hidden bg-card border border-border/40 hover:border-border transition-all duration-500 hover:-translate-y-1"
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
                  <div className="p-5">
                    <h3 className="font-display text-[15px] md:text-base font-semibold text-foreground group-hover:text-navy-rich transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-[12.5px] text-muted-foreground font-arabic mt-2.5 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-foreground mt-4 font-arabic font-semibold group-hover:gap-2 group-hover:text-navy-rich transition-all duration-300">
                      اقرأ المزيد <ChevronLeft size={11} />
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

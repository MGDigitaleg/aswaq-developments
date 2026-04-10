import { Link } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, TrendingUp, Layers, ShieldCheck, Building2, ChevronLeft, ArrowLeft, Landmark, Train, GraduationCap, HeartPulse } from "lucide-react";
const solariaVideoUrl = "/solaria-orbit-clean.mp4";
import { useLatestNews } from "@/hooks/useNewsArticles";
import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import ROICalculator from "@/components/ROICalculator";
import TrustedBySection from "@/components/TrustedBySection";
import AnimatedCounter from "@/components/AnimatedCounter";
import MercadoTenantsSection from "@/components/MercadoTenantsSection";
import useSEO from "@/hooks/useSEO";
import JsonLd, { organizationSchema, websiteSchema, buildFaqSchema } from "@/components/JsonLd";
import heroSolariaNight from "@/assets/gallery/solaria-night.webp";
import heroArenaNight from "@/assets/gallery/arena-2.webp";
import heroMercadoNight from "@/assets/gallery/mercado-5.webp";
import heroCityhubFountain from "@/assets/gallery/cityhub-1.webp";
import heroCityhub from "@/assets/gallery/cityhub-1.webp";
import cityhubImg from "@/assets/cityhub-mall.webp";
import mercadoImg from "@/assets/mercado-mall.webp";
import arenaImg from "@/assets/arena-mall.webp";
import solariaImg from "@/assets/solaria-mall.webp";
import solariaPositioning from "@/assets/solaria-positioning.webp";
import solariaLogo from "@/assets/logos/solaria-mall-clean.png";
import arenaLogo from "@/assets/logos/arena-mall-clean.png";
import mercadoLogo from "@/assets/logos/mercado-mall-clean.png";
import cityHubLogo from "@/assets/logos/city-hub-mall-clean.png";

const heroSlides = [
  { image: heroSolariaNight, label: "سولاريا مول", objectPos: "object-center" },
  { image: heroMercadoNight, label: "ميركادو مول", objectPos: "object-center" },
  { image: heroArenaNight, label: "أرينا مول", objectPos: "object-[center_60%]" },
  { image: heroCityhubFountain, label: "سيتي هب مول", objectPos: "object-center" },
];

const editorialProjects = [
  {
    name: "سولاريا مول",
    slug: "solaria-mall",
    image: heroSolariaNight,
    logo: solariaLogo,
    tag: "تجزئة وطبي",
    location: "مدينة الشروق، شرق القاهرة",
    description: "معلم تجاري راقٍ يمتد على 6,400 م² — يقدم مساحات تجزئة وطبية وإدارية مصممة لقيمة دائمة.",
    cta: "استكشف سولاريا",
  },
  {
    name: "أرينا مول",
    slug: "arena-mall",
    image: heroArenaNight,
    logo: arenaLogo,
    tag: "تجاري وطبي",
    location: "مدينة الشروق، شرق القاهرة",
    description: "مجمع تجزئة وطبي متكامل مصمم للأعمال الخدمية الحديثة والمتخصصين في الرعاية الصحية.",
    cta: "اكتشف أرينا",
  },
  {
    name: "ميركادو مول",
    slug: "mercado-mall",
    image: heroMercadoNight,
    logo: mercadoLogo,
    tag: "متعدد الاستخدامات",
    location: "مدينة الشروق، شرق القاهرة",
    description: "أكبر مول خدمات متكامل في الشروق — مركز حيوي للتجزئة والمطاعم والتجارة اليومية.",
    cta: "عرض ميركادو",
  },
  {
    name: "سيتي هب مول",
    slug: "city-hub-mall",
    image: heroCityhub,
    logo: cityHubLogo,
    tag: "تجاري وتجزئة",
    location: "مدينة الشروق، شرق القاهرة",
    description: "وجهة متعددة الاستخدامات تجمع بين مساحات التجزئة والمكاتب المتميزة في موقع استراتيجي رئيسي.",
    cta: "استكشف سيتي هب",
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

  const SLIDE_DURATION = 6000;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [nextSlide]);

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(elapsed / SLIDE_DURATION, 1));
      if (elapsed < SLIDE_DURATION) rafRef.current = requestAnimationFrame(tick);
    };
    const rafRef = { current: requestAnimationFrame(tick) };
    return () => cancelAnimationFrame(rafRef.current);
  }, [currentSlide]);

  return (
    <Layout>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={faqSchemaData} />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[550px] overflow-hidden" style={{ height: '100vh', maxHeight: '900px' }}>
        {heroSlides.map((slide, idx) => (
          <motion.div
            key={idx}
            initial={false}
            animate={{ 
              opacity: idx === currentSlide ? 1 : 0,
              scale: idx === currentSlide ? 1 : 1.05,
            }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
            style={{ zIndex: idx === currentSlide ? 1 : 0 }}
          >
            <motion.img
              src={slide.image}
              alt={`أسواق للتطوير العقاري - ${slide.label}`}
              className={`w-full h-full object-cover ${slide.objectPos}`}
              fetchPriority={idx === 0 ? "high" : "auto"}
              loading={idx === 0 ? "eager" : "lazy"}
              animate={idx === currentSlide ? { scale: [1, 1.08] } : {}}
              transition={{ duration: 6.5, ease: "linear" }}
            />
          </motion.div>
        ))}

        {/* Cinematic gradient overlay - RTL */}
        <div className="absolute inset-0 pointer-events-none z-[2]" style={{
          background: `
            linear-gradient(to left, hsl(222 47% 5% / 0.90) 0%, hsl(222 47% 5% / 0.74) 28%, hsl(222 47% 5% / 0.38) 52%, hsl(222 47% 5% / 0.10) 78%, transparent 100%),
            linear-gradient(to top, hsl(222 47% 5% / 0.80) 0%, hsl(222 47% 5% / 0.15) 35%, transparent 60%)
          `
        }} />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-14 md:pb-20 lg:pb-24">
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

        {/* Premium slide indicators with progress bars - RTL positioned */}
        <div className="absolute bottom-6 left-4 md:left-10 z-20 flex items-center gap-4">
          <div className="flex gap-2">
            {heroSlides.map((slide, i) => (
              <button
                key={i}
                onClick={() => { setCurrentSlide(i); setProgress(0); }}
                className="group flex flex-col items-center gap-1.5"
                aria-label={`الانتقال إلى الشريحة ${i + 1} - ${slide.label}`}
              >
                <span className={`text-[8px] font-['Montserrat'] font-semibold tracking-wider uppercase transition-all duration-500 ${i === currentSlide ? 'text-primary-foreground/70' : 'text-primary-foreground/0 group-hover:text-primary-foreground/30'}`}>
                  {slide.label.split(' ')[0]}
                </span>
                <div className="relative w-8 md:w-12 h-[2px] bg-primary-foreground/15 rounded-full overflow-hidden">
                  {i === currentSlide && (
                    <div
                      className="absolute inset-y-0 left-0 bg-primary-foreground/70 rounded-full"
                      style={{ width: `${progress * 100}%` }}
                    />
                  )}
                  {i < currentSlide && (
                    <div className="absolute inset-0 bg-primary-foreground/40 rounded-full" />
                  )}
                </div>
              </button>
            ))}
          </div>
          <span className="text-[9px] text-primary-foreground/25 font-['Montserrat'] font-semibold tabular-nums">
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

      {/* ═══════════════ MARKET POSITIONING — FLAGSHIP ═══════════════ */}
      <section className="py-14 md:py-20 lg:py-26 bg-background" dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.85fr] gap-8 lg:gap-12 items-center">
            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative order-1 lg:order-2"
            >
              <div
                className="relative overflow-hidden rounded-lg aspect-[3/2]"
                style={{ boxShadow: '0 28px 72px -18px hsl(232 30% 10% / 0.14), 0 8px 20px -8px hsl(232 30% 10% / 0.06)' }}
              >
                <motion.img
                  src={solariaPositioning}
                  alt="أسواق للتطوير العقاري - سولاريا مول"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '35% 55%' }}
                  loading="lazy"
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, hsl(232 78% 8% / 0.10) 0%, transparent 45%)' }} />
              </div>

              {/* Stats Card — inset plaque */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute bottom-3 right-3 md:bottom-4 md:right-4 rounded-md px-3 py-1.5"
                style={{
                  background: 'hsl(0 0% 100% / 0.88)',
                  backdropFilter: 'blur(24px) saturate(1.3)',
                  WebkitBackdropFilter: 'blur(24px) saturate(1.3)',
                  boxShadow: '0 1px 6px hsl(0 0% 0% / 0.06), 0 0 0 1px hsl(0 0% 100% / 0.15)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-['Montserrat'] text-[0.85rem] font-extrabold leading-none mb-px" style={{ letterSpacing: '-0.04em', color: 'hsl(232 78% 10%)' }}>
                      <AnimatedCounter value="4+" className="text-foreground" />
                    </div>
                    <div className="text-[6px] font-arabic tracking-[0.12em] leading-tight" style={{ color: 'hsl(232 20% 40% / 0.6)' }}>
                      مشاريع
                    </div>
                  </div>
                  <div className="w-px h-3.5" style={{ background: 'hsl(232 20% 40% / 0.1)' }} />
                  <div>
                    <div className="font-['Montserrat'] text-[0.85rem] font-extrabold leading-none mb-px" style={{ letterSpacing: '-0.04em', color: 'hsl(232 78% 10%)' }}>
                      <AnimatedCounter value="20+" className="text-foreground" />
                    </div>
                    <div className="text-[6px] font-arabic tracking-[0.12em] leading-tight" style={{ color: 'hsl(232 20% 40% / 0.6)' }}>
                      سنة
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Text Column */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 lg:order-1"
            >
              <p
                className="text-[9.5px] font-arabic font-semibold tracking-[0.2em] mb-6"
                style={{ color: 'hsl(var(--steel))' }}
              >
                مكانة سوقية
              </p>
              <h2
                className="font-display text-[1.65rem] md:text-[2rem] lg:text-[2.35rem] font-bold text-foreground leading-[1.18] mb-7 max-w-[420px]"
                style={{ letterSpacing: '-0.01em' }}
              >
                من التواجد العقاري
                <br />
                إلى <span className="text-navy-rich">القوة السوقية</span>
              </h2>
              <div className="space-y-3 mb-10">
                <p className="text-muted-foreground font-arabic text-[13.5px] leading-[1.95] max-w-[400px]">
                  أسواق لا تبني عقارات فحسب — بل تصنع مواقع سوقية استراتيجية.
                </p>
                <p className="text-muted-foreground/80 font-arabic text-[13.5px] leading-[1.95] max-w-[400px]">
                  كل مشروع مصمم لتعزيز الحضور التجاري، وزيادة القيمة السوقية، وتحويل المواقع المتميزة إلى ميزة استثمارية طويلة الأمد.
                </p>
              </div>
              <Link
                to="/ar/projects"
                className="inline-flex items-center gap-2.5 font-arabic text-[11px] font-semibold tracking-[0.06em] px-5.5 py-2.5 rounded-md border border-foreground/12 text-foreground/80 hover:text-foreground hover:border-foreground/30 transition-all duration-400 group"
              >
                استكشف مشاريعنا
                <ArrowLeft size={11} className="transition-all duration-400 group-hover:-translate-x-1 opacity-50 group-hover:opacity-90" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ MERCADO TENANTS ═══════════════ */}
      <MercadoTenantsSection isArabic />

      {/* ═══════════════ PORTFOLIO HEADER ═══════════════ */}
      <section className="pt-20 md:pt-28 pb-6 md:pb-8 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-steel/40" />
                <p className="section-label">محفظة مشاريعنا</p>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-foreground leading-[1.08]">
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
        </div>
      </section>

      {/* ═══════════════ سولاريا — FLAGSHIP HERO ═══════════════ */}
      <section className="pb-1 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Cinematic Solaria Aerial — Living Video */}
            <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: '0 32px 80px -16px hsl(232 78% 8% / 0.18), 0 12px 28px -8px hsl(232 78% 8% / 0.08)' }}>
              <div className="aspect-[4/3] md:aspect-[2/1] relative">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/solaria-orbit/frame-12.jpg"
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={solariaVideoUrl} type="video/mp4" />
                </video>
              </div>

              {/* Desktop overlay content — RTL: aligned right */}
              <div className="absolute inset-y-0 right-0 hidden md:flex items-center p-10 lg:p-14 z-[5] pointer-events-none">
                <div className="max-w-md text-right">
                  <div className="flex items-start gap-5 mb-5 flex-row-reverse justify-end">
                    <div className="pt-1">
                      <span className="block text-[9px] font-arabic font-bold tracking-[0.25em] text-primary-foreground/40 mb-1.5">
                        {editorialProjects[0].tag}
                      </span>
                      <h3 className="font-display text-[2.25rem] lg:text-[2.5rem] font-bold text-primary-foreground leading-[1.02]" style={{ letterSpacing: '-0.01em' }}>
                        {editorialProjects[0].name}
                      </h3>
                    </div>
                    <div className="w-24 lg:w-[104px] h-24 lg:h-[104px] rounded-2xl bg-white/95 border border-white/25 flex items-center justify-center p-1.5 shrink-0 pointer-events-auto" style={{ boxShadow: '0 8px 32px hsl(0 0% 0% / 0.2)' }}>
                      <img src={editorialProjects[0].logo} alt="" className="w-[85%] h-[85%] object-contain" />
                    </div>
                  </div>
                  <p className="text-primary-foreground/55 text-[14px] font-arabic leading-[1.7] mb-6">
                    {editorialProjects[0].description}
                  </p>
                  <Link
                    to={`/ar/projects/${editorialProjects[0].slug}`}
                    className="inline-flex items-center gap-2.5 text-[11px] font-bold font-arabic tracking-[0.15em] px-7 py-3 rounded-lg bg-primary-foreground/[0.08] border border-primary-foreground/20 text-primary-foreground/90 hover:bg-primary-foreground/15 hover:border-primary-foreground/40 transition-all duration-300 backdrop-blur-sm pointer-events-auto"
                  >
                    {editorialProjects[0].cta}
                    <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1.5" />
                  </Link>
                </div>
              </div>

              {/* Gradient overlay for text readability — RTL: gradient from right */}
              <div className="absolute inset-0 pointer-events-none hidden md:block" style={{
                background: 'linear-gradient(to left, hsl(232 78% 8% / 0.75) 0%, hsl(232 78% 10% / 0.45) 30%, hsl(232 78% 10% / 0.08) 55%, transparent 100%)'
              }} />
            </div>

            {/* Mobile content — below the orbit viewer */}
            <div className="md:hidden mt-5 px-1">
              <div className="flex items-start gap-4 mb-3 flex-row-reverse">
                <div className="w-16 h-16 rounded-xl bg-white border border-border/40 flex items-center justify-center p-1 shrink-0" style={{ boxShadow: '0 4px 16px hsl(0 0% 0% / 0.08)' }}>
                  <img src={editorialProjects[0].logo} alt="" className="w-[85%] h-[85%] object-contain" />
                </div>
                <div className="pt-0.5 text-right">
                  <span className="block text-[9px] font-arabic font-bold tracking-[0.25em] text-foreground/30 mb-1">
                    {editorialProjects[0].tag}
                  </span>
                  <h3 className="font-display text-[1.5rem] font-bold text-foreground leading-[1.08]">
                    {editorialProjects[0].name}
                  </h3>
                </div>
              </div>
              <p className="text-muted-foreground text-[13px] font-arabic leading-[1.7] mb-4 text-right">
                {editorialProjects[0].description}
              </p>
              <Link
                to={`/ar/projects/${editorialProjects[0].slug}`}
                className="inline-flex items-center gap-2.5 text-[11px] font-bold font-arabic tracking-[0.15em] px-6 py-2.5 rounded-lg border border-foreground/15 text-foreground/60 hover:border-foreground/35 hover:text-foreground transition-all duration-300"
              >
                {editorialProjects[0].cta}
                <ArrowLeft size={12} className="transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ أرينا — IMAGE LEFT / TEXT RIGHT ═══════════════ */}
      <section className="py-8 md:py-11 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to={`/ar/projects/${editorialProjects[1].slug}`} className="group grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-5 lg:gap-7 items-center">
              <div className="order-1 lg:order-2 relative overflow-hidden rounded-2xl aspect-[5/4]" style={{ boxShadow: 'var(--shadow-xl)' }}>
                <img src={editorialProjects[1].image} alt={`${editorialProjects[1].name} - أسواق للتطوير العقاري`} className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]" loading="lazy" />
              </div>
              <div className="order-2 lg:order-1 lg:pl-2">
                <div className="flex items-start gap-4 mb-3.5">
                  <div className="w-[72px] h-[72px] md:w-[84px] md:h-[84px] rounded-xl bg-white border border-border/40 flex items-center justify-center shrink-0" style={{ boxShadow: '0 4px 16px hsl(0 0% 0% / 0.08)' }}>
                    <img src={editorialProjects[1].logo} alt="" className="w-[80%] h-[80%] object-contain" />
                  </div>
                  <div className="pt-1">
                    <span className="block text-[9px] font-arabic font-bold tracking-[0.25em] text-foreground/30 mb-1">
                      {editorialProjects[1].tag}
                    </span>
                    <h3 className="font-display text-[1.5rem] md:text-[1.75rem] font-bold text-foreground leading-[1.08]">
                      {editorialProjects[1].name}
                    </h3>
                  </div>
                </div>
                <p className="text-muted-foreground text-[14px] font-arabic leading-[1.7] mb-1">
                  {editorialProjects[1].description}
                </p>
                <p className="text-[11px] font-arabic text-foreground/28 tracking-wide mb-5 flex items-center gap-1.5">
                  <MapPin size={10} /> {editorialProjects[1].location}
                </p>
                <span className="inline-flex items-center gap-2.5 text-[11px] font-bold font-arabic tracking-[0.15em] px-6 py-2.5 rounded-lg border border-foreground/15 text-foreground/60 group-hover:border-foreground/35 group-hover:text-foreground group-hover:bg-foreground/[0.03] group-hover:shadow-sm transition-all duration-300">
                  {editorialProjects[1].cta}
                  <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ ميركادو — TEXT RIGHT / IMAGE LEFT ═══════════════ */}
      <section className="py-8 md:py-11 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to={`/ar/projects/${editorialProjects[2].slug}`} className="group grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-5 lg:gap-7 items-center">
              <div className="relative overflow-hidden rounded-2xl aspect-[5/4]" style={{ boxShadow: 'var(--shadow-xl)' }}>
                <img src={editorialProjects[2].image} alt={`${editorialProjects[2].name} - أسواق للتطوير العقاري`} className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]" loading="lazy" />
              </div>
              <div className="lg:pr-2">
                <div className="flex items-start gap-4 mb-3.5">
                  <div className="w-[72px] h-[72px] md:w-[84px] md:h-[84px] rounded-xl bg-white border border-border/40 flex items-center justify-center shrink-0" style={{ boxShadow: '0 4px 16px hsl(0 0% 0% / 0.08)' }}>
                    <img src={editorialProjects[2].logo} alt="" className="w-[80%] h-[80%] object-contain" />
                  </div>
                  <div className="pt-1">
                    <span className="block text-[9px] font-arabic font-bold tracking-[0.25em] text-foreground/30 mb-1">
                      {editorialProjects[2].tag}
                    </span>
                    <h3 className="font-display text-[1.5rem] md:text-[1.75rem] font-bold text-foreground leading-[1.08]">
                      {editorialProjects[2].name}
                    </h3>
                  </div>
                </div>
                <p className="text-muted-foreground text-[14px] font-arabic leading-[1.7] mb-1">
                  {editorialProjects[2].description}
                </p>
                <p className="text-[11px] font-arabic text-foreground/28 tracking-wide mb-5 flex items-center gap-1.5">
                  <MapPin size={10} /> {editorialProjects[2].location}
                </p>
                <span className="inline-flex items-center gap-2.5 text-[11px] font-bold font-arabic tracking-[0.15em] px-6 py-2.5 rounded-lg border border-foreground/15 text-foreground/60 group-hover:border-foreground/35 group-hover:text-foreground group-hover:bg-foreground/[0.03] group-hover:shadow-sm transition-all duration-300">
                  {editorialProjects[2].cta}
                  <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ سيتي هب — IMMERSIVE OVERLAY ═══════════════ */}
      <section className="py-8 md:py-11 pb-14 md:pb-18 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to={`/ar/projects/${editorialProjects[3].slug}`} className="group block">
              <div className="relative overflow-hidden rounded-2xl aspect-[2/1] md:aspect-[2.8/1]" style={{ boxShadow: 'var(--shadow-xl)' }}>
                <img src={editorialProjects[3].image} alt={`${editorialProjects[3].name} - أسواق للتطوير العقاري`} className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]" loading="lazy" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, hsl(232 78% 8% / 0.88) 0%, hsl(232 78% 10% / 0.45) 50%, hsl(232 78% 10% / 0.15) 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
                  <div className="flex items-center gap-5">
                    <div className="w-[72px] h-[72px] md:w-[84px] md:h-[84px] rounded-xl bg-white/95 border border-white/20 flex items-center justify-center shrink-0" style={{ boxShadow: '0 6px 24px hsl(0 0% 0% / 0.18)' }}>
                      <img src={editorialProjects[3].logo} alt="" className="w-[80%] h-[80%] object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-[9px] font-arabic font-bold tracking-[0.25em] text-primary-foreground/40 mb-1">
                        {editorialProjects[3].tag}
                      </span>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground leading-tight mb-1">
                        {editorialProjects[3].name}
                      </h3>
                      <p className="text-primary-foreground/45 text-[13px] font-arabic leading-[1.6] max-w-lg hidden md:block">
                        {editorialProjects[3].description}
                      </p>
                    </div>
                    <span className="hidden md:inline-flex items-center gap-2.5 text-[11px] font-bold font-arabic tracking-[0.15em] px-7 py-3 rounded-lg bg-primary-foreground/[0.1] border border-primary-foreground/25 text-primary-foreground/90 group-hover:bg-primary-foreground/18 group-hover:border-primary-foreground/45 transition-all duration-300 backdrop-blur-sm shrink-0">
                      {editorialProjects[3].cta}
                      <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1.5" />
                    </span>
                  </div>
                  <div className="md:hidden mt-3">
                    <p className="text-primary-foreground/45 text-[13px] font-arabic leading-[1.6] mb-4">
                      {editorialProjects[3].description}
                    </p>
                    <span className="inline-flex items-center gap-2.5 text-[11px] font-bold font-arabic tracking-[0.15em] px-6 py-2.5 rounded-lg bg-primary-foreground/[0.1] border border-primary-foreground/25 text-primary-foreground/90">
                      {editorialProjects[3].cta}
                      <ArrowLeft size={12} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>


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

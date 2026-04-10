import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle2, MapPin, ShoppingBag, UtensilsCrossed,
  Briefcase, Sparkles, Building2, Eye, Users, LayoutGrid, Store,
  Repeat, Target, ExternalLink, CircleDot
} from "lucide-react";
import Layout from "@/components/Layout";
import Lightbox from "@/components/Lightbox";
import MercadoTenantsSection from "@/components/MercadoTenantsSection";
import useSEO from "@/hooks/useSEO";

// 3D Renders — primary visual language (aspirational, cinematic, premium)
import render2 from "@/assets/gallery/mercado-2.webp";
import render3 from "@/assets/gallery/mercado-3.webp";
import render4 from "@/assets/gallery/mercado-4.webp";
import render5 from "@/assets/gallery/mercado-5.webp";
import render6 from "@/assets/gallery/mercado-6.webp";
import render7 from "@/assets/gallery/mercado-7.webp";

// Real photos — proof of operational activity
import realTower from "@/assets/gallery/mercado-real-tower.webp";
import realRetail from "@/assets/gallery/mercado-real-retail.webp";
import realCorner from "@/assets/gallery/mercado-real-corner.webp";
import realCorridor from "@/assets/gallery/mercado-real-corridor.webp";
import realCourtyard from "@/assets/gallery/mercado-real-courtyard.webp";
import realWide from "@/assets/gallery/mercado-real-wide.webp";
import realStairs from "@/assets/gallery/mercado-real-stairs.webp";

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" as const } };
const imgReveal = { initial: { opacity: 0, scale: 1.03 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true, margin: "-40px" as const }, transition: { duration: 0.7 } };

const snapshotStats = [
  { value: "تشغيل كامل", label: "مول تجاري فعّال" },
  { value: "3 طوابق", label: "من النشاط التجاري" },
  { value: "+29 م²", label: "أصغر مساحة وحدة" },
  { value: "علامات نشطة", label: "وحركة يومية" },
];

const whyCards = [
  { icon: Building2, title: "بيئة تشغيلية", desc: "ميركادو يعمل بالفعل كوجهة تجارية حية مع استخدام يومي نشط وحضور تجزئة راسخ." },
  { icon: Store, title: "حضور العلامات التجارية", desc: "العلامات الحالية تعزز الثقة وتجذب الزوار وتقوّي المصداقية التجارية للمول." },
  { icon: LayoutGrid, title: "مساحات مرنة", desc: "مجموعة من مساحات الوحدات تبدأ من 29 م² تجعل ميركادو مناسباً للمفاهيم الناشئة والمشغلين الراسخين." },
  { icon: MapPin, title: "موقع متميز بالشروق", desc: "موقعه يدعم الأهمية المحلية القوية والرؤية والطلب اليومي من السكان المحيطين." },
];

const movementPoints = [
  "تداول مفتوح وتدفق زوار",
  "تعرض واضح لواجهات المحلات",
  "نشاط يومي متكرر",
  "مناسب لتجارة نمط الحياة والخدمات",
];

const commercialCards = [
  { icon: ShoppingBag, title: "محلات تجزئة", desc: "مناسبة للعلامات التي تعتمد على الرؤية وسهولة الوصول والحركة اليومية." },
  { icon: UtensilsCrossed, title: "مفاهيم المأكولات", desc: "موقع مثالي للكافيهات ومفاهيم الطعام ومشغلي الأغذية الباحثين عن نشاط الوجهة." },
  { icon: Briefcase, title: "أعمال خدمية", desc: "مثالية للأعمال التي تستفيد من الأهمية المحلية والراحة والزيارات المتكررة." },
  { icon: Sparkles, title: "علامات لايف ستايل", desc: "ملائمة للأزياء والجمال والتجزئة المتخصصة والعلامات الراغبة بالنمو ضمن بيئة تجارية نشطة." },
];

const locationCards = [
  { icon: Users, title: "محيط سكني كثيف", desc: "يستفيد ميركادو من التجمع السكني القريب الذي يدعم الطلب اليومي المتكرر." },
  { icon: Eye, title: "سهولة الوصول والرؤية", desc: "موقعه يتيح الوصول المريح والواجهة القوية والتعرض التجاري العملي." },
  { icon: Repeat, title: "طلب يومي متكرر", desc: "السياق المحيط يدعم تكرار الزيارات لمشغلي التجزئة والطعام والخدمات." },
  { icon: Target, title: "أهمية الحي المحيط", desc: "يندمج ميركادو بشكل طبيعي في الحياة التجارية للشروق ويخدم جمهوراً محلياً نشطاً بالفعل." },
];

const investorPoints = [
  "وجهة تجارية قائمة وفعّالة",
  "نشاط فعلي للمستأجرين والعلامات التجارية",
  "بيئة تجزئة ذات إمكانية تكرار الزيارات",
  "أهمية قوية للسكان المحيطين",
  "دخول مرن عبر مساحات وحدات متنوعة",
  "ثقة أكبر مقارنة بالمشاريع المفاهيمية فقط",
];

type GalleryTab = "vision" | "active" | "night";
const galleryTabs: { key: GalleryTab; label: string }[] = [
  { key: "vision", label: "الرؤية ثلاثية الأبعاد" },
  { key: "active", label: "واقعي ونشط" },
  { key: "night", label: "ليلي وأجواء" },
];
const galleryMap: Record<GalleryTab, string[]> = {
  vision: [render3, render7, render2, render6],
  active: [realCorner, realTower, realRetail, realCourtyard, realWide, realCorridor],
  night: [render4, render5],
};
const allGalleryImages = [render3, render7, render2, render6, realCorner, realTower, realRetail, realCourtyard, realWide, realCorridor, realStairs, render4, render5];

const MercadoMallAr = () => {
  useSEO(
    "ميركادو مول | وحدات تجارية للإيجار والبيع في الشروق",
    "استثمر في ميركادو مول الشروق الذي يقدم وحدات تجزئة للبيع والإيجار بأسعار مرنة."
  );

  const [activeTab, setActiveTab] = useState<GalleryTab>("vision");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (img: string) => {
    const idx = allGalleryImages.indexOf(img);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightboxOpen(true);
  };

  return (
    <Layout>
      {/* ─── 1. HERO ─── */}
      <section className="relative bg-primary overflow-hidden min-h-[600px] md:min-h-[700px] lg:min-h-[85vh]">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        >
          <img src={render3} alt="ميركادو مول — وجهة تجارية متميزة" className="w-full h-full object-cover object-center" fetchPriority="high" decoding="sync" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 md:via-primary/60 to-primary/10 md:to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-l from-primary/70 md:from-primary/80 via-primary/20 md:via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-primary/40 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 md:pt-52 pb-24 md:pb-32 relative z-10 flex flex-col justify-end min-h-[inherit]">
          <div className="max-w-2xl mr-auto">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
              <p className="text-[9px] font-semibold tracking-[0.4em] uppercase font-body mb-6 text-primary-foreground/30">
                شركة أسواق للتطوير العقاري — وجهة تجارية فعّالة
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] font-bold text-primary-foreground leading-[1.12] mb-5" style={{ letterSpacing: '-0.01em' }}>
                ميركادو مول
                <br />
                <span className="text-primary-foreground/60">مدينة الشروق</span>
              </h1>
              <motion.p className="text-primary-foreground/45 font-arabic text-[15px] md:text-base leading-[1.95] max-w-lg mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }}>
                وجهة تجارية متكاملة الخدمات مع علامات تجارية فعّالة ووحدات جاهزة للتشغيل وحركة يومية قوية — بيئة مثبتة لنمو التجزئة والأعمال الحديثة.
              </motion.p>
              <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.1 }}>
                <a href="#snapshot" className="btn-outline-light px-8 py-3.5 text-[12px] rounded-lg font-body group">
                  اكتشف ميركادو
                  <ArrowRight size={13} className="transition-transform group-hover:-translate-x-1 rotate-180" />
                </a>
                <Link to="/ar/contact" className="inline-flex items-center gap-2 px-8 py-3.5 text-[12px] font-body font-semibold tracking-[0.08em] uppercase rounded-lg border border-primary-foreground/12 text-primary-foreground/50 hover:text-primary-foreground hover:border-primary-foreground/25 transition-all duration-400">
                  طلب تفاصيل الوحدة
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2. QUICK SNAPSHOT ─── */}
      <section id="snapshot" className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <p className="section-label mb-3">مركز تجاري نابض بالحياة</p>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">
                يعمل بالفعل. مُثبت بالفعل.
              </h2>
              <p className="text-muted-foreground font-arabic text-[15px] leading-[1.95] mb-8">
                على عكس المشاريع التي لا تزال في مرحلة المفهوم، يعمل ميركادو مول بالفعل كوجهة تجارية. مزيج المستأجرين والتداول المفتوح والبيئة النشطة تجعله عنواناً عملياً واستثمارياً في الشروق.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {snapshotStats.map((s, i) => (
                  <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="p-5 bg-cream rounded-xl border border-border/30"
                    style={{ boxShadow: 'var(--shadow-sm)' }}
                  >
                    <p className="font-display text-lg md:text-xl font-bold text-foreground mb-1">{s.value}</p>
                    <p className="text-muted-foreground font-arabic text-xs tracking-wide">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div {...imgReveal}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <img src={render7} alt="ميركادو مول — وجهة تجارية فعّالة في الشروق" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 3. WHY MERCADO WORKS ─── */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-14">
            <p className="section-label mb-3">ميزة ميركادو</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">لماذا ينجح ميركادو</h2>
            <p className="text-muted-foreground font-arabic max-w-2xl mx-auto text-[15px] leading-relaxed">
              يجمع ميركادو مول بين سهولة الوصول والتعرض التجاري الواضح وبيئة مستأجرين نشطة — مما يخلق عرضاً أقوى للأعمال التي تريد العمل ضمن وجهة مثبتة بدلاً من وجهة تخمينية.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyCards.map((card, i) => (
              <motion.div key={card.title} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.4 }}
                className="p-6 md:p-7 bg-card rounded-2xl border border-border/30 hover:border-accent/15 transition-all duration-300 group"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors duration-300">
                  <card.icon size={22} className="text-accent" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-muted-foreground font-arabic text-[13px] leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. ACTIVE BRANDS / TENANT MIX ─── */}
      <MercadoTenantsSection isArabic />

      {/* ─── 5. BUILT AROUND DAILY MOVEMENT ─── */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <img src={render2} alt="حركة التجزئة في ميركادو مول" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
              <p className="section-label mb-3">مصمم للحركة اليومية</p>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">
                مبني حول الحركة اليومية
              </h2>
              <p className="text-muted-foreground font-arabic text-[15px] leading-[1.95] mb-6">
                تم تصميم ميركادو مول حول حركة التجزئة المفتوحة والرؤية الواضحة ومزيج المستأجرين الذي يدعم تكرار الزيارات — مما يجعله جذاباً للعلامات التجارية ومفاهيم الطعام والأعمال الخدمية وتجارة نمط الحياة.
              </p>
              <div className="space-y-2.5">
                {movementPoints.map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CircleDot size={14} className="text-accent shrink-0" />
                    <p className="text-foreground font-arabic text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 6. ARCHITECTURAL / EXPERIENCE ─── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <p className="section-label mb-3">الرؤية المعمارية</p>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">
                تجربة تجزئة بانفتاح وحيوية
              </h2>
              <p className="text-muted-foreground font-arabic text-[15px] leading-[1.95] mb-4">
                ميركادو مول أكثر من مجرد صف وحدات — إنه بيئة تجزئة متعددة المستويات مع تداول مفتوح واتصال بصري ونقاط تفاعل متعددة عبر المشروع.
              </p>
              <p className="text-muted-foreground font-arabic text-[15px] leading-[1.95]">
                تصميمه يدعم الاكتشاف وتكرار الزيارات والتفاعل الأقوى بين العلامات التجارية والزوار ومساحات الوجهة.
              </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <img src={render6} alt="التجربة المعمارية لميركادو مول" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 7. COMMERCIAL OPPORTUNITY ─── */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-14">
            <p className="section-label mb-3">الفرص المتاحة</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">وحدات تجارية لنمو التجزئة</h2>
            <p className="text-muted-foreground font-arabic max-w-2xl mx-auto text-[15px] leading-relaxed">
              مع مساحات وحدات تبدأ من 29 متر مربع ومجموعة من خيارات المواقع عبر المول، يوفر ميركادو فرصاً للمفاهيم الناشئة والمشغلين الراسخين الراغبين في النمو بالشروق.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {commercialCards.map((card, i) => (
              <motion.div key={card.title} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.4 }}
                className="p-6 md:p-7 bg-card rounded-2xl border border-border/30 hover:border-accent/15 transition-all duration-300 group"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors duration-300">
                  <card.icon size={22} className="text-accent" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-muted-foreground font-arabic text-[13px] leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/ar/contact" className="group btn-premium px-10 py-4 text-[13px] rounded-lg font-body">
              طلب الوحدات المتاحة
              <ArrowRight size={14} className="transition-transform group-hover:-translate-x-1 rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 8. STRATEGIC LOCATION ─── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-14">
            <p className="section-label mb-3">الموقع الاستراتيجي</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">موقع مميز للرؤية في الشروق</h2>
            <p className="text-muted-foreground font-arabic max-w-2xl mx-auto text-[15px] leading-relaxed">
              يخدم ميركادو مول واحدة من أكثر مناطق الشروق نشاطاً وكثافة سكانية، مستفيداً من الطلب المحلي القوي والواجهة المتاحة وحركة الزوار المتكررة.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {locationCards.map((card, i) => (
              <motion.div key={card.title} {...fadeUp} transition={{ delay: i * 0.08, duration: 0.4 }}
                className="p-5 md:p-6 bg-cream rounded-xl border border-border/30 hover:border-accent/15 transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <card.icon size={18} className="text-accent" />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground mb-1.5">{card.title}</h3>
                <p className="text-muted-foreground font-arabic text-[12px] leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto rounded-2xl overflow-hidden"
            style={{ boxShadow: 'var(--shadow-lg)' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d442274.52711179055!2d31.4139086!3d30.0004101!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14581d4c995d3bcb%3A0x9e8ec7cb114e26c5!2sMercado%20mall!5e0!3m2!1sar!2seg!4v1772535763986!5m2!1sar!2seg"
              width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="موقع ميركادو مول" className="w-full"
            />
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="text-center mt-6">
            <a
              href="https://maps.app.goo.gl/mercadomall"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[12px] font-body font-semibold tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              فتح في خرائط جوجل
              <ExternalLink size={12} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── 9. CURATED GALLERY ─── */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-12">
            <p className="section-label mb-3">الأرشيف البصري</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">ميركادو من منظور مختلف</h2>
            <p className="text-muted-foreground font-arabic max-w-2xl mx-auto text-[15px] leading-relaxed">
              استكشف ميركادو مول من خلال مجموعة بصرية منتقاة تعكس طابعه المعماري وبيئة التجزئة النشطة وحضوره التجاري.
            </p>
          </motion.div>
          <div className="flex justify-center mb-10">
            <div className="flex bg-background rounded-lg p-1 gap-1 border border-border/30" style={{ boxShadow: 'var(--shadow-sm)' }}>
              {galleryTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-5 py-2.5 rounded-md text-[12px] font-arabic font-medium tracking-wide transition-all duration-200 ${activeTab === tab.key ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryMap[activeTab].map((src, i) => (
              <motion.div key={`${activeTab}-${i}`}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="rounded-2xl overflow-hidden border border-border/30 aspect-[4/3] cursor-pointer"
                style={{ boxShadow: 'var(--shadow-sm)' }}
                onClick={() => openLightbox(src)}
              >
                <img src={src} alt={`ميركادو مول ${activeTab} ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. INVESTMENT VALUE ─── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <p className="section-label mb-3">ثقة المستثمرين</p>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">
                لماذا يجذب ميركادو المستثمرين
              </h2>
              <p className="text-muted-foreground font-arabic text-[15px] leading-[1.95] mb-8">
                يقدم ميركادو مول نوعاً مختلفاً من الفرص: أصل تجاري مدعوم بالتشغيل الفعلي وحضور المستأجرين والأهمية التجارية — مما يجعله أكثر من مجرد وعد مستقبلي.
              </p>
              <div className="space-y-3">
                {investorPoints.map((point, i) => (
                  <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.06, duration: 0.35 }}
                    className="flex items-start gap-3 p-4 bg-cream rounded-xl border border-border/30"
                    style={{ boxShadow: 'var(--shadow-sm)' }}
                  >
                    <CheckCircle2 size={17} className="text-accent shrink-0 mt-0.5" />
                    <p className="text-foreground font-arabic text-sm leading-relaxed">{point}</p>
                  </motion.div>
                ))}
              </div>
              <p className="text-muted-foreground font-arabic text-[13px] leading-[1.85] mt-6 italic">
                بالنسبة للمستثمرين، يمثل ميركادو عرضاً تجارياً أكثر واقعية — مبني على نشاط مرئي وأهمية عملية وعلاقة أقوى بين المساحة والطلب.
              </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.15 }}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <img src={realRetail} alt="فرصة استثمارية في ميركادو مول" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 11. FINAL CTA ─── */}
      <section className="relative bg-primary py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={render4} alt="" className="w-full h-full object-cover opacity-[0.06]" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-primary/70" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
            <div className="section-divider mb-8" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary-foreground) / 0.1), transparent)' }} />
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-primary-foreground mb-5 leading-[1.15] max-w-2xl mx-auto">
              انضم إلى وجهة تجارية فعّالة
            </h2>
            <p className="text-primary-foreground/50 font-arabic max-w-xl mx-auto mb-10 text-[15px] leading-relaxed">
              اكتشف الإمكانيات التجارية لميركادو مول، وتعرف على الفرص المتاحة، وضع عملك داخل أحد عناوين التجزئة الراسخة في الشروق.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/ar/contact" className="group btn-outline-light px-10 py-4 text-[13px] rounded-lg font-body">
                طلب تفاصيل الوحدة
                <ArrowRight size={14} className="transition-transform group-hover:-translate-x-1 rotate-180" />
              </Link>
              <Link to="/ar/contact" className="inline-flex items-center gap-2 px-8 py-4 text-[12px] font-body font-semibold tracking-[0.08em] uppercase rounded-lg border border-primary-foreground/15 text-primary-foreground/60 hover:text-primary-foreground hover:border-primary-foreground/30 transition-all duration-300">
                احجز زيارة
              </Link>
              <Link to="/ar/contact" className="inline-flex items-center gap-2 px-8 py-4 text-[12px] font-body font-semibold tracking-[0.08em] uppercase rounded-lg text-primary-foreground/40 hover:text-primary-foreground/70 transition-all duration-300">
                تحدث مع المبيعات
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Lightbox images={allGalleryImages} open={lightboxOpen} startIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} />
    </Layout>
  );
};

export default MercadoMallAr;

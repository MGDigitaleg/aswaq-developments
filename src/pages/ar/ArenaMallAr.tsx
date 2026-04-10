import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CheckCircle2,
  MapPin,
  Stethoscope,
  Store,
  TrendingUp,
  Eye,
  Users,
  BarChart3,
  ShieldCheck,
  Layers,
} from "lucide-react";
import Layout from "@/components/Layout";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useSEO from "@/hooks/useSEO";
import Lightbox from "@/components/Lightbox";

import heroImage from "@/assets/arena-premium/arena-night-render.jpg";
import snapshotImage from "@/assets/arena-premium/arena-render-main.jpg";
import visionRender from "@/assets/arena-premium/arena-render-angle.jpg";
import lifestyleRender from "@/assets/arena-premium/arena-back-render.jpg";
import aerialRender from "@/assets/arena-premium/arena-aerial-render.jpg";
import facadeWide from "@/assets/arena-premium/arena-construction-wide.jpg";
import facadeDetail from "@/assets/arena-premium/arena-construction-facade.jpg";
import siteOffice from "@/assets/arena-premium/arena-construction-site-office.jpg";
import distanceShot from "@/assets/arena-premium/arena-construction-distance.jpg";
import courtyardShot from "@/assets/arena-premium/arena-construction-courtyard.jpg";

const fadeUp = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const Chapter = ({ number, label }: { number: string; label: string }) => (
  <div className="mb-8 flex items-center gap-4">
    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 font-display text-sm text-foreground/40">
      {number}
    </span>
    <span className="text-[11px] font-arabic font-semibold tracking-[0.18em] text-accent/80">
      {label}
    </span>
    <div className="h-px flex-1 bg-border/40" />
  </div>
);

const businessCards = [
  { icon: Store, title: "محلات تجارية وصالات عرض", desc: "وحدات بواجهة مميزة في الأدوار الأرضية والأولى، مصممة للعلامات التجارية والمطاعم ومقدمي الخدمات." },
  { icon: Stethoscope, title: "عيادات طبية", desc: "أدوار مجهزة بالبنية التحتية اللازمة لعيادات الأسنان والجلدية والتخصصات الطبية المختلفة." },
  { icon: Briefcase, title: "مكاتب إدارية", desc: "تخطيطات فعّالة بإضاءة طبيعية مناسبة للشركات المهنية والفروع والاستشارات." },
  { icon: Building2, title: "وحدات تجارية مرنة", desc: "مساحات قابلة للتكيف تدعم مساحات العمل المشتركة ومراكز التدريب ونماذج الأعمال المختلطة." },
];

const investorReasons = [
  { icon: Layers, text: "طلب متعدد الاستخدامات يشمل التجاري والطبي والإداري" },
  { icon: Eye, text: "واجهة مميزة وقيمة بصرية عالية للعلامات التجارية" },
  { icon: TrendingUp, text: "موقع في ممر نمو عالي مع ارتفاع مستمر في قيمة الأراضي" },
  { icon: Users, text: "تعدد ملفات المستأجرين يقلل مخاطر الشغور" },
  { icon: ShieldCheck, text: "تقدم إنشائي مرئي — وليس مجرد وعود" },
  { icon: BarChart3, text: "مصمم لزيادة رأس المال على المدى الطويل وتحقيق عوائد إيجارية" },
];

const galleryTabs = {
  vision: [heroImage, snapshotImage, visionRender, aerialRender, lifestyleRender],
  progress: [facadeWide, facadeDetail, siteOffice, distanceShot, courtyardShot],
  presence: [facadeDetail, snapshotImage, courtyardShot, heroImage],
};

const ArenaMallAr = () => {
  useSEO(
    "أرينا مول الشروق | فرصة استثمارية تجارية متميزة",
    "استكشف أرينا مول الشروق من شركة أسواق للتطوير العقاري — وجهة تجارية متعددة الاستخدامات للمحلات والعيادات والمكاتب وفرص الاستثمار."
  );

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
    <Lightbox images={lightboxImages} open={lightboxOpen} startIndex={lightboxIndex} onClose={() => setLightboxOpen(false)} />
    <Layout>
      {/* ═══ HERO ═══ */}
      <section className="relative flex min-h-screen items-end overflow-hidden bg-primary">
        <div className="absolute inset-0">
          <img src={heroImage} alt="أرينا مول — منظر ليلي خارجي" className="h-full w-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(var(--primary) / 0.3) 0%, hsl(var(--primary) / 0.5) 40%, hsl(var(--primary) / 0.88) 75%, hsl(var(--primary) / 0.97) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(270deg, hsl(var(--primary) / 0.7) 0%, transparent 60%)" }} />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-40 sm:px-6 md:pb-28 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
            <p className="mb-6 text-[11px] font-arabic font-semibold tracking-[0.2em] text-primary-foreground/50">
              شركة أسواق للتطوير العقاري — الشروق
            </p>
            <h1 className="mb-6 font-arabic text-5xl font-bold leading-[1.1] text-primary-foreground md:text-7xl lg:text-8xl">
              أرينا<br />مول
            </h1>
            <div className="mb-8 h-px w-20 bg-primary-foreground/20" />
            <p className="mb-3 text-xl font-arabic font-medium text-primary-foreground/90 md:text-2xl">
              مبني للظهور. مصمم للأعمال.
            </p>
            <p className="mb-10 max-w-xl text-base font-arabic leading-8 text-primary-foreground/55">
              وجهة تجارية عصرية متعددة الاستخدامات، صُممت للعلامات التجارية الطموحة والعيادات والشركات التي تسعى لحضور متميز وقيمة طويلة الأمد.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/ar/contact" className="btn-premium justify-center px-8 py-4 text-sm font-arabic">
                طلب الكتيب <ArrowLeft size={16} />
              </Link>
              <Link to="/ar/contact" className="btn-outline-light justify-center px-8 py-4 text-sm font-arabic">
                حجز زيارة للموقع
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 01 — نبذة عن المشروع ═══ */}
      <section className="section-padding bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Chapter number="٠١" label="نبذة عن المشروع" />
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ duration: 0.7 }}>
              <div className="overflow-hidden rounded-[28px] border border-border/40" style={{ boxShadow: "var(--shadow-premium)" }}>
                <img src={snapshotImage} alt="أرينا مول — منظر نهاري" className="w-full object-cover" loading="lazy" />
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ duration: 0.7, delay: 0.1 }}>
              <h2 className="mb-6 font-arabic text-3xl leading-tight text-foreground md:text-5xl">
                معلم تجاري معاصر في الشروق
              </h2>
              <p className="mb-8 text-base font-arabic leading-8 text-muted-foreground">
                أرينا مول وجهة حديثة متعددة الاستخدامات مصممة لخدمة الطلب التجاري والطبي والإداري في عنوان واحد. بواجهة قوية وهوية معمارية متميزة واستخدام تجاري مرن، بُني لدعم الظهور والحركة والقيمة التجارية طويلة الأمد.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {["مفهوم تجاري متعدد الاستخدامات", "فرص للمحلات والعيادات والمكاتب", "واجهة متميزة بحضور بصري قوي", "موقع استراتيجي في الشروق"].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-border/30 bg-card p-4" style={{ boxShadow: "var(--shadow-sm)" }}>
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                    <p className="text-sm font-arabic text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ اقتباس ═══ */}
      <section className="bg-primary py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.blockquote initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="font-arabic text-2xl font-medium leading-relaxed text-primary-foreground/85 md:text-4xl md:leading-snug">
            "ليس مجرد مبنى — بل موقع استراتيجي<br className="hidden md:block" /> في مدينة لا تزال تنمو."
          </motion.blockquote>
          <div className="mx-auto mt-6 h-px w-16 bg-primary-foreground/15" />
        </div>
      </section>

      {/* ═══ 02 — من الرؤية إلى الواقع ═══ */}
      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Chapter number="٠٢" label="من الرؤية إلى الواقع" />
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-6 font-arabic text-3xl leading-tight text-foreground md:text-5xl">
              ما تم تخيّله أصبح يتشكّل الآن
            </h2>
            <p className="text-base font-arabic leading-8 text-muted-foreground">
              أرينا مول ليس مجرد تصميم جميل — بل يتحول إلى واقع بكل ثقة. الحضور المعماري للمشروع ينتقل من المفهوم إلى البناء، مما يمنح المستثمرين وأصحاب الأعمال دليلاً ملموساً على ما يتم تسليمه.
            </p>
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp} transition={{ duration: 0.8 }} className="overflow-hidden rounded-[28px] border border-border/40 bg-card p-5 md:p-8" style={{ boxShadow: "var(--shadow-premium)" }}>
            <BeforeAfterSlider beforeImage={visionRender} afterImage={facadeWide} beforeLabel="الرؤية" afterLabel="الواقع" className="aspect-[16/9] rounded-[20px]" />
            <div className="mt-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="flex flex-wrap gap-2">
                {["الرؤية", "التقدم", "ثقة التسليم"].map((label) => (
                  <span key={label} className="rounded-full border border-border/50 bg-background px-4 py-2 text-[10px] font-arabic font-semibold tracking-[0.1em] text-foreground/60">
                    {label}
                  </span>
                ))}
              </div>
              <p className="font-arabic text-sm text-muted-foreground">صُمم بعناية. يُبنى بزخم.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 03 — الهوية المعمارية ═══ */}
      <section className="section-padding bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Chapter number="٠٣" label="الهوية المعمارية" />
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-6 font-arabic text-3xl leading-tight text-foreground md:text-5xl">
              واجهة مصممة للحضور
            </h2>
            <p className="text-base font-arabic leading-8 text-muted-foreground">
              خطوط معمارية نظيفة، زجاج واسع، إطارات حجمية قوية، وتعبير معاصر متعدد الاستخدامات يعزز ظهور العلامات التجارية ويخلق وجهة تجارية متميزة.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.7 }} className="overflow-hidden rounded-[28px] border border-border/40" style={{ boxShadow: "var(--shadow-lg)" }}>
              <img src={facadeDetail} alt="واجهة أرينا مول — تقدم البناء" className="aspect-[16/10] w-full object-cover" loading="lazy" />
            </motion.div>
            <div className="grid gap-4">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6, delay: 0.08 }} className="overflow-hidden rounded-[28px] border border-border/40" style={{ boxShadow: "var(--shadow-lg)" }}>
                <img src={courtyardShot} alt="الساحة الداخلية — تقدم البناء" className="aspect-[4/3] w-full object-cover" loading="lazy" />
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6, delay: 0.14 }} className="overflow-hidden rounded-[28px] border border-border/40" style={{ boxShadow: "var(--shadow-lg)" }}>
                <img src={distanceShot} alt="أرينا مول — منظر عام" className="aspect-[4/3] w-full object-cover" loading="lazy" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 04 — الموقع الاستراتيجي ═══ */}
      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Chapter number="٠٤" label="ذكاء الموقع" />
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="mb-6 font-arabic text-3xl leading-tight text-foreground md:text-5xl">
                موقع استراتيجي في الشروق
              </h2>
              <p className="mb-8 text-base font-arabic leading-8 text-muted-foreground">
                يستفيد أرينا مول من موقع يدعم الحركة اليومية والتعرض التجاري والأهمية التجارية — مما يجعله مناسباً للعلامات التجارية والممارسات الصحية ومستخدمي المكاتب العصرية.
              </p>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-8 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: Eye, text: "واجهة عالية الظهور وسهولة الوصول" },
                  { icon: Users, text: "تجمعات سكنية نشطة في المحيط" },
                  { icon: TrendingUp, text: "إمكانية حركة يومية قوية" },
                  { icon: BarChart3, text: "منطقة طلب متعدد الاستخدامات متنامية" },
                ].map((item) => (
                  <motion.div key={item.text} variants={fadeUp} className="flex items-start gap-3 rounded-xl border border-border/30 bg-card p-4" style={{ boxShadow: "var(--shadow-sm)" }}>
                    <item.icon size={16} className="mt-0.5 shrink-0 text-accent" />
                    <p className="text-sm font-arabic text-foreground">{item.text}</p>
                  </motion.div>
                ))}
              </motion.div>
              <div className="flex items-center gap-3 rounded-xl border border-border/30 bg-card px-5 py-4" style={{ boxShadow: "var(--shadow-sm)" }}>
                <MapPin size={18} className="shrink-0 text-accent" />
                <p className="text-sm font-arabic text-foreground">أمام الجامعة الفرنسية — واجهة تجارية عالية الظهور</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="overflow-hidden rounded-[28px] border border-border/40" style={{ boxShadow: "var(--shadow-premium)" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d220929.63495783907!2d31.4380646!3d30.0934547!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14581dde296e1a5b%3A0xdc596b1d18b48bea!2sArena%20Mall%20El-Shorouk!5e0!3m2!1sar!2seg!4v1772535766831!5m2!1sar!2seg"
                  width="100%" height="380" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="أرينا مول الشروق على الخريطة" className="w-full"
                />
              </div>
              <a href="https://maps.google.com/?q=Arena%20Mall%20El-Shorouk" target="_blank" rel="noreferrer" className="btn-premium inline-flex w-full justify-center px-6 py-3 text-sm font-arabic sm:w-auto">
                فتح في خرائط جوجل <ArrowLeft size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 05 — مساحات الأعمال ═══ */}
      <section className="section-padding bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Chapter number="٠٥" label="المزيج التجاري" />
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-6 font-arabic text-3xl leading-tight text-foreground md:text-5xl">
              مساحات مصممة للأعمال العصرية
            </h2>
            <p className="text-base font-arabic leading-8 text-muted-foreground">
              من المحلات التجارية عالية الظهور إلى الأدوار الجاهزة للعيادات والمساحات المكتبية الفعّالة، يدعم أرينا مول نماذج أعمال متعددة في وجهة واحدة متكاملة.
            </p>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {businessCards.map((card) => (
              <motion.div key={card.title} variants={fadeUp} className="group rounded-2xl border border-border/30 bg-card p-7 transition-all duration-500 hover:-translate-y-1" style={{ boxShadow: "var(--shadow-sm)" }}>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary transition-colors duration-300 group-hover:bg-accent/10">
                  <card.icon size={22} className="text-accent" />
                </div>
                <h3 className="mb-3 font-arabic text-xl text-foreground">{card.title}</h3>
                <p className="text-sm font-arabic leading-7 text-muted-foreground">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 06 — تقدم البناء ═══ */}
      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Chapter number="٠٦" label="الدليل الميداني" />
          <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <h2 className="mb-6 font-arabic text-3xl leading-tight text-foreground md:text-5xl">
                تقدم مرئي على أرض الواقع
              </h2>
              <p className="text-base font-arabic leading-8 text-muted-foreground">
                أرينا مول يتشكّل بنشاط. التقدم الإنشائي الأخير يعكس زخم التسليم ويعزز الثقة لدى المشترين والمستأجرين والمستثمرين.
              </p>
            </div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 gap-3">
              {["الحضور الهيكلي تم إنشاؤه", "هوية الواجهة تتشكّل", "تفعيل الموقع والواجهة", "التواصل مع المبيعات والمستثمرين"].map((item) => (
                <motion.div key={item} variants={fadeUp} className="rounded-xl border border-border/30 bg-card p-4" style={{ boxShadow: "var(--shadow-sm)" }}>
                  <span className="mb-2 block text-[10px] font-arabic font-semibold tracking-[0.1em] text-accent">تقدم</span>
                  <p className="text-sm font-arabic text-foreground">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[facadeWide, siteOffice, courtyardShot].map((image, index) => (
              <motion.div key={image} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6, delay: index * 0.08 }} className="overflow-hidden rounded-[24px] border border-border/40" style={{ boxShadow: "var(--shadow-lg)" }}>
                <img src={image} alt={`تقدم بناء أرينا مول ${index + 1}`} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                <div className="p-4">
                  <span className="rounded-full bg-secondary px-3 py-1.5 text-[10px] font-arabic font-semibold tracking-[0.1em] text-foreground/60">تطوير نشط</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 07 — لماذا أرينا للمستثمرين ═══ */}
      <section className="section-padding bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Chapter number="٠٧" label="المنطق الاستثماري" />
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-6 font-arabic text-3xl leading-tight text-foreground md:text-5xl">
              لماذا يجذب أرينا المستثمرين
            </h2>
            <p className="text-base font-arabic leading-8 text-muted-foreground">
              حضور معماري واستخدام تجاري مرن وتقدم تطوير مرئي في عنوان واحد — مما يخلق عرضاً قوياً للمستثمرين الباحثين عن طلب مستقر وقيمة طويلة الأمد.
            </p>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {investorReasons.map((item) => (
              <motion.div key={item.text} variants={fadeUp} className="flex items-start gap-4 rounded-2xl border border-border/30 bg-card p-6 transition-all duration-500 hover:-translate-y-1" style={{ boxShadow: "var(--shadow-sm)" }}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
                  <item.icon size={18} className="text-accent" />
                </div>
                <p className="text-sm font-arabic leading-7 text-foreground">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 08 — معرض الصور ═══ */}
      <section className="section-padding bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Chapter number="٠٨" label="المعرض البصري" />
          <div className="mb-12 max-w-3xl">
            <h2 className="mb-6 font-arabic text-3xl leading-tight text-foreground md:text-5xl">أرينا من كل زاوية</h2>
          </div>

          <Tabs defaultValue="vision" className="w-full">
            <TabsList className="mb-10 h-auto flex-wrap gap-2 rounded-2xl bg-card p-2">
              <TabsTrigger value="vision" className="rounded-xl px-6 py-3 font-arabic text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">الرؤية ثلاثية الأبعاد</TabsTrigger>
              <TabsTrigger value="progress" className="rounded-xl px-6 py-3 font-arabic text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">تقدم البناء</TabsTrigger>
              <TabsTrigger value="presence" className="rounded-xl px-6 py-3 font-arabic text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">الواجهة والحضور</TabsTrigger>
            </TabsList>

            {Object.entries(galleryTabs).map(([key, images]) => (
              <TabsContent key={key} value={key}>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {images.map((image, index) => (
                    <motion.div key={`${key}-${index}`} variants={fadeUp} className="group overflow-hidden rounded-[24px] border border-border/40 bg-card" style={{ boxShadow: "var(--shadow-lg)" }}>
                      <img src={image} alt={`أرينا مول ${key} ${index + 1}`} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ═══ تجربة الوجهة ═══ */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0">
          <img src={aerialRender} alt="أرينا مول — منظر جوي" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsl(var(--primary) / 0.6) 0%, hsl(var(--primary) / 0.85) 100%)" }} />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2 className="mb-6 font-arabic text-3xl leading-tight text-primary-foreground md:text-5xl">
              أكثر من مبنى —<br />تجربة وجهة متكاملة
            </h2>
            <p className="mx-auto max-w-2xl text-base font-arabic leading-8 text-primary-foreground/70">
              بيئة تشعر فيها العلامات التجارية بالرسوخ، والعملاء بالترحيب، والأعمال بالجاهزية للنمو.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA النهائي ═══ */}
      <section className="bg-primary py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="mb-5 text-[11px] font-arabic font-semibold tracking-[0.15em] text-primary-foreground/35">الخطوة التالية</p>
            <h2 className="mb-6 font-arabic text-3xl leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              ضع عملك في<br />أرينا مول
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-base font-arabic leading-8 text-primary-foreground/55">
              استكشف الفرص المتاحة، اطلب معلومات تفصيلية، أو حدد موعد زيارة للموقع لاكتشاف الإمكانات التجارية لأرينا مول الشروق.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/ar/contact" className="btn-premium justify-center px-8 py-4 text-sm font-arabic">طلب الكتيب</Link>
              <Link to="/ar/contact" className="btn-outline-light justify-center px-8 py-4 text-sm font-arabic">حجز زيارة للموقع</Link>
              <Link to="/ar/contact" className="btn-outline-light justify-center px-8 py-4 text-sm font-arabic">تحدث مع فريق المبيعات</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ArenaMallAr;

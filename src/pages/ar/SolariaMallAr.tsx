import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, ShoppingBag, Stethoscope, Briefcase, Building2, CheckCircle2, ChevronDown, ArrowLeft, Phone } from "lucide-react";
import Layout from "@/components/Layout";

import CTASection from "@/components/CTASection";
import MallGallerySection from "@/components/MallGallerySection";
import InteractiveFloorPlan from "@/components/InteractiveFloorPlan";
import solariaImg from "@/assets/solaria-mall.webp";
import useSEO from "@/hooks/useSEO";
import solaria1 from "@/assets/gallery/solaria-1.webp";
import solaria2 from "@/assets/gallery/solaria-2.webp";
import solaria3 from "@/assets/gallery/solaria-3.webp";
import solaria4 from "@/assets/gallery/solaria-4.webp";
import solariaNight from "@/assets/gallery/solaria-night.webp";
import solariaBirdEntrance from "@/assets/gallery/solaria-bird-entrance.webp";
import solariaOutroDay from "@/assets/gallery/solaria-outro-day.webp";
import solariaCam16 from "@/assets/gallery/solaria-cam16.webp";
import solariaIntro from "@/assets/gallery/solaria-intro.webp";
import solariaCube from "@/assets/gallery/solaria-cube.webp";
import solariaOutro from "@/assets/gallery/solaria-outro.webp";

const galleryImages = [solariaNight, solariaBirdEntrance, solariaIntro, solariaCube, solariaOutro, solariaOutroDay, solariaCam16, solaria4, solaria3, solaria2, solaria1];
const galleryVideos = [
  "8YDCm1TmTQ0", "ntpGQTMyq3Q", "0SPxL2rY3Dc", "-vQ52O22iwM", "l6kA_Ya2tW8",
  "bWMNLhNUWic", "giAo0wIirns", "5Vg0nxFPN2s", "lIwPvTA4kl8", "Z2s5k9hBR5s",
  "urvheJNfRdQ", "9ejGoFF4Jrk", "cepHBQGE7J0", "vDInqD_HcKU", "Y4lN13Cas5c",
  "BrDGv2SxZXI", "Hqv9KliWT1s", "7_I97gYQrho", "Yq2XDpp2UNU", "Xf8AUcMltIQ",
  "boE6pqIItFE", "IFGQuVc1Qh4", "NjbdYDPeErM", "PtXQ7ekGibo", "9xWD4rjaFz4",
  "lDb2srq3prQ", "21h59Aidbss", "5zo6Nh69DoU", "pnchRd-AAwg",
];

const unitTypes = [
  { icon: ShoppingBag, label: "محلات تجارية وصالات عرض" },
  { icon: Stethoscope, label: "عيادات طبية ووحدات رعاية صحية" },
  { icon: Briefcase, label: "مكاتب إدارية للشركات" },
  { icon: Building2, label: "وحدات أعمال مرنة" },
];

const locationAdvantages = [
  "واجهة مباشرة تطل على الحي السابع والثامن وأهم المحاور العمرانية",
  "القرب الشديد من المؤسسات التعليمية والمشاريع السكنية الكبرى",
  "سهولة الوصول من الطريق الدائري وطريق السويس والمدن المجاورة",
  "انتشار يومي قوي للعلامات التجارية بفضل النشاط المتواصل طوال اليوم",
];

const whyInvest = [
  "موقع استراتيجي في مدينة الشروق مع نشاط مستمر طوال اليوم",
  "تصميم متعدد الاستخدامات يجمع بين التجارة والرعاية الصحية والمكاتب",
  "مساحات مرنة تناسب مختلف الصناعات التجارية",
  "بيئة عمل حديثة معمارية وهندسية",
  "سهولة الوصول إلى طرق النقل الرئيسية والمجتمعات المحيطة",
  "خطط سداد ميسرة مع أسعار تنافسية للمستثمرين",
  "خدمات متكاملة: مواقف سيارات، أنظمة أمن، مراقبة",
];

const SolariaMallAr = () => {
  useSEO("سولاريا مول | وحدات تجارية وإدارية وطبية للإيجار في الشروق", "اختر وحدتك المثالية في سولاريا مول الشروق. نوفر أفضل محلات للإيجار، مكاتب إدارية، وعيادات طبية في موقع استراتيجي.");

  return (
    <Layout>
      {/* Hero — Cinematic Fullscreen */}
      <section className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src={heroImg}
            alt="سولاريا مول - واجهة معمارية"
            className="w-full h-full object-cover will-change-transform"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 12, ease: "easeOut" }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, hsl(var(--navy) / 0.20) 0%, transparent 35%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, hsl(var(--navy) / 0.55) 75%, hsl(var(--navy) / 0.95) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to left, hsl(var(--navy) / 0.35) 0%, transparent 50%)' }} />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, hsl(var(--navy) / 0.25) 100%)' }} />
        </div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute top-28 md:top-32 left-6 sm:left-10 lg:left-16 z-20"
        >
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-primary-foreground/15" style={{
            background: 'hsl(var(--navy) / 0.55)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'hsl(152 45% 50%)' }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: 'hsl(152 45% 50%)' }} />
            </span>
            <span className="text-[11px] font-arabic font-semibold tracking-wide" style={{ color: 'hsl(var(--primary-foreground) / 0.90)' }}>
              متاح الآن للحجز
            </span>
          </div>
        </motion.div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mr-0 ml-auto text-right"
          >
            <p className="text-[10px] font-arabic font-semibold tracking-[0.12em] mb-5" style={{ color: 'hsl(var(--primary-foreground) / 0.45)' }}>
              أسواق للتطوير العقاري
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6" style={{ color: 'hsl(var(--primary-foreground))', letterSpacing: '-0.015em' }}>
              سولاريا مول
            </h1>
            <p className="font-arabic text-[15px] md:text-[17px] leading-[1.9] max-w-xl mr-0 ml-auto mb-8" style={{ color: 'hsl(var(--primary-foreground) / 0.60)' }}>
              وجهة رائدة للتجارة والرعاية الصحية والأعمال في مدينة الشروق.
            </p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4 justify-end"
            >
              <Link
                to="/ar/units/for-sale"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg text-[13px] font-arabic font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'hsl(var(--primary-foreground))',
                  color: 'hsl(var(--navy))',
                  boxShadow: '0 4px 20px -4px hsl(0 0% 100% / 0.15)',
                }}
              >
                احجز وحدتك
                <ArrowLeft size={14} />
              </Link>
              <a href="tel:19474" className="btn-outline-light px-6 py-3.5 text-[13px] rounded-lg font-arabic">
                <Phone size={14} />
                اتصل 19474
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[9px] font-arabic tracking-wide" style={{ color: 'hsl(var(--primary-foreground) / 0.3)' }}>
              اسحب للأسفل
            </span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <ChevronDown size={16} style={{ color: 'hsl(var(--primary-foreground) / 0.3)' }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-2 lg:order-1">
              <div className="section-divider mb-6" style={{ marginRight: 0, marginLeft: 'auto' }} />
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-[1.2]">سولاريا مول بالشروق</h2>
              <p className="text-muted-foreground font-arabic text-[15px] leading-[1.9] mb-4">
                يُعد سولاريا مول أحد أكثر المشاريع الطموحة لشركة أسواق للتطوير العقاري، حيث تم تصميمه ليكون مركزاً حيوياً للتسوق. يمتد المول على مساحة 6,600 متر مربع ويقدم مجموعة متنوعة من المرافق والخدمات.
              </p>
              <p className="text-muted-foreground font-arabic text-[15px] leading-[1.9]">
                بفضل هويته المعمارية الحديثة وموقعه الاستراتيجي بالقرب من المعالم الرئيسية، يلبي سولاريا مول الطلب المتزايد على محلات الإيجار في الشروق والوحدات الإدارية والعقارات المتنوعة المتاحة للاستثمار في مصر.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <img src={solariaImg} alt="سولاريا مول - أسواق للتطوير العقاري" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 360° Architectural Explorer */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <p className="section-label mb-3">استكشف المبنى</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">نظرة معمارية شاملة</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-xl)' }}>
              <div className="aspect-[4/3] md:aspect-[2/1] relative">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                  <source src="/solaria-orbit-clean.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label mb-3">الموقع الاستراتيجي</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">موقع سولاريا مول</h2>
            <p className="text-muted-foreground font-arabic max-w-2xl mx-auto text-[15px] leading-relaxed">
              يتمتع سولاريا مول بموقع استراتيجي في مدينة الشروق عند "ميدان الجامعة" بالقرب من الجامعة الفرنسية، يجذب الزوار باستمرار.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {locationAdvantages.map((adv, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }}
                className="flex items-start gap-3 p-4 md:p-5 bg-card rounded-xl border border-border/30 hover:border-accent/15 transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={15} className="text-accent" />
                </div>
                <p className="text-foreground font-arabic text-sm leading-relaxed">{adv}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 max-w-4xl mx-auto rounded-2xl overflow-hidden"
            style={{ boxShadow: 'var(--shadow-lg)' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3450.0642863994053!2d31.60202829678954!3d30.14957799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14581d004de29bd9%3A0x677ac037657c4a19!2sSolaria%20Mall!5e0!3m2!1sar!2seg!4v1772535772662!5m2!1sar!2seg"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقع سولاريا مول"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Units */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3">المساحات المتاحة</p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">الوحدات المتاحة في سولاريا مول</h2>
          <p className="text-muted-foreground font-arabic max-w-2xl mx-auto mb-12 text-[15px] leading-relaxed">
            استكشف الوحدات المتاحة للإيجار والبيع في سولاريا مول بمساحات تبدأ من 30 م² وتصل إلى 396 م².
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {unitTypes.map((type, i) => (
              <motion.div key={type.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }}
                className="flex flex-col items-center gap-4 p-6 md:p-7 bg-card rounded-2xl border border-border/30 hover:border-accent/15 transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <type.icon size={24} className="text-accent" />
                </div>
                <p className="font-semibold text-foreground font-arabic text-sm text-center">{type.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Invest */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label mb-3">القيمة الاستثمارية</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">لماذا تستثمر في سولاريا مول</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {whyInvest.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex items-start gap-3 p-4 md:p-5 bg-card rounded-xl border border-border/30 hover:border-accent/15 transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <CheckCircle2 size={18} className="text-accent shrink-0 mt-0.5" />
                <p className="text-foreground font-arabic text-sm leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <InteractiveFloorPlan lang="ar" />

      <MallGallerySection mallName="سولاريا مول" images={galleryImages} videos={galleryVideos} lang="ar" />

      <CTASection
        title="استثمر في سولاريا مول اليوم"
        subtitle="احجز وحدتك الآن في مشروع متميز يتمتع بحركة زوار كثيفة في مدينة الشروق، مع المساحات المرنة والتصميم الاستراتيجي والطلب القوي على الإيجار."
        buttonText="طلب تفاصيل الوحدة"
        buttonLink="/ar/contact"
      />
    </Layout>
  );
};

export default SolariaMallAr;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MapPin, ShoppingBag, Store, Briefcase, Eye, Users,
  CheckCircle2, ChevronDown, ArrowLeft, Phone,
  Compass, Building2, TrendingUp, Clock
} from "lucide-react";
import Layout from "@/components/Layout";
import MallGallerySection from "@/components/MallGallerySection";
import useSEO from "@/hooks/useSEO";

import cityhubImg from "@/assets/cityhub-mall.webp";
import cityhub1 from "@/assets/gallery/cityhub-1.webp";
import cityhub2 from "@/assets/gallery/cityhub-2.webp";
import cityhub3 from "@/assets/gallery/cityhub-3.webp";
import cityhub4 from "@/assets/gallery/cityhub-4.webp";
import cityhub5 from "@/assets/gallery/cityhub-5.webp";
import cityhub6 from "@/assets/gallery/cityhub-6.webp";
import cityhub7 from "@/assets/gallery/cityhub-7.webp";
import cityhub8 from "@/assets/gallery/cityhub-8.webp";

const galleryImages = [cityhub1, cityhub2, cityhub3, cityhub4, cityhub5, cityhub6, cityhub7, cityhub8];
const galleryVideos = ["9pl-SiE0VVk", "868YMiO0LJc", "82mVbp9nB6U", "VIvmPBqrLnk"];

const fadeUp = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const whyCards = [
  { icon: Eye, title: "رؤية واضحة", desc: "موقع عالي الحركة يضمن أن يراك آلاف السكان والمارة يومياً." },
  { icon: Compass, title: "سهولة الوصول اليومي", desc: "وصول مريح من الطرق الرئيسية والمناطق السكنية يدعم تكرار حركة العملاء." },
  { icon: Store, title: "أنواع وحدات عملية", desc: "مساحات تجارية مرنة مصممة للتجزئة والخدمات والأعمال التي تتعامل مع العملاء مباشرة." },
  { icon: Users, title: "صلة محلية قوية", desc: "يقع ضمن مجتمع مزدهر مع طلب مستمر على الخدمات التجارية اليومية." },
];

const unitTypes = [
  { icon: ShoppingBag, title: "وحدات تجزئة", desc: "مساحات مبنية للمتاجر وصالات العرض والعلامات التجارية التي تزدهر بالحركة اليومية." },
  { icon: Briefcase, title: "أعمال خدمية", desc: "وحدات مرنة مناسبة للصالونات وورش الصيانة ووكالات السفر ومقدمي الخدمات اليومية." },
  { icon: Building2, title: "عيادات / خدمات مهنية", desc: "مواقع متميزة للعيادات الطبية والمعامل والاستشارات والمكاتب المهنية." },
  { icon: TrendingUp, title: "مفاهيم تجارية مرنة", desc: "وحدات قابلة للتكيف لمفاهيم الأطعمة والمشروبات والعمل المشترك والاستخدام المتعدد." },
];

const locationCards = [
  { title: "قرب سكني", desc: "محاط بمجمعات سكنية وأحياء كثيفة مع حركة يومية مستمرة." },
  { title: "ربط طرقي", desc: "وصول سهل من طريق السويس والطريق الدائري ومحور جمال عبد الناصر." },
  { title: "تكامل مجتمعي", desc: "يقع ضمن منطقة حضرية ناضجة بها مدارس ونوادي ومرافق يومية." },
  { title: "طلب متزايد", desc: "نمو سكان الشروق يولّد طلباً متزايداً على المساحات التجارية العملية." },
];

const investPoints = [
  "عنوان تجاري عالي الرؤية مع حركة يومية مستمرة",
  "سعر دخول تنافسي مع خطط سداد مرنة",
  "وحدات تبدأ من 29 م² — متاحة للمستثمرين الجدد",
  "مول تشغيلي بنشاط مستأجرين مثبت",
  "موقع في أحد أسرع الممرات السكنية نمواً في شرق القاهرة",
  "طلب تجاري عملي يدعم عوائد إيجارية طويلة الأمد",
];

const CityHubMallAr = () => {
  useSEO("سيتي هب مول | وحدات تجارية للإيجار في الشروق", "استكشف الفرص التجارية الأفضل في سيتي هب مول الشروق بأسعار مرنة ووحدات للإيجار والبيع.");

  return (
    <Layout>
      {/* ═══ 1. HERO ═══ */}
      <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src={cityhub1}
            alt="سيتي هب مول الشروق"
            className="w-full h-full object-cover will-change-transform"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, hsl(var(--navy) / 0.15) 0%, transparent 30%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 45%, hsl(var(--navy) / 0.50) 70%, hsl(var(--navy) / 0.94) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to left, hsl(var(--navy) / 0.30) 0%, transparent 50%)' }} />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 px-6 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mr-0 ml-auto text-right"
          >
            <p className="text-[10px] font-arabic font-semibold tracking-[0.12em] mb-4" style={{ color: 'hsl(var(--primary-foreground) / 0.40)' }}>
              أسواق للتطوير العقاري
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-5" style={{ color: 'hsl(var(--primary-foreground))', letterSpacing: '-0.015em' }}>
              سيتي هب مول<br className="hidden md:block" /> الشروق
            </h1>
            <p className="font-arabic text-[15px] md:text-[16px] leading-[1.9] max-w-lg mr-0 ml-auto mb-4" style={{ color: 'hsl(var(--primary-foreground) / 0.55)' }}>
              عنوان تجاري ذكي للأعمال اليومية
            </p>
            <p className="font-arabic text-[13px] md:text-[14px] leading-[1.9] max-w-xl mr-0 ml-auto mb-8" style={{ color: 'hsl(var(--primary-foreground) / 0.40)' }}>
              صُمم سيتي هب مول لدعم التجزئة العملية والأعمال الخدمية والطلب التجاري اليومي في الشروق. برؤية واضحة وموقع سهل الوصول ومساحات جاهزة للأعمال، يوفر بيئة ذكية للمشغلين الباحثين عن الصلة والاستمرارية.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap items-center gap-3 justify-end"
            >
              <Link
                to="/ar/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[13px] font-arabic font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: 'hsl(var(--primary-foreground))', color: 'hsl(var(--navy))', boxShadow: '0 4px 16px -4px hsl(0 0% 100% / 0.12)' }}
              >
                طلب تفاصيل الوحدة
                <ArrowLeft size={14} />
              </Link>
              <a href="tel:19474" className="btn-outline-light px-5 py-3 text-[13px] rounded-lg font-arabic">
                <Phone size={14} />
                حجز زيارة ميدانية
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[9px] font-arabic tracking-wide" style={{ color: 'hsl(var(--primary-foreground) / 0.25)' }}>اسحب للأسفل</span>
            <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <ChevronDown size={15} style={{ color: 'hsl(var(--primary-foreground) / 0.25)' }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 2. QUICK SNAPSHOT ═══ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeUp} className="order-2 lg:order-1">
              <div className="section-divider mb-6" style={{ marginRight: 0, marginLeft: 'auto' }} />
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">
                بساطة تجارية بإمكانات قوية
              </h2>
              <p className="text-muted-foreground font-arabic text-[15px] leading-[1.9] mb-4">
                يجمع سيتي هب مول بين الرؤية وسهولة الوصول والاستخدام التجاري العملي في عنوان تجاري واحد واضح. مبنيّ لخدمة الطلب اليومي ودعم الأعمال التي تعتمد على الراحة والحضور وتكرار حركة العملاء.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                {[
                  "وحدات تجارية مصممة للاستخدام العملي",
                  "موقع سهل الوصول وعالي الرؤية",
                  "مناسب لأعمال التجزئة والخدمات",
                  "مبنيّ لحركة يومية ومريحة",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[13px] text-foreground/80 font-arabic">
                    <CheckCircle2 size={15} className="text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeUp} className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-premium)' }}>
                <img src={cityhubImg} alt="سيتي هب مول - واجهة خارجية" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ 3. WHY CITY HUB WORKS ═══ */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="section-label mb-3">المنطق التجاري الذكي</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">لماذا ينجح سيتي هب</h2>
            <p className="text-muted-foreground font-arabic max-w-2xl mx-auto text-[15px] leading-relaxed">
              سيتي هب مبنيّ حول الأساسيات الأكثر أهمية في النجاح التجاري اليومي: الرؤية وسهولة الوصول والصلة بالطلب المحلي.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyCards.map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className="p-6 bg-card rounded-2xl border border-border/30 hover:border-accent/15 hover:-translate-y-1 transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <card.icon size={22} className="text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-muted-foreground font-arabic text-[13px] leading-[1.7]">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. LOCATION ═══ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="section-label mb-3">الموقع الاستراتيجي</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">موقع مهيّأ للصلة التجارية اليومية</h2>
            <p className="text-muted-foreground font-arabic max-w-2xl mx-auto text-[15px] leading-relaxed">
              يستفيد سيتي هب مول من موقع يدعم الحركة اليومية المتكررة والوصول العملي، مما يجعله مناسباً للأعمال التي تعتمد على الزيارات المتكررة وراحة الحي.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {locationCards.map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }}
                className="p-5 bg-card rounded-xl border border-border/30 hover:border-accent/15 transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <h3 className="font-display text-[15px] font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-muted-foreground font-arabic text-[13px] leading-[1.7]">{card.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-lg)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.1527093465797!2d31.34942880000001!3d30.061156900000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f6d0024fbe5%3A0xa28dc2865dabbf10!2sCity%20Hub!5e0!3m2!1sar!2seg!4v1772535758532!5m2!1sar!2seg"
                width="100%" height="380" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="موقع سيتي هب مول" className="w-full"
              />
            </div>
            <div className="flex justify-center mt-5">
              <a href="https://maps.app.goo.gl/CityHubMallShorouk" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[13px] font-arabic font-medium text-accent hover:text-foreground transition-colors">
                <MapPin size={14} />
                افتح في خرائط Google
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 5. BUILT FOR DAILY RETAIL ═══ */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <p className="text-[10px] font-arabic font-semibold tracking-[0.12em] mb-4" style={{ color: 'hsl(var(--primary-foreground) / 0.35)' }}>
              الحمض النووي التجاري
            </p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-6" style={{ color: 'hsl(var(--primary-foreground))' }}>
              مصمم للنشاط التجاري اليومي
            </h2>
            <p className="font-arabic text-[15px] leading-[1.9] mb-8" style={{ color: 'hsl(var(--primary-foreground) / 0.55)' }}>
              سيتي هب مول مثالي للمشغلين الذين يقدّرون الراحة وحركة الزوار الروتينية ورؤية الأعمال. منطقه التجاري يدعم الأعمال الخدمية والعلامات التجارية المحلية ومفاهيم التجزئة العملية.
            </p>
            <div className="w-12 h-px mx-auto" style={{ background: 'hsl(var(--primary-foreground) / 0.12)' }} />
          </motion.div>
        </div>
      </section>

      {/* ═══ 6. UNIT TYPES ═══ */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="section-label mb-3">فئات الوحدات</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">مساحات للنمو التجاري العملي</h2>
            <p className="text-muted-foreground font-arabic max-w-2xl mx-auto text-[15px] leading-relaxed">
              يدعم سيتي هب مجموعة من الاستخدامات التجارية عبر التجزئة والخدمات والعمليات التي تتعامل مع العملاء — مما يجعله خياراً قوياً للعلامات التجارية التي تسعى للنمو من خلال الصلة التجارية اليومية.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {unitTypes.map((unit, i) => (
              <motion.div key={unit.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className="p-6 bg-card rounded-2xl border border-border/30 hover:border-accent/15 hover:-translate-y-1 transition-all duration-300 text-center"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                  <unit.icon size={24} className="text-accent" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">{unit.title}</h3>
                <p className="text-muted-foreground font-arabic text-[13px] leading-[1.7]">{unit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. REALITY / PROOF ═══ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="section-label mb-3">على أرض الواقع</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">عنوان تجاري يتشكّل في الحياة الحقيقية</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[cityhub2, cityhub3, cityhub5, cityhub6].map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className="rounded-xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-md)' }}>
                <img src={img} alt={`سيتي هب مول - تقدم ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8. GALLERY ═══ */}
      <MallGallerySection mallName="سيتي هب مول" images={galleryImages} videos={galleryVideos} lang="ar" />

      {/* ═══ 9. INVESTMENT VALUE ═══ */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="section-label mb-3">منظور المستثمر</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">لماذا يجذب سيتي هب المستثمرين</h2>
            <p className="text-muted-foreground font-arabic max-w-2xl mx-auto text-[15px] leading-relaxed">
              يقدم سيتي هب عرضاً تجارياً عملياً مبنياً على الرؤية والراحة والطلب المحلي — مما يجعله ذا صلة للمستثمرين الباحثين عن إمكانات تجارية راسخة بدلاً من المضاربة وحدها.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {investPoints.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex items-start gap-3 p-4 md:p-5 bg-card rounded-xl border border-border/30 hover:border-accent/15 transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                <p className="text-foreground font-arabic text-sm leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 10. FINAL CTA ═══ */}
      <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
        </div>
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 text-center relative z-10">
          <motion.div {...fadeUp}>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-5" style={{ color: 'hsl(var(--primary-foreground))' }}>
              ضع أعمالك في سيتي هب مول
            </h2>
            <p className="font-arabic text-[15px] leading-[1.9] mb-10 max-w-xl mx-auto" style={{ color: 'hsl(var(--primary-foreground) / 0.50)' }}>
              استكشف الفرص المتاحة، اطلب معلومات تفصيلية، أو حدد موعد زيارة لاكتشاف الإمكانات التجارية لسيتي هب مول الشروق.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/ar/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[13px] font-arabic font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: 'hsl(var(--primary-foreground))', color: 'hsl(var(--navy))', boxShadow: '0 4px 16px -4px hsl(0 0% 100% / 0.12)' }}
              >
                طلب تفاصيل الوحدة
                <ArrowLeft size={14} />
              </Link>
              <a href="tel:19474" className="btn-outline-light px-6 py-3.5 text-[13px] rounded-lg font-arabic">
                <Phone size={14} />
                حجز زيارة ميدانية
              </a>
              <a href="tel:19474" className="btn-outline-light px-6 py-3.5 text-[13px] rounded-lg font-arabic">
                <Phone size={14} />
                تحدث مع المبيعات
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default CityHubMallAr;

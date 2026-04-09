import { motion } from "framer-motion";
import { MapPin, ShoppingBag, TrendingUp, Store, Wrench, CheckCircle2 } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import MallGallerySection from "@/components/MallGallerySection";
import MercadoFloorPlan from "@/components/MercadoFloorPlan";
import mercadoImg from "@/assets/mercado-mall.webp";
import useSEO from "@/hooks/useSEO";
import mercado1 from "@/assets/gallery/mercado-1.webp";

const galleryImages = [mercado1];
const galleryVideos = ["fHgVO2698Jw", "_QHKwyMozZw", "hUGvrHMnmoY"];

const unitTypes = [
  { icon: ShoppingBag, label: "محلات للإيجار ووحدات تجارية" },
  { icon: TrendingUp, label: "عقارات تجارية للاستثمار" },
  { icon: Store, label: "محلات تجزئة للإيجار" },
  { icon: Wrench, label: "مساحات لمزودي الخدمات والشركات المتخصصة" },
];

const whyInvest = [
  "موقع استراتيجي في شرق القاهرة يضمن تدفقاً ثابتاً للزوار",
  "تصميم معماري حديث يعزز من الرؤية وجاذبية الأعمال",
  "مساحات وحدات مرنة تبدأ من حوالي 24 م²",
  "أسعار تنافسية توفر نقاط دخول جذابة للمستثمرين",
  "خطط سداد مرنة مع خيارات مقدم وأقساط ميسرة للمستثمرين",
  "تسليم فوري أو قريب جداً مما يسمح بتشغيل أسرع",
  "بيئة تجارية كاملة الخدمات تشمل مواقف سيارات، أمن، أنظمة مراقبة، مصاعد، ومناطق بلازا",
];

const MercadoMallAr = () => {
  useSEO("ميركادو مول | وحدات تجارية للإيجار والبيع في الشروق", "استثمر في ميركادو مول الشروق الذي يقدم وحدات تجزئة للبيع والإيجار بأسعار مرنة.");

  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 md:pt-40 pb-16 md:pb-20 text-center relative z-10 min-h-[420px] flex flex-col justify-end">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase font-body mb-4 text-primary-foreground/40">شركة أسواق للتطوير العقاري</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground mb-5 leading-tight">ميركادو مول في مدينة الشروق</h1>
            <p className="text-primary-foreground/55 font-arabic max-w-2xl mx-auto text-[15px] leading-relaxed">
              وجهة تجارية متميزة مصممة لتلبية الطلب المتزايد على مساحات التجزئة والأعمال في شرق القاهرة.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                <img src={mercadoImg} alt="ميركادو مول - أسواق للتطوير العقاري" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="section-divider mb-6" style={{ marginLeft: 'auto', marginRight: 0 }} />
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">ميركادو مول بالشروق</h2>
              <p className="text-muted-foreground font-arabic text-[15px] leading-[1.9] mb-4">
                يُعد ميركادو مول الشروق وجهة تجارية متميزة يقع في موقع استراتيجي ويمتد على ثلاثة طوابق، ويقدم مجموعة واسعة من الوحدات التجارية تبدأ مساحاتها من 24 متر مربع.
              </p>
              <p className="text-muted-foreground font-arabic text-[15px] leading-[1.9]">
                بفضل موقعه القوي وتصميماته العملية وتركيزه على الجانب الاستثماري، يمثل ميركادو مول فرصة استثمارية حقيقية للباحثين عن العقارات التجارية ومحلات للبيع في الشروق.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label mb-3">الموقع الاستراتيجي</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">موقع ميركادو مول</h2>
            <p className="text-muted-foreground font-arabic max-w-2xl mx-auto text-[15px] leading-relaxed">
              يتمتع ميركادو مول بموقع استراتيجي في مدينة الشروق، الحي الثاني غرب، مباشرة أمام بنك القاهرة والمدرسة اليابانية.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto rounded-2xl overflow-hidden"
            style={{ boxShadow: 'var(--shadow-lg)' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d442274.52711179055!2d31.4139086!3d30.0004101!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14581d4c995d3bcb%3A0x9e8ec7cb114e26c5!2sMercado%20mall!5e0!3m2!1sar!2seg!4v1772535763986!5m2!1sar!2seg"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقع ميركادو مول"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Available Units */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3">المساحات المتاحة</p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">الوحدات التجارية المتاحة في ميركادو مول</h2>
          <p className="text-muted-foreground font-arabic max-w-2xl mx-auto mb-12 text-[15px] leading-relaxed">
            استكشف الوحدات المتاحة للإيجار والبيع في ميركادو مول بمساحات تتراوح من 24 م² إلى 300 م².
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
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">لماذا تستثمر في ميركادو مول</h2>
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

      <MercadoFloorPlan lang="ar" />

      <MallGallerySection mallName="ميركادو مول" images={galleryImages} videos={galleryVideos} lang="ar" />

      <CTASection
        title="استثمر في ميركادو مول اليوم"
        subtitle="احجز وحدتك التجارية الآن في مول متميز وجاهز للتشغيل في مدينة الشروق واستفد من الطلب الإيجاري القوي وفرص النمو المستقبلي."
        buttonText="طلب تفاصيل الوحدة"
        buttonLink="/ar/contact"
      />
    </Layout>
  );
};

export default MercadoMallAr;

import { motion } from "framer-motion";
import { MapPin, ShoppingBag, TrendingUp, Store, Wrench, CheckCircle2 } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import MallGallerySection from "@/components/MallGallerySection";
import cityhubImg from "@/assets/cityhub-mall.webp";
import useSEO from "@/hooks/useSEO";
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

const unitTypes = [
  { icon: ShoppingBag, label: "وحدات تجارية للإيجار" },
  { icon: TrendingUp, label: "عقارات تجزئة للاستثمار" },
  { icon: Store, label: "محلات للإيجار" },
  { icon: Wrench, label: "مساحات لمزودي الخدمات والشركات المتخصصة" },
];

const whyInvest = [
  "مركز تجاري رئيسي في واحدة من أكثر المناطق الحضرية ديناميكية في شرق القاهرة",
  "مجموعة واسعة من أنواع الوحدات بمساحات تبدأ من 29 م²",
  "أسعار تنافسية مع خطط سداد ميسرة للمستثمرين",
  "مفهوم مول متكامل: تسوق وطعام وترفيه",
  "مجموعة كاملة من الخدمات والمرافق بما في ذلك هايبر ماركت ومطاعم وكافيهات ومنطقة ترفيه للأطفال وسينما",
];

const CityHubMallAr = () => {
  useSEO("سيتي هب مول | وحدات تجارية للإيجار في الشروق", "استكشف الفرص التجارية الأفضل في سيتي هب مول الشروق بأسعار مرنة ووحدات للإيجار والبيع.");

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
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground mb-5 leading-tight">سيتي هب مول في مدينة الشروق</h1>
            <p className="text-primary-foreground/55 font-arabic max-w-2xl mx-auto text-[15px] leading-relaxed">
              وجهة تجارية وترفيهية رائدة متكاملة حيث يلتقي نمط الحياة اليومية مع متطلبات الاستثمار المربح.
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
                <img src={cityhubImg} alt="سيتي هب مول - أسواق للتطوير العقاري" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="section-divider mb-6" style={{ marginLeft: 'auto', marginRight: 0 }} />
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">سيتي هب مول بالشروق</h2>
              <p className="text-muted-foreground font-arabic text-[15px] leading-[1.9] mb-4">
                يُعد سيتي هب مول الشروق وجهة تجارية وترفيهية متكاملة رائدة. يتمتع المول بموقع استراتيجي في قلب مدينة الشروق، مصمم لضمان تدفق واضح للزوار ونشاط تجاري مستمر.
              </p>
              <p className="text-muted-foreground font-arabic text-[15px] leading-[1.9]">
                يقدم سيتي هب مزيجاً من مساحات التجزئة والمطاعم والترفيه، مما يجعله فرصة استثمارية مقنعة للباحثين عن وحدات تجارية في واحدة من أسرع مناطق شرق القاهرة نمواً.
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
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">موقع سيتي هب مول</h2>
            <p className="text-muted-foreground font-arabic max-w-2xl mx-auto text-[15px] leading-relaxed">
              يقع في شارع النوادي بمدينة الشروق، يستفيد من موقعه الاستراتيجي في ممر سكني وتجاري مزدهر.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto p-5 bg-card rounded-xl border border-border/30"
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin size={15} className="text-accent" />
              </div>
              <p className="text-foreground font-arabic text-sm text-right leading-relaxed">
                بالقرب من مجمعات سكنية راقية وجامعات مما يولد تدفقاً مستمراً للزوار يدعم الطلب على التجزئة والترفيه.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 max-w-4xl mx-auto rounded-2xl overflow-hidden"
            style={{ boxShadow: 'var(--shadow-lg)' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.1527093465797!2d31.34942880000001!3d30.061156900000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f6d0024fbe5%3A0xa28dc2865dabbf10!2sCity%20Hub!5e0!3m2!1sar!2seg!4v1772535758532!5m2!1sar!2seg"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقع سيتي هب مول"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Available Units */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3">المساحات المتاحة</p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">الوحدات التجارية المتاحة في سيتي هب مول</h2>
          <p className="text-muted-foreground font-arabic max-w-2xl mx-auto mb-12 text-[15px] leading-relaxed">
            استكشف الوحدات المتاحة للإيجار والبيع في سيتي هب مول بمساحات تتراوح من 29 م² إلى 198 م².
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
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">لماذا تستثمر في سيتي هب مول</h2>
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

      <MallGallerySection mallName="سيتي هب مول" images={galleryImages} videos={galleryVideos} lang="ar" />

      <CTASection
        title="استثمر في سيتي هب مول اليوم"
        subtitle="امتلك وحدتك التجارية في موقع استراتيجي بمدينة الشروق واستمتع برؤية عالية وحركة زوار متواصلة مع حلول ملكية مرنة."
        buttonText="طلب تفاصيل الوحدة"
        buttonLink="/ar/contact"
      />
    </Layout>
  );
};

export default CityHubMallAr;

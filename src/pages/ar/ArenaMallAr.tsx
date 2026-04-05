import { motion } from "framer-motion";
import { MapPin, Building2, Stethoscope, Briefcase, ShoppingBag, CheckCircle2 } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import MallGallerySection from "@/components/MallGallerySection";
import arenaImg from "@/assets/arena-mall.webp";
import useSEO from "@/hooks/useSEO";
import arena1 from "@/assets/gallery/arena-1.webp";
import arena2 from "@/assets/gallery/arena-2.webp";

const galleryImages = [arena1, arena2];
const galleryVideos = ["buh9BJmWn9A", "unR4JKFXAXE", "6YWp0lGYC3Q", "JFqUABOPOk8", "kVdnKIBWN2A"];

const unitTypes = [
  { icon: ShoppingBag, label: "محلات تجارية وصالات عرض" },
  { icon: Stethoscope, label: "عيادات طبية ووحدات رعاية صحية" },
  { icon: Briefcase, label: "مكاتب إدارية ومقرات للشركات" },
  { icon: Building2, label: "وحدات أعمال مرنة للشركات الناشئة والقائمة" },
];

const whyInvest = [
  "موقع استراتيجي بواجهة مباشرة أمام الجامعة الفرنسية مع نشاط يومي كثيف",
  "تصميم متعدد الاستخدامات يجمع بين الأنشطة التجارية والطبية والإدارية",
  "مخططات مرنة للوحدات تناسب مختلف القطاعات والصناعات",
  "هندسة معمارية حديثة وبيئة مهنية متكاملة",
  "سهولة الوصول إلى محاور النقل الرئيسية والمجتمعات السكنية المحيطة",
  "أسعار تنافسية مع خطط سداد ميسرة ومناسبة للمستثمرين",
  "بيئة تجارية كاملة الخدمات: مواقف سيارات، أمن، أنظمة مراقبة، مصاعد، ومناطق بلازا",
];

const ArenaMallAr = () => {
  useSEO("أرينا مول | وحدات تجارية وطبية وإدارية للإيجار في الشروق", "استكشف أفضل الوحدات المتاحة للإيجار في أرينا مول الشروق من شركة أسواق للتطوير العقاري.");

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
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground mb-5 leading-tight">أرينا مول في مدينة الشروق</h1>
            <p className="text-primary-foreground/55 font-arabic max-w-2xl mx-auto text-[15px] leading-relaxed">
              مشروع عصري متعدد الاستخدامات مصمم خصيصاً لتلبية الاحتياجات المتطورة للشركات والمهنيين والمستثمرين في مدينة الشروق.
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
                <img src={arenaImg} alt="أرينا مول - أسواق للتطوير العقاري" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="section-divider mb-6" style={{ marginLeft: 'auto', marginRight: 0 }} />
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">أرينا مول بمدينة الشروق</h2>
              <p className="text-muted-foreground font-arabic text-[15px] leading-[1.9] mb-4">
                يُعد أرينا مول مشروعاً عصرياً متعدد الاستخدامات من تطوير شركة أسواق للتطوير العقاري، يقع في واحد من أكثر المواقع الاستراتيجية في المدينة. ويوفر بيئة استثمارية راقية تضم مزيجاً من الوحدات التجارية والإدارية والطبية.
              </p>
              <p className="text-muted-foreground font-arabic text-[15px] leading-[1.9]">
                بفضل تصميمه المعماري الحديث وتنوع مساحات وحداته، يلبي المول متطلبات محلات التجزئة ومكاتب الإدارة وعيادات الرعاية الصحية.
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
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">موقع أرينا مول</h2>
            <p className="text-muted-foreground font-arabic max-w-2xl mx-auto text-[15px] leading-relaxed">
              يتمتع أرينا مول بموقع استراتيجي فريد مباشرة أمام الجامعة الفرنسية في مدينة الشروق، مما يمنحه مزايا استثمارية كبرى.
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
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d220929.63495783907!2d31.4380646!3d30.0934547!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14581dde296e1a5b%3A0xdc596b1d18b48bea!2sArena%20Mall%20El-Shorouk!5e0!3m2!1sar!2seg!4v1772535766831!5m2!1sar!2seg"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقع أرينا مول"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Available Units */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3">المساحات المتاحة</p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">الوحدات المتاحة في أرينا مول</h2>
          <p className="text-muted-foreground font-arabic max-w-2xl mx-auto mb-12 text-[15px] leading-relaxed">
            اكتشف الوحدات المتاحة للإيجار والبيع في أرينا مول بمساحات تتراوح من 16 م² إلى 343 م².
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
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">لماذا تستثمر في أرينا مول</h2>
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

      <MallGallerySection mallName="أرينا مول" images={galleryImages} videos={galleryVideos} lang="ar" />

      <CTASection
        title="استثمر في أرينا مول اليوم"
        subtitle="احجز مساحتك التجارية الآن في أرينا مول الشروق. تواصل مع شركة أسواق للتطوير العقاري للحصول على التفاصيل والأسعار وتوافر الوحدات."
        buttonText="طلب تفاصيل الوحدة"
        buttonLink="/ar/contact"
      />
    </Layout>
  );
};

export default ArenaMallAr;

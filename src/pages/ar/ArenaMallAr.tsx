import { motion } from "framer-motion";
import { MapPin, Building2, Stethoscope, Briefcase, ShoppingBag } from "lucide-react";
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

const locationAdvantages = [
  "رؤية ممتازة وتدفق مستمر للزوار من الطلاب وأعضاء هيئة التدريس والسكان المجاورين",
  "سهولة الوصول عبر الطرق الرئيسية التي تربط مدينة الشروق بالمجتمعات العمرانية المجاورة",
  "القرب من المناطق السكنية المتوسعة والمراكز الخدمية الحيوية",
  "موقع يعزز الطلب المتزايد على مساحات التجزئة وبيئات العمل الإدارية والخدمات الطبية",
];

const ArenaMallAr = () => {
  useSEO("أرينا مول | وحدات تجارية وطبية وإدارية للإيجار في الشروق", "استكشف أفضل الوحدات المتاحة للإيجار في أرينا مول الشروق من شركة أسواق للتطوير العقاري. نوفر مساحات تجارية وإدارية وطبية في موقع استراتيجي متميز.");

  return (
    <Layout>
      <section className="bg-primary pt-48 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary-foreground/60 font-body font-medium tracking-widest uppercase text-sm mb-3">شركة أسواق للتطوير العقاري</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-6">أرينا مول في مدينة الشروق</h1>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto">
              مشروع عصري متعدد الاستخدامات مصمم خصيصاً لتلبية الاحتياجات المتطورة للشركات والمهنيين والمستثمرين في مدينة الشروق.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div className="md:w-1/2" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-sm">
                <img src={arenaImg} alt="أرينا مول" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div className="md:w-1/2" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground mb-4">أرينا مول بمدينة الشروق</h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                يُعد أرينا مول مشروعاً عصرياً متعدد الاستخدامات من تطوير شركة أسواق للتطوير العقاري، يقع في واحد من أكثر المواقع الاستراتيجية في المدينة. ويوفر بيئة استثمارية راقية تضم مزيجاً من الوحدات التجارية والإدارية والطبية.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                بفضل تصميمه المعماري الحديث وتنوع مساحات وحداته، يلبي المول متطلبات محلات التجزئة ومكاتب الإدارة وعيادات الرعاية الصحية.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground text-center mb-6">موقع أرينا مول</h2>
          <p className="text-muted-foreground font-body text-center max-w-3xl mx-auto mb-12">
            يتمتع أرينا مول بموقع استراتيجي فريد مباشرة أمام الجامعة الفرنسية في مدينة الشروق، مما يمنحه مزايا استثمارية كبرى.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {locationAdvantages.map((adv, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 p-5 bg-background rounded-2xl border border-border/50 hover:shadow-md transition-all duration-300"
              >
                <MapPin size={20} className="text-primary shrink-0 mt-0.5" />
                <p className="text-foreground font-body text-sm">{adv}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg"
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

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">الوحدات المتاحة في أرينا مول</h2>
          <p className="text-muted-foreground font-body max-w-3xl mx-auto mb-12">
            اكتشف الوحدات المتاحة للإيجار والبيع في أرينا مول بمساحات تتراوح من 16 م² إلى 343 م².
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {unitTypes.map((type, i) => (
              <motion.div key={type.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-3 p-6 bg-cream rounded-2xl border border-border/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <type.icon size={24} className="text-primary" />
                </div>
                <p className="font-semibold text-foreground font-body text-sm text-center">{type.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground text-center mb-12">لماذا تستثمر في أرينا مول</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {whyInvest.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-4 bg-background rounded-2xl border border-border/50 hover:shadow-md transition-all duration-300"
              >
                <span className="text-primary font-bold">✓</span>
                <p className="text-foreground font-body text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MallGallerySection mallName="أرينا مول" images={galleryImages} videos={galleryVideos} lang="ar" />

      <CTASection
        title="استثمر في أرينا مول اليوم"
        subtitle="احجز مساحتك التجارية الآن في أرينا مول الشروق. تواصل مع شركة أسواق للتطوير العقاري للحصول على التفاصيل والأسعار وتوافر الوحدات التجارية والإدارية والطبية."
        buttonText="طلب تفاصيل الوحدة"
        buttonLink="/ar/contact"
      />
    </Layout>
  );
};

export default ArenaMallAr;

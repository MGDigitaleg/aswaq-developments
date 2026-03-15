import { motion } from "framer-motion";
import { MapPin, ShoppingBag, Stethoscope, Briefcase, Building2 } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import MallGallerySection from "@/components/MallGallerySection";
import solariaImg from "@/assets/solaria-mall.jpg";
import useSEO from "@/hooks/useSEO";
import solaria1 from "@/assets/gallery/solaria-1.jpg";
import solaria2 from "@/assets/gallery/solaria-2.jpg";
import solaria3 from "@/assets/gallery/solaria-3.jpg";
import solaria4 from "@/assets/gallery/solaria-4.jpg";

const galleryImages = [solaria1, solaria2, solaria3, solaria4];
const galleryVideos = [
  "pnchRd-AAwg", "5zo6Nh69DoU", "21h59Aidbss", "lDb2srq3prQ", "9xWD4rjaFz4",
  "PtXQ7ekGibo", "NjbdYDPeErM", "IFGQuVc1Qh4", "boE6pqIItFE", "Xf8AUcMltIQ",
  "Yq2XDpp2UNU", "7_I97gYQrho", "Hqv9KliWT1s", "BrDGv2SxZXI", "Y4lN13Cas5c",
  "vDInqD_HcKU", "cepHBQGE7J0", "9ejGoFF4Jrk", "urvheJNfRdQ", "Z2s5k9hBR5s",
  "lIwPvTA4kl8", "5Vg0nxFPN2s", "giAo0wIirns", "bWMNLhNUWic", "l6kA_Ya2tW8",
  "-vQ52O22iwM", "0SPxL2rY3Dc", "ntpGQTMyq3Q",
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
      <section className="bg-primary py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-accent font-body font-medium tracking-widest uppercase text-sm mb-3">شركة أسواق للتطوير العقاري</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">سولاريا مول في مدينة الشروق</h1>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto">
              أحد أكثر المشاريع الطموحة لشركة أسواق للتطوير العقاري، مصمم ليكون مركزاً حيوياً للتسوق والخدمات والرعاية الصحية والأنشطة المهنية على مساحة 6,600 متر مربع.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div className="md:w-1/2" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="rounded-lg overflow-hidden aspect-[4/3]">
                <img src={solariaImg} alt="سولاريا مول" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div className="md:w-1/2" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">سولاريا مول بالشروق</h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                يُعد سولاريا مول أحد أكثر المشاريع الطموحة لشركة أسواق للتطوير العقاري، حيث تم تصميمه ليكون مركزاً حيوياً للتسوق. يمتد المول على مساحة 6,600 متر مربع ويقدم مجموعة متنوعة من المرافق والخدمات.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                بفضل هويته المعمارية الحديثة وموقعه الاستراتيجي بالقرب من المعالم الرئيسية، يلبي سولاريا مول الطلب المتزايد على محلات الإيجار في الشروق والوحدات الإدارية والعقارات المتنوعة المتاحة للاستثمار في مصر.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-6">موقع سولاريا مول</h2>
          <p className="text-muted-foreground font-body text-center max-w-3xl mx-auto mb-12">
            يتمتع سولاريا مول بموقع استراتيجي في مدينة الشروق عند "ميدان الجامعة" بالقرب من الجامعة الفرنسية، يجذب الزوار باستمرار من الأحياء السكنية المجاورة والجامعات والمحاور الرئيسية بالمدينة.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {locationAdvantages.map((adv, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 p-5 bg-background rounded-lg"
              >
                <MapPin size={20} className="text-accent shrink-0 mt-0.5" />
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

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">الوحدات المتاحة في سولاريا مول</h2>
          <p className="text-muted-foreground font-body max-w-3xl mx-auto mb-12">
            استكشف الوحدات المتاحة للإيجار والبيع في سولاريا مول بمساحات تبدأ من 30 م² وتصل إلى 300 م².
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {unitTypes.map((type, i) => (
              <motion.div key={type.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-3 p-6 bg-cream rounded-lg"
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

      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">لماذا تستثمر في سولاريا مول</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {whyInvest.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-4 bg-background rounded-lg"
              >
                <span className="text-accent font-bold">✓</span>
                <p className="text-foreground font-body text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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

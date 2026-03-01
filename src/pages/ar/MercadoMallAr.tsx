import { motion } from "framer-motion";
import { MapPin, ShoppingBag, TrendingUp, Store, Wrench } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import MallGallerySection from "@/components/MallGallerySection";
import mercadoImg from "@/assets/mercado-mall.jpg";
import useSEO from "@/hooks/useSEO";
import mercado1 from "@/assets/gallery/mercado-1.jpg";

const galleryImages = [mercado1];
const galleryVideos = ["fHgVO2698Jw", "_QHKwyMozZw", "hUGvrHMnmoY"];

const unitTypes = [
  { icon: ShoppingBag, label: "محلات للإيجار ووحدات تجارية" },
  { icon: TrendingUp, label: "عقارات تجارية للاستثمار" },
  { icon: Store, label: "محلات تجزئة للإيجار" },
  { icon: Wrench, label: "مساحات لمزودي الخدمات والشركات المتخصصة" },
];

const locationAdvantages = [
  "موقع متميز داخل منطقة حيوية خدمية وسكنية في مدينة الشروق",
  "واجهة مباشرة على معالم رئيسية مما يجذب حركة مستمرة وطلب متزايد",
  "سهولة الوصول عبر الطرق الداخلية الرئيسية لمدينة الشروق",
  "محاط بمجتمعات سكنية قائمة وخدمات أساسية ضرورية",
];

const whyInvest = [
  "موقع استراتيجي في شرق القاهرة يضمن تدفقاً ثابتاً للزوار",
  "تصميم معماري حديث يعزز من الرؤية وجاذبية الأعمال",
  "مساحات وحدات مرنة تبدأ من حوالي 30 م²",
  "أسعار تنافسية توفر نقاط دخول جذابة للمستثمرين",
  "خطط سداد مرنة مع خيارات مقدم وأقساط ميسرة للمستثمرين",
  "تسليم فوري أو قريب جداً مما يسمح بتشغيل أسرع",
  "بيئة تجارية كاملة الخدمات تشمل مواقف سيارات، أمن، أنظمة مراقبة، مصاعد، ومناطق بلازا",
];

const MercadoMallAr = () => {
  useSEO("ميركادو مول | وحدات تجارية للإيجار والبيع في الشروق", "استثمر في ميركادو مول الشروق الذي يقدم وحدات تجزئة للبيع والإيجار بأسعار مرنة.");

  return (
    <Layout>
      <section className="bg-primary py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-accent font-body font-medium tracking-widest uppercase text-sm mb-3">شركة أسواق للتطوير العقاري</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">ميركادو مول في مدينة الشروق</h1>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto">
              وجهة تجارية متميزة مصممة لتلبية الطلب المتزايد على مساحات التجزئة والأعمال في شرق القاهرة.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div className="md:w-1/2" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="rounded-lg overflow-hidden aspect-[4/3]">
                <img src={mercadoImg} alt="ميركادو مول" className="w-full h-full object-cover" />
              </div>
            </motion.div>
            <motion.div className="md:w-1/2" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">ميركادو مول بالشروق</h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                يُعد ميركادو مول الشروق وجهة تجارية متميزة يقع في موقع استراتيجي ويمتد على ثلاثة طوابق، ويقدم مجموعة واسعة من الوحدات التجارية تبدأ مساحاتها من 30 متر مربع.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed">
                بفضل موقعه القوي وتصميماته العملية وتركيزه على الجانب الاستثماري، يمثل ميركادو مول فرصة استثمارية حقيقية للباحثين عن العقارات التجارية ومحلات للبيع في الشروق.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-6">موقع ميركادو مول</h2>
          <p className="text-muted-foreground font-body text-center max-w-3xl mx-auto mb-12">
            يتمتع ميركادو مول بموقع استراتيجي في مدينة الشروق، الحي الثاني غرب، مباشرة أمام بنك القاهرة والمدرسة اليابانية، مما يضمن تدفقاً مستمراً للزوار يومياً.
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
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">الوحدات التجارية المتاحة في ميركادو مول</h2>
          <p className="text-muted-foreground font-body max-w-3xl mx-auto mb-12">
            استكشف الوحدات المتاحة للإيجار والبيع في ميركادو مول والتي تتراوح مساحاتها من 30 م² إلى 300 م².
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">لماذا تستثمر في ميركادو مول</h2>
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

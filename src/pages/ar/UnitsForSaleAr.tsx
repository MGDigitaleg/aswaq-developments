import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Briefcase, Stethoscope, MapPin, Layers, TrendingUp, ShieldCheck, CreditCard } from "lucide-react";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import useSEO from "@/hooks/useSEO";

const unitCategories = [
  {
    title: "محلات تجارية للبيع",
    icon: ShoppingBag,
    description: "مثالية لتجارة التجزئة وصالات العرض والمقاهي والعلامات التجارية الخدمية. تستفيد هذه الوحدات من الكثافة العالية للزوار والمواقع الاستراتيجية وتصاميم الواجهات العصرية.",
    link: "/ar/units/commercial-for-sale",
  },
  {
    title: "مكاتب إدارية للبيع",
    icon: Briefcase,
    description: "مساحات عمل احترافية مصممة للشركات والشركات الناشئة ومقدمي الخدمات. تتميز الوحدات الإدارية بتصاميم عملية تدعم الإنتاجية ونمو الأعمال على المدى الطويل.",
    link: "/ar/units/administrative-for-sale",
  },
  {
    title: "عيادات طبية للبيع",
    icon: Stethoscope,
    description: "وحدات متخصصة مصممة لتلبية احتياجات العيادات ومقدمي الرعاية الصحية. مع توفير سهولة الوصول والرؤية الواضحة داخل المشاريع المتكاملة.",
    link: "/ar/units/medical-for-sale",
  },
];

const malls = [
  { name: "سولاريا مول", link: "/ar/projects/solaria-mall" },
  { name: "أرينا مول", link: "/ar/projects/arena-mall" },
  { name: "ميركادو مول", link: "/ar/projects/mercado-mall" },
  { name: "سيتي هب مول", link: "/ar/projects/city-hub-mall" },
];

const whyChoose = [
  { icon: MapPin, text: "مواقع استراتيجية في المناطق الأكثر نمواً" },
  { icon: Layers, text: "تنوع المساحات لتناسب مختلف أنواع الأنشطة" },
  { icon: TrendingUp, text: "بيئات عمل متكاملة تزيد من الطلب وتدفق الزوار" },
  { icon: CreditCard, text: "أسعار تنافسية مع خطط سداد مرنة" },
  { icon: ShieldCheck, text: "تخطيط احترافي وتنفيذ دقيق للمشاريع العقارية" },
];

const faqs = [
  { question: "ما هي أنواع الوحدات التي تقدمها شركة أسواق للتطوير العقاري؟", answer: "تقدم أسواق مجموعة واسعة من الخيارات العقارية التجارية، بما في ذلك محلات تجارية للبيع ومحلات للإيجار ومكاتب إدارية وعيادات طبية تقع في مولات ووجهات تجارية استراتيجية." },
  { question: "كيف يمكنني شراء وحدة أو عقار في مدينة الشروق؟", answer: "عليك أولاً تحديد نوع الوحدة الذي يناسب احتياجاتك، ثم تصفح موقعنا لاستكشاف الأنواع والمواقع المتاحة، ثم التواصل معنا لطلب تفاصيل وحدتك." },
  { question: "أين يمكنني شراء وحدة في مدينة الشروق؟", answer: "توفر أسواق تشكيلة متنوعة من المساحات التجارية والإدارية والطبية للبيع في أربعة مولات كبرى: سولاريا مول، أرينا مول، ميركادو مول، وسيتي هب مول. تتراوح مساحات هذه الوحدات من 30 م² حتى 300 م²." },
  { question: "كم عدد المولات التي تمتلك فيها شركة أسواق وحدات؟", answer: "تمتلك شركة أسواق حالياً وحدات في أربعة مولات رئيسية بمدينة الشروق." },
  { question: "ما هي المساحات المتاحة للوحدات؟", answer: "تبدأ مساحاتنا من 30 م² وتصل إلى 300 م²، مما يوفر مرونة عالية للمحلات الصغيرة والمنافذ متوسطة الحجم والمتاجر الكبرى." },
  { question: "هل الوحدات التجارية متاحة للبيع والإيجار؟", answer: "نعم. تقدم شركة أسواق وحدات تجارية متاحة للبيع والإيجار في موالتنا الأربعة." },
  { question: "هل توجد خطط سداد مرنة لشراء الوحدات؟", answer: "نعم. تقدم شركة أسواق خطط سداد مرنة للمشترين، بما في ذلك خيارات محلات للبيع بالتقسيط." },
];

const UnitsForSaleAr = () => {
  useSEO("وحدات للبيع في مصر | محلات تجارية وإدارية وطبية للبيع", "اكتشف مجموعة متنوعة من الوحدات الإدارية والتجارية والطبية للبيع في مصر. استثمر في عقارات متعددة الاستخدامات.");

  return (
    <Layout>
      <section className="bg-primary py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-accent font-body font-medium tracking-widest uppercase text-sm mb-3">وحدات للبيع</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              امتلك عقاراً مصمماً للنمو
            </h1>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto">
              اكتشف مجموعة مختارة من المشاريع العقارية التي تتضمن وحدات تجارية وإدارية وطبية للبيع. عقارات متعددة الاستخدامات تدعم القيمة التشغيلية والنجاح الاستثماري على المدى الطويل.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-4">أنواع الوحدات للبيع</h2>
          <p className="text-muted-foreground font-body text-center max-w-2xl mx-auto mb-12">
            بمساحات تتراوح من 30 إلى 300 م²، توفر أسواق البيئة المثالية للنجاح.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {unitCategories.map((cat, i) => (
              <motion.div key={cat.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-cream rounded-lg p-8 flex flex-col"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <cat.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{cat.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed flex-1">{cat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">مولاتنا التي تضم وحدات للبيع</h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto mb-12">
            تم تطوير كل مول لخدمة مناطق سكنية ذات كثافة عالية، مما يضمن طلباً مستمراً على العقارات التجارية والإدارية والطبية.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {malls.map((mall, i) => (
              <motion.div key={mall.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link to={mall.link} className="block p-6 bg-background rounded-lg hover:shadow-lg transition-shadow text-center">
                  <p className="font-display font-bold text-foreground">{mall.name}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-12">لماذا تختار أسواق للتطوير العقاري</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {whyChoose.map((item, i) => (
              <motion.div key={item.text} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-3 p-4"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon size={24} className="text-primary" />
                </div>
                <p className="font-semibold text-foreground font-body text-sm text-center">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} />
      <CTASection title="طلب تفاصيل الوحدة" subtitle="اكتشف العقارات التجارية والإدارية والطبية المعروضة للبيع عبر مشاريع أسواق المتكاملة." buttonText="طلب تفاصيل الوحدة" buttonLink="/ar/contact" />
    </Layout>
  );
};

export default UnitsForSaleAr;

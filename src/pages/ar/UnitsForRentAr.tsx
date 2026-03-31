import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Briefcase, Stethoscope, MapPin, Layers, TrendingUp, ShieldCheck, CreditCard } from "lucide-react";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import useSEO from "@/hooks/useSEO";

const unitCategories = [
  {
    title: "محلات تجارية للإيجار",
    icon: ShoppingBag,
    description: "مثالية لمحلات التجزئة وصالات العرض والمقاهي والعلامات التجارية الخدمية. تستفيد هذه الوحدات من الكثافة العالية للزوار والموقع الاستراتيجي وتصاميم الواجهات العصرية.",
  },
  {
    title: "مكاتب إدارية للإيجار",
    icon: Briefcase,
    description: "مساحات عمل احترافية مصممة للشركات والشركات الناشئة ومقدمي الخدمات. تتميز الوحدات الإدارية بتصاميم عملية تدعم الإنتاجية ونمو الأعمال المستدام.",
  },
  {
    title: "عيادات طبية للإيجار",
    icon: Stethoscope,
    description: "وحدات متخصصة مصممة لتلبية احتياجات العيادات ومقدمي الرعاية الصحية. مع تخطيط يتوافق مع المتطلبات التشغيلية وتوفير سهولة الوصول والرؤية الواضحة.",
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
  { icon: Layers, text: "مساحات مرنة للوحدات تناسب مختلف أنواع الأنشطة" },
  { icon: TrendingUp, text: "بيئات عمل متكاملة تزيد من الطلب وتدفق الزوار" },
  { icon: CreditCard, text: "أسعار تنافسية مع خطط سداد مرنة" },
  { icon: ShieldCheck, text: "تخطيط احترافي وتنفيذ دقيق للمشاريع العقارية" },
];

const faqs = [
  { question: "ما هي أنواع الوحدات التي تقدمها شركة أسواق للتطوير العقاري؟", answer: "تقدم شركة أسواق مجموعة خيارات من العقارات التجارية بما في ذلك محلات تجارية للبيع ومحلات للإيجار ومساحات إدارية وعيادات طبية تقع داخل مولات ووجهات تجارية استراتيجية." },
  { question: "كيف يمكنني استئجار وحدة في مدينة الشروق؟", answer: "عليك أولاً تحديد نوع الوحدة الذي يناسب احتياجاتك، ثم تصفح موقعنا لاستكشاف الأنواع والمواقع المتاحة، ثم التواصل معنا لطلب تفاصيل وحدتك." },
  { question: "أين يمكنني استئجار وحدة في مدينة الشروق؟", answer: "تقدم شركة أسواق وحدات للإيجار في أربعة مولات رئيسية: سولاريا مول، أرينا مول، ميركادو مول، وسيتي هب مول." },
  { question: "كم عدد المولات التي تمتلك فيها شركة أسواق وحدات؟", answer: "تمتلك شركة أسواق حالياً وحدات في أربعة مولات رئيسية بمدينة الشروق." },
  { question: "ما هي المساحات المتاحة للوحدات؟", answer: "تبدأ مساحاتنا من 30 م² وتصل إلى 300 م²، مما يوفر مرونة عالية للمحلات الصغيرة والمنافذ متوسطة الحجم والمتاجر الكبرى." },
  { question: "هل الوحدات التجارية متاحة للبيع والإيجار؟", answer: "نعم. تقدم شركة أسواق وحدات تجارية متاحة للبيع والإيجار في موالتنا الأربعة." },
  { question: "هل تتوفر خطط إيجار مرنة؟", answer: "نعم. تقدم شركة أسواق خطط إيجار مرنة. تواصل مع فريق المبيعات لمزيد من التفاصيل." },
];

const UnitsForRentAr = () => {
  useSEO("وحدات للإيجار في مصر | محلات تجارية وإدارية وطبية للإيجار", "اكتشف أفضل وحدات للإيجار في مشاريع شركة أسواق. نوفر لك محلات تجارية ومكاتب إدارية وعيادات طبية في مولات حيوية ومتعددة الاستخدامات.");

  return (
    <Layout>
      <section className="bg-primary py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary-foreground/60 font-body font-medium tracking-widest uppercase text-sm mb-3">وحدات للإيجار</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-6">
              عقارات مرنة مصممة لنجاح أعمالك
            </h1>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto">
              اكتشف مجموعة واسعة من الوحدات المتاحة للإيجار ضمن مشاريع شركة أسواق للتطوير العقاري. سواء كنت تبحث عن محلات تجارية للإيجار أو مساحات مكتبية احترافية أو وحدات طبية متخصصة، توفر أسواق عقارات جاهزة للتشغيل مصممة للنمو والمرونة والانتشار.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground text-center mb-4">أنواع الوحدات للإيجار</h2>
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

      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground mb-4">مولاتنا التي تضم وحدات للإيجار</h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto mb-12">
            تم تطوير كل مول لخدمة مناطق سكنية ذات كثافة عالية، مما يضمن طلباً مستمراً.
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

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground mb-12">لماذا تختار أسواق للتطوير العقاري</h2>
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
      <CTASection title="طلب تفاصيل الوحدة" subtitle="اكتشف العقارات التجارية والإدارية والطبية المتاحة للإيجار عبر مشاريع أسواق المتكاملة." buttonText="طلب تفاصيل الوحدة" buttonLink="/ar/contact" />
    </Layout>
  );
};

export default UnitsForRentAr;

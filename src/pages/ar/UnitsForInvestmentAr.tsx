import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Briefcase, Stethoscope, MapPin, Layers, TrendingUp, ShieldCheck, CreditCard } from "lucide-react";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import useSEO from "@/hooks/useSEO";

const unitCategories = [
  {
    title: "محلات تجارية للاستثمار",
    icon: ShoppingBag,
    description: "تستفيد هذه الوحدات من الكثافة العالية للزوار، مثالية لتجارة التجزئة وصالات العرض والمقاهي والعلامات التجارية الخدمية، والمواقع الاستراتيجية داخل المولات وتصاميم الواجهات العصرية.",
  },
  {
    title: "مكاتب إدارية للاستثمار",
    icon: Briefcase,
    description: "تتميز الوحدات الإدارية بتصاميم عملية تدعم مساحات عمل احترافية مصممة للشركات والشركات الناشئة ومقدمي الخدمات، وتعزز الإنتاجية ونمو الأعمال على المدى الطويل.",
  },
  {
    title: "عيادات طبية للاستثمار",
    icon: Stethoscope,
    description: "وحدات متخصصة مصممة لتلبية احتياجات العيادات ومقدمي الرعاية الصحية، مع تم تخطيطها لتتوافق مع المتطلبات التشغيلية مع توفير سهولة الوصول والرؤية الواضحة داخل المشاريع.",
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
  { icon: CreditCard, text: "أسعار تنافسية مع خطط سداد مرنة تشمل محلات للبيع بالتقسيط" },
  { icon: ShieldCheck, text: "تخطيط احترافي وتنفيذ دقيق للمشاريع العقارية" },
];

const faqs = [
  { question: "ما هي أنواع الوحدات التي تقدمها شركة أسواق للتطوير العقاري؟", answer: "تقدم أسواق مجموعة واسعة من خيارات العقارات التجارية، بما في ذلك محلات تجارية للبيع ومحلات للإيجار ومكاتب إدارية وعيادات طبية تقع في مولات ووجهات تجارية استراتيجية." },
  { question: "كيف يمكنني شراء وحدة أو عقار في مدينة الشروق؟", answer: "عليك أولاً تحديد نوع الوحدة الذي يناسب احتياجاتك، ثم تصفح موقعنا لاستكشاف الأنواع والمواقع المتاحة، ثم التواصل معنا لطلب تفاصيل وحدتك." },
  { question: "أين يمكنني شراء وحدة في مدينة الشروق؟", answer: "توفر أسواق تشكيلة متنوعة من المساحات للبيع في أربعة مولات كبرى: سولاريا مول، أرينا مول، ميركادو مول، وسيتي هب مول. تتراوح مساحات الوحدات من 24 م² حتى 300 م²." },
  { question: "كم عدد المولات التي تمتلك فيها شركة أسواق وحدات متاحة؟", answer: "تمتلك شركة أسواق حالياً وحدات في أربعة مولات رئيسية بمدينة الشروق. يستهدف كل مول فئات مختلفة من الجمهور لضمان ازدهار كافة الأعمال بداخله." },
  { question: "ما هي المساحات المتاحة للوحدات؟", answer: "تبدأ مساحاتنا من 30 م² وتصل إلى 300 م²، مما يوفر مرونة عالية للمحلات الصغيرة والمنافذ متوسطة الحجم والمتاجر الكبرى." },
  { question: "ما الذي يجعل مواقع أسواق جذابة للمستثمرين؟", answer: "يتم اختيار مواقعنا بعناية بناءً على إمكانات النمو والقرب من المناطق السكنية وسهولة الوصول. إن النمو السكاني المستمر في مدينة الشروق وزيادة الطلب على الأنشطة التجارية يجعل من امتلاك وحدة فرصة استثمارية قوية." },
  { question: "هل توجد خطط سداد مرنة لشراء الوحدات؟", answer: "نعم. تقدم شركة أسواق خطط سداد مرنة للمستثمرين وأصحاب الأعمال، مما يتيح لهم إدارة مدفوعاتهم بمرونة مع تأمين مساحاتهم التجارية أو الإدارية أو الطبية في أفضل المواقع." },
];

const UnitsForInvestmentAr = () => {
  useSEO("وحدات للاستثمار في مصر | تجاري وإداري وطبي", "اكتشف أفضل الوحدات الاستثمارية في مشاريع أسواق. وحدات تجارية وإدارية وطبية مصممة بعناية لضمان عوائد إيجارية مجزية ونمو مستدام.");

  return (
    <Layout>
      <section className="bg-primary py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary-foreground/60 font-body font-medium tracking-widest uppercase text-sm mb-3">وحدات للاستثمار</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-6">
              استثمر في عقارات مُعدّة لتحقيق الأداء الأمثل
            </h1>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto">
              على عكس التملك التقليدي للعقارات، يتم اختيار وحدات أسواق الاستثمارية بناءً على دراسات دقيقة لطلب السوق والقدرة التأجيرية والاستدامة التشغيلية على المدى الطويل. تقع كل وحدة ضمن مشاريع متعددة الاستخدامات تضمن تدفقاً مستمراً للزوار وتنوعاً في طلب المستأجرين.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground text-center mb-4">أنواع الوحدات الاستثمارية</h2>
          <p className="text-muted-foreground font-body text-center max-w-2xl mx-auto mb-12">
            بمساحات تتراوح من 30 إلى 300 م²، توفر أسواق البيئة المثالية للنجاح.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {unitCategories.map((cat, i) => (
              <motion.div key={cat.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-cream rounded-2xl border border-border/50 p-8 flex flex-col"
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

      <section className="py-12 md:py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground mb-4">مولاتنا التي تضم وحدات للاستثمار</h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto mb-12">
            تم تطوير كل مول لخدمة مناطق سكنية ذات كثافة عالية، مما يضمن طلباً مستمراً على محلات الإيجار في الشروق والوحدات الإدارية والطبية.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {malls.map((mall, i) => (
              <motion.div key={mall.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link to={mall.link} className="block p-6 bg-background rounded-2xl border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-shadow text-center">
                  <p className="font-display font-bold text-foreground">{mall.name}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
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
      <CTASection title="طلب تفاصيل الوحدة" subtitle="اكتشف أفضل الوحدات التجارية والإدارية والطبية للاستثمار عبر مشاريع أسواق العقارية المتكاملة. امتلك وحدتك المثالية الآن بكل ثقة." buttonText="طلب تفاصيل الوحدة" buttonLink="/ar/contact" />
    </Layout>
  );
};

export default UnitsForInvestmentAr;

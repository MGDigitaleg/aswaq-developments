import useSEO from "@/hooks/useSEO";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Layers, TrendingUp, ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import unitSaleImg from "@/assets/units-sale.jpg";
import unitInvestmentImg from "@/assets/units-investment.jpg";
import unitRentImg from "@/assets/units-rent.jpg";

const unitTypes = [
  {
    title: "وحدات للبيع",
    icon: "🏷️",
    image: unitSaleImg,
    description: "امتلك وحدة في مشروع بموقع استراتيجي واضمن أصلاً طويل الأجل مع إمكانات نمو قوية. تقدم أسواق مجموعة متنوعة من الوحدات للبيع المناسبة للتجزئة والتجارة.",
    cta: "استكشف وحدات للبيع",
  },
  {
    title: "وحدات للاستثمار",
    icon: "📈",
    image: unitInvestmentImg,
    description: "تبحث عن عوائد موثوقة؟ وحداتنا الاستثمارية مختارة بناءً على قوة الموقع والطلب الإيجاري وأداء السوق. مثالية للمستثمرين الباحثين عن عقارات مدرة للدخل.",
    cta: "استكشف وحدات للاستثمار",
  },
  {
    title: "وحدات للإيجار",
    icon: "🏢",
    image: unitRentImg,
    description: "اكتشف عقارات مرنة للإيجار في مشاريع عالية الحركة ومتكاملة الخدمات. سواء كنت تطلق عملاً جديدًا أو توسع عملاً قائمًا، توفر أسواق وحدات إيجارية جاهزة للتشغيل.",
    cta: "استكشف وحدات للإيجار",
  },
];

const whyChoose = [
  { icon: MapPin, text: "مواقع استراتيجية", desc: "مناطق حركة مرور عالية" },
  { icon: Layers, text: "مساحات مرنة", desc: "تخطيطات عملية 30-300 م²" },
  { icon: TrendingUp, text: "جاهزة للاستثمار", desc: "تخطيط مستدام للقيمة" },
  { icon: ShieldCheck, text: "متكاملة الخدمات", desc: "بيئات لنمو الأعمال" },
];

const faqs = [
  { question: "ما أنواع العقارات التي تقدمها شركة أسواق للتطوير العقاري؟", answer: "تقدم شركة أسواق مجموعة متنوعة من خيارات العقارات التجارية، بما في ذلك وحدات تجارية للبيع، وحدات للإيجار، ومساحات إدارية تقع داخل مولات ووجهات تجارية استراتيجية." },
  { question: "كيف يمكنني شراء وحدة أو عقار في مدينة الشروق؟", answer: "لشراء عقار في مدينة الشروق، عليك أولاً تحديد نوع العقار الذي يناسب احتياجاتك، ثم زيارة موقعنا الإلكتروني aswaq-egypt.com لاستكشاف المواقع والأنواع، وبعد ذلك التواصل معنا لطلب وحدتك." },
  { question: "أين يمكنني شراء وحدة في مدينة الشروق؟", answer: "توفر شركة أسواق مجموعة من المساحات التجارية ومساحات التجزئة للبيع عبر وجهاتها الأربع الكبرى: سولاريا مول، أرينا مول، ميركادو مول، وسيتي هب مول. وتتراوح المساحات من 30 م² حتى 300 م²." },
  { question: "كم عدد المولات التي تمتلك فيها أسواق وحدات؟", answer: "تمتلك أسواق حالياً وحدات في أربعة مولات رئيسية بمدينة الشروق. يستهدف كل مول جمهوراً مختلفاً من المتسوقين وطالبي الخدمات." },
  { question: "ما هي المساحات المعتادة للوحدات المتاحة؟", answer: "تتراوح مساحات وحداتنا من 30 م² إلى 300 م²، مما يوفر مرونة كافية للمحلات الصغيرة والمنافذ متوسطة الحجم والمتاجر الكبرى." },
  { question: "هل الوحدات التجارية متاحة للبيع والإيجار؟", answer: "نعم، توفر شركة أسواق كلاً من الوحدات التجارية للبيع والوحدات للإيجار في جميع مشاريعنا الأربعة." },
  { question: "ما الذي يجعل مواقع أسواق جاذبة للمستثمرين؟", answer: "يتم اختيار مواقع مشاريعنا بعناية بناءً على إمكانات النمو والقرب من المناطق السكنية وسهولة الوصول. النمو السكاني المستمر في مدينة الشروق يجعل وحداتنا فرصة استثمارية قوية." },
  { question: "هل توجد خطط سداد مرنة لشراء الوحدات؟", answer: "نعم، توفر شركة أسواق خطط سداد وتقسيط مرنة للمشترين الراغبين في تملك وحدة، مما يتيح للمستثمرين وأصحاب الأعمال إدارة مدفوعاتهم على فترات زمنية." },
];

const AvailableUnitsAr = () => {
  useSEO("اختر وحدتك في مدينة الشروق | عقارات للبيع والإيجار", "استكشف وحدات للبيع وفرص استثمارية وعقارات للإيجار في مشاريع أسواق للتطوير العقاري المتميزة. اختر وحدتك اليوم.");

  return (
    <Layout>
      <section className="bg-primary py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-accent font-arabic font-medium tracking-widest text-sm mb-3">اختر وحدتك</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              الوحدات المتاحة: استكشف عقارات<br />للبيع والاستثمار والإيجار
            </h1>
            <p className="text-primary-foreground/70 font-arabic max-w-3xl mx-auto mb-4">
              سواء كنت تبحث عن وحدات للبيع أو عقارات للإيجار أو فرص استثمارية ذكية، تقدم أسواق محفظة مختارة بعناية من الوحدات التجارية والإدارية في مواقع متميزة.
            </p>
            <p className="text-primary-foreground/70 font-arabic max-w-3xl mx-auto">
              استكشف مساحات مرنة مصممة لتلبية احتياجات الأعمال الحقيقية، مطورة بواسطة مطور عقاري موثوق في مصر مع تركيز واضح على القيمة والموقع والنمو طويل الأمد.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-16">
            {unitTypes.map((type, i) => (
              <motion.div key={type.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`flex flex-col md:flex-row gap-8 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className="md:w-1/2">
                  <div className="rounded-lg overflow-hidden aspect-[4/3]">
                    <img src={type.image} alt={type.title} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <span className="text-3xl mb-3 block">{type.icon}</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">{type.title}</h2>
                  <p className="text-muted-foreground font-arabic leading-relaxed mb-6">{type.description}</p>
                  <Link to="/ar/units" className="inline-block bg-accent text-accent-foreground px-6 py-2.5 font-semibold rounded hover:bg-gold-light transition-colors font-arabic text-sm">
                    {type.cta}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">لماذا تختار أسواق للتطوير العقاري؟</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {whyChoose.map((item, i) => (
              <motion.div key={item.text} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex flex-col items-center gap-3 p-6 bg-background rounded-lg">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon size={24} className="text-primary" />
                </div>
                <p className="font-semibold text-foreground font-arabic">{item.text}</p>
                <p className="text-sm text-muted-foreground font-arabic">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title="تسأل، ونحن نجيب" />

      <CTASection
        title="ابدأ خطوتك العقارية القادمة مع أسواق"
        subtitle="تبحث عن مطور عقاري موثوق يقدم عقارات متميزة للبيع أو الوحدة المناسبة للإيجار؟"
        buttonText="اطلب تفاصيل الوحدة"
        buttonLink="/ar/units"
      />
    </Layout>
  );
};

export default AvailableUnitsAr;

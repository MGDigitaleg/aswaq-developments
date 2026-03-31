import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import cityhubImg from "@/assets/cityhub-mall.webp";
import mercadoImg from "@/assets/mercado-mall.webp";
import arenaImg from "@/assets/arena-mall.webp";
import solariaImg from "@/assets/solaria-mall.webp";
import heroImg from "@/assets/hero-building.webp";

const projects = [
  {
    name: "سولاريا مول",
    image: solariaImg,
    href: "/ar/projects/solaria-mall",
    description: "أحد أرقى مشاريع التطوير العقاري بمدينة الشروق. مصمم ليكون وجهة شاملة تضم مساحات تجزئة قوية وعيادات طبية عالمية المستوى. الخيار الأمثل للباحثين عن عقارات تجارية للبيع.",
  },
  {
    name: "أرينا مول",
    image: arenaImg,
    href: "/ar/projects/arena-mall",
    description: "مشروع متعدد الاستخدامات يقع في موقع استراتيجي. المول يوفر وحدات إدارية وطبية وتجارية بمساحات مرنة، ويعد وجهة استثمارية قوية تجمع بين الموقع المتميز والكثافة الزوارية.",
  },
  {
    name: "ميركادو مول",
    image: mercadoImg,
    href: "/ar/projects/mercado-mall",
    description: "أكبر مول خدمات متكامل في مدينة الشروق. إذا كنت تبحث عن محلات للإيجار أو مساحات تجارية، فإن ميركادو يوفر لك بيئة عمل مثالية تستهدف جمهوراً عريضاً يضمن نجاح أي نشاط تجاري.",
  },
  {
    name: "سيتي هب مول",
    image: cityhubImg,
    href: "/ar/projects/city-hub-mall",
    description: "يقع في منطقة النوادي بمدينة الشروق، ويقدم وحدات تجارية للإيجار وعقارات للبيع تتميز بتخطيط ذكي. الخيار الأفضل لمن يبحث عن استثمار عقاري طويل الأمد يضمن نمو القيمة الرأسمالية.",
  },
];

const faqs = [
  { question: "ما أنواع العقارات التي تقدمها شركة أسواق للتطوير العقاري؟", answer: "نقدم مجموعة متنوعة من العقارات التجارية، تشمل وحدات للبيع، وحدات للإيجار، داخل مواقع استراتيجية لضمان أعلى كثافة زوار." },
  { question: "كيف يمكنني شراء عقار أو وحدة في مدينة الشروق؟", answer: "يمكنك البدء بتحديد نوع العقار المناسب لاحتياجاتك، ثم تصفح موقعنا الإلكتروني aswaq-egypt.com، ومن ثم التواصل معنا لطلب وحدتك المتاحة واستكشاف المواقع." },
  { question: "أين تقع وحدات شركة أسواق؟", answer: "تقع مساحاتنا التجارية في مدينة الشروق، أحد أسرع المراكز الحضرية نمواً، مما يضمن ظهور أعمالك على المدى الطويل." },
  { question: "هل الوحدات المتاحة للبيع والإيجار؟", answer: "نعم، توفر الشركة وحدات للبيع وللإيجار من مشاريعنا الأربعة (أرينا، سولاريا، ميركادو، وسيتي هب)." },
  { question: "هل توجد خطط سداد مرنة؟", answer: "نعم، توفر شركة أسواق خطط سداد مرنة وتقسيط للمستثمرين وأصحاب الأعمال، مما يتيح لهم إدارة مدفوعاتهم بسهولة عبر الزمن." },
];

const ProjectsAr = () => {
  useSEO("مشاريع شركة أسواق للتطوير العقاري | وجهات استثمارية في مدينة الشروق", "هل تبحث عن وحدات تجارية للبيع في الشروق؟ اكتشف أفضل العقارات التجارية في أكثر مولات مدينة الشروق حيوية مع شركة أسواق للتطوير العقاري.");

  return (
    <Layout>
      <section className="relative h-[320px] md:h-[380px] flex items-center justify-center pt-[120px] overflow-hidden">
        <img src={heroImg} alt="مشاريع أسواق العقارية" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/70" />
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary-foreground text-center px-4">
          مشاريع أسواق للتطوير العقاري
        </motion.h1>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">مشاريع عقارية متكاملة في قلب مدينة الشروق</h2>
            <p className="text-muted-foreground font-arabic leading-relaxed mb-6">
              تعتبر مشاريع شركة أسواق للتطوير العقاري علامة فارقة في مجال الاستثمار العقاري في مصر، حيث نقدم حلولاً عقارية متكاملة تلبي احتياجات المستثمرين وأصحاب الأعمال. نحن نتخصص في تطوير وحدات متعددة الاستخدامات في مصر تجمع بين الحداثة والعائد الربحي المرتفع.
            </p>
            <p className="text-muted-foreground font-arabic leading-relaxed mb-6">
              سواء كنت تبحث عن عقارات للبيع في الشروق أو تهدف إلى العثور على وحدات تجارية للإيجار في أكثر المناطق حيوية، فإن مشاريعنا توفر لك المساحة المثالية للانطلاق بنشاطك التجاري.
            </p>
            <p className="text-muted-foreground font-arabic leading-relaxed">
              مع تركيزنا القوي على توفير وحدات متعددة الاستخدامات في مصر، تقدم شركة أسواق وحدات تجارية عبر مجموعة من{" "}
              <Link to="/ar/units/for-sale" className="text-primary font-semibold underline hover:text-secondary transition-colors">
                المولات المتميزة في مدينة الشروق
              </Link>
              . سواء كنت تبحث عن عقارات للبيع في مصر أو وحدات تجارية للإيجار في أكثر المناطق حيوية بمدينة الشروق.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <motion.div key={project.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <Link to={project.href} className="group block relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow aspect-[4/3]">
                  <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent flex items-end p-6 transition-opacity duration-300 group-hover:opacity-0">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground">{project.name}</h3>
                  </div>
                  <div className="absolute inset-0 bg-primary/85 flex flex-col items-center justify-center p-8 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-4">{project.name}</h3>
                    <p className="text-primary-foreground/80 font-arabic text-sm md:text-base leading-relaxed max-w-sm">{project.description}</p>
                    <span className="mt-4 text-primary-foreground font-semibold text-sm font-arabic">استكشف المشروع ←</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-6">وحدات متاحة للبيع والإيجار</h2>
            <p className="text-primary-foreground/70 font-arabic leading-relaxed mb-4">
              عبر مشاريع أسواق، تتوفر مجموعة متنوعة من الوحدات لتناسب احتياجات الأعمال والاستثمار المختلفة. تتراوح مساحاتنا من 24 م² إلى 300 م².
            </p>
            <p className="text-primary-foreground/70 font-arabic leading-relaxed mb-8">
              سواء كنت تبحث عن وحدات تجارية للإيجار أو وحدات متعددة الاستخدامات للبيع، تقدم أسواق فرصًا استراتيجية داخل مولات متطورة بالكامل في مدينة الشروق.
            </p>
            <Link to="/ar/contact" className="inline-block bg-primary text-primary-foreground px-8 py-3 font-semibold rounded-lg hover:bg-navy-light hover:shadow-md transition-all duration-300 font-arabic">
              استكشف الوحدات المتاحة
            </Link>
          </motion.div>
        </div>
      </section>

      <FAQSection faqs={faqs} title="تسأل، ونحن نجيب" />
    </Layout>
  );
};

export default ProjectsAr;

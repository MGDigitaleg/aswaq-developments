import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
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
    tag: "تجزئة وطبي",
    description: "أحد أرقى مشاريع التطوير العقاري بمدينة الشروق. مصمم ليكون وجهة شاملة تضم مساحات تجزئة قوية وعيادات طبية عالمية المستوى.",
  },
  {
    name: "أرينا مول",
    image: arenaImg,
    href: "/ar/projects/arena-mall",
    tag: "تجاري وطبي",
    description: "مشروع متعدد الاستخدامات يقع في موقع استراتيجي. المول يوفر وحدات إدارية وطبية وتجارية بمساحات مرنة.",
  },
  {
    name: "ميركادو مول",
    image: mercadoImg,
    href: "/ar/projects/mercado-mall",
    tag: "متعدد الاستخدامات",
    description: "أكبر مول خدمات متكامل في مدينة الشروق. يوفر بيئة عمل مثالية تستهدف جمهوراً عريضاً يضمن نجاح أي نشاط تجاري.",
  },
  {
    name: "سيتي هب مول",
    image: cityhubImg,
    href: "/ar/projects/city-hub-mall",
    tag: "تجاري وتجزئة",
    description: "يقع في منطقة النوادي بمدينة الشروق، ويقدم وحدات تجارية للإيجار وعقارات للبيع تتميز بتخطيط ذكي.",
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
      {/* Hero */}
      <section className="relative min-h-[420px] md:min-h-[480px] flex items-end pb-16 md:pb-20 overflow-hidden">
        <img src={heroImg} alt="مشاريع أسواق العقارية في الشروق" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, hsl(226 76% 6% / 0.4) 0%, hsl(226 76% 6% / 0.75) 100%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-40">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-arabic font-semibold tracking-[0.12em] mb-4" style={{ color: 'hsl(var(--gold) / 0.75)' }}>محفظة مشاريعنا</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight max-w-2xl">
              مشاريع أسواق للتطوير العقاري
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <div className="section-divider mb-8" />
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-foreground">مشاريع عقارية متكاملة في قلب مدينة الشروق</h2>
            <p className="text-muted-foreground font-arabic text-[15px] leading-[1.9] mb-5">
              تعتبر مشاريع شركة أسواق للتطوير العقاري علامة فارقة في مجال الاستثمار العقاري في مصر، حيث نقدم حلولاً عقارية متكاملة تلبي احتياجات المستثمرين وأصحاب الأعمال.
            </p>
            <p className="text-muted-foreground font-arabic text-[15px] leading-[1.9]">
              مع تركيزنا القوي على توفير وحدات متعددة الاستخدامات في مصر، تقدم شركة أسواق وحدات تجارية عبر مجموعة من{" "}
              <Link to="/ar/units/for-sale" className="text-accent font-semibold hover:underline transition-colors">
                المولات المتميزة في مدينة الشروق
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Showcase */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            {projects.slice(0, 2).map((project, i) => (
              <motion.div key={project.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <Link to={project.href} className="group block relative rounded-2xl overflow-hidden aspect-[16/10]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                  <img src={project.image} alt={`${project.name} - أسواق للتطوير العقاري`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <span className="inline-block text-[10px] font-arabic font-semibold tracking-[0.08em] text-accent mb-2">{project.tag}</span>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-2">{project.name}</h3>
                    <p className="text-primary-foreground/55 text-sm font-arabic line-clamp-2 max-w-md">{project.description}</p>
                    <span className="inline-flex items-center gap-1.5 text-primary-foreground/70 font-arabic font-semibold text-sm mt-3 group-hover:gap-2.5 transition-all duration-300">
                      استكشف المشروع <ArrowLeft size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.slice(2).map((project, i) => (
              <motion.div key={project.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <Link to={project.href} className="group block relative rounded-2xl overflow-hidden aspect-[16/10]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                  <img src={project.image} alt={`${project.name} - أسواق للتطوير العقاري`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block text-[10px] font-arabic font-semibold tracking-[0.08em] text-accent mb-2">{project.tag}</span>
                    <h3 className="font-display text-lg md:text-xl font-bold text-primary-foreground mb-1.5">{project.name}</h3>
                    <p className="text-primary-foreground/55 text-sm font-arabic line-clamp-2">{project.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Units CTA */}
      <section className="relative py-20 md:py-28 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-[10px] font-semibold tracking-[0.15em] font-arabic text-accent mb-4">متاح الآن</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-6 leading-tight">
              وحدات متاحة للبيع والإيجار
            </h2>
            <p className="text-primary-foreground/55 font-arabic text-[15px] leading-[1.9] mb-4">
              عبر مشاريع أسواق، تتوفر مجموعة متنوعة من الوحدات لتناسب احتياجات الأعمال والاستثمار المختلفة. تتراوح مساحاتنا من 24 م² إلى 300 م².
            </p>
            <p className="text-primary-foreground/55 font-arabic text-[15px] leading-[1.9] mb-10">
              سواء كنت تبحث عن وحدات تجارية للإيجار أو وحدات متعددة الاستخدامات للبيع، تقدم أسواق فرصًا استراتيجية داخل مولات متطورة بالكامل في مدينة الشروق.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/ar/units" className="btn-premium px-9 py-4 text-sm rounded-lg font-arabic group inline-flex items-center justify-center gap-2">
                استكشف الوحدات المتاحة
                <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
              </Link>
              <Link to="/ar/contact" className="btn-outline-light px-9 py-4 text-sm rounded-lg font-arabic text-center">
                اطلب استشارة
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <FAQSection faqs={faqs} title="تسأل، ونحن نجيب" />
    </Layout>
  );
};

export default ProjectsAr;

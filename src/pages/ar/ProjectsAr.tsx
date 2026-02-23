import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useSEO from "@/hooks/useSEO";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import cityhubImg from "@/assets/cityhub-mall.jpg";
import mercadoImg from "@/assets/mercado-mall.jpg";
import arenaImg from "@/assets/arena-mall.jpg";
import solariaImg from "@/assets/solaria-mall.jpg";
import heroImg from "@/assets/hero-building.jpg";

const projects = [
  {
    name: "سولاريا مول",
    image: solariaImg,
    href: "/ar/projects/solaria-mall",
    description: "وجهة متعددة الاستخدامات مصممة لخدمة الاحتياجات اليومية للمجتمعات المحيطة. مثالية للأنشطة التجارية والخدمية والطبية والإدارية.",
  },
  {
    name: "أرينا مول",
    image: arenaImg,
    href: "/ar/projects/arena-mall",
    description: "وجهة ديناميكية متعددة الاستخدامات تم تطويرها لتعظيم إمكانية الوصول والتعرض. الخيار الأمثل للأعمال التي تسعى للنمو.",
  },
  {
    name: "ميركادو مول",
    image: mercadoImg,
    href: "/ar/projects/mercado-mall",
    description: "يقدم ميركادو مول بيئة تجارية تركز على نمط الحياة وتجذب جمهورًا متنوعًا، مما يخلق فرصًا للمشغلين والمستثمرين.",
  },
  {
    name: "سيتي هب مول",
    image: cityhubImg,
    href: "/ar/projects/city-hub-mall",
    description: "مشروع تجاري مخطط بعناية يجمع بين الراحة والاستثمارات طويلة الأجل مع مساحات تجارية مرنة.",
  },
];

const faqs = [
  { question: "ما أنواع العقارات التي تقدمها أسواق للتطوير العقاري؟", answer: "تقدم أسواق مجموعة متنوعة من الخيارات العقارية التجارية، بما في ذلك وحدات تجارية للبيع، وحدات للإيجار، مساحات إدارية، ووحدات طبية في مواقع استراتيجية." },
  { question: "كيف يمكنني شراء وحدة في مدينة الشروق؟", answer: "حدد أولاً نوع العقار المناسب لاحتياجاتك، تعرف على الأنواع والمواقع التي نقدمها، ثم تواصل معنا لحجز وحدتك." },
  { question: "أين يمكنني شراء وحدة في مدينة الشروق؟", answer: "تقدم أسواق مساحات تجارية وتجزئة للبيع عبر أربعة مولات رئيسية: سولاريا مول، أرينا مول، ميركادو مول، وسيتي هب مول. تتراوح المساحات من 30 م² حتى 300 م²." },
  { question: "كم عدد المولات التي تمتلك فيها أسواق وحدات؟", answer: "تمتلك أسواق حالياً وحدات في أربعة مولات رئيسية بمدينة الشروق." },
  { question: "ما هي المساحات النموذجية المتاحة؟", answer: "تتراوح مساحات وحداتنا من 30 م² حتى 300 م²، مما يوفر مرونة للمحلات الصغيرة والمتوسطة والكبيرة." },
  { question: "أين تقع وحدات أسواق؟", answer: "جميع مساحاتنا التجارية تقع في مدينة الشروق، أحد أسرع المحاور الحضرية نموًا في شرق القاهرة." },
  { question: "هل الوحدات التجارية متاحة للبيع والإيجار؟", answer: "نعم. تقدم أسواق وحدات تجارية للبيع ووحدات للإيجار عبر مولاتنا الأربعة." },
  { question: "ما أنواع الأعمال التي يمكن تشغيلها في مولات أسواق؟", answer: "وحداتنا مناسبة لمجموعة متنوعة من الأعمال مثل المحلات التجارية والمقاهي والمطاعم ومراكز الخدمات والعيادات الطبية والمكاتب." },
  { question: "ما الذي يجعل مواقع أسواق جاذبة للمستثمرين؟", answer: "يتم اختيار مواقع أسواق بعناية بناءً على إمكانات النمو والقرب السكني وسهولة الوصول." },
  { question: "كيف يمكنني الاستفسار عن الوحدات المتاحة أو الأسعار؟", answer: "يمكنك التواصل مع أسواق مباشرة عبر صفحة تواصل معنا أو الاتصال بفريق المبيعات لدينا." },
  { question: "هل هناك خطط سداد مرنة؟", answer: "نعم. تقدم أسواق خطط سداد مرنة للمشترين الراغبين في تملك وحدة." },
];

const ProjectsAr = () => {
  useSEO("مشاريع أسواق للتطوير العقاري", "هل تبحث عن وحدات تجارية للبيع في الشروق؟ اكتشف عقارات تجارية متميزة في أكثر مولات مدينة الشروق نشاطًا مع أسواق.");

  return (
    <Layout>
      <section className="relative h-[220px] md:h-[280px] flex items-center justify-center overflow-hidden">
        <img src={heroImg} alt="مشاريع أسواق العقارية" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/70" />
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative z-10 font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground text-center px-4">
          مشاريع أسواق للتطوير العقاري
        </motion.h1>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">مشاريع عقارية متكاملة في مدينة الشروق</h2>
            <p className="text-muted-foreground font-arabic leading-relaxed mb-6">
              تمثل مشاريع أسواق للتطوير العقاري محفظة من المشاريع العقارية المخططة بعناية لدعم الأعمال والمستثمرين والعلامات التجارية النامية. تركز مشاريعنا على إنشاء وجهات تجارية عالية الأداء.
            </p>
            <p className="text-muted-foreground font-arabic leading-relaxed">
              مع التركيز القوي على الوحدات متعددة الاستخدامات في مصر، تقدم أسواق وحدات تجارية عبر مولات متعددة حيث يمكنك استكشاف{" "}
              <Link to="/ar/units/for-sale" className="text-accent font-semibold underline hover:text-gold-light transition-colors">
                المساحات التجارية المتاحة في مدينة الشروق
              </Link>
              ، سواء للبيع أو الإيجار، جميعها في مناطق متصلة جيدًا.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
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
                    <span className="mt-4 text-accent font-semibold text-sm font-arabic">استكشف المشروع ←</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-accent-foreground mb-6">وحدات متاحة للبيع والإيجار</h2>
            <p className="text-accent-foreground/80 font-arabic leading-relaxed mb-4">
              عبر مشاريع أسواق، تتوفر مجموعة متنوعة من الوحدات لتناسب احتياجات الأعمال والاستثمار المختلفة. تتراوح مساحاتنا من 30 م² إلى 300 م².
            </p>
            <p className="text-accent-foreground/80 font-arabic leading-relaxed mb-8">
              سواء كنت تبحث عن وحدات تجارية للإيجار أو وحدات متعددة الاستخدامات للبيع، تقدم أسواق فرصًا استراتيجية داخل مولات متطورة بالكامل في مدينة الشروق.
            </p>
            <Link to="/ar/contact" className="inline-block bg-primary text-primary-foreground px-8 py-3 font-semibold rounded hover:bg-navy-light transition-colors font-arabic">
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

import { motion } from "framer-motion";
import { CheckCircle, Eye, Target, Heart, Award, Clock, Building2 } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import aboutHero from "@/assets/about-hero.jpg";
import useSEO from "@/hooks/useSEO";

const whyChoose = [
  { icon: Award, text: "أكثر من 20 عامًا من الخبرة العقارية" },
  { icon: Building2, text: "أكثر من 15 مشروعًا ناجحًا في مصر" },
  { icon: Heart, text: "أكثر من 400 عميل راضٍ" },
  { icon: Target, text: "استثمارات تتجاوز 3 مليارات جنيه" },
  { icon: Clock, text: "تسليم المشاريع قبل الموعد المحدد" },
  { icon: CheckCircle, text: "مملوكة ومدارة بواسطة أسواق لضمان الجودة" },
];

const stats = [
  { value: "20+", label: "سنة" },
  { value: "15+", label: "مشروع" },
  { value: "400+", label: "عميل" },
  { value: "3B+", label: "جنيه استثمارات" },
];

const AboutAr = () => {
  useSEO("أسواق للتطوير العقاري | قصتنا", "مطور عقاري متخصص في مصر يقدم وحدات متميزة للإيجار وعقارات للبيع، مدعومًا بأكثر من 20 عامًا من الخبرة المثبتة.");

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${aboutHero})` }} />
        <div className="absolute inset-0 bg-primary/70" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">من نحن</h1>
          <p className="text-primary-foreground/80 font-arabic max-w-2xl mx-auto">
            أسواق للتطوير العقاري، تأسست عام 2019، تمثل محطة استراتيجية مبنية على أكثر من 20 عامًا من النجاح المثبت عبر القطاعات السكنية والتجارية والصناعية والسياحية.
          </p>
        </motion.div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-muted-foreground font-arabic leading-relaxed text-lg text-center">
            تأسست أسواق بالشراكة مع شركات عقارية ناشطة منذ عام 2002، وتم إنشاؤها لتبسيط إدارة المشاريع الحالية والمستقبلية، وتعزيز الربحية، وتجاوز توقعات العملاء مع فتح أسواق جديدة بفرص استثمارية وتوظيفية متنوعة. ومنذ تأسيسها، واصلت أسواق الازدهار من خلال تقديم مشاريع سكنية وتجارية وإدارية وطبية عالية الجودة.
          </motion.p>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-background p-8 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Eye size={24} className="text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">رؤيتنا</h3>
              <p className="text-muted-foreground font-arabic">
                ترسيخ إرثنا في القطاع من خلال تقديم التميز والابتكار في التطوير العقاري عبر مصر والشرق الأوسط.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-background p-8 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Target size={24} className="text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">مهمتنا</h3>
              <p className="text-muted-foreground font-arabic">
                تقديم وعود التميز والاستثمارات الموثوقة من خلال الابتكار في الأسواق المصرية والشرق أوسطية بتوفير فرص الاستثمار المثالية للجميع. نلتزم بتحقيق أعلى المعايير من خلال منتجات متطورة وإدارة استثنائية.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
            لماذا تختارنا؟
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {whyChoose.map((item, i) => (
              <motion.div key={item.text} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-4 p-5 bg-cream rounded-lg text-right">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon size={18} className="text-primary" />
                </div>
                <span className="font-arabic font-medium text-foreground text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="font-display text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-primary-foreground/70 font-arabic text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="أمّن استثمارك مع مطور موثوق"
        subtitle="شارك مع أسواق للتطوير العقاري للحصول على فرص عقارية متميزة في أكثر المواقع حيوية في مصر."
        buttonText="تواصل معنا"
        buttonLink="/ar/contact"
      />
    </Layout>
  );
};

export default AboutAr;

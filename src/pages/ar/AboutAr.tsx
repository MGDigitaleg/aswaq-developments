import { motion } from "framer-motion";
import { CheckCircle, Eye, Target, Heart, Award, Clock, Building2 } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import aboutHero from "@/assets/about-hero.webp";
import useSEO from "@/hooks/useSEO";
import AnimatedCounter from "@/components/AnimatedCounter";

const whyChoose = [
  { icon: Award, text: "خبرة عقارية تمتد لأكثر من 20 عاماً في مجال الاستثمار العقاري في مصر" },
  { icon: Building2, text: "أكثر من 15 مشروعاً ناجحاً وبصمة قوية ومشاريع عقارية متكاملة" },
  { icon: Heart, text: "أكثر من 400 عميل واثق بنا، نفتخر ببناء علاقات مستدامة مع شركائنا" },
  { icon: Target, text: "استثمارات تتخطى 3 مليارات جنيه مصري تضمن استمرارية وتطور مشاريعنا" },
  { icon: Clock, text: "أعمال سابقة وتصديق بالتسليم قبل الموعد بأعلى معايير الانضباط" },
  { icon: CheckCircle, text: "إدارة وتشغيل مباشر بواسطة شركة أسواق لضمان استدامة قيمة وحداتك" },
];

const stats = [
  { value: "20+", label: "سنة" },
  { value: "15+", label: "مشروع" },
  { value: "400+", label: "عميل" },
  { value: "3B+", label: "جنيه استثمارات" },
];

const AboutAr = () => {
  useSEO("أسواق للتطوير العقاري - رؤية رائدة في الاستثمار العقاري", "نحن شركة المطور العقاري الرائد في مدينة الشروق. لدينا خبرة تزيد عن 20 عاماً في تقديم عقارات متميزة للبيع، تشمل وحدات إدارية وتجارية.");

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center pt-[120px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/about-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-primary/70" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">من نحن</h1>
          <p className="text-primary-foreground/80 font-arabic max-w-2xl mx-auto">
            نحن في مجال الاستثمار العقاري واحدة من الشركات الرائدة في السوق المصري. نبني المستقبل بخبرة تمتد لأكثر من 20 عاماً في مصر، حيث نتخصص في إنشاء وحدات متعددة الاستخدامات لعملائنا.
          </p>
        </motion.div>
      </section>

      {/* About Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-muted-foreground font-arabic leading-relaxed text-lg text-center mb-6">
            نحن لسنا مجرد مطور عقاري، بل نمتد بخبرة تمتد لأكثر من 20 عاماً في مصر، حيث نتخصص في إنشاء وحدات متعددة الاستخدامات لعملائنا، ونجاح شركائنا في الاستثمار المستدام.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-muted-foreground font-arabic leading-relaxed text-lg text-center">
            لقد ركزنا جهودنا منذ انطلاقنا في الشروق، في منطقة شرق القاهرة، حيث نقدم مشاريع عقارية متكاملة تخدم قطاعات التجزئة والإدارة والطب.
          </motion.p>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="py-12 md:py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-background p-8 rounded-2xl border border-border/50 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Eye size={24} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">رؤيتنا</h3>
              <p className="text-muted-foreground font-arabic">
                نبني مستقبلًا عقاريًا مبتكرًا في مصر والشرق الأوسط.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-background p-8 rounded-2xl border border-border/50 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Target size={24} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">مهمتنا</h3>
              <p className="text-muted-foreground font-arabic">
                هدفنا توفير فرص استثمارية مثالية عبر منتجات عقارية متطورة وإدارة احترافية تضع ثقتكم في المقام الأول.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12">
            لماذا تختار "أسواق" كشريك في استثمارك العقاري؟
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {whyChoose.map((item, i) => (
              <motion.div key={item.text} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-4 p-5 bg-cream rounded-2xl border border-border/50 hover:border-accent/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-in-out text-right">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="font-display text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-2"><AnimatedCounter value={stat.value} /></div>
                <div className="text-primary-foreground/70 font-arabic text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="امنح استثمارك الثقة التي يستحقها مع مطور عقاري موثوق"
        subtitle="شارك مع أسواق للتطوير العقاري للحصول على فرص عقارية متميزة في أكثر المواقع حيوية في مصر."
        buttonText="احجز وحدتك الآن"
        buttonLink="/ar/contact"
      />
    </Layout>
  );
};

export default AboutAr;

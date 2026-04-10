import { motion } from "framer-motion";
import { CheckCircle2, Eye, Target, Heart, Award, Clock, Building2 } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import useSEO from "@/hooks/useSEO";
import AnimatedCounter from "@/components/AnimatedCounter";

const whyChoose = [
  { icon: Award, text: "خبرة عقارية تمتد لأكثر من 20 عاماً في مجال الاستثمار العقاري في مصر" },
  { icon: Building2, text: "أكثر من 15 مشروعاً ناجحاً وبصمة قوية ومشاريع عقارية متكاملة" },
  { icon: Heart, text: "أكثر من 400 عميل واثق بنا، نفتخر ببناء علاقات مستدامة مع شركائنا" },
  { icon: Target, text: "استثمارات تتخطى 3 مليارات جنيه مصري تضمن استمرارية وتطور مشاريعنا" },
  { icon: Clock, text: "أعمال سابقة وتصديق بالتسليم قبل الموعد بأعلى معايير الانضباط" },
  { icon: CheckCircle2, text: "إدارة وتشغيل مباشر بواسطة شركة أسواق لضمان استدامة قيمة وحداتك" },
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
      {/* Hero — clean cinematic video, no text overlay */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/about-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to top, hsl(222 47% 5% / 0.6) 0%, transparent 50%)'
        }} />
      </section>

      {/* Intro — editorial split layout */}
      <section className="py-14 md:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Right column — title + stats (RTL) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 lg:sticky lg:top-32"
            >
              <p className="text-primary-foreground/40 font-arabic font-semibold tracking-[0.15em] text-[10px] mb-4">قصتنا</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-primary-foreground leading-[1.15] mb-6">
                من نحن
              </h1>
              <div className="w-12 h-px bg-primary-foreground/15 mb-6" />
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: "+20", label: "سنة خبرة" },
                  { val: "+15", label: "مشروع ناجح" },
                  { val: "+3B", label: "جنيه استثمارات" },
                  { val: "+400", label: "عميل راضٍ" },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                    className="p-4 rounded-xl border border-primary-foreground/[0.07] bg-primary-foreground/[0.03]"
                  >
                    <span className="font-['Montserrat'] text-2xl font-extrabold text-primary-foreground block mb-0.5">{s.val}</span>
                    <span className="text-primary-foreground/40 text-[11px] font-arabic">{s.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Left column — body text (RTL) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-7 space-y-8"
            >
              <p className="text-primary-foreground/60 font-arabic text-[17px] md:text-[18px] leading-[2] first-letter:text-4xl first-letter:font-display first-letter:font-bold first-letter:text-primary-foreground first-letter:float-right first-letter:ml-2 first-letter:mt-1">
                نحن في مجال الاستثمار العقاري واحدة من الشركات الرائدة في السوق المصري. نبني المستقبل بخبرة تمتد لأكثر من 20 عاماً في مصر، حيث نتخصص في إنشاء وحدات متعددة الاستخدامات لعملائنا.
              </p>
              <div className="w-full h-px bg-primary-foreground/[0.06]" />
              <p className="text-primary-foreground/45 font-arabic text-[15px] leading-[2]">
                نحن لسنا مجرد مطور عقاري، بل نمتد بخبرة تمتد لأكثر من 20 عاماً في مصر، حيث نتخصص في إنشاء وحدات متعددة الاستخدامات لعملائنا، ونجاح شركائنا في الاستثمار المستدام.
              </p>
              <p className="text-primary-foreground/45 font-arabic text-[15px] leading-[2]">
                لقد ركزنا جهودنا منذ انطلاقنا في الشروق، في منطقة شرق القاهرة، حيث نقدم مشاريع عقارية متكاملة تخدم قطاعات التجزئة والإدارة والطب.
              </p>
              <div className="relative pr-5 border-r-2 border-accent/30">
                <p className="font-display text-primary-foreground/70 text-[16px] md:text-[17px] italic leading-relaxed">
                  "بناء التميز ليس مجرد هدف — إنه إرثنا."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="py-12 md:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl border border-border/30 p-8 md:p-10"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <Eye size={24} className="text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">رؤيتنا</h3>
              <p className="text-muted-foreground font-arabic leading-relaxed text-[15px]">
                نبني مستقبلًا عقاريًا مبتكرًا في مصر والشرق الأوسط.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl border border-border/30 p-8 md:p-10"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <Target size={24} className="text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">مهمتنا</h3>
              <p className="text-muted-foreground font-arabic leading-relaxed text-[15px]">
                هدفنا توفير فرص استثمارية مثالية عبر منتجات عقارية متطورة وإدارة احترافية تضع ثقتكم في المقام الأول.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-18 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="section-label mb-3">نقاط قوتنا</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              لماذا تختار "أسواق" كشريك في استثمارك العقاري؟
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {whyChoose.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="flex items-center gap-4 p-5 bg-card rounded-xl text-right border border-border/30 hover:border-accent/15 hover:-translate-y-1 transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="shrink-0 w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                  <item.icon size={18} className="text-accent" />
                </div>
                <span className="font-arabic font-medium text-foreground text-sm">{item.text}</span>
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

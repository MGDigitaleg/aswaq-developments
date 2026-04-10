import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Calculator, Building2, ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";
import ROICalculator from "@/components/ROICalculator";
import useSEO from "@/hooks/useSEO";

const benefits = [
  { icon: TrendingUp, title: "إمكانات عائد عالية", desc: "طلب إيجاري قوي وتقدير مستمر للعقارات عبر مشاريع أسواق." },
  { icon: Building2, title: "أنواع وحدات متنوعة", desc: "تجارية وإدارية وطبية — من 29 إلى 300 م² عبر أربعة مولات." },
  { icon: ShieldCheck, title: "خطط سداد مرنة", desc: "هياكل دفع مصممة للمستثمرين وأصحاب الأعمال بكل المستويات." },
  { icon: Calculator, title: "قرارات مبنية على بيانات", desc: "استخدم حاسبتنا لنمذجة العوائد ومقارنة السيناريوهات وتخطيط استثمارك." },
];

const ROICalculatorPageAr = () => {
  useSEO(
    "حاسبة العائد على الاستثمار | أسواق للتطوير العقاري",
    "احسب عائد استثمارك للوحدات التجارية والإدارية والطبية في الشروق مع حاسبة أسواق التفاعلية."
  );

  return (
    <Layout>
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 md:pt-40 pb-12 md:pb-16 text-center relative z-10 min-h-[360px] flex flex-col justify-end">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 justify-center mb-5">
              <div className="w-6 h-px bg-primary-foreground/15" />
              <p className="text-[10px] font-semibold tracking-[0.15em] font-arabic text-primary-foreground/40">أداة استثمارية</p>
              <div className="w-6 h-px bg-primary-foreground/15" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-5 leading-tight max-w-3xl mx-auto">
              حاسبة العائد على الاستثمار
            </h1>
            <p className="text-primary-foreground/50 font-arabic max-w-xl mx-auto text-[15px] leading-relaxed">
              نمذج عوائد استثمارك، قارن السيناريوهات، واتخذ قرارات عقارية مبنية على بيانات.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-18 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <ROICalculator isArabic wide />
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">لماذا تستثمر مع أسواق</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b, i) => (
              <motion.div key={b.title} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }}
                className="p-5 bg-card rounded-xl border border-border/30 text-center" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <b.icon size={18} className="text-accent" />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-muted-foreground font-arabic text-[12.5px] leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-18 bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">مستعد للاستثمار؟</h2>
            <p className="text-primary-foreground/50 font-arabic text-[15px] leading-relaxed mb-8 max-w-xl mx-auto">
              تصفح الوحدات المتاحة واحجز استثمارك القادم في أسرع الوجهات التجارية نمواً في الشروق.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/ar/units" className="btn-premium px-8 py-3 text-[12.5px] rounded-lg font-arabic inline-flex items-center gap-2 group">
                تصفح الوحدات
                <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
              </Link>
              <Link to="/ar/contact" className="btn-outline-light px-8 py-3 text-[12.5px] rounded-lg font-arabic">
                تواصل مع المبيعات
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ROICalculatorPageAr;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Users, Building2, ShieldCheck, ArrowLeft, BarChart3, Home, Landmark, GraduationCap, HeartPulse, ShoppingCart } from "lucide-react";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import AnimatedCounter from "@/components/AnimatedCounter";
import useSEO from "@/hooks/useSEO";

const marketStats = [
  { value: "1M+", label: "سكان مدينة الشروق", icon: Users },
  { value: "35%", label: "نمو سكاني (5 سنوات)", icon: TrendingUp },
  { value: "25%", label: "متوسط ارتفاع قيمة العقارات سنوياً", icon: BarChart3 },
  { value: "15+", label: "مشروع ناجح لأسواق", icon: Building2 },
];

const locationAdvantages = [
  { icon: MapPin, title: "موقع استراتيجي بشرق القاهرة", description: "تقع مدينة الشروق عند تقاطع الطرق الرئيسية بما في ذلك طريق القاهرة-السويس والطريق الدائري، مما يوفر وصولاً لا مثيل له إلى القاهرة الكبرى." },
  { icon: Home, title: "قاعدة سكانية سريعة النمو", description: "مع أكثر من مليون ساكن وتوسع مستمر، توفر مدينة الشروق قاعدة استهلاكية جاهزة لكل مشروع تجاري." },
  { icon: GraduationCap, title: "مركز تعليمي", description: "موطن الجامعة البريطانية في مصر وأكاديمية الشروق والعديد من المدارس الدولية — مما يدفع حركة المرور والطلب المستمر." },
  { icon: HeartPulse, title: "بنية تحتية صحية", description: "المستشفيات والمراكز الطبية الكبرى تخلق طلباً على الوحدات الطبية والخدمات الصحية المجاورة." },
  { icon: ShoppingCart, title: "طلب تجاري متزايد", description: "النمو السكاني تجاوز العرض التجاري، مما يخلق طلباً قوياً على التجزئة والمطاعم والخدمات." },
  { icon: Landmark, title: "تطوير مدعوم حكومياً", description: "تستفيد مدينة الشروق من استثمارات البنية التحتية الحكومية بما في ذلك الطرق والمرافق وشبكات النقل العام." },
];

const investmentReasons = [
  { title: "عوائد إيجارية مرتفعة", description: "العقارات التجارية في مدينة الشروق تحقق عوائد إيجارية سنوية تتراوح بين 8-12%، متفوقة بشكل كبير على الودائع البنكية التقليدية.", stat: "8-12%", statLabel: "عائد إيجاري" },
  { title: "ارتفاع قيمة رأس المال", description: "ارتفعت قيم العقارات في ممرات النمو بشرق القاهرة بنسبة 20-30% سنوياً خلال السنوات الخمس الماضية.", stat: "25%+", statLabel: "نمو سنوي" },
  { title: "معدلات إشغال عالية", description: "المشاريع متعددة الاستخدامات في المناطق السكنية عالية الكثافة تحافظ على معدلات إشغال تتجاوز 90%.", stat: "90%+", statLabel: "إشغال" },
  { title: "نقاط دخول مرنة", description: "مع وحدات تبدأ من 30 م² وخطط سداد مرنة، يمكن للمستثمرين الدخول في سوق العقارات التجارية برأس مال معقول.", stat: "30م²", statLabel: "الحد الأدنى" },
];

const faqs = [
  { question: "لماذا تعتبر مدينة الشروق موقعاً استثمارياً جيداً؟", answer: "مدينة الشروق هي واحدة من أسرع المناطق نمواً في شرق القاهرة مع أكثر من مليون ساكن، وبنية تحتية قوية، وقرب من الجامعات والمستشفيات الكبرى، ونمو سكاني مستمر يدفع الطلب التجاري." },
  { question: "ما نوع العوائد التي يمكن توقعها من الاستثمار في الشروق؟", answer: "العقارات التجارية في مدينة الشروق تحقق عادة عوائد إيجارية سنوية تتراوح بين 8-12%، مع ارتفاع قيم العقارات بنسبة 20-30% سنوياً في السنوات الأخيرة." },
  { question: "هل العقارات التجارية أكثر أماناً من السكنية؟", answer: "غالباً ما توفر العقارات التجارية عوائد أكثر استقراراً وأعلى من الاستثمارات السكنية، خاصة في المشاريع متعددة الاستخدامات ذات قاعدة مستأجرين متنوعة تقلل مخاطر الشغور." },
  { question: "ما الذي يميز مشاريع أسواق؟", answer: "تركز أسواق للتطوير العقاري حصرياً على المشاريع الاستراتيجية متعددة الاستخدامات في المناطق عالية الطلب. مع أكثر من 20 عاماً من الخبرة و15+ مشروعاً ناجحاً." },
  { question: "هل يمكنني الاستثمار بخطة سداد مرنة؟", answer: "نعم. توفر أسواق للتطوير العقاري خطط سداد مرنة تتيح للمستثمرين توزيع استثماراتهم على فترات زمنية مع تأمين وحدات تجارية متميزة." },
];

const WhyInvestShoroukAr = () => {
  useSEO(
    "لماذا تستثمر في مدينة الشروق | الاستثمار العقاري في مصر",
    "اكتشف لماذا تعتبر مدينة الشروق الوجهة الأولى للاستثمار العقاري في مصر. استكشف بيانات السوق وإحصائيات النمو ومزايا الموقع."
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary pt-40 pb-16 min-h-[450px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary-foreground/60 font-arabic font-medium tracking-widest uppercase text-sm mb-3">دليل الاستثمار</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-6">
              لماذا تستثمر في مدينة الشروق
            </h1>
            <p className="text-primary-foreground/70 font-arabic max-w-3xl mx-auto">
              برزت مدينة الشروق كواحدة من أكثر وجهات الاستثمار العقاري الواعدة في مصر. مع نمو سكاني سريع وبنية تحتية استراتيجية وطلب تجاري متزايد، لم تكن الفرصة أفضل من الآن للمستثمرين.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Market Stats */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="mx-auto mb-6 w-[60px] h-[2px] bg-foreground" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">مدينة الشروق بالأرقام</h2>
            <p className="text-muted-foreground font-arabic max-w-2xl mx-auto">مؤشرات السوق الرئيسية التي تجعل مدينة الشروق وجهة استثمارية مميزة.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {marketStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group text-center p-6 md:p-8 rounded-xl bg-background border border-[#0A1128]/5 hover:-translate-y-2 hover:border-[#c89c3c] hover:shadow-[0_10px_30px_rgba(200,156,60,0.15)] transition-all duration-500 ease-out"
                style={{ boxShadow: '0 4px 20px -4px rgba(10,17,40,0.1)' }}
              >
                <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={22} className="text-primary" />
                </div>
                <div className="font-['Montserrat'] text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-2">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-sm text-muted-foreground font-arabic">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Advantages */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="mx-auto mb-6 w-[60px] h-[2px] bg-foreground" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">مزايا الموقع</h2>
            <p className="text-muted-foreground font-arabic max-w-2xl mx-auto">لماذا تعتبر مدينة الشروق الموقع المثالي للاستثمار العقاري التجاري.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locationAdvantages.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-background rounded-xl p-8 border border-border/30 hover:border-secondary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <item.icon size={26} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground font-arabic text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Returns */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="mx-auto mb-6 w-[60px] h-[2px] bg-foreground" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">عوائد استثمارية قوية</h2>
            <p className="text-muted-foreground font-arabic max-w-2xl mx-auto">أسباب مدعومة بالبيانات لتفوق العقارات التجارية في مدينة الشروق.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {investmentReasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 p-8 rounded-xl bg-cream border border-border/30"
              >
                <div className="flex-shrink-0 text-center">
                  <div className="font-['Montserrat'] text-2xl md:text-3xl font-extrabold text-primary">{reason.stat}</div>
                  <div className="text-xs text-muted-foreground font-arabic mt-1">{reason.statLabel}</div>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{reason.title}</h3>
                  <p className="text-muted-foreground font-arabic text-sm leading-relaxed">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ASWAQ */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="mx-auto mb-6 w-[60px] h-[2px] bg-foreground" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">لماذا تستثمر مع أسواق للتطوير العقاري</h2>
            <p className="text-muted-foreground font-arabic max-w-2xl mx-auto">مدعومة بأكثر من 20 عاماً من الخبرة ومحفظة تضم أكثر من 15 مشروعاً ناجحاً.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "سجل حافل بالنجاح", description: "أكثر من 20 عاماً من تسليم المشاريع التجارية الناجحة عبر شرق القاهرة بمحفظة تقدر بأكثر من 3 مليار جنيه مصري." },
              { icon: MapPin, title: "مواقع استراتيجية", description: "كل مشروع من مشاريع أسواق يقع في مناطق سكنية عالية الكثافة لتعظيم حركة المرور والرؤية والجدوى التجارية." },
              { icon: Building2, title: "إدارة احترافية", description: "من التخطيط إلى التنفيذ إلى إدارة العقارات، توفر أسواق دعماً احترافياً شاملاً لكل مشروع." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background rounded-xl p-8 border border-border/30 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <item.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground font-arabic text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title="تسأل، ونحن نجيب" />
      <CTASection
        title="ابدأ رحلتك الاستثمارية"
        subtitle="استكشف محفظة أسواق من الوحدات التجارية والإدارية والطبية في أفضل مواقع مدينة الشروق."
        buttonText="استكشف الوحدات المتاحة"
        buttonLink="/ar/units"
      />
    </Layout>
  );
};

export default WhyInvestShoroukAr;

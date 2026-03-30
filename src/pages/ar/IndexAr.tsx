import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, TrendingUp, Layers, ShieldCheck, Building2, ChevronLeft, ArrowLeft } from "lucide-react";
import { useLatestNews } from "@/hooks/useNewsArticles";
import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import useSEO from "@/hooks/useSEO";
import AnimatedCounter from "@/components/AnimatedCounter";
import heroBg from "@/assets/hero-building.webp";
import heroMercado from "@/assets/hero-mercado.webp";
import heroArena from "@/assets/hero-arena.webp";
import heroSolaria from "@/assets/hero-solaria.webp";
import cityhubImg from "@/assets/cityhub-mall.webp";

const heroSlides = [heroBg, heroMercado, heroArena, heroSolaria];
import mercadoImg from "@/assets/mercado-mall.webp";
import arenaImg from "@/assets/arena-mall.webp";
import solariaImg from "@/assets/solaria-mall.webp";

const stats = [
  { value: "20+", label: "سنوات من الخبرة" },
  { value: "15+", label: "مشروع ناجح" },
  { value: "400+", label: "عميل راضٍ" },
  { value: "3+", label: "مليار جنيه استثمارات" },
];

const projects = [
  {
    name: "سيتي هب مول",
    image: cityhubImg,
    description: "بموقع متميز في قلب منطقة الشروق أمام نادي سيتي كلوب. المول يوفر وحدات للإيجار وعقارات استثنائية للبيع.",
  },
  {
    name: "ميركادو مول",
    image: mercadoImg,
    description: "أكبر مول تجاري في مدينة الشروق، يمتد على ثلاث طوابق ويقدم مجموعة واسعة من الوحدات التجارية. تبدأ مساحاته من 24 متر مربع للإيجار.",
  },
  {
    name: "أرينا مول",
    image: arenaImg,
    description: "مول حديث بموقع استراتيجي أمام الجامعة، يوفر مجموعة واسعة من الوحدات التجارية والطبية والإدارية.",
  },
  {
    name: "سولاريا مول",
    image: solariaImg,
    description: "تحفة معمارية تغطي مساحة 6,400 متر مربع، يقدم أفضل المنشآت الطبية والتجزئة بالقرب من موقعه الاستراتيجي.",
  },
];

const whyInvest = [
  { icon: MapPin, text: "مواقع استراتيجية بشرق القاهرة" },
  { icon: Layers, text: "خطط سداد مرنة" },
  { icon: Building2, text: "تنوع في مساحات الوحدات" },
  { icon: TrendingUp, text: "عائد استثماري مرتفع" },
  { icon: ShieldCheck, text: "إدارة عقارية احترافية" },
];

const faqs = [
  {
    question: "ما أنواع العقارات التي تقدمها شركة أسواق للتطوير العقاري؟",
    answer: "تقدم شركة أسواق مجموعة متنوعة من خيارات العقارات التجارية، بما في ذلك وحدات تجارية للبيع، وحدات للإيجار، مساحات إدارية، وعيادات طبية تقع داخل مولات ووجهات تجارية استراتيجية. نصمم عقاراتنا لخدمة الشركات والمستثمرين والمستأجرين الباحثين عن مساحات عالية الجودة في مناطق ذات كثافة زوار عالية.",
  },
  {
    question: "كيف يمكنني شراء وحدة أو عقار في مدينة الشروق؟",
    answer: "لشراء عقار في مدينة الشروق، عليك أولاً تحديد نوع العقار الذي يناسب احتياجاتك، ثم زيارة موقعنا الإلكتروني aswaq-egypt.com لاستكشاف المواقع والأنواع التي نقدمها، وبعد ذلك يمكنك التواصل معنا لطلب وحدتك الخاصة.",
  },
  {
    question: "أين يمكنني شراء وحدة في مدينة الشروق؟",
    answer: "إذا كنت ترغب في شراء وحدة في مدينة الشروق، فإن شركة أسواق للتطوير العقاري توفر مجموعة من المساحات التجارية ومساحات التجزئة للبيع عبر وجهاتها الأربع الكبرى: سولاريا مول، أرينا مول، ميركادو مول، وسيتي هب مول. وتتراوح مساحات هذه الوحدات من 24 م² وتصل إلى 300 م²، مما يوفر خيارات مرنة للجميع.",
  },
  {
    question: "كم عدد المولات التي تمتلك فيها شركة أسواق وحدات متاحة؟",
    answer: "تمتلك شركة أسواق للتطوير العقاري حالياً وحدات في أربعة مولات رئيسية بمدينة الشروق: سولاريا مول، أرينا مول، ميركادو مول، وسيتي هب مول. يستهدف كل مول جمهوراً مختلفاً من المتسوقين وطالبي الخدمات لمساعدة الأعمال على الازدهار والنمو.",
  },
  {
    question: "ما هي المساحات المعتادة للوحدات المتاحة؟",
    answer: "تتراوح مساحات وحداتنا من 30 م² إلى 300 م²، مما يوفر مرونة كافية للمحلات الصغيرة، والمنافذ متوسطة الحجم، والمتاجر الكبرى. سواء كنت تبدأ عملاً جديداً أو تتوسع في نشاطك الحالي، فلدينا الوحدات التي تناسب احتياجاتك.",
  },
  {
    question: "هل الوحدات التجارية متاحة للبيع والإيجار؟",
    answer: "نعم، توفر شركة أسواق للتطوير العقاري كلاً من الوحدات التجارية للبيع والوحدات للإيجار في جميع مشاريعنا (المولات الأربعة). يمكنك اختيار النظام الذي يناسب قدرتك الاستثمارية واستراتيجية عملك.",
  },
  {
    question: "ما أنواع الأنشطة التجارية التي يمكن تشغيلها في مولات أسواق؟",
    answer: "وحداتنا مناسبة لمجموعة واسعة من الأنشطة، مثل محلات التجزئة، الكافيهات، المطاعم، مراكز الخدمة، العيادات الطبية، المكاتب، وغيرها. توفر بيئة كل مول دعماً مخصصاً لنشاط تجاري معين.",
  },
  {
    question: "كيف يمكنني الاستفسار عن الأسعار؟",
    answer: "يمكنك التواصل مباشرة مع شركة أسواق للتطوير العقاري عبر صفحة \"اتصل بنا\"، أو تقديم نموذج طلب تفاصيل، أو الاتصال بفريق المبيعات لدينا. سنوفر لك أحدث البيانات حول الوحدات المتاحة، تفاصيل الأسعار، وتوصيات مخصصة بناءً على أهداف عملك.",
  },
  {
    question: "هل توجد خطط سداد مرنة لشراء الوحدات؟",
    answer: "نعم، توفر شركة أسواق خطط سداد وتقسيط مرنة للمشترين الراغبين في تملك وحدة. ذلك يتيح للمستثمرين وأصحاب الأعمال إدارة مدفوعاتهم على فترات زمنية مع تأمين مساحة تجارية أو إدارية أو طبية متميزة.",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const IndexAr = () => {
  useSEO("أسواق للتطوير العقاري | مطور عقاري في مصر", "أسواق للتطوير العقاري تقدم وحدات متميزة للإيجار وعقارات للبيع في مصر، مع عقارات متعددة الاستخدامات في مدينة الشروق وخطط سداد مرنة.");
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const { articles: latestNews } = useLatestNews("ar", 3);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[700px] flex items-center justify-center pt-[120px] overflow-hidden" style={{ height: 'calc(100vh + 100px)', maxHeight: '1200px' }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide]}
              alt=""
              className="w-full h-full object-cover object-center"
              fetchPriority={currentSlide === 0 ? "high" : "auto"}
              loading={currentSlide === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-primary/60" />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-accent w-8" : "bg-primary-foreground/50 hover:bg-primary-foreground/80"}`}
              aria-label={`الانتقال إلى الشريحة ${i + 1}`}
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-3xl"
        >
          <p className="text-primary-foreground/60 font-arabic font-medium tracking-widest text-sm mb-4">أسواق للتطوير العقاري</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            مستقبل التطوير
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ar/projects" className="bg-[#141D3E] text-primary-foreground px-8 py-3 font-semibold rounded hover:bg-accent transition-colors font-arabic">
              استكشف المشاريع
            </Link>
            <Link to="/ar/about" className="border border-primary-foreground/40 text-primary-foreground px-8 py-3 font-semibold rounded hover:bg-primary-foreground/10 transition-colors font-arabic">
              اعرف المزيد
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats + About */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              أسواق للتطوير العقاري، المطور العقاري الموثوق في مصر
            </motion.h2>
            <p className="text-muted-foreground max-w-3xl mx-auto font-arabic">
              تعد شركة أسواق للتطوير العقاري مطوراً عقارياً يتطلع للمستقبل، متخصصاً في المشاريع التجارية والإدارية والطبية في منطقة شرق القاهرة. نحن نركز على إنشاء بيئات تجارية متكاملة تلبي احتياجات الأعمال اليوم مع توفير إمكانات استثمارية قوية للمستقبل.
            </p>
            <p className="text-muted-foreground max-w-3xl mx-auto font-arabic mt-4">
              سواء كنت تبحث عن عقار للبيع، أو وحدة للإيجار، أو مشروع متعدد الاستخدامات، فإن "أسواق" تقدم مشاريع في مواقع استراتيجية مدعومة بتخطيط ذكي وتصميم يواكب احتياجات السوق.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 rounded-lg bg-cream">
                <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-2"><AnimatedCounter value={stat.value} /></div>
                <div className="text-sm text-muted-foreground font-arabic">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2 variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            مشاريعنا في أسواق للتطوير العقاري
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, i) => (
              <motion.div key={project.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to="/ar/projects" className="group block">
                  <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-display text-lg font-bold text-primary-foreground">{project.name}</h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground font-arabic line-clamp-2">{project.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Invest */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.h2 variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
            لماذا تستثمر مع أسواق للتطوير العقاري
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {whyInvest.map((item, i) => (
              <motion.div key={item.text} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-cream flex items-center justify-center">
                  <item.icon size={24} className="text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground font-arabic">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Units CTA Banner */}
      <section className="relative py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              الوحدات تُباع بسرعة، لا تفوّت الفرصة!
            </h2>
            <p className="text-primary-foreground/70 font-arabic max-w-2xl mx-auto mb-4">
              تصفح وحداتنا المتاحة واختر ما يناسب خطتك التجارية أو الاستثمارية.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {[
                { label: "عقارات متعددة الاستخدامات", href: "/ar/units" },
                { label: "وحدات تجارية", href: "/ar/units/commercial-for-sale" },
                { label: "وحدات إدارية", href: "/ar/units/administrative-for-sale" },
                { label: "وحدات طبية", href: "/ar/units/medical-for-sale" },
              ].map((tag) => (
                <Link key={tag.label} to={tag.href} className="border border-primary-foreground/20 text-primary-foreground/80 px-4 py-1.5 rounded-full text-sm font-arabic hover:bg-primary-foreground/10 transition-colors">
                  {tag.label}
                </Link>
              ))}
            </div>
            <Link to="/ar/units" className="inline-block bg-accent text-accent-foreground px-8 py-3 font-semibold rounded hover:bg-gold-light transition-colors font-arabic">
              احجز وحدتك
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">آخر الأخبار</h2>
            <Link to="/ar/news" className="text-primary font-semibold font-arabic text-sm inline-flex items-center gap-1 hover:underline">
              عرض الكل <ChevronLeft size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((article, i) => (
              <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={`/ar/news/${article.id}`} className="group block bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  {article.image && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground mt-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-arabic mt-2 line-clamp-2">{article.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-primary mt-3 font-arabic font-medium">
                      اقرأ المزيد <ChevronLeft size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection faqs={faqs} title="تسأل، ونحن نجيب" />

      {/* Bottom CTA */}
      <CTASection
        title="ابدأ خطوتك العقارية القادمة مع أسواق للتطوير العقاري"
        subtitle="تبحث عن مطور عقاري موثوق يقدم عقارات متميزة للبيع أو الوحدة المناسبة للإيجار؟"
        buttonText="اطلب تفاصيل الوحدة"
        buttonLink="/ar/units"
      />
    </Layout>
  );
};

export default IndexAr;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Layers, ShieldCheck, Building2, ChevronLeft } from "lucide-react";
import { newsArticles } from "@/data/newsData";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import useSEO from "@/hooks/useSEO";
import heroBg from "@/assets/hero-building.jpg";
import cityhubImg from "@/assets/cityhub-mall.jpg";
import mercadoImg from "@/assets/mercado-mall.jpg";
import arenaImg from "@/assets/arena-mall.jpg";
import solariaImg from "@/assets/solaria-mall.jpg";

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
    description: "مشروع تجاري رائد يقع في موقع استراتيجي متميز بمدينة الشروق.",
  },
  {
    name: "ميركادو مول",
    image: mercadoImg,
    description: "أكبر مول تجاري متكامل الخدمات في الشروق، يمتد على ثلاثة طوابق.",
  },
  {
    name: "أرينا مول",
    image: arenaImg,
    description: "مول خدمي متعدد الاستخدامات يضم وحدات تجارية وإدارية وطبية.",
  },
  {
    name: "سولاريا مول",
    image: solariaImg,
    description: "تحفة معمارية تمتد على 6,400 م² تضم وحدات تجارية وطبية راقية.",
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
    question: "ما أنواع العقارات التي تقدمها أسواق للتطوير العقاري؟",
    answer: "تقدم أسواق للتطوير العقاري مجموعة متنوعة من الخيارات العقارية التجارية، بما في ذلك وحدات تجارية للبيع، وحدات للإيجار، مساحات إدارية، ووحدات طبية في مواقع استراتيجية.",
  },
  {
    question: "كيف يمكنني شراء وحدة في مدينة الشروق؟",
    answer: "حدد أولاً نوع العقار المناسب لاحتياجاتك، تعرف على الأنواع والمواقع التي نقدمها، ثم تواصل معنا لحجز وحدتك.",
  },
  {
    question: "أين يمكنني شراء وحدة في مدينة الشروق؟",
    answer: "تقدم أسواق للتطوير العقاري مجموعة من المساحات التجارية والتجزئة للبيع عبر أربعة مولات رئيسية: سولاريا مول، أرينا مول، ميركادو مول، وسيتي هب مول. تتراوح المساحات من 30 م² حتى 300 م².",
  },
  {
    question: "كم عدد المولات التي تمتلك فيها أسواق وحدات؟",
    answer: "تمتلك أسواق حالياً وحدات في أربعة مولات رئيسية بمدينة الشروق: سولاريا مول، أرينا مول، ميركادو مول، وسيتي هب مول.",
  },
  {
    question: "ما هي المساحات النموذجية للوحدات المتاحة؟",
    answer: "تتراوح مساحات وحداتنا من 30 م² حتى 300 م²، مما يوفر مرونة للمحلات الصغيرة والمتوسطة والكبيرة.",
  },
  {
    question: "هل الوحدات التجارية متاحة للبيع والإيجار؟",
    answer: "نعم. تقدم أسواق للتطوير العقاري وحدات تجارية للبيع ووحدات للإيجار عبر مولاتنا الأربعة.",
  },
  {
    question: "هل هناك خطط سداد مرنة لشراء الوحدات؟",
    answer: "نعم. تقدم أسواق خطط سداد مرنة للمشترين الراغبين في تملك وحدة، مما يتيح للمستثمرين وأصحاب الأعمال إدارة المدفوعات على مدار الوقت.",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const IndexAr = () => {
  useSEO("أسواق للتطوير العقاري | مطور عقاري في مصر", "أسواق للتطوير العقاري تقدم وحدات متميزة للإيجار وعقارات للبيع في مصر، مع عقارات متعددة الاستخدامات في مدينة الشروق وخطط سداد مرنة.");

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 bg-primary/60" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-3xl"
        >
          <p className="text-accent font-arabic font-medium tracking-widest text-sm mb-4">أسواق للتطوير العقاري</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            نُعيد تعريف<br />
            <span className="italic text-accent">التميز العقاري</span>
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
              أسواق للتطوير العقاري شركة متطلعة متخصصة في المشاريع التجارية والإدارية والطبية في شرق القاهرة.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-6 rounded-lg bg-cream">
                <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
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
              {["عقارات متعددة الاستخدامات", "وحدات تجارية", "وحدات إدارية", "وحدات طبية"].map((tag) => (
                <span key={tag} className="border border-primary-foreground/20 text-primary-foreground/80 px-4 py-1.5 rounded-full text-sm font-arabic">
                  {tag}
                </span>
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
            <Link to="/ar/news" className="text-accent font-semibold font-arabic text-sm inline-flex items-center gap-1 hover:underline">
              عرض الكل <ChevronLeft size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsArticles.slice(0, 3).map((article, i) => (
              <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={`/ar/news/${article.id}`} className="group block bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-muted-foreground font-arabic">{article.date}</p>
                    <h3 className="font-display text-lg font-semibold text-foreground mt-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-arabic mt-2 line-clamp-2">{article.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-accent mt-3 font-arabic font-medium">
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

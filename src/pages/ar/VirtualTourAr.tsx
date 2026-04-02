import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Building2, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import useSEO from "@/hooks/useSEO";

const mallTours = [
  {
    id: "solaria",
    name: "سولاريا مول",
    link: "/ar/projects/solaria-mall",
    description: "تحفة معمارية تغطي 6,400 م² مع مرافق تجزئة وطبية راقية. استمتع بجولة افتراضية في تصميم سولاريا مول العصري وتشطيباته المتميزة.",
    featured: "pnchRd-AAwg",
    videos: ["5zo6Nh69DoU", "21h59Aidbss", "lDb2srq3prQ", "9xWD4rjaFz4", "PtXQ7ekGibo"],
  },
  {
    id: "arena",
    name: "أرينا مول",
    link: "/ar/projects/arena-mall",
    description: "مول حديث متعدد الاستخدامات يوفر وحدات تجارية وإدارية وطبية. استكشف موقع أرينا مول الاستراتيجي ومساحاته المتنوعة.",
    featured: "buh9BJmWn9A",
    videos: ["unR4JKFXAXE", "6YWp0lGYC3Q", "JFqUABOPOk8", "kVdnKIBWN2A"],
  },
  {
    id: "mercado",
    name: "ميركادو مول",
    link: "/ar/projects/mercado-mall",
    description: "أكبر مول تجاري متكامل الخدمات في الشروق، يمتد على ثلاث طوابق. شاهد حجم وإمكانيات ميركادو مول من خلال جولاتنا المصورة.",
    featured: "fHgVO2698Jw",
    videos: ["_QHKwyMozZw", "hUGvrHMnmoY"],
  },
  {
    id: "cityhub",
    name: "سيتي هب مول",
    link: "/ar/projects/city-hub-mall",
    description: "مشروع تجاري متميز يقع في موقع استراتيجي أمام نادي سيتي كلوب في مدينة الشروق. اكتشف الموقع المتميز والبنية التحتية الحديثة.",
    featured: "9pl-SiE0VVk",
    videos: ["868YMiO0LJc", "82mVbp9nB6U", "VIvmPBqrLnk"],
  },
];

const VirtualTourAr = () => {
  useSEO(
    "جولات افتراضية | استكشف مشاريع أسواق للمولات",
    "قم بجولة افتراضية في مشاريع أسواق للتطوير العقاري بمدينة الشروق. استكشف سولاريا وأرينا وميركادو وسيتي هب مول من خلال جولات فيديو غامرة."
  );

  const [activeMall, setActiveMall] = useState("solaria");
  const activeTour = mallTours.find((m) => m.id === activeMall)!;

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary pt-40 pb-16 min-h-[450px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary-foreground/60 font-arabic font-medium tracking-widest uppercase text-sm mb-3">جولات افتراضية</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-6">
              استكشف مولاتنا افتراضياً
            </h1>
            <p className="text-primary-foreground/70 font-arabic max-w-3xl mx-auto">
              لا تستطيع الزيارة شخصياً؟ قم بجولة افتراضية غامرة في مشاريع أسواق للتطوير العقاري الأربعة المتميزة. اكتشف الحجم والتصميم والإمكانيات من أي مكان.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mall Selector */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mall tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-primary/10 p-1.5 rounded-full gap-1 flex flex-wrap justify-center">
              {mallTours.map((mall) => (
                <button
                  key={mall.id}
                  onClick={() => setActiveMall(mall.id)}
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold font-arabic transition-all duration-300 ${
                    activeMall === mall.id
                      ? "bg-accent text-accent-foreground shadow-md"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {mall.name}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Video */}
          <motion.div
            key={activeTour.featured}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg border border-border/30 aspect-video max-w-5xl mx-auto">
              <iframe
                src={`https://www.youtube.com/embed/${activeTour.featured}?rel=0`}
                title={`جولة افتراضية في ${activeTour.name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </motion.div>

          {/* Mall description */}
          <motion.div
            key={activeTour.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">{activeTour.name}</h2>
            <p className="text-muted-foreground font-arabic leading-relaxed mb-4">{activeTour.description}</p>
            <Link
              to={activeTour.link}
              className="inline-flex items-center gap-2 text-primary font-arabic font-semibold text-sm hover:gap-3 transition-all duration-300"
            >
              عرض تفاصيل المشروع <ArrowLeft size={14} />
            </Link>
          </motion.div>

          {/* More Videos Grid */}
          {activeTour.videos.length > 0 && (
            <div>
              <h3 className="font-display text-xl font-bold text-foreground text-center mb-8">المزيد من الجولات</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {activeTour.videos.map((videoId, i) => (
                  <motion.div
                    key={videoId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="rounded-xl overflow-hidden shadow-sm border border-border/30 aspect-video hover:shadow-md transition-shadow duration-300"
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                      title={`جولة ${activeTour.name} ${i + 2}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* All Malls Overview */}
      <section className="py-12 md:py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto mb-6 w-[60px] h-[2px] bg-foreground" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">جميع المشاريع</h2>
          <p className="text-muted-foreground font-arabic max-w-2xl mx-auto mb-12">
            كل مول مصمم لخدمة المناطق السكنية عالية الكثافة، مما يضمن طلباً مستمراً على المساحات التجارية.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {mallTours.map((mall, i) => (
              <motion.div
                key={mall.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <button
                  onClick={() => { setActiveMall(mall.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`block w-full p-6 rounded-xl transition-all duration-300 text-center border ${
                    activeMall === mall.id
                      ? "bg-primary text-primary-foreground border-primary shadow-lg"
                      : "bg-background border-border/30 hover:border-secondary/30 hover:shadow-md"
                  }`}
                >
                  <Building2 size={28} className={`mx-auto mb-3 ${activeMall === mall.id ? "text-primary-foreground" : "text-primary"}`} />
                  <p className={`font-display font-bold ${activeMall === mall.id ? "text-primary-foreground" : "text-foreground"}`}>{mall.name}</p>
                  <p className={`text-xs mt-1 font-arabic ${activeMall === mall.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {mall.videos.length + 1} فيديو
                  </p>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="مستعد للزيارة شخصياً؟"
        subtitle="حدد موعد زيارة ميدانية لتجربة مشاريع أسواق المتميزة مباشرة."
        buttonText="تواصل معنا"
        buttonLink="/ar/contact"
      />
    </Layout>
  );
};

export default VirtualTourAr;

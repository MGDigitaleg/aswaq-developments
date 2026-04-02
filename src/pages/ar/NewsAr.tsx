import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { useNewsArticles } from "@/hooks/useNewsArticles";
import heroBuilding from "@/assets/hero-building.webp";
import useSEO from "@/hooks/useSEO";

const NewsAr = () => {
  const { articles, loading } = useNewsArticles("ar");

  useSEO(
    "الأخبار والفعاليات | أسواق للتطوير العقاري",
    "تابع آخر الأخبار والفعاليات من أسواق للتطوير العقاري. اكتشف إطلاق المشاريع والمعارض وفرص الاستثمار في مدينة الشروق."
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[380px] md:min-h-[440px] flex items-end pb-14 md:pb-20 overflow-hidden">
        <img src={heroBuilding} alt="أخبار أسواق للتطوير العقاري" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, hsl(226 76% 6% / 0.4) 0%, hsl(226 76% 6% / 0.75) 100%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-40">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-arabic font-semibold tracking-[0.12em] mb-4" style={{ color: 'hsl(var(--gold) / 0.75)' }}>أخبار وتحديثات</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight max-w-xl">
              الأخبار والفعاليات
            </h1>
            <p className="font-arabic text-primary-foreground/55 max-w-lg mt-4 text-[15px]">
              تابع آخر المستجدات من أسواق للتطوير العقاري
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
            </div>
          ) : articles.length === 0 ? (
            <p className="text-center text-muted-foreground font-arabic py-20">لا توجد مقالات بعد.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {articles.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                >
                  <Link
                    to={`/ar/news/${article.id}`}
                    className="group block rounded-2xl overflow-hidden bg-card border border-border/30 hover:border-accent/15 transition-all duration-500 hover:-translate-y-1"
                    style={{ boxShadow: 'var(--shadow-sm)' }}
                  >
                    {article.image && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          width={400}
                          height={250}
                        />
                      </div>
                    )}
                    <div className="p-5 md:p-6">
                      <h3 className="font-display text-base md:text-lg font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-arabic mt-2.5 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-[13px] text-foreground mt-4 font-arabic font-semibold group-hover:gap-2 group-hover:text-accent transition-all duration-300">
                        اقرأ المزيد <ChevronLeft size={13} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default NewsAr;

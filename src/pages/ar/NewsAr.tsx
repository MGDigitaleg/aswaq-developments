import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { useNewsArticles } from "@/hooks/useNewsArticles";
import heroBuilding from "@/assets/hero-building.webp";
import useSEO from "@/hooks/useSEO";

const fadeUp = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const NewsAr = () => {
  const { articles, loading } = useNewsArticles("ar");

  useSEO(
    "الأخبار والفعاليات | أسواق للتطوير العقاري",
    "تابع آخر الأخبار والفعاليات من أسواق للتطوير العقاري. اكتشف إطلاق المشاريع والمعارض وفرص الاستثمار في مدينة الشروق."
  );

  const leadArticle = articles[0];
  const restArticles = articles.slice(1);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[380px] md:min-h-[440px] flex items-end pb-14 md:pb-20 overflow-hidden">
        <img src={heroBuilding} alt="أخبار أسواق للتطوير العقاري" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, hsl(226 76% 6% / 0.4) 0%, hsl(226 76% 6% / 0.75) 100%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-40">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary-foreground/30" />
              <p className="text-xs font-arabic font-semibold tracking-[0.12em] text-primary-foreground/45">أخبار وتحديثات</p>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight max-w-xl">
              الأخبار والفعاليات
            </h1>
            <p className="font-arabic text-primary-foreground/55 max-w-lg mt-4 text-[15px] leading-relaxed">
              تابع آخر المستجدات من أسواق للتطوير العقاري — إطلاق المشاريع والإنجازات وفرص الاستثمار
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
            </div>
          ) : articles.length === 0 ? (
            <p className="text-center text-muted-foreground font-arabic py-20">لا توجد مقالات بعد.</p>
          ) : (
            <>
              {/* Lead Article — Full Width */}
              {leadArticle && (
                <motion.div {...fadeUp} className="mb-12 md:mb-16">
                  <Link
                    to={`/ar/news/${leadArticle.id}`}
                    className="group block rounded-2xl overflow-hidden bg-card border border-border/20 hover:border-accent/15 transition-all duration-500"
                    style={{ boxShadow: '0 16px 48px -12px hsl(232 78% 8% / 0.08)' }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      {/* RTL: image on right, text on left */}
                      <div className="aspect-[16/10] lg:aspect-auto lg:min-h-[380px] overflow-hidden lg:order-2">
                        <img
                          src={leadArticle.image}
                          alt={leadArticle.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          loading="eager"
                        />
                      </div>
                      <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center lg:order-1">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-arabic font-bold tracking-[0.12em] text-accent/60 mb-4">
                          مقال مميز
                        </span>
                        <h2 className="font-display text-xl md:text-2xl lg:text-[1.75rem] font-bold text-foreground leading-snug group-hover:text-accent transition-colors duration-300">
                          {leadArticle.title}
                        </h2>
                        <p className="text-muted-foreground font-arabic text-[14.5px] leading-[1.7] mt-4 line-clamp-3">
                          {leadArticle.excerpt}
                        </p>
                        <div className="mt-6">
                          <span className="inline-flex items-center gap-2 text-[12px] font-bold font-arabic tracking-[0.08em] text-foreground/70 group-hover:text-accent group-hover:gap-3 transition-all duration-300">
                            اقرأ المقال <ArrowLeft size={13} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Section Divider */}
              {restArticles.length > 0 && (
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-8 h-px bg-foreground/15" />
                  <span className="text-[10px] font-arabic font-bold tracking-[0.12em] text-foreground/30">
                    جميع المقالات
                  </span>
                  <div className="flex-1 h-px bg-foreground/8" />
                </div>
              )}

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
                {restArticles.map((article, i) => (
                  <motion.div
                    key={article.id}
                    {...fadeUp}
                    transition={{ delay: i * 0.06, duration: 0.5 }}
                  >
                    <Link
                      to={`/ar/news/${article.id}`}
                      className="group block rounded-2xl overflow-hidden bg-card border border-border/20 hover:border-accent/12 transition-all duration-500 hover:-translate-y-1 h-full"
                      style={{ boxShadow: '0 8px 32px -8px hsl(232 78% 8% / 0.06)' }}
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
                        <h3 className="font-display text-[15px] md:text-base font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-[13px] text-muted-foreground font-arabic mt-2.5 line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-[12px] text-foreground/60 mt-4 font-arabic font-semibold group-hover:gap-2.5 group-hover:text-accent transition-all duration-300">
                          اقرأ المزيد <ArrowLeft size={12} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default NewsAr;

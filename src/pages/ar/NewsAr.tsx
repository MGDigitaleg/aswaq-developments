import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useNewsArticles } from "@/hooks/useNewsArticles";
import heroBuilding from "@/assets/hero-building.webp";

const NewsAr = () => {
  const { articles, loading } = useNewsArticles("ar");

  useEffect(() => {
    document.title = "الأخبار والفعاليات | أسواق للتطوير العقاري";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "تابع آخر الأخبار والفعاليات من أسواق للتطوير العقاري. اكتشف إطلاق المشاريع والمعارض وفرص الاستثمار في مدينة الشروق.");
    }
  }, []);

  return (
    <Layout>
      <section className="relative h-[50vh] min-h-[420px] flex items-center justify-center pt-[120px]">
        <img src={heroBuilding} alt="أخبار أسواق" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 text-center px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-4">
            الأخبار والفعاليات
          </motion.h1>
          <p className="font-arabic text-primary-foreground/80 max-w-xl mx-auto">
            تابع آخر المستجدات من أسواق للتطوير العقاري
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="text-center text-muted-foreground">جاري التحميل...</p>
          ) : articles.length === 0 ? (
            <p className="text-center text-muted-foreground">لا توجد مقالات بعد.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, i) => (
                <motion.div key={article.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Link to={`/ar/news/${article.id}`} className="group block bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    {article.image && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-display text-lg font-bold mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                      <p className="font-arabic text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
                      <span className="inline-block mt-4 text-primary font-semibold text-sm font-arabic">اقرأ المزيد ←</span>
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

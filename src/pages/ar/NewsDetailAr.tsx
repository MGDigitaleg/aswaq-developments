import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { useNewsArticle, useLatestNews } from "@/hooks/useNewsArticles";
import ContentBlockRenderer from "@/components/ContentBlockRenderer";

const NewsDetailAr = () => {
  const { slug } = useParams<{ slug: string }>();
  const { article, loading } = useNewsArticle(slug, "ar");
  const { articles: otherArticles } = useLatestNews("ar", 4);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | أسواق للتطوير العقاري`;
    }
  }, [article]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">جاري التحميل...</p>
        </div>
      </Layout>
    );
  }

  if (!article) return <Navigate to="/ar/news" replace />;

  const related = otherArticles.filter((a) => a.id !== slug).slice(0, 3);

  return (
    <Layout>
      <section className="relative h-[55vh] min-h-[450px] flex items-end pt-[120px]">
        {article.image && (
          <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <Link to="/ar/news" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors font-arabic text-sm mb-4">
            <ArrowRight size={16} /> العودة إلى الأخبار
          </Link>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary-foreground max-w-3xl">
            {article.title}
          </motion.h1>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <ContentBlockRenderer content={article.rawContent} fontClass="font-arabic" />

          {article.youtubeId && (
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe src={`https://www.youtube.com/embed/${article.youtubeId}`} title="فيديو يوتيوب" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full" />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-10">المزيد من الأخبار</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((a) => (
                <Link key={a.id} to={`/ar/news/${a.id}`} className="group block bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out">
                  {a.image && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={a.image} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-display text-base font-bold mt-2 group-hover:text-primary transition-colors line-clamp-2">{a.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default NewsDetailAr;

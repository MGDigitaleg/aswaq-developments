import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { newsArticles } from "@/data/newsData";

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = newsArticles.find((a) => a.id === slug);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | ASWAQ Developments`;
    }
  }, [article]);

  if (!article) return <Navigate to="/news" replace />;

  const otherArticles = newsArticles.filter((a) => a.id !== slug).slice(0, 3);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[350px] flex items-end">
        <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 lg:px-8 pb-10">
          <Link to="/news" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors font-body text-sm mb-4">
            <ArrowLeft size={16} /> Back to News
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground max-w-3xl"
          >
            {article.title}
          </motion.h1>
          <p className="font-body text-primary-foreground/60 mt-3">{article.date}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          {article.content.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="font-body text-foreground/80 leading-relaxed mb-6 text-base md:text-lg"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </section>

      {/* Related Articles */}
      {otherArticles.length > 0 && (
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-10">
              More News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherArticles.map((a) => (
                <Link
                  key={a.id}
                  to={`/news/${a.id}`}
                  className="group block bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={a.image} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-body text-muted-foreground">{a.date}</span>
                    <h3 className="font-display text-base font-bold mt-2 group-hover:text-accent transition-colors line-clamp-2">
                      {a.title}
                    </h3>
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

export default NewsDetail;

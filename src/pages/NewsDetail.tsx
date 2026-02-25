import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { useNewsArticle, useLatestNews } from "@/hooks/useNewsArticles";
import JsonLd, { buildArticleSchema, buildBreadcrumbSchema } from "@/components/JsonLd";

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { article, loading } = useNewsArticle(slug, "en");
  const { articles: otherArticles } = useLatestNews("en", 4);

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | ASWAQ Developments`;
    }
  }, [article]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!article) return <Navigate to="/news" replace />;

  const related = otherArticles.filter((a) => a.id !== slug).slice(0, 3);

  const articleSchema = buildArticleSchema({
    title: article.title,
    excerpt: article.excerpt,
    date: "",
    image: article.image,
    slug: article.id,
  });

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "News", url: "/news" },
    { name: article.title, url: `/news/${article.id}` },
  ]);

  return (
    <Layout>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbs} />
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[350px] flex items-end">
        {article.image && (
          <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
        )}
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

          {article.youtubeId && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${article.youtubeId}`}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-10">
              More News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((a) => (
                <Link
                  key={a.id}
                  to={`/news/${a.id}`}
                  className="group block bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  {a.image && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={a.image} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    </div>
                  )}
                  <div className="p-5">
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

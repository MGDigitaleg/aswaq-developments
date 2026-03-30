import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useNewsArticles } from "@/hooks/useNewsArticles";
import JsonLd, { buildBreadcrumbSchema } from "@/components/JsonLd";
import heroBuilding from "@/assets/hero-building.webp";

const News = () => {
  const { articles, loading } = useNewsArticles("en");

  useEffect(() => {
    document.title = "News & Events | ASWAQ Developments";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", "Stay updated with the latest news and events from ASWAQ Developments. Discover project launches, exhibitions, and investment opportunities in Shorouk City.");
    }
  }, []);

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "News & Events", url: "/news" },
  ]);

  return (
    <Layout>
      <JsonLd data={breadcrumbs} />
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[320px] flex items-center justify-center">
        <img src={heroBuilding} alt="ASWAQ News" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4"
          >
            News & Events
          </motion.h1>
          <p className="font-body text-primary-foreground/80 max-w-xl mx-auto">
            Stay updated with the latest from ASWAQ Developments
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : articles.length === 0 ? (
            <p className="text-center text-muted-foreground">No articles yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={`/news/${article.id}`}
                    className="group block bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                  >
                    {article.image && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-display text-lg font-bold mt-2 mb-3 group-hover:text-accent transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground line-clamp-3">
                        {article.excerpt}
                      </p>
                      <span className="inline-block mt-4 text-accent font-semibold text-sm font-body">
                        Read More →
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

export default News;

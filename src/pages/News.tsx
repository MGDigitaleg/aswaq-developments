import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import { useNewsArticles } from "@/hooks/useNewsArticles";
import JsonLd, { buildBreadcrumbSchema } from "@/components/JsonLd";
import heroBuilding from "@/assets/hero-building.jpg";

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
      <section className="relative h-[40vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <img src={heroBuilding} alt="ASWAQ News" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-accent font-body font-semibold tracking-[0.25em] uppercase text-xs mb-4">Stay Updated</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              News & Events
            </h1>
            <p className="font-body text-primary-foreground/80 max-w-xl mx-auto text-base leading-relaxed">
              Stay updated with the latest from ASWAQ Developments
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground font-body">Loading articles...</p>
            </div>
          ) : articles.length === 0 ? (
            <p className="text-center text-muted-foreground font-body py-20">No articles yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {articles.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={`/news/${article.id}`}
                    className="group block premium-card overflow-hidden"
                  >
                    {article.image && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="font-display text-lg font-semibold text-foreground mt-1 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-body mt-3 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm text-accent mt-4 font-body font-semibold group-hover:gap-2.5 transition-all duration-300">
                        Read More <ChevronRight size={14} />
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

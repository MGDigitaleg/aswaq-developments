import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import { useNewsArticles } from "@/hooks/useNewsArticles";
import JsonLd, { buildBreadcrumbSchema } from "@/components/JsonLd";
import heroBuilding from "@/assets/hero-building.webp";
import useSEO from "@/hooks/useSEO";

const News = () => {
  const { articles, loading } = useNewsArticles("en");

  useSEO(
    "News & Events | ASWAQ Developments",
    "Stay updated with the latest news and events from ASWAQ Developments. Discover project launches, exhibitions, and investment opportunities in Shorouk City."
  );

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "News & Events", url: "/news" },
  ]);

  return (
    <Layout>
      <JsonLd data={breadcrumbs} />

      {/* Hero */}
      <section className="relative min-h-[380px] md:min-h-[440px] flex items-end pb-14 md:pb-20 overflow-hidden">
        <img src={heroBuilding} alt="ASWAQ Developments News & Events" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, hsl(226 76% 6% / 0.4) 0%, hsl(226 76% 6% / 0.75) 100%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-40">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-body font-semibold tracking-[0.25em] uppercase mb-4" <p className="text-xs font-body font-semibold tracking-[0.25em] uppercase mb-4 text-primary-foreground/45">Insights & Updates</p>>Insights & Updates</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight max-w-xl">
              News & Events
            </h1>
            <p className="font-body text-primary-foreground/55 max-w-lg mt-4 text-[15px]">
              Stay updated with the latest from ASWAQ Developments
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
            <p className="text-center text-muted-foreground font-body py-20">No articles yet.</p>
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
                    to={`/news/${article.id}`}
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
                      <p className="text-sm text-muted-foreground font-body mt-2.5 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-[13px] text-foreground mt-4 font-body font-semibold group-hover:gap-2 group-hover:text-accent transition-all duration-300">
                        Read More <ChevronRight size={13} />
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

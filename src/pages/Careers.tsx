import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import CareerApplicationForm from "@/components/CareerApplicationForm";
import { useCareers } from "@/hooks/useCareers";
import heroImage from "@/assets/about-hero.jpg";

const Careers = () => {
  const { careers, loading } = useCareers();

  useEffect(() => {
    document.title = "Careers | ASWAQ Developments";
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[280px] flex items-center justify-center overflow-hidden">
        <img src={heroImage} alt="Careers at ASWAQ Developments" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-accent font-body font-semibold tracking-[0.25em] uppercase text-xs mb-4">Join Our Team</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground">
              Careers
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Job Listings */}
            <div className="lg:col-span-2 space-y-6">
              {loading ? (
                <div className="text-center py-16">
                  <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground font-body">Loading positions...</p>
                </div>
              ) : careers.length === 0 ? (
                <div className="text-center py-16 bg-cream rounded-xl border border-border/50">
                  <p className="text-muted-foreground font-body">No open positions at the moment.</p>
                </div>
              ) : (
                careers.map((career, i) => (
                  <motion.div
                    key={career.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="premium-card p-6 md:p-8"
                  >
                    <Link to={`/careers/${career.slug}`}>
                      <h3 className="font-display text-lg font-bold text-foreground hover:text-accent transition-colors">
                        {career.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground font-body">
                      <Calendar size={14} className="text-accent" />
                      <span>{new Date(career.date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-body mt-3 line-clamp-2 leading-relaxed">
                      {career.description.split("\n")[0]}
                    </p>
                    <Link
                      to={`/careers/${career.slug}`}
                      className="group inline-flex items-center gap-2 mt-5 bg-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-md hover:bg-navy-light transition-all duration-300 font-body"
                    >
                      Read More
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                ))
              )}
            </div>

            {/* Application Form */}
            <div>
              <CareerApplicationForm careers={careers} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;

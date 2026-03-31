import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import Layout from "@/components/Layout";
import CareerApplicationForm from "@/components/CareerApplicationForm";
import { useCareers } from "@/hooks/useCareers";
import heroImage from "@/assets/about-hero.webp";

const Careers = () => {
  const { careers, loading } = useCareers();

  useEffect(() => {
    document.title = "Careers | ASWAQ Developments";
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center pt-[120px]">
        <img src={heroImage} alt="Careers" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary-foreground"
          >
            Careers
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Job Listings */}
            <div className="lg:col-span-2 space-y-6">
              {loading ? (
                <p className="text-muted-foreground">Loading positions...</p>
              ) : careers.length === 0 ? (
                <p className="text-muted-foreground">No open positions at the moment.</p>
              ) : (
                careers.map((career, i) => (
                  <motion.div
                    key={career.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out"
                  >
                    <Link to={`/careers/${career.slug}`}>
                      <h3 className="font-display text-lg font-bold text-foreground hover:text-primary transition-colors">
                        {career.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      <span>{new Date(career.date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {career.description.split("\n")[0]}
                    </p>
                    <Link
                      to={`/careers/${career.slug}`}
                      className="inline-block mt-4 bg-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-navy-light hover:shadow-md transition-all duration-300"
                    >
                      Read More
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

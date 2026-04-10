import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase, ArrowRight, Users, Building2, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import CareerApplicationForm from "@/components/CareerApplicationForm";
import { useCareers } from "@/hooks/useCareers";
import heroImage from "@/assets/about-hero.webp";

const stats = [
  { icon: Users, value: "50+", label: "Team Members" },
  { icon: Building2, value: "4", label: "Active Projects" },
  { icon: Clock, value: "20+", label: "Years Experience" },
];

const Careers = () => {
  const { careers, loading } = useCareers();

  useEffect(() => {
    document.title = "Careers | ASWAQ Developments";
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[480px] flex items-end pb-12 md:pb-16">
        <img src={heroImage} alt="Careers at ASWAQ" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-primary-foreground/25" />
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase font-body text-primary-foreground/50">
                Join Our Team
              </p>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary-foreground leading-[1.08] max-w-2xl">
              Build the Future of <br className="hidden md:block" />Real Estate With Us
            </h1>
            <p className="text-primary-foreground/50 font-body text-[15px] mt-4 max-w-xl leading-relaxed">
              We're always looking for talented individuals who share our passion for excellence and innovation.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex gap-6 md:gap-10 mt-8"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(0 0% 100% / 0.08)' }}>
                  <s.icon size={14} className="text-primary-foreground/60" />
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-primary-foreground leading-none">{s.value}</div>
                  <div className="text-[9px] font-body tracking-[0.15em] uppercase text-primary-foreground/35">{s.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Positions Header */}
      <section className="pt-14 md:pt-20 pb-6 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-steel/40" />
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase font-body text-steel/60">Open Positions</p>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">
                Current Opportunities
              </h2>
            </div>
            <p className="text-sm text-muted-foreground font-body max-w-md">
              {careers.length} {careers.length === 1 ? "position" : "positions"} available — find the right fit for your career.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16 md:pb-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Job Listings */}
            <div className="lg:col-span-2 space-y-4">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-card rounded-2xl border border-border/40 p-6 animate-pulse">
                      <div className="h-5 bg-muted rounded w-1/3 mb-3" />
                      <div className="h-3 bg-muted rounded w-1/4 mb-4" />
                      <div className="h-3 bg-muted rounded w-2/3" />
                    </div>
                  ))}
                </div>
              ) : careers.length === 0 ? (
                <div className="bg-card rounded-2xl border border-border/40 p-12 text-center">
                  <Briefcase size={40} className="mx-auto text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground font-body">No open positions at the moment. Check back soon!</p>
                </div>
              ) : (
                careers.map((career, i) => (
                  <motion.div
                    key={career.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      to={`/careers/${career.slug}`}
                      className="group block bg-card rounded-2xl border border-border/40 p-6 hover:border-primary/15 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase font-body text-primary/50 bg-primary/5 px-2 py-0.5 rounded-full">
                              Full-time
                            </span>
                          </div>
                          <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
                            {career.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground font-body">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={12} className="text-steel/50" />
                              {new Date(career.date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin size={12} className="text-steel/50" />
                              El-Shorouk City
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground/80 mt-3 line-clamp-2 font-body leading-relaxed">
                            {career.description.split("\n")[0]}
                          </p>
                        </div>
                        <div className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-border/50 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-300 mt-4 flex-shrink-0">
                          <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>

            {/* Application Form */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <CareerApplicationForm careers={careers} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;

import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Briefcase, Clock, CheckCircle2, Target } from "lucide-react";
import Layout from "@/components/Layout";
import CareerApplicationForm from "@/components/CareerApplicationForm";
import { useCareer, useCareers } from "@/hooks/useCareers";
import heroImage from "@/assets/arena-premium/arena-night-render.jpg";

/* ── Parse structured description into sections ── */
const parseDescription = (text: string) => {
  const sections: { title: string; items: string[] }[] = [];
  let intro = "";
  let current: { title: string; items: string[] } | null = null;

  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) continue;

    // Detect section headers (lines ending with ":" like "Key Responsibilities:" or "Requirements:")
    if (
      (line.endsWith(":") || line.endsWith("：")) &&
      !line.startsWith("- ") &&
      line.length < 80
    ) {
      if (current) sections.push(current);
      current = { title: line.replace(/:$|：$/, ""), items: [] };
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("• ") || line.startsWith("▪️")) {
      const content = line.replace(/^[-•▪️]\s*/, "");
      if (current) {
        current.items.push(content);
      }
      continue;
    }

    if (!current && !sections.length) {
      intro += (intro ? " " : "") + line;
    } else if (current) {
      // Non-list line inside a section — treat as a continuation
      current.items.push(line);
    } else {
      intro += (intro ? " " : "") + line;
    }
  }
  if (current) sections.push(current);

  return { intro, sections };
};

const CareerDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { career, loading } = useCareer(slug);
  const { careers } = useCareers();

  useEffect(() => {
    if (career) document.title = `${career.title} | Careers | ASWAQ Developments`;
  }, [career]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-cream">
          <div className="animate-pulse space-y-4 w-full max-w-2xl px-6">
            <div className="h-8 bg-muted rounded w-1/2" />
            <div className="h-4 bg-muted rounded w-1/3" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-4/5" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!career) return <Navigate to="/careers" replace />;

  const { intro, sections } = parseDescription(career.description);

  const sectionIcons: Record<string, typeof Target> = {
    responsibilities: Target,
    requirements: CheckCircle2,
  };

  const getSectionIcon = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes("responsibilit") || lower.includes("duties") || lower.includes("role")) return Target;
    if (lower.includes("requirement") || lower.includes("qualif")) return CheckCircle2;
    return Briefcase;
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[420px] flex items-end pb-10 md:pb-14 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-primary/20" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors text-xs font-body tracking-wide uppercase mb-5"
            >
              <ArrowLeft size={14} /> Back to Careers
            </Link>
            <h1 className="font-display text-3xl md:text-4xl lg:text-[2.6rem] font-bold tracking-tight text-primary-foreground leading-[1.08] max-w-3xl">
              {career.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5">
              <span className="flex items-center gap-1.5 text-xs text-primary-foreground/50 font-body">
                <Calendar size={13} className="text-primary-foreground/40" />
                {new Date(career.date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-primary-foreground/50 font-body">
                <MapPin size={13} className="text-primary-foreground/40" />
                El-Shorouk City
              </span>
              <span className="flex items-center gap-1.5 text-xs text-primary-foreground/50 font-body">
                <Clock size={13} className="text-primary-foreground/40" />
                Full-time
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Job Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Intro */}
              {intro && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-card rounded-2xl border border-border/40 p-6 md:p-8"
                >
                  <h2 className="font-display text-lg font-bold text-foreground mb-3">About This Role</h2>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{intro}</p>
                </motion.div>
              )}

              {/* Sections */}
              {sections.map((section, i) => {
                const Icon = getSectionIcon(section.title);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="bg-card rounded-2xl border border-border/40 p-6 md:p-8"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                        <Icon size={16} className="text-primary/60" />
                      </div>
                      <h3 className="font-display text-base font-bold text-foreground">{section.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground font-body leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/30 mt-[7px] flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}

              {/* If no structured sections, show raw description */}
              {!intro && sections.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-2xl border border-border/40 p-6 md:p-8"
                >
                  <div className="text-sm text-muted-foreground font-body leading-relaxed whitespace-pre-line">
                    {career.description}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Application Form */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <CareerApplicationForm careers={careers} selectedCareerId={career.id} title="Apply Now" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CareerDetail;

import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import Layout from "@/components/Layout";
import CareerApplicationForm from "@/components/CareerApplicationForm";
import { useCareer, useCareers } from "@/hooks/useCareers";
import heroImage from "@/assets/about-hero.webp";

const CareerDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { career, loading } = useCareer(slug);
  const { careers } = useCareers();

  useEffect(() => {
    if (career) {
      document.title = `${career.title} | Careers | ASWAQ Developments`;
    }
  }, [career]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!career) return <Navigate to="/careers" replace />;

  // Render description with basic markdown-like formatting
  const renderDescription = (text: string) => {
    return text.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;

      // Bold headers like **Qualifications:**
      if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        return <p key={i} className="font-bold text-foreground mt-4 mb-1">{trimmed.replace(/\*\*/g, "")}</p>;
      }

      // Bold with colon like **Location:** Sheraton.
      const boldMatch = trimmed.match(/^\*\*(.+?)\*\*(.*)$/);
      if (boldMatch) {
        return <p key={i} className="mt-1"><strong>{boldMatch[1]}</strong>{boldMatch[2]}</p>;
      }

      // List items
      if (trimmed.startsWith("- ") || trimmed.startsWith("▪️")) {
        const content = trimmed.replace(/^-\s*/, "").replace(/^▪️\s*/, "");
        // Handle bold within list items
        const parts = content.split(/\*\*(.+?)\*\*/);
        return (
          <li key={i} className="ml-4 text-muted-foreground">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
          </li>
        );
      }

      // Heading
      if (trimmed.startsWith("#")) {
        const content = trimmed.replace(/^#+\s*/, "");
        return <p key={i} className="font-bold text-foreground mt-3">{content}</p>;
      }

      return <p key={i} className="text-muted-foreground mt-1">{trimmed}</p>;
    });
  };

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
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground"
          >
            Careers
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Job Details */}
            <div className="lg:col-span-2">
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm mb-6"
              >
                <ArrowLeft size={16} /> Back to Careers
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  {career.title}
                </h2>
                <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                  <Calendar size={14} />
                  <span>
                    {new Date(career.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="mt-6 text-sm leading-relaxed">
                  <ul className="list-disc">{renderDescription(career.description)}</ul>
                </div>
              </motion.div>
            </div>

            {/* Application Form */}
            <div>
              <CareerApplicationForm
                careers={careers}
                selectedCareerId={career.id}
                title="Inquiry"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CareerDetail;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import useSEO from "@/hooks/useSEO";

interface MallInfo {
  name: string;
  href: string;
  description: string;
  sizes: string;
}

interface UnitCategoryPageProps {
  metaTitle?: string;
  metaDescription?: string;
  heroLabel: string;
  heroTitle: string;
  heroDescription: string;
  introTitle: string;
  introDescription: string;
  locationTitle: string;
  locationDescription: string;
  locationDrivers: string[];
  locationConclusion: string;
  mallsSectionTitle: string;
  mallsSectionIntro?: string;
  malls: MallInfo[];
  ctaTitle: string;
  ctaSubtitle: string;
  faqs: { question: string; answer: string }[];
  faqTitle?: string;
  mallLinkText?: string;
  ctaButtonText?: string;
}

const commonFaqs = [
  { question: "What types of properties does ASWAQ Developments offer?", answer: "ASWAQ Developments offers a range of commercial real estate options, including commercial units for sale, units for rent, administrative spaces, and medical units located within strategic malls and commercial destinations." },
  { question: "How do I buy a unit or property in Shorouk City?", answer: "You first decide the type of property that matches your needs, discover the types we offer and locations, then contact us to request your unit." },
  { question: "Where can I buy a unit in Shorouk city?", answer: "ASWAQ Developments offers units across four major mall destinations: Solaria Mall, Arena Mall, Mercado Mall, and City Hub Mall. Units range from 30 m² up to 300 m²." },
  { question: "How many malls does ASWAQ Developments have units in?", answer: "ASWAQ Developments currently offers units in four major malls in Shorouk City." },
  { question: "What are the typical sizes of the spaces & units available?", answer: "Our units range from 30 m² up to 300 m²." },
  { question: "Are the commercial units available for both sale and rent?", answer: "Yes. ASWAQ Developments offers both commercial units for sale and units for rent across our four mall destinations." },
  { question: "Are there flexible payment plans for buying units?", answer: "Yes. ASWAQ Developments offers flexible payment plans for buyers interested in owning a unit." },
];

export { commonFaqs };

const UnitCategoryPage = ({
  metaTitle,
  metaDescription,
  heroLabel,
  heroTitle,
  heroDescription,
  introTitle,
  introDescription,
  locationTitle,
  locationDescription,
  locationDrivers,
  locationConclusion,
  mallsSectionTitle,
  mallsSectionIntro,
  malls,
  ctaTitle,
  ctaSubtitle,
  faqs,
  faqTitle,
  mallLinkText,
  ctaButtonText,
}: UnitCategoryPageProps) => {
  useSEO(metaTitle || heroTitle, metaDescription || heroDescription);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-24 md:py-28">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-accent font-body font-semibold tracking-[0.25em] uppercase text-xs mb-4">{heroLabel}</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">{heroTitle}</h1>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto text-base leading-relaxed">{heroDescription}</p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="section-divider mb-6" style={{ marginLeft: 0 }} />
            <h2 className="font-display text-3xl font-bold text-foreground mb-5">{introTitle}</h2>
            <p className="text-muted-foreground font-body leading-relaxed">{introDescription}</p>
          </motion.div>
        </div>
      </section>

      {/* Location */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="section-divider mb-6" style={{ marginLeft: 0 }} />
          <h2 className="font-display text-3xl font-bold text-foreground mb-5">{locationTitle}</h2>
          <p className="text-muted-foreground font-body mb-8 leading-relaxed">{locationDescription}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {locationDrivers.map((driver, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex items-start gap-3 p-5 bg-background rounded-xl border border-border/50 hover:border-accent/20 transition-all duration-300"
              >
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <p className="text-foreground font-body text-sm leading-relaxed">{driver}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-muted-foreground font-body italic">{locationConclusion}</p>
        </div>
      </section>

      {/* Malls */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-divider mb-6" />
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">{mallsSectionTitle}</h2>
            {mallsSectionIntro && (
              <p className="text-muted-foreground font-body max-w-3xl mx-auto leading-relaxed">{mallsSectionIntro}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {malls.map((mall, i) => (
              <motion.div key={mall.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                className="premium-card p-8 md:p-10"
              >
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{mall.name}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{mall.description}</p>
                <p className="text-accent font-body font-semibold text-sm mb-5">{mall.sizes}</p>
                <Link to={mall.href} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-accent transition-colors font-body">
                  {mallLinkText || "View Mall Details"}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title={faqTitle} />
      <CTASection title={ctaTitle} subtitle={ctaSubtitle} buttonText={ctaButtonText || "Request Unit Details"} buttonLink="/contact" />
    </Layout>
  );
};

export default UnitCategoryPage;

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
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 md:pt-40 pb-16 md:pb-20 text-center relative z-10 min-h-[420px] flex flex-col justify-end">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase font-body mb-4" style={{ color: 'hsl(var(--gold) / 0.7)' }}>{heroLabel}</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-5 leading-tight max-w-3xl mx-auto">{heroTitle}</h1>
            <p className="text-primary-foreground/55 font-body max-w-2xl mx-auto text-[15px] leading-relaxed">{heroDescription}</p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="section-divider mb-8" style={{ marginLeft: 0 }} />
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">{introTitle}</h2>
            <p className="text-muted-foreground font-body text-[15px] leading-[1.9]">{introDescription}</p>
          </motion.div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">{locationTitle}</h2>
          <p className="text-muted-foreground font-body text-[15px] leading-[1.9] mb-8">{locationDescription}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {locationDrivers.map((driver, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.4 }}
                className="flex items-start gap-3 p-4 md:p-5 bg-card rounded-xl border border-border/30 hover:border-accent/15 transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={15} className="text-accent" />
                </div>
                <p className="text-foreground font-body text-sm leading-relaxed">{driver}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-muted-foreground font-body text-sm italic leading-relaxed">{locationConclusion}</p>
        </div>
      </section>

      {/* Malls */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Our Properties</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">{mallsSectionTitle}</h2>
            {mallsSectionIntro && (
              <p className="text-muted-foreground font-body text-[15px] max-w-3xl mx-auto mt-4 leading-relaxed">{mallsSectionIntro}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {malls.map((mall, i) => (
              <motion.div key={mall.name} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-card rounded-2xl p-7 md:p-8 border border-border/30 hover:border-accent/15 transition-all duration-500"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-3">{mall.name}</h3>
                <p className="text-muted-foreground font-body text-sm leading-[1.8] mb-4">{mall.description}</p>
                <p className="text-foreground font-body font-semibold text-sm mb-5">{mall.sizes}</p>
                <Link to={mall.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-foreground transition-colors font-body group">
                  {mallLinkText || "View Mall Details"}
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
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

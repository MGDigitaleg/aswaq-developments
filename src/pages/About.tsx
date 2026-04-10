import { motion } from "framer-motion";
import { CheckCircle2, Eye, Target, Heart, Award, Clock, Building2 } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import useSEO from "@/hooks/useSEO";
import AnimatedCounter from "@/components/AnimatedCounter";
import JsonLd, { buildBreadcrumbSchema } from "@/components/JsonLd";
import aswaqLogo from "@/assets/aswaq-logo.webp";

const whyChoose = [
  { icon: Award, text: "20+ Years of Real Estate Expertise" },
  { icon: Building2, text: "15+ Successful Projects Across Egypt" },
  { icon: Heart, text: "400+ Satisfied Clients" },
  { icon: Target, text: "Investments Exceeding 3 Billion EGP" },
  { icon: Clock, text: "Delivered Projects Ahead of Schedule" },
  { icon: CheckCircle2, text: "Owned & Managed by ASWAQ for Guaranteed Quality" },
];

const stats = [
  { value: "20+", label: "Years" },
  { value: "15+", label: "Projects" },
  { value: "400+", label: "Clients" },
  { value: "3B+", label: "EGP Invested" },
];

const About = () => {
  useSEO("ASWAQ Developments | Our Story", "Expert real estate developer in Egypt offering premium units for rent and property for sale, backed by over 20 years of proven experience.");

  const breadcrumbs = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Our Story", url: "/about" },
  ]);

  return (
    <Layout>
      <JsonLd data={breadcrumbs} />
      {/* Hero — clean cinematic video, no text overlay */}
      <section className="relative aspect-video max-h-[75vh] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/about-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to top, hsl(222 47% 5% / 0.6) 0%, transparent 50%)'
        }} />
      </section>

      {/* Intro — editorial split layout */}
      <section className="py-14 md:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left column — title + label */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 lg:sticky lg:top-32"
            >
              <p className="text-primary-foreground/40 font-body font-semibold tracking-[0.25em] uppercase text-[10px] mb-4">Our Story</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-primary-foreground leading-[1.08] mb-6">
                About Us
              </h1>
              <div className="w-12 h-px bg-primary-foreground/15 mb-6" />
              {/* Inline stat highlights */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: "20+", label: "Years of Experience" },
                  { val: "15+", label: "Projects Delivered" },
                  { val: "3B+", label: "EGP Invested" },
                  { val: "400+", label: "Satisfied Clients" },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                    className="p-4 rounded-xl border border-primary-foreground/[0.07] bg-primary-foreground/[0.03]"
                  >
                    <span className="font-['Montserrat'] text-2xl font-extrabold text-primary-foreground block mb-0.5">{s.val}</span>
                    <span className="text-primary-foreground/40 text-[11px] font-body tracking-wide">{s.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right column — body text, editorial style */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="flex items-start gap-4">
                <img src={aswaqLogo} alt="ASWAQ Developments" className="w-[72px] mt-1 shrink-0 opacity-70" />
                <p className="text-primary-foreground/60 font-body text-[17px] md:text-[18px] leading-[1.9]">
                  Established in 2019, ASWAQ Developments represents a strategic milestone built on more than 20 years of proven success across residential, commercial, industrial, and resort sectors.
                </p>
              </div>
              <div className="w-full h-px bg-primary-foreground/[0.06]" />
              <p className="text-primary-foreground/45 font-body text-[15px] leading-[1.9]">
                Formed in partnership with real estate firms active since 2002, ASWAQ was created to streamline the management of existing and future projects, enhance profitability, and exceed client expectations while opening new markets with diverse investment and employment opportunities.
              </p>
              <p className="text-primary-foreground/45 font-body text-[15px] leading-[1.9]">
                Since its inception, ASWAQ has continued to thrive by delivering high-quality Residential, Commercial, Administrative, and Medical projects — earning the trust of over 400 clients and investors.
              </p>
              {/* Pull quote */}
              <div className="relative pl-5 border-l-2 border-accent/30">
                <p className="font-display text-primary-foreground/70 text-[16px] md:text-[17px] italic leading-relaxed">
                  "Building excellence isn't just our goal — it's our legacy."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="py-12 md:py-18 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl border border-border/30 p-8 md:p-10"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <Eye size={24} className="text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">Our Vision</h3>
              <p className="text-muted-foreground font-body leading-relaxed text-[15px]">
                Solidifying our legacy in the industry by delivering excellence and innovation in real estate development across Egypt and the Middle East.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-card rounded-2xl border border-border/30 p-8 md:p-10"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <Target size={24} className="text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground font-body leading-relaxed text-[15px]">
                To deliver promises of excellence and trustworthy investments through innovation in the Egyptian and Middle Eastern markets by offering the perfect investment opportunities for all. We are committed to achieving the highest standards through cutting-edge products and exceptional management.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-18 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="section-label mb-3">Our Strengths</p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
              Why Choose Us?
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {whyChoose.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="flex items-center gap-4 p-5 bg-card rounded-xl text-left border border-border/30 hover:border-accent/15 hover:-translate-y-1 transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="shrink-0 w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                  <item.icon size={18} className="text-accent" />
                </div>
                <span className="font-body font-medium text-foreground text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Secure Your Investment with a Trusted Developer"
        subtitle="Partner with ASWAQ Developments for premium real estate opportunities in Egypt's most dynamic locations."
        buttonText="Contact Us"
      />
    </Layout>
  );
};

export default About;

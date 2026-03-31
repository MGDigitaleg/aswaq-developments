import { motion } from "framer-motion";
import { CheckCircle, Eye, Target, Heart, Award, Clock, Building2 } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import useSEO from "@/hooks/useSEO";
import AnimatedCounter from "@/components/AnimatedCounter";
import JsonLd, { buildBreadcrumbSchema } from "@/components/JsonLd";

const whyChoose = [
  { icon: Award, text: "20+ Years of Real Estate Expertise" },
  { icon: Building2, text: "15+ Successful Projects Across Egypt" },
  { icon: Heart, text: "400+ Satisfied Clients" },
  { icon: Target, text: "Investments Exceeding 3 Billion EGP" },
  { icon: Clock, text: "Delivered Projects Ahead of Schedule" },
  { icon: CheckCircle, text: "Owned & Managed by ASWAQ for Guaranteed Quality" },
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
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center pt-[120px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/about-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 hero-gradient" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative z-10 text-center px-4 max-w-3xl"
        >
          <p className="text-primary-foreground/60 font-body font-semibold tracking-[0.25em] uppercase text-xs mb-4">Our Story</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            About Us
          </h1>
          <p className="text-primary-foreground/80 font-body max-w-2xl mx-auto text-base leading-relaxed">
            ASWAQ Developments, established in 2019, represents a strategic milestone built on more than 20 years of proven success across residential, commercial, industrial, and resort sectors.
          </p>
        </motion.div>
      </section>

      {/* About Content */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="section-divider mb-8" />
            <p className="text-muted-foreground font-body leading-relaxed text-lg">
              Formed in partnership with real estate firms active since 2002, ASWAQ was created to streamline the management of existing and future projects, enhance profitability, and exceed client expectations while opening new markets with diverse investment and employment opportunities. Since its inception, ASWAQ has continued to thrive by delivering high-quality Residential, Commercial, Administrative, and Medical projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="premium-card p-8 md:p-10"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Eye size={24} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">Our Vision</h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                Solidifying our legacy in the industry by delivering excellence and innovation in real estate development across Egypt and the Middle East.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="premium-card p-8 md:p-10"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Target size={24} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                To deliver promises of excellence and trustworthy investments through innovation in the Egyptian and Middle Eastern markets by offering the perfect investment opportunities for all. We are committed to achieving the highest standards through cutting-edge products and exceptional management.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div className="section-divider mb-6" />
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Why Choose Us?
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {whyChoose.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex items-center gap-4 p-5 bg-cream rounded-xl text-left border border-border/50 hover:border-accent/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                <div className="shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon size={18} className="text-primary" />
                </div>
                <span className="font-body font-medium text-foreground text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="font-['Montserrat'] text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary-foreground mb-3">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-primary-foreground/70 font-body text-sm tracking-wide">{stat.label}</div>
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

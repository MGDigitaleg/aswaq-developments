import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Users, Building2, ShieldCheck, ArrowRight, BarChart3, Home, Landmark, GraduationCap, HeartPulse, ShoppingCart } from "lucide-react";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import AnimatedCounter from "@/components/AnimatedCounter";
import ROICalculator from "@/components/ROICalculator";
import useSEO from "@/hooks/useSEO";

const marketStats = [
  { value: "1M+", label: "Residents in Shorouk City", icon: Users },
  { value: "35%", label: "Population Growth (5 Years)", icon: TrendingUp },
  { value: "25%", label: "Avg. Annual Property Appreciation", icon: BarChart3 },
  { value: "15+", label: "ASWAQ Successful Projects", icon: Building2 },
];

const locationAdvantages = [
  { icon: MapPin, title: "Strategic East Cairo Location", description: "Shorouk City sits at the crossroads of major highways including the Cairo-Suez Road and the Ring Road, offering unmatched accessibility to Greater Cairo." },
  { icon: Home, title: "Rapidly Growing Residential Base", description: "With over 1 million residents and continuous expansion, Shorouk City provides a built-in consumer base for every commercial venture." },
  { icon: GraduationCap, title: "Educational Hub", description: "Home to the British University in Egypt, Shorouk Academy, and numerous international schools — driving consistent foot traffic and demand." },
  { icon: HeartPulse, title: "Healthcare Infrastructure", description: "Major hospitals and medical centers create demand for medical units and healthcare-adjacent services." },
  { icon: ShoppingCart, title: "Commercial Demand", description: "The growing population has outpaced commercial supply, creating strong demand for retail, dining, and service-based businesses." },
  { icon: Landmark, title: "Government-Backed Development", description: "Shorouk City benefits from government infrastructure investments including roads, utilities, and public transportation networks." },
];

const investmentReasons = [
  { title: "High Rental Yields", description: "Commercial properties in Shorouk City deliver 8-12% annual rental yields, significantly outperforming traditional bank deposits and bonds.", stat: "8-12%", statLabel: "Rental Yield" },
  { title: "Capital Appreciation", description: "Property values in East Cairo's growth corridors have appreciated 20-30% annually over the past 5 years, with Shorouk City leading the trend.", stat: "25%+", statLabel: "Annual Growth" },
  { title: "Low Vacancy Rates", description: "Mixed-use developments in high-density residential areas maintain occupancy rates above 90%, ensuring consistent rental income.", stat: "90%+", statLabel: "Occupancy" },
  { title: "Flexible Entry Points", description: "With units starting from 30 m² and flexible payment plans, investors can enter the commercial real estate market with manageable capital.", stat: "30m²", statLabel: "Starting Size" },
];

const faqs = [
  { question: "Why is Shorouk City a good investment location?", answer: "Shorouk City is one of East Cairo's fastest-growing areas with over 1 million residents, strong infrastructure, proximity to major universities and hospitals, and consistent population growth driving commercial demand." },
  { question: "What kind of returns can I expect from investing in Shorouk City?", answer: "Commercial properties in Shorouk City typically deliver 8-12% annual rental yields, with property values appreciating 20-30% annually over recent years." },
  { question: "Is commercial real estate safer than residential?", answer: "Commercial properties often provide more stable and higher returns than residential investments, especially in mixed-use developments with diverse tenant bases that reduce vacancy risk." },
  { question: "What makes ASWAQ's developments different?", answer: "ASWAQ Developments focuses exclusively on strategic mixed-use projects in high-demand areas. With 20+ years of experience and 15+ successful projects, ASWAQ delivers professionally managed properties designed for long-term value." },
  { question: "Can I invest with a flexible payment plan?", answer: "Yes. ASWAQ Developments offers flexible payment plans that allow investors to spread their investment over time while securing prime commercial units." },
];

const WhyInvestShorouk = () => {
  useSEO(
    "Why Invest in Shorouk City | Real Estate Investment in Egypt",
    "Discover why Shorouk City is Egypt's top real estate investment destination. Explore market data, growth statistics, and location advantages for commercial property investment."
  );

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary pt-40 pb-16 min-h-[450px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary-foreground/60 font-body font-medium tracking-widest uppercase text-sm mb-3">Investment Guide</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-primary-foreground mb-6">
              Why Invest in Shorouk City
            </h1>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto">
              Shorouk City has emerged as one of Egypt's most promising real estate investment destinations. With a rapidly growing population, strategic infrastructure, and increasing commercial demand, the opportunity for investors has never been stronger.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Market Stats */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="mx-auto mb-6 w-[60px] h-[2px] bg-foreground" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Shorouk City by the Numbers</h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">Key market indicators that make Shorouk City a compelling investment destination.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {marketStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group text-center p-6 md:p-8 rounded-xl bg-background border border-[#0A1128]/5 hover:-translate-y-2 hover:border-[#c89c3c] hover:shadow-[0_10px_30px_rgba(200,156,60,0.15)] transition-all duration-500 ease-out"
                style={{ boxShadow: '0 4px 20px -4px rgba(10,17,40,0.1)' }}
              >
                <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={22} className="text-primary" />
                </div>
                <div className="font-['Montserrat'] text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-2">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-sm text-muted-foreground font-body">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Advantages */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="mx-auto mb-6 w-[60px] h-[2px] bg-foreground" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Location Advantages</h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">Why Shorouk City is the ideal location for commercial real estate investment.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locationAdvantages.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-background rounded-xl p-8 border border-border/30 hover:border-secondary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <item.icon size={26} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Returns */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="mx-auto mb-6 w-[60px] h-[2px] bg-foreground" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Strong Investment Returns</h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">Data-driven reasons why commercial real estate in Shorouk City delivers exceptional returns.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {investmentReasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 p-8 rounded-xl bg-cream border border-border/30"
              >
                <div className="flex-shrink-0 text-center">
                  <div className="font-['Montserrat'] text-2xl md:text-3xl font-extrabold text-primary">{reason.stat}</div>
                  <div className="text-xs text-muted-foreground font-body mt-1">{reason.statLabel}</div>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{reason.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="relative py-20 md:py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center gap-12">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-5">Calculate Your Investment Returns</h2>
              <p className="text-primary-foreground/70 font-body max-w-2xl mx-auto">Use our interactive calculator to estimate potential rental yields and return on investment.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="w-full max-w-5xl mx-auto">
              <ROICalculator wide />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why ASWAQ */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="mx-auto mb-6 w-[60px] h-[2px] bg-foreground" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Why Invest with ASWAQ Developments</h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">Backed by 20+ years of experience and a portfolio of 15+ successful projects.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Proven Track Record", description: "Over 20 years of delivering successful commercial developments across East Cairo with a portfolio valued at 3+ Billion EGP." },
              { icon: MapPin, title: "Strategic Locations", description: "Every ASWAQ project is positioned in high-density residential areas to maximize foot traffic, visibility, and commercial viability." },
              { icon: Building2, title: "Professional Management", description: "From planning to execution to property management, ASWAQ provides end-to-end professional support for every development." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background rounded-xl p-8 border border-border/30 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <item.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} />
      <CTASection
        title="Start Your Investment Journey"
        subtitle="Explore ASWAQ's portfolio of commercial, administrative, and medical units across Shorouk City's prime locations."
        buttonText="Explore Available Units"
        buttonLink="/units"
      />
    </Layout>
  );
};

export default WhyInvestShorouk;

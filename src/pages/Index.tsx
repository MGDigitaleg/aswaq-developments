import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, TrendingUp, Layers, ShieldCheck, Building2, ChevronRight, ArrowRight, Landmark, Train, GraduationCap, HeartPulse } from "lucide-react";
import { useLatestNews } from "@/hooks/useNewsArticles";
import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import ROICalculator from "@/components/ROICalculator";
import TrustedBySection from "@/components/TrustedBySection";
import AnimatedCounter from "@/components/AnimatedCounter";
import useSEO from "@/hooks/useSEO";
import JsonLd, { organizationSchema, websiteSchema, buildFaqSchema } from "@/components/JsonLd";
import heroBg from "@/assets/hero-building.webp";
import heroMercado from "@/assets/hero-mercado.webp";
import heroArena from "@/assets/hero-arena.webp";
import heroSolaria from "@/assets/hero-solaria.webp";
import cityhubImg from "@/assets/cityhub-mall.webp";
import mercadoImg from "@/assets/mercado-mall.webp";
import arenaImg from "@/assets/arena-mall.webp";
import solariaImg from "@/assets/solaria-mall.webp";

const heroSlides = [
  { image: heroBg, label: "City Hub Mall" },
  { image: heroMercado, label: "Mercado Mall" },
  { image: heroArena, label: "Arena Mall" },
  { image: heroSolaria, label: "Solaria Mall" },
];

const projects = [
  {
    name: "City Hub Mall",
    slug: "city-hub-mall",
    image: cityhubImg,
    description: "A premier commercial development strategically located in a prime area of Shorouk City.",
    tag: "Commercial & Retail",
  },
  {
    name: "Mercado Mall",
    slug: "mercado-mall",
    image: mercadoImg,
    description: "The largest fully-serviced commercial mall in El Shorouk, spanning three floors.",
    tag: "Mixed-Use",
  },
  {
    name: "Arena Mall",
    slug: "arena-mall",
    image: arenaImg,
    description: "A modern, mixed-use service mall offering commercial, administrative, and medical units.",
    tag: "Commercial & Medical",
  },
  {
    name: "Solaria Mall",
    slug: "solaria-mall",
    image: solariaImg,
    description: "An architectural gem covering 6,400 m² with upscale retail and medical facilities.",
    tag: "Retail & Medical",
  },
];

const whyInvest = [
  { icon: MapPin, title: "Prime Locations", text: "Strategic positions in East Cairo's fastest-growing corridor" },
  { icon: Layers, title: "Flexible Plans", text: "Payment plans designed for investors and business owners" },
  { icon: Building2, title: "Diverse Units", text: "Commercial, administrative & medical — from 30 to 300 m²" },
  { icon: TrendingUp, title: "High ROI", text: "Strong rental demand and consistent property appreciation" },
  { icon: ShieldCheck, title: "Full Management", text: "Professional property management for hassle-free ownership" },
];

const whyElShorouk = [
  { icon: MapPin, title: "Strategic Gateway", text: "Located at the heart of East Cairo's expanding urban corridor, with direct access to Cairo–Suez and Ring Road." },
  { icon: Landmark, title: "Government Investment", text: "Massive infrastructure upgrades including new highways, monorail, and public facilities driving long-term value." },
  { icon: GraduationCap, title: "Education Hub", text: "Home to major universities and schools, creating sustained demand for services and commercial activity." },
  { icon: HeartPulse, title: "Healthcare Demand", text: "A growing population with increasing need for medical facilities and healthcare-related commercial spaces." },
  { icon: Train, title: "Monorail Access", text: "The upcoming East Cairo monorail connects El Shorouk to New Administrative Capital and Greater Cairo." },
  { icon: TrendingUp, title: "Rising Property Values", text: "Consistent year-over-year appreciation driven by population growth and urban development momentum." },
];

const faqs = [
  { question: "What types of properties does ASWAQ Developments offer?", answer: "ASWAQ Developments offers a range of commercial real estate options, including commercial units for sale, units for rent, administrative spaces, and medical units located within strategic malls and commercial destinations." },
  { question: "How do I buy a unit or property in Shorouk City?", answer: "You first decide the type of property that matches your needs, discover the types we offer and locations, then contact us to request your unit." },
  { question: "Where can I buy a unit in Shorouk city?", answer: "ASWAQ Developments offers a range of commercial and retail spaces for sale across four major mall destinations: Solaria Mall, Arena Mall, Mercado Mall, and City Hub Mall. Units range from 24 m² up to 300 m²." },
  { question: "How many malls does ASWAQ Developments have units in?", answer: "ASWAQ Developments currently offers units in four major malls in Shorouk City: Solaria Mall, Arena Mall, Mercado Mall, and City Hub Mall." },
  { question: "What are the typical sizes of the spaces & units available?", answer: "Our units & spaces range from 30 m² up to 300 m², giving flexibility for small shops, medium-sized outlets, and larger flagship stores." },
  { question: "Are the commercial units available for both sale and rent?", answer: "Yes. ASWAQ Developments offers both commercial units for sale and units for rent across our four mall destinations." },
  { question: "Are there flexible payment plans for buying units?", answer: "Yes. ASWAQ Developments offers flexible payment plans for buyers interested in owning a unit, allowing investors and business owners to manage payments over time." },
];

const Index = () => {
  useSEO("ASWAQ Developments | Real Estate Developer in Egypt", "ASWAQ Developments delivers premium units for rent and property for sale in Egypt, with mixed-use properties in Shorouk City and flexible payment plans.");
  const { articles: latestNews } = useLatestNews("en", 3);
  const faqSchemaData = buildFaqSchema(faqs.map(f => ({ question: f.question, answer: f.answer })));

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <Layout>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={faqSchemaData} />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[550px] overflow-hidden" style={{ height: '100vh', maxHeight: '900px' }}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt={`ASWAQ Developments - ${heroSlides[currentSlide].label}`}
              className="w-full h-full object-cover object-center"
              fetchPriority={currentSlide === 0 ? "high" : "auto"}
              loading={currentSlide === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        </AnimatePresence>

        {/* Strong left-to-right gradient for text readability */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `
            linear-gradient(to right, hsl(222 47% 5% / 0.88) 0%, hsl(222 47% 5% / 0.72) 30%, hsl(222 47% 5% / 0.35) 55%, hsl(222 47% 5% / 0.08) 80%, transparent 100%),
            linear-gradient(to top, hsl(222 47% 5% / 0.75) 0%, transparent 40%)
          `
        }} />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-14 md:pb-18 lg:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-3 mb-5"
              >
                <div className="w-7 h-px bg-primary-foreground/25" />
                <p className="font-body text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-primary-foreground/60 font-semibold">
                  ASWAQ Developments & Project Management
                </p>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-display text-[2.25rem] md:text-[3rem] lg:text-[3.5rem] font-bold text-primary-foreground leading-[1.05] mb-5"
                style={{ letterSpacing: '-0.02em' }}
              >
                Building Landmark
                <br />
                Destinations
                <span className="block text-primary-foreground/60 text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem] mt-2 font-display font-medium" style={{ letterSpacing: '-0.01em' }}>
                  in El Shorouk, East Cairo
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-primary-foreground/60 font-body text-sm md:text-[15px] leading-[1.8] mb-8 max-w-md"
              >
                4 landmark malls delivering premium commercial, administrative & medical developments — backed by 20+ years of expertise.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link
                  to="/projects"
                  className="btn-premium px-8 py-3 text-[12.5px] rounded-lg font-body inline-flex items-center justify-center gap-2 group"
                >
                  Explore Projects
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/contact"
                  className="btn-outline-light px-8 py-3 text-[12.5px] rounded-lg font-body text-center"
                >
                  Request a Consultation
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 right-4 md:right-10 z-20 flex items-center gap-3">
          <div className="flex gap-1.5">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`rounded-full transition-all duration-500 ${i === currentSlide ? "w-7 h-1 bg-primary-foreground/60" : "w-1 h-1 bg-primary-foreground/20 hover:bg-primary-foreground/35"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <span className="text-[9px] text-primary-foreground/20 font-['Montserrat'] font-semibold tabular-nums">
            {String(currentSlide + 1).padStart(2, '0')}/{String(heroSlides.length).padStart(2, '0')}
          </span>
        </div>
      </section>

      {/* ═══════════════ SLIM PROOF BAR ═══════════════ */}
      <section className="bg-primary border-t border-primary-foreground/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center md:justify-between items-center py-6 md:py-7 gap-6 md:gap-4">
            {[
              { value: "20+", label: "Years of Expertise" },
              { value: "15+", label: "Successful Projects" },
              { value: "400+", label: "Satisfied Clients" },
              { value: "3B+", label: "EGP Investments" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex items-center gap-3 md:gap-4"
              >
                <span className="font-['Montserrat'] text-lg md:text-xl font-extrabold text-primary-foreground tracking-tight">
                  <AnimatedCounter value={stat.value} className="text-primary-foreground" />
                </span>
                <span className="text-[10px] md:text-[11px] text-primary-foreground/30 font-body tracking-[0.08em] uppercase leading-tight">
                  {stat.label}
                </span>
                {i < 3 && <div className="hidden md:block w-px h-6 bg-primary-foreground/[0.06] ml-4" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ABOUT / BRAND INTRO ═══════════════ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-steel/40" />
                <p className="section-label">Established Excellence</p>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-foreground mb-6 leading-[1.08]">
                The Trusted Real Estate{" "}
                <span className="text-navy-rich">Developer</span> in Egypt
              </h2>
              <p className="text-muted-foreground font-body text-[15px] leading-[1.85] mb-4">
                ASWAQ Developments is a forward-thinking real estate developer specializing in commercial, administrative, and medical projects across East Cairo.
              </p>
              <p className="text-muted-foreground font-body text-[15px] leading-[1.85] mb-8">
                Whether you're searching for property for sale, a unit for rent, or a mixed-use investment opportunity, ASWAQ delivers projects in strategic locations backed by smart planning and market-driven design.
              </p>
              <Link
                to="/about"
                className="btn-outline-dark px-6 py-2.5 text-[12.5px] rounded-lg font-body group"
              >
                Learn More About ASWAQ
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Single strong image composition instead of mall grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]" style={{ boxShadow: 'var(--shadow-xl)' }}>
                <img src={cityhubImg} alt="ASWAQ Developments - Premium Real Estate" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
              </div>
              {/* Floating credential */}
              <div
                className="absolute -bottom-6 -left-4 md:left-6 rounded-xl px-6 py-4"
                style={{
                  background: 'hsl(var(--ivory))',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid hsl(var(--border) / 0.5)',
                }}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-['Montserrat'] text-2xl font-extrabold text-foreground" style={{ letterSpacing: '-0.02em' }}>4</div>
                    <div className="text-[9px] text-muted-foreground font-body tracking-[0.1em] uppercase">Landmark Malls</div>
                  </div>
                  <div className="w-px h-8 bg-border/60" />
                  <div>
                    <div className="font-['Montserrat'] text-2xl font-extrabold text-foreground" style={{ letterSpacing: '-0.02em' }}>20+</div>
                    <div className="text-[9px] text-muted-foreground font-body tracking-[0.1em] uppercase">Years Active</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 4 LANDMARK MALLS ═══════════════ */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-steel/40" />
                <p className="section-label">Our Portfolio</p>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-foreground leading-[1.08]">
                4 Landmark Malls in El Shorouk
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-[12.5px] font-semibold font-body text-foreground hover:text-navy-rich transition-colors duration-300 group shrink-0"
            >
              View All Projects <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Featured project large */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <Link to={`/projects/${projects[0].slug}`} className="group block">
              <div className="relative overflow-hidden rounded-2xl aspect-[21/9]" style={{ boxShadow: 'var(--shadow-xl)' }}>
                <img
                  src={projects[0].image}
                  alt={`${projects[0].name} - ASWAQ Developments El Shorouk`}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/25 to-transparent" />
                <div className="absolute bottom-0 left-0 p-7 md:p-10 max-w-lg">
                  <span className="inline-block text-[9px] font-body font-semibold tracking-[0.14em] uppercase text-primary-foreground/40 mb-2">{projects[0].tag}</span>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-1.5">
                    {projects[0].name}
                  </h3>
                  <p className="text-primary-foreground/45 text-[13px] font-body leading-relaxed">{projects[0].description}</p>
                </div>
              </div>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {projects.slice(1).map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link to={`/projects/${project.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/5]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                    <img
                      src={project.image}
                      alt={`${project.name} - ASWAQ Developments El Shorouk`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/15 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <span className="inline-block text-[9px] font-body font-semibold tracking-[0.14em] uppercase text-primary-foreground/38 mb-1.5">{project.tag}</span>
                      <h3 className="font-display text-lg font-bold text-primary-foreground mb-1">
                        {project.name}
                      </h3>
                      <p className="text-primary-foreground/40 text-[12px] font-body line-clamp-2 leading-relaxed">{project.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY EL SHOROUK ═══════════════ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="w-8 h-px bg-steel/40" />
              <p className="section-label">Location Advantage</p>
              <div className="w-8 h-px bg-steel/40" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-foreground leading-[1.08] mb-4">
              Why El Shorouk
            </h2>
            <p className="text-muted-foreground font-body text-[15px] leading-relaxed max-w-2xl mx-auto">
              El Shorouk City is one of East Cairo's most dynamic growth corridors — a strategic location where infrastructure, education, and commercial demand converge.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyElShorouk.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="p-6 rounded-xl bg-card border border-border/40 hover:border-border transition-all duration-500 group"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  <item.icon size={17} className="text-foreground" />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-[12.5px] text-muted-foreground font-body leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY INVEST ═══════════════ */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="w-8 h-px bg-steel/40" />
              <p className="section-label">Investment Advantages</p>
              <div className="w-8 h-px bg-steel/40" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-foreground leading-[1.08]">
              Why Invest with ASWAQ
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {whyInvest.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="group text-center p-6 rounded-xl bg-card border border-border/40 hover:border-border transition-all duration-500"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-4">
                  <item.icon size={18} className="text-foreground" />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-[12px] text-muted-foreground font-body leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <TrustedBySection lang="en" />

      {/* ═══════════════ UNITS + ROI ═══════════════ */}
      <section className="relative py-20 md:py-28 bg-primary overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-foreground/[0.02] to-transparent" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary-foreground/[0.01] blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <div className="flex items-center gap-3 justify-center mb-5">
                <div className="w-6 h-px bg-primary-foreground/15" />
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase font-body text-primary-foreground/40">Available Now</p>
                <div className="w-6 h-px bg-primary-foreground/15" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-primary-foreground mb-5 leading-[1.08]">
                Find Your Ideal Unit
              </h2>
              <p className="text-primary-foreground/45 font-body max-w-xl mx-auto mb-8 text-[15px] leading-relaxed">
                Browse our available units and select what matches your business or investment plan.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { label: "All Properties", href: "/units" },
                  { label: "Commercial", href: "/units/commercial-for-sale" },
                  { label: "Administrative", href: "/units/administrative-for-sale" },
                  { label: "Medical", href: "/units/medical-for-sale" },
                ].map((tag) => (
                  <Link
                    key={tag.label}
                    to={tag.href}
                    className="border border-primary-foreground/10 text-primary-foreground/50 px-4 py-1.5 rounded-full text-[11px] font-body font-medium hover:border-primary-foreground/22 hover:text-primary-foreground/70 transition-colors duration-300"
                  >
                    {tag.label}
                  </Link>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="w-full max-w-5xl mx-auto"
            >
              <ROICalculator wide />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <Link
                to="/units"
                className="btn-outline-light px-9 py-3.5 text-[12.5px] rounded-lg font-body group"
              >
                Reserve Your Unit
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ LATEST NEWS ═══════════════ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-steel/40" />
                <p className="section-label">Insights & Updates</p>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Latest News
              </h2>
            </div>
            <Link to="/news" className="text-foreground font-semibold font-body text-[12.5px] inline-flex items-center gap-1.5 hover:gap-2.5 hover:text-navy-rich transition-all duration-300 group">
              View All <ChevronRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {latestNews.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link
                  to={`/news/${article.id}`}
                  className="group block rounded-xl overflow-hidden bg-card border border-border/40 hover:border-border transition-all duration-500 hover:-translate-y-1"
                  style={{ boxShadow: 'var(--shadow-sm)' }}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      width={400}
                      height={250}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-[15px] md:text-base font-semibold text-foreground group-hover:text-navy-rich transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-[12.5px] text-muted-foreground font-body mt-2.5 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-foreground mt-4 font-body font-semibold group-hover:gap-2 group-hover:text-navy-rich transition-all duration-300 tracking-wide uppercase">
                      Read More <ChevronRight size={11} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection faqs={faqs} />

      {/* Bottom CTA */}
      <CTASection />
    </Layout>
  );
};

export default Index;

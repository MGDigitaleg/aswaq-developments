import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, TrendingUp, Layers, ShieldCheck, Building2, ChevronRight, ArrowRight } from "lucide-react";
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

const stats = [
  { value: "20+", label: "Years of Expertise" },
  { value: "15+", label: "Successful Projects" },
  { value: "400+", label: "Satisfied Clients" },
  { value: "3+", label: "Billion EGP Investments" },
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

const faqs = [
  {
    question: "What types of properties does ASWAQ Developments offer?",
    answer: "ASWAQ Developments offers a range of commercial real estate options, including commercial units for sale, units for rent, administrative spaces, and medical units located within strategic malls and commercial destinations.",
  },
  {
    question: "How do I buy a unit or property in Shorouk City?",
    answer: "You first decide the type of property that matches your needs, discover the types we offer and locations, then contact us to request your unit.",
  },
  {
    question: "Where can I buy a unit in Shorouk city?",
    answer: "ASWAQ Developments offers a range of commercial and retail spaces for sale across four major mall destinations: Solaria Mall, Arena Mall, Mercado Mall, and City Hub Mall. Units range from 24 m² up to 300 m².",
  },
  {
    question: "How many malls does ASWAQ Developments have units in?",
    answer: "ASWAQ Developments currently offers units in four major malls in Shorouk City: Solaria Mall, Arena Mall, Mercado Mall, and City Hub Mall.",
  },
  {
    question: "What are the typical sizes of the spaces & units available?",
    answer: "Our units & spaces range from 30 m² up to 300 m², giving flexibility for small shops, medium-sized outlets, and larger flagship stores.",
  },
  {
    question: "Are the commercial units available for both sale and rent?",
    answer: "Yes. ASWAQ Developments offers both commercial units for sale and units for rent across our four mall destinations.",
  },
  {
    question: "Are there flexible payment plans for buying units?",
    answer: "Yes. ASWAQ Developments offers flexible payment plans for buyers interested in owning a unit, allowing investors and business owners to manage payments over time.",
  },
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
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <Layout>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={faqSchemaData} />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[600px] overflow-hidden" style={{ height: '100vh', maxHeight: '920px' }}>
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

        {/* Cinematic overlays */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, hsl(226 63% 6% / 0.5) 0%, hsl(226 63% 6% / 0.15) 35%, hsl(226 63% 6% / 0.6) 75%, hsl(226 63% 6% / 0.88) 100%)' }} />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-body text-[11px] md:text-xs tracking-[0.3em] uppercase mb-5 text-primary-foreground/50"
              >
                ASWAQ Developments & Project Management
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.05] mb-5"
                style={{ letterSpacing: '-0.02em' }}
              >
                4 Landmark Malls{" "}
                <span className="block text-primary-foreground/60 text-3xl md:text-4xl lg:text-[2.75rem] mt-1">
                  in El Shorouk, East Cairo
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="text-primary-foreground/50 font-body text-sm md:text-[15px] leading-[1.8] mb-8 max-w-lg"
              >
                Premium commercial, administrative & medical developments backed by 20+ years of expertise and 3+ billion EGP in investments.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.75 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link
                  to="/projects"
                  className="btn-premium px-8 py-3.5 text-sm rounded-lg font-body inline-flex items-center justify-center gap-2 group"
                >
                  Explore Projects
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/contact"
                  className="btn-outline-light px-8 py-3.5 text-sm rounded-lg font-body text-center"
                >
                  Request a Consultation
                </Link>
              </motion.div>
            </div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex items-center gap-8 md:gap-12 mt-12 pt-8 border-t border-primary-foreground/[0.08]"
            >
              {[
                { value: "20+", label: "Years" },
                { value: "4", label: "Malls" },
                { value: "3B+", label: "EGP Invested" },
                { value: "400+", label: "Clients" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-['Montserrat'] text-xl md:text-2xl font-extrabold text-primary-foreground" style={{ letterSpacing: '-0.02em' }}>
                    <AnimatedCounter value={s.value} className="text-primary-foreground" />
                  </div>
                  <div className="text-[10px] text-primary-foreground/35 font-body tracking-[0.12em] uppercase mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Slide navigation */}
        <div className="absolute bottom-8 right-4 md:right-8 z-20 flex items-center gap-3">
          <div className="flex gap-1.5">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`rounded-full transition-all duration-500 ${i === currentSlide ? "w-7 h-1.5 bg-primary-foreground/80" : "w-1.5 h-1.5 bg-primary-foreground/25 hover:bg-primary-foreground/50"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <span className="text-[11px] text-primary-foreground/30 font-['Montserrat'] font-semibold ml-1">
            {String(currentSlide + 1).padStart(2, '0')}/{String(heroSlides.length).padStart(2, '0')}
          </span>
        </div>
      </section>

      {/* ═══════════════ STATS + ABOUT ═══════════════ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-20">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group text-center p-6 md:p-8 rounded-2xl bg-card border border-border/40 hover:-translate-y-1 hover:border-navy/15 transition-all duration-500 ease-out"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="font-['Montserrat'] text-3xl md:text-4xl lg:text-[3.25rem] font-extrabold tracking-tight text-foreground mb-2">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-xs text-muted-foreground font-body tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* About intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="section-label mb-4">Established Excellence</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-6 leading-[1.1]">
                The Trusted Real Estate Developer in Egypt
              </h2>
              <p className="text-muted-foreground font-body text-[15px] leading-[1.9] mb-6">
                ASWAQ Developments is a forward-thinking real estate developer specializing in commercial, administrative, and medical projects across East Cairo.
              </p>
              <p className="text-muted-foreground font-body text-[15px] leading-[1.9] mb-8">
                Whether you're searching for property for sale, a unit for rent, or a mixed-use investment opportunity, ASWAQ delivers projects in strategic locations backed by smart planning and market-driven design.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold font-body text-foreground hover:text-navy-rich transition-colors duration-300 group"
              >
                Learn More About ASWAQ
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-3">
                {projects.slice(0, 4).map((p) => (
                  <Link
                    key={p.slug}
                    to={`/projects/${p.slug}`}
                    className="group relative aspect-square rounded-xl overflow-hidden"
                    style={{ boxShadow: 'var(--shadow-md)' }}
                  >
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                    <span className="absolute bottom-3 left-3 right-3 text-primary-foreground text-xs font-body font-semibold">{p.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PROJECTS ═══════════════ */}
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
              <p className="section-label mb-3">Our Portfolio</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-tight">
                4 Landmark Malls in Shorouk City
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold font-body text-foreground hover:text-navy-rich transition-colors duration-300 group shrink-0"
            >
              View All Projects <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Featured project — first one large */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            {projects.slice(0, 2).map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link to={`/projects/${project.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl aspect-[16/10]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                    <img
                      src={project.image}
                      alt={`${project.name} - ASWAQ Developments El Shorouk`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <span className="inline-block text-[10px] font-body font-semibold tracking-[0.12em] uppercase text-primary-foreground/50 mb-2">{project.tag}</span>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-1.5">
                        {project.name}
                      </h3>
                      <p className="text-primary-foreground/50 text-sm font-body line-clamp-2 max-w-md">{project.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.slice(2).map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link to={`/projects/${project.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl aspect-[16/10]" style={{ boxShadow: 'var(--shadow-lg)' }}>
                    <img
                      src={project.image}
                      alt={`${project.name} - ASWAQ Developments El Shorouk`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block text-[10px] font-body font-semibold tracking-[0.12em] uppercase text-primary-foreground/50 mb-2">{project.tag}</span>
                      <h3 className="font-display text-lg md:text-xl font-bold text-primary-foreground mb-1">
                        {project.name}
                      </h3>
                      <p className="text-primary-foreground/50 text-sm font-body line-clamp-2">{project.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY INVEST ═══════════════ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="section-label mb-3">Investment Advantages</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground">
              Why Invest with ASWAQ Developments
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {whyInvest.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="group text-center p-6 md:p-7 rounded-2xl bg-card border border-border/30 hover:border-navy/12 transition-all duration-500"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-12 h-12 rounded-xl bg-navy/[0.06] flex items-center justify-center mx-auto mb-4 group-hover:bg-navy/[0.1] transition-colors duration-300">
                  <item.icon size={22} className="text-navy" />
                </div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <TrustedBySection lang="en" />

      {/* ═══════════════ UNITS CTA + ROI ═══════════════ */}
      <section className="relative py-20 md:py-28 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-gradient-to-br from-steel/20 to-transparent" />
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
              <p className="text-[10px] font-semibold tracking-[0.25em] uppercase font-body text-primary-foreground/45 mb-4">Available Now</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-primary-foreground mb-5 leading-tight">
                Units Are Selling Fast, Don't Miss Out
              </h2>
              <p className="text-primary-foreground/50 font-body max-w-2xl mx-auto mb-8 text-[15px] leading-relaxed">
                Browse our available units and select what matches your business or investment plan.
              </p>
              <div className="flex flex-wrap gap-2.5 justify-center">
                {[
                  { label: "Mixed-use Properties", href: "/units" },
                  { label: "Commercial Units", href: "/units/commercial-for-sale" },
                  { label: "Administrative Units", href: "/units/administrative-for-sale" },
                  { label: "Medical Units", href: "/units/medical-for-sale" },
                ].map((tag) => (
                  <Link
                    key={tag.label}
                    to={tag.href}
                    className="border border-primary-foreground/15 text-primary-foreground/60 px-5 py-2 rounded-full text-[13px] font-body font-medium hover:border-primary-foreground/30 hover:text-primary-foreground/80 transition-colors duration-300"
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
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-5xl mx-auto"
            >
              <ROICalculator wide />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                to="/units"
                className="inline-flex items-center gap-2 border border-primary-foreground/25 text-primary-foreground px-9 py-4 text-sm rounded-lg font-body font-semibold group hover:bg-primary-foreground/[0.08] hover:border-primary-foreground/40 transition-all duration-300"
              >
                Reserve Your Unit
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
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
              <p className="section-label mb-3">Insights & Updates</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Latest News
              </h2>
            </div>
            <Link to="/news" className="text-foreground font-semibold font-body text-sm inline-flex items-center gap-1.5 hover:gap-2.5 hover:text-navy-rich transition-all duration-300 group">
              View All <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
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
                  className="group block rounded-2xl overflow-hidden bg-card border border-border/30 hover:border-navy/10 transition-all duration-500 hover:-translate-y-1"
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
                  <div className="p-5 md:p-6">
                    <h3 className="font-display text-base md:text-lg font-semibold text-foreground group-hover:text-navy-rich transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body mt-2.5 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-[13px] text-foreground mt-4 font-body font-semibold group-hover:gap-2 group-hover:text-navy-rich transition-all duration-300">
                      Read More <ChevronRight size={13} />
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

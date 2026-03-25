import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import { useLatestNews } from "@/hooks/useNewsArticles";
import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import UserJourneyPaths from "@/components/UserJourneyPaths";
import TrustSection from "@/components/TrustSection";
import useSEO from "@/hooks/useSEO";
import JsonLd, { organizationSchema, websiteSchema, buildFaqSchema } from "@/components/JsonLd";
import heroBg from "@/assets/hero-building.jpg";
import heroMercado from "@/assets/hero-mercado.jpg";
import heroArena from "@/assets/hero-arena.jpg";
import heroSolaria from "@/assets/hero-solaria.jpg";
import cityhubImg from "@/assets/cityhub-mall.jpg";
import mercadoImg from "@/assets/mercado-mall.jpg";
import arenaImg from "@/assets/arena-mall.jpg";
import solariaImg from "@/assets/solaria-mall.jpg";

const heroSlides = [
  { image: heroBg, label: "City Hub Mall" },
  { image: heroMercado, label: "Mercado Mall" },
  { image: heroArena, label: "Arena Mall" },
  { image: heroSolaria, label: "Solaria Mall" },
];

const projects = [
  {
    name: "City Hub Mall",
    image: cityhubImg,
    href: "/projects/city-hub-mall",
    description: "A premier commercial development strategically located in the heart of Shorouk City.",
    location: "Shorouk City, East Cairo",
    unitTypes: ["Commercial"],
  },
  {
    name: "Mercado Mall",
    image: mercadoImg,
    href: "/projects/mercado-mall",
    description: "The largest fully-serviced commercial mall in Shorouk, spanning three floors.",
    location: "Shorouk City, East Cairo",
    unitTypes: ["Commercial"],
  },
  {
    name: "Arena Mall",
    image: arenaImg,
    href: "/projects/arena-mall",
    description: "A modern, mixed-use service mall offering commercial, administrative, and medical units.",
    location: "Shorouk City, East Cairo",
    unitTypes: ["Commercial", "Administrative", "Medical"],
  },
  {
    name: "Solaria Mall",
    image: solariaImg,
    href: "/projects/solaria-mall",
    description: "An architectural gem covering 6,400 m² with upscale retail and medical facilities.",
    location: "Shorouk City, East Cairo",
    unitTypes: ["Commercial", "Administrative", "Medical"],
  },
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
  useSEO(
    "ASWAQ Developments | Premium Real Estate Developer in Egypt",
    "ASWAQ Developments delivers premium mixed-use properties in Shorouk City — commercial, administrative & medical units for sale, rent & investment."
  );
  const { articles: latestNews } = useLatestNews("en", 3);
  const faqSchemaData = buildFaqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })));

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

      {/* ═══ PREMIUM HERO ═══ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background slides */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
          />
        </AnimatePresence>

        {/* Premium gradient overlay */}
        <div className="absolute inset-0 gradient-hero-overlay" />

        {/* Content */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[90vh] py-24">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-accent font-body font-semibold tracking-[0.2em] uppercase text-xs mb-5">
                Premium Real Estate Developer
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-[1.1] mb-6">
                Redefining{" "}
                <span className="italic text-gradient-gold">Living</span>
                <br />
                Excellence
              </h1>
              <p className="text-primary-foreground/70 font-body text-base md:text-lg max-w-lg mb-8 leading-relaxed">
                Premium mixed-use developments in Shorouk City — commercial, administrative & medical spaces designed for growth and strong returns.
              </p>

              {/* CTA Group */}
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 font-body text-sm shadow-gold"
                >
                  Explore Projects
                  <ArrowUpRight size={16} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-3.5 font-semibold rounded-lg hover:bg-primary-foreground/10 transition-all duration-300 font-body text-sm"
                >
                  Request Availability
                </Link>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-8">
                {[
                  { value: "20+", label: "Years" },
                  { value: "15+", label: "Projects" },
                  { value: "400+", label: "Clients" },
                  { value: "3B+", label: "EGP Invested" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-2xl md:text-3xl font-bold text-accent">
                      {stat.value}
                    </div>
                    <div className="text-primary-foreground/50 text-xs font-body uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: empty on desktop (the image covers this), slide indicators */}
            <div className="hidden lg:flex flex-col items-end justify-end pb-12">
              {/* Slide indicators vertical */}
              <div className="flex flex-col gap-2">
                {heroSlides.map((slide, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`group flex items-center gap-3 transition-all duration-300 ${
                      i === currentSlide ? "opacity-100" : "opacity-50 hover:opacity-80"
                    }`}
                    aria-label={`Go to ${slide.label}`}
                  >
                    <span
                      className={`text-xs font-body text-primary-foreground text-right transition-all duration-300 ${
                        i === currentSlide ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {slide.label}
                    </span>
                    <div
                      className={`rounded-full transition-all duration-300 ${
                        i === currentSlide
                          ? "w-3 h-8 bg-accent"
                          : "w-3 h-3 bg-primary-foreground/40"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 lg:hidden">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentSlide ? "bg-accent w-8 h-3" : "bg-primary-foreground/50 w-3 h-3"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ═══ USER JOURNEY PATHS ═══ */}
      <UserJourneyPaths />

      {/* ═══ PROJECTS ═══ */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-accent font-body font-semibold tracking-widest uppercase text-xs mb-3">
              Our Portfolio
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Premium Developments
            </h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">
              Four strategically located malls in Shorouk City, designed for businesses, investors, and healthcare providers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={project.href}
                  className="group block relative rounded-2xl overflow-hidden shadow-premium-md card-premium"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                    {/* Unit type tags */}
                    <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
                      {project.unitTypes.map((type) => (
                        <span
                          key={type}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-primary-foreground/15 text-primary-foreground/90 backdrop-blur-sm border border-primary-foreground/10 font-body"
                        >
                          {type}
                        </span>
                      ))}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-1.5 text-primary-foreground/60 text-xs font-body mb-2">
                        <span className="w-1 h-1 rounded-full bg-accent" />
                        {project.location}
                      </div>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground mb-2">
                        {project.name}
                      </h3>
                      <p className="text-primary-foreground/70 font-body text-sm line-clamp-2 mb-3 max-w-sm">
                        {project.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm font-body group-hover:gap-3 transition-all duration-300">
                        Explore Project
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRUST SECTION ═══ */}
      <TrustSection />

      {/* ═══ UNITS CTA ═══ */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent font-body font-semibold tracking-widest uppercase text-xs mb-3">
              Available Now
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Find Your Ideal Space
            </h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto mb-8">
              Browse our available units and select what matches your business or investment plan.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {[
                { label: "Units for Sale", href: "/units/for-sale" },
                { label: "Commercial Units", href: "/units/commercial-for-sale" },
                { label: "Administrative Units", href: "/units/administrative-for-sale" },
                { label: "Medical Units", href: "/units/medical-for-sale" },
                { label: "Units for Rent", href: "/units/for-rent" },
              ].map((tag) => (
                <Link
                  key={tag.label}
                  to={tag.href}
                  className="border border-border text-foreground/70 px-5 py-2 rounded-full text-sm font-body hover:border-accent hover:text-accent transition-all duration-300"
                >
                  {tag.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/units"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 font-semibold rounded-lg hover:bg-navy-light transition-all duration-300 font-body text-sm"
              >
                Browse All Units
                <ArrowUpRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 font-body text-sm shadow-gold"
              >
                Request Availability
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ LATEST NEWS ═══ */}
      {latestNews.length > 0 && (
        <section className="py-24 bg-surface">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="text-accent font-body font-semibold tracking-widest uppercase text-xs mb-3">
                  Stay Updated
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Latest News
                </h2>
              </div>
              <Link
                to="/news"
                className="text-accent font-semibold font-body text-sm inline-flex items-center gap-1 hover:gap-2 transition-all duration-300"
              >
                View All <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestNews.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={`/news/${article.id}`}
                    className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-premium-lg transition-all duration-500 card-premium"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-lg font-semibold text-foreground mt-1 group-hover:text-accent transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-body mt-2 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm text-accent mt-4 font-body font-semibold group-hover:gap-2 transition-all duration-300">
                        Read More <ChevronRight size={14} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ FAQs ═══ */}
      <FAQSection faqs={faqs} />

      {/* ═══ BOTTOM CTA ═══ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-premium" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent font-body font-semibold tracking-widest uppercase text-xs mb-3">
              Get Started
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Start Your Next Real Estate Move
            </h2>
            <p className="text-primary-foreground/60 font-body max-w-2xl mx-auto mb-8">
              Whether you're investing, opening a business, or seeking a medical space — ASWAQ has the right unit for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 font-body text-sm shadow-gold"
              >
                Book a Consultation
                <ArrowUpRight size={16} />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-3.5 font-semibold rounded-lg hover:bg-primary-foreground/10 transition-all duration-300 font-body text-sm"
              >
                View All Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

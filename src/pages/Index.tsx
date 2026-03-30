import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, TrendingUp, Layers, ShieldCheck, Building2, ChevronRight, ArrowRight } from "lucide-react";
import { useLatestNews } from "@/hooks/useNewsArticles";
import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import ROICalculator from "@/components/ROICalculator";
import useSEO from "@/hooks/useSEO";
import JsonLd, { organizationSchema, websiteSchema, buildFaqSchema } from "@/components/JsonLd";
import heroBg from "@/assets/hero-building.webp";
import heroMercado from "@/assets/hero-mercado.webp";
import heroArena from "@/assets/hero-arena.webp";
import heroSolaria from "@/assets/hero-solaria.webp";
import cityhubImg from "@/assets/cityhub-mall.webp";

const heroSlides = [heroBg, heroMercado, heroArena, heroSolaria];
import mercadoImg from "@/assets/mercado-mall.webp";
import arenaImg from "@/assets/arena-mall.webp";
import solariaImg from "@/assets/solaria-mall.webp";

const stats = [
  { value: "20+", label: "Years of Expertise" },
  { value: "15+", label: "Successful Projects" },
  { value: "400+", label: "Satisfied Clients" },
  { value: "3+", label: "Billion EGP Investments" },
];

const projects = [
  {
    name: "City Hub Mall",
    image: cityhubImg,
    description: "A premier commercial development strategically located in a prime area of Shorouk City.",
  },
  {
    name: "Mercado Mall",
    image: mercadoImg,
    description: "The largest fully-serviced commercial mall in El Shorouk, spanning three floors.",
  },
  {
    name: "Arena Mall",
    image: arenaImg,
    description: "A modern, mixed-use service mall offering commercial, administrative, and medical units.",
  },
  {
    name: "Solaria Mall",
    image: solariaImg,
    description: "An architectural gem covering 6,400 m² with upscale retail and medical facilities.",
  },
];

const whyInvest = [
  { icon: MapPin, text: "Prime East Cairo Locations" },
  { icon: Layers, text: "Flexible Payment Plans" },
  { icon: Building2, text: "Wide Range of Unit Sizes" },
  { icon: TrendingUp, text: "High ROI & Strong Demand" },
  { icon: ShieldCheck, text: "Professional Property Management" },
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

      {/* Hero — Cinematic Full-Width Slider */}
      <section className="relative min-h-[700px] overflow-hidden" style={{ height: 'calc(100vh + 100px)', maxHeight: '1200px' }}>
        {/* Full-bleed background slider */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide]}
              alt=""
              className="w-full h-full object-cover object-center"
              fetchPriority={currentSlide === 0 ? "high" : "auto"}
              loading={currentSlide === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, hsl(var(--navy) / 0.35) 0%, hsl(var(--navy) / 0.15) 40%, hsl(var(--navy) / 0.5) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 50%, hsl(var(--navy) / 0.4) 0%, transparent 70%)' }} />

        {/* Content overlay container */}
        <div className="relative z-10 h-full flex items-center pt-[120px]">
          <div className="container mx-auto px-4 md:px-8 lg:px-12">
            <div className="flex justify-center">
              {/* Glass content card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[580px] rounded-3xl p-8 md:p-12 lg:p-14 text-center"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--navy) / 0.65) 0%, hsl(var(--navy) / 0.45) 100%)',
                  backdropFilter: 'blur(24px) saturate(1.4)',
                  WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
                  border: '1px solid hsl(0 0% 100% / 0.08)',
                  boxShadow: '0 32px 80px -12px hsl(var(--navy) / 0.5), inset 0 1px 0 hsl(0 0% 100% / 0.06)',
                }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-primary-foreground/60 font-body font-semibold tracking-[0.35em] uppercase text-[11px] mb-6"
                >
                  ASWAQ Developments
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground leading-[1.08] mb-6"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  Redefining<br />
                  <span className="italic text-primary-foreground">
                    Living Excellence
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.75 }}
                  className="text-primary-foreground/65 font-body text-sm md:text-base leading-[1.8] mb-10 max-w-[420px] mx-auto"
                >
                  Premium commercial, administrative & medical developments in Egypt's most sought-after locations.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                  <Link
                    to="/projects"
                    className="group bg-accent text-accent-foreground px-8 py-3.5 font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 font-body inline-flex items-center justify-center gap-2"
                    style={{ boxShadow: '0 4px 24px -4px hsl(var(--accent) / 0.4)' }}
                  >
                    Explore Projects
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/about"
                    className="border border-primary-foreground/20 text-primary-foreground/90 px-8 py-3.5 font-semibold rounded-lg hover:bg-primary-foreground/10 hover:border-primary-foreground/35 transition-all duration-300 font-body text-center"
                  >
                    Learn More About ASWAQ Developments
                  </Link>
                </motion.div>

                {/* Trust badges */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                  className="flex items-center justify-center gap-8 mt-10 pt-8 border-t border-primary-foreground/[0.08]"
                >
                  {[
                    { value: "20+", label: "Years" },
                    { value: "15+", label: "Projects" },
                    { value: "3B+", label: "EGP" },
                  ].map((s, i) => (
                    <div key={s.label} className="text-center">
                      <div className="font-display text-xl lg:text-2xl font-bold text-primary-foreground" style={{ letterSpacing: '-0.02em' }}><AnimatedCounter value={s.value} /></div>
                      <div className="text-[10px] text-primary-foreground/45 font-body tracking-[0.15em] uppercase mt-1">{s.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Slide navigation — bottom center */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
          {/* Prev */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              background: 'hsl(0 0% 100% / 0.1)',
              backdropFilter: 'blur(8px)',
              border: '1px solid hsl(0 0% 100% / 0.12)',
            }}
            aria-label="Previous slide"
          >
            <ChevronRight size={18} className="text-primary-foreground/80 rotate-180" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`rounded-full transition-all duration-500 ${
                  i === currentSlide ? "w-8 h-2" : "w-2 h-2 hover:bg-primary-foreground/50"
                }`}
                style={{
                  backgroundColor: i === currentSlide ? 'hsl(var(--accent))' : 'hsl(0 0% 100% / 0.3)',
                  boxShadow: i === currentSlide ? '0 0 14px hsl(var(--accent) / 0.5)' : 'none',
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            style={{
              background: 'hsl(0 0% 100% / 0.1)',
              backdropFilter: 'blur(8px)',
              border: '1px solid hsl(0 0% 100% / 0.12)',
            }}
            aria-label="Next slide"
          >
            <ChevronRight size={18} className="text-primary-foreground/80" />
          </button>
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-8 right-8 z-20 hidden md:flex items-baseline gap-1 font-body">
          <span className="text-2xl font-display font-bold text-primary-foreground/90">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="text-primary-foreground/30 text-sm mx-1">/</span>
          <span className="text-sm text-primary-foreground/40">{String(heroSlides.length).padStart(2, '0')}</span>
        </div>
      </section>

      {/* Stats + About */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="section-divider mb-6" />
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground mb-5 leading-tight">
                ASWAQ Developments, The Trusted Real Estate Developer in Egypt
              </h2>
              <p className="text-muted-foreground max-w-3xl mx-auto font-body text-base md:text-lg leading-relaxed">
                ASWAQ Developments is a forward-thinking real estate developer specializing in commercial, administrative, and medical projects across East Cairo.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center p-6 md:p-8 rounded-xl bg-cream border border-border/50 hover:border-accent/20 transition-all duration-500"
                style={{ boxShadow: "var(--shadow-sm)" }}
              >
                <div className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-sm text-muted-foreground font-body">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-padding bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="section-divider mb-6" />
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground">
              Our Projects at ASWAQ Developments
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link to="/projects" className="group block">
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3]" style={{ boxShadow: 'var(--shadow-md)' }}>
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent group-hover:from-primary/60 transition-all duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-display text-lg font-bold text-primary-foreground drop-shadow-sm">
                        {project.name}
                      </h3>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                      <span className="text-primary-foreground font-body font-semibold text-sm inline-flex items-center gap-1.5">
                        View Project <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground font-body line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Invest */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div className="section-divider mb-6" />
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground">
              Why Invest with ASWAQ Developments
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {whyInvest.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex flex-col items-center gap-4 p-5"
              >
                <div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center border border-border/50 transition-all duration-300 hover:border-secondary/30 hover:shadow-[var(--shadow-md)]">
                  <item.icon size={26} className="text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground font-body leading-snug">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Units CTA Banner */}
      <section className="relative py-28 md:py-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left: CTA content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center lg:text-left"
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-primary-foreground mb-5">
                Units Are Selling Fast, Don't Miss Out!
              </h2>
              <p className="text-primary-foreground/70 font-body max-w-2xl mb-6 text-base leading-relaxed">
                Browse our available units and select what matches your business or investment plan.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
                {[
                  { label: "Mixed-use Properties", href: "/units" },
                  { label: "Commercial Units", href: "/units/commercial-for-sale" },
                  { label: "Administrative Units", href: "/units/administrative-for-sale" },
                  { label: "Medical Units", href: "/units/medical-for-sale" },
                ].map((tag) => (
                  <Link
                    key={tag.label}
                    to={tag.href}
                    className="border border-primary-foreground/20 text-primary-foreground/80 px-5 py-2 rounded-full text-sm font-body hover:bg-primary-foreground/10 hover:border-primary-foreground/40 transition-all duration-300"
                  >
                    {tag.label}
                  </Link>
                ))}
              </div>
              <Link
                to="/units"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-10 py-3.5 font-semibold rounded-md hover:bg-gold-light transition-all duration-300 font-body group"
              >
                Reserve Your Unit
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Right: ROI Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full lg:w-[420px] shrink-0"
            >
              <ROICalculator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-14">
            <div>
              <div className="section-divider mb-4" style={{ marginLeft: 0 }} />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Latest News
              </h2>
            </div>
            <Link to="/news" className="text-primary font-semibold font-body text-sm inline-flex items-center gap-1.5 hover:gap-2.5 transition-all duration-300">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {latestNews.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={`/news/${article.id}`}
                  className="group block premium-card overflow-hidden"
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
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground mt-1 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body mt-3 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm text-primary mt-4 font-body font-semibold group-hover:gap-2.5 transition-all duration-300">
                      Read More <ChevronRight size={14} />
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

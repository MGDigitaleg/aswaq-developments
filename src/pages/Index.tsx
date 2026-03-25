import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, TrendingUp, Layers, ShieldCheck, Building2, ChevronRight, ArrowRight } from "lucide-react";
import { useLatestNews } from "@/hooks/useNewsArticles";
import { useState, useEffect, useCallback } from "react";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import useSEO from "@/hooks/useSEO";
import JsonLd, { organizationSchema, websiteSchema, buildFaqSchema } from "@/components/JsonLd";
import heroBg from "@/assets/hero-building.jpg";
import heroMercado from "@/assets/hero-mercado.jpg";
import heroArena from "@/assets/hero-arena.jpg";
import heroSolaria from "@/assets/hero-solaria.jpg";
import cityhubImg from "@/assets/cityhub-mall.jpg";

const heroSlides = [heroBg, heroMercado, heroArena, heroSolaria];
import mercadoImg from "@/assets/mercado-mall.jpg";
import arenaImg from "@/assets/arena-mall.jpg";
import solariaImg from "@/assets/solaria-mall.jpg";

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

      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[currentSlide]})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 hero-gradient" />

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? "bg-accent w-10" : "bg-primary-foreground/40 w-4 hover:bg-primary-foreground/70"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative z-10 text-center px-4 max-w-3xl"
        >
          <p className="text-accent font-body font-semibold tracking-[0.25em] uppercase text-xs mb-6">
            ASWAQ Developments
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] mb-8">
            Redefining<br />
            <span className="italic text-accent">Living Excellence</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              className="group bg-accent text-accent-foreground px-8 py-3.5 font-semibold rounded-md hover:bg-gold-light transition-all duration-300 font-body inline-flex items-center justify-center gap-2"
            >
              Explore Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/about"
              className="border border-primary-foreground/30 text-primary-foreground px-8 py-3.5 font-semibold rounded-md hover:bg-primary-foreground/10 hover:border-primary-foreground/50 transition-all duration-300 font-body"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
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
              <p className="text-muted-foreground max-w-3xl mx-auto font-body text-base leading-relaxed">
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
                className="text-center p-6 md:p-8 rounded-xl bg-cream border border-border/50"
              >
                <div className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
                  {stat.value}
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
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent group-hover:from-primary/50 transition-all duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-display text-lg font-bold text-primary-foreground drop-shadow-sm">
                        {project.name}
                      </h3>
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
                className="flex flex-col items-center gap-4 p-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-cream flex items-center justify-center border border-border/50 transition-all duration-300 hover:border-accent/30 hover:shadow-[var(--shadow-gold)]">
                  <item.icon size={26} className="text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground font-body leading-snug">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Units CTA Banner */}
      <section className="relative py-28 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-primary-foreground mb-5">
              Units Are Selling Fast, Don't Miss Out!
            </h2>
            <p className="text-primary-foreground/70 font-body max-w-2xl mx-auto mb-6 text-base leading-relaxed">
              Browse our available units and select what matches your business or investment plan.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-10">
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
            <Link to="/news" className="text-accent font-semibold font-body text-sm inline-flex items-center gap-1.5 hover:gap-2.5 transition-all duration-300">
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
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground mt-1 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body mt-3 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm text-accent mt-4 font-body font-semibold group-hover:gap-2.5 transition-all duration-300">
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

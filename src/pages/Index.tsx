import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Layers, ShieldCheck, Building2, ChevronRight, Newspaper } from "lucide-react";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import heroBg from "@/assets/hero-building.jpg";
import cityhubImg from "@/assets/cityhub-mall.jpg";
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
    answer: "ASWAQ Developments offers a range of commercial and retail spaces for sale across four major mall destinations: Solaria Mall, Arena Mall, Mercado Mall, and City Hub Mall. Units range from 30 m² up to 300 m².",
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

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-primary/60" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-3xl"
        >
          <p className="text-accent font-body font-medium tracking-widest uppercase text-sm mb-4">
            ASWAQ Developments
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            Redefining<br />
            <span className="italic text-accent">Living Excellence</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              className="bg-accent text-accent-foreground px-8 py-3 font-semibold rounded hover:bg-gold-light transition-colors font-body"
            >
              Explore Projects
            </Link>
            <Link
              to="/about"
              className="border border-primary-foreground/40 text-primary-foreground px-8 py-3 font-semibold rounded hover:bg-primary-foreground/10 transition-colors font-body"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats + About */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              ASWAQ Developments, The Trusted Real Estate Developer in Egypt
            </motion.h2>
            <p className="text-muted-foreground max-w-3xl mx-auto font-body">
              ASWAQ Developments is a forward-thinking real estate developer specializing in commercial, administrative, and medical projects across East Cairo.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-lg bg-cream"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-body">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.h2
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12"
          >
            Our Projects at ASWAQ Developments
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to="/projects" className="group block">
                  <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-display text-lg font-bold text-primary-foreground">
                        {project.name}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground font-body line-clamp-2">
                    {project.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Invest */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.h2
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12"
          >
            Why Invest with ASWAQ Developments
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {whyInvest.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-full bg-cream flex items-center justify-center">
                  <item.icon size={24} className="text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground font-body">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Units CTA Banner */}
      <section className="relative py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Units Are Selling Fast, Don't Miss Out!
            </h2>
            <p className="text-primary-foreground/70 font-body max-w-2xl mx-auto mb-4">
              Browse our available units and select what matches your business or investment plan.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {["Mixed-use Properties", "Commercial Units", "Administrative Units", "Medical Units"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="border border-primary-foreground/20 text-primary-foreground/80 px-4 py-1.5 rounded-full text-sm font-body"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
            <Link
              to="/units"
              className="inline-block bg-accent text-accent-foreground px-8 py-3 font-semibold rounded hover:bg-gold-light transition-colors font-body"
            >
              Reserve Your Unit
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Latest News
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                date: "September 19, 2024",
                title: "Launching the Fourth Masterpiece of ASWAQ Developments",
                tag: "Launch",
              },
              {
                date: "September 15, 2024",
                title: "Press Conference to Announce Solaria Mall",
                tag: "Announcement",
              },
              {
                date: "September 10, 2024",
                title: "ASWAQ Takes Part in Cityscape Egypt 2024",
                tag: "Event",
              },
            ].map((news) => (
              <motion.div
                key={news.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-lg overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-primary/10 flex items-center justify-center">
                  <Newspaper size={48} className="text-primary/30" />
                </div>
                <div className="p-6">
                  <span className="text-xs text-accent font-semibold uppercase font-body">
                    {news.tag}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1 font-body">{news.date}</p>
                  <h3 className="font-display text-lg font-semibold text-foreground mt-2 group-hover:text-primary transition-colors">
                    {news.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-sm text-accent mt-3 font-body font-medium">
                    Read More <ChevronRight size={14} />
                  </span>
                </div>
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

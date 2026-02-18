import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Briefcase, Stethoscope, MapPin, Layers, TrendingUp, ShieldCheck, CreditCard } from "lucide-react";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

const unitCategories = [
  {
    title: "Commercial Units for Investment",
    icon: ShoppingBag,
    description: "Ideal for retail stores, showrooms, cafes, and service brands. These units benefit from strong foot traffic, strategic mall placement, and modern storefront designs.",
  },
  {
    title: "Administrative Units for Investment",
    icon: Briefcase,
    description: "Professional office spaces designed for corporate teams, startups, and service providers. Administrative units feature practical layouts that support productivity and long-term business growth.",
  },
  {
    title: "Medical Units for Investment",
    icon: Stethoscope,
    description: "Specialized units tailored for clinics and healthcare service providers. Designed to meet operational requirements while offering accessibility and visibility within mixed-use developments.",
  },
];

const malls = [
  { name: "Solaria Mall", link: "/projects/solaria-mall" },
  { name: "Arena Mall", link: "/projects/arena-mall" },
  { name: "Mercado Mall", link: "/projects/mercado-mall" },
  { name: "City Hub Mall", link: "/projects/city-hub-mall" },
];

const whyChoose = [
  { icon: MapPin, text: "Prime locations in high-growth areas" },
  { icon: Layers, text: "Flexible unit sizes across multiple types" },
  { icon: TrendingUp, text: "Mixed-use environments for demand & traffic" },
  { icon: CreditCard, text: "Competitive pricing with flexible plans" },
  { icon: ShieldCheck, text: "Professional project planning & execution" },
];

const faqs = [
  { question: "What types of properties does ASWAQ Developments offer?", answer: "ASWAQ Developments offers a range of commercial real estate options, including commercial units for sale, units for rent, administrative spaces, and medical units located within strategic malls and commercial destinations." },
  { question: "How do I invest in a unit or property in Shorouk City?", answer: "You first decide the type of property that matches your needs, discover the types we offer and locations, then contact us to request your unit." },
  { question: "Where can I invest in a unit in Shorouk city?", answer: "ASWAQ Developments offers investment units across four major mall destinations: Solaria Mall, Arena Mall, Mercado Mall, and City Hub Mall." },
  { question: "How many malls does ASWAQ Developments have units in?", answer: "ASWAQ Developments currently offers units in four major malls in Shorouk City." },
  { question: "What are the typical sizes of the spaces & units available?", answer: "Our units range from 30 m² up to 300 m², giving flexibility for small shops, medium-sized outlets, and larger flagship stores." },
  { question: "What makes ASWAQ's locations attractive for investors?", answer: "Our locations are carefully chosen based on growth potential, residential proximity, and accessibility. Shorouk City's consistent population growth and increasing demand make our units a strong investment opportunity." },
  { question: "What types of businesses can operate in ASWAQ's malls?", answer: "Our units are suitable for retail shops, cafés, restaurants, service centers, medical clinics, offices, and more." },
  { question: "Are there flexible payment plans for buying units?", answer: "Yes. ASWAQ Developments offers flexible payment plans for buyers interested in owning a unit." },
];

const UnitsForInvestment = () => {
  return (
    <Layout>
      <section className="bg-primary py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-accent font-body font-medium tracking-widest uppercase text-sm mb-3">Units for Investment</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Invest in Properties Built to Perform
            </h1>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto">
              Unlike traditional property ownership, ASWAQ investment units are selected based on market demand, rental potential, and long-term usability. Each unit is positioned within a mixed-use development that supports consistent foot traffic and diversified tenant demand.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-4">Units for Investment Types</h2>
          <p className="text-muted-foreground font-body text-center max-w-2xl mx-auto mb-12">
            With units ranging from 30 to 300 m², ASWAQ offers the ideal environment for success.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {unitCategories.map((cat, i) => (
              <motion.div key={cat.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-cream rounded-lg p-8 flex flex-col"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <cat.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{cat.title}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed flex-1">{cat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Our Malls with Units for Investment</h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto mb-12">
            Each mall is developed to serve high-density residential areas, ensuring continuous demand.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {malls.map((mall, i) => (
              <motion.div key={mall.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link to={mall.link} className="block p-6 bg-background rounded-lg hover:shadow-lg transition-shadow text-center">
                  <p className="font-display font-bold text-foreground">{mall.name}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-12">Why Choose ASWAQ Developments</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {whyChoose.map((item, i) => (
              <motion.div key={item.text} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-3 p-4"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon size={24} className="text-primary" />
                </div>
                <p className="font-semibold text-foreground font-body text-sm text-center">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} />
      <CTASection title="Request Unit Details" subtitle="Discover commercial, administrative, and medical properties for investment across ASWAQ's mixed-use developments." buttonText="Request Unit Details" buttonLink="/contact" />
    </Layout>
  );
};

export default UnitsForInvestment;

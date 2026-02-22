import useSEO from "@/hooks/useSEO";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Layers, TrendingUp, ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import unitImg from "@/assets/unit-interior.jpg";

const unitTypes = [
  {
    title: "Units for Sale",
    icon: "🏷️",
    description:
      "Own a unit in a strategically located development and secure a long-term asset with strong growth potential. ASWAQ offers a variety of units for sale suitable for retail, commercial, and medical use.",
    cta: "Explore Units for Sale",
  },
  {
    title: "Units for Investment",
    icon: "📈",
    description:
      "Looking for reliable returns? Our investment units are selected based on location strength, rental demand, and market performance. Ideal for investors seeking income-generating real estate.",
    cta: "Explore Units for Investment",
  },
  {
    title: "Units for Rent",
    icon: "🏢",
    description:
      "Discover flexible properties for rent in high-traffic, well-serviced developments. Whether you're launching a new business or expanding an existing one, ASWAQ provides ready-to-operate rental units.",
    cta: "Explore Units for Rent",
  },
];

const whyChoose = [
  { icon: MapPin, text: "Strategic Locations", desc: "Strong foot traffic areas" },
  { icon: Layers, text: "Flexible Unit Sizes", desc: "Practical layouts 30-300 m²" },
  { icon: TrendingUp, text: "Investment-Ready", desc: "Sustainable value planning" },
  { icon: ShieldCheck, text: "Fully Serviced", desc: "Environments for business growth" },
];

const faqs = [
  {
    question: "What types of properties does ASWAQ Developments offer?",
    answer:
      "ASWAQ Developments offers a range of commercial real estate options, including commercial units for sale, units for rent, administrative spaces, and medical units.",
  },
  {
    question: "How do I buy a unit or property in Shorouk City?",
    answer:
      "You first decide the type of property that matches your needs, discover the types we offer and locations, then contact us to request your unit.",
  },
  {
    question: "Where can I buy a unit in Shorouk city?",
    answer:
      "ASWAQ Developments offers a range of commercial and retail spaces for sale across four major mall destinations: Solaria Mall, Arena Mall, Mercado Mall, and City Hub Mall.",
  },
  {
    question: "How many malls does ASWAQ Developments have units in?",
    answer:
      "ASWAQ Developments currently offers units in four major malls in Shorouk City.",
  },
  {
    question: "Are there flexible payment plans for buying units?",
    answer:
      "Yes. ASWAQ Developments offers flexible payment plans for buyers interested in owning a unit.",
  },
];

const AvailableUnits = () => {
  useSEO("Choose Your Unit in Shorouk City | Properties for Sale & Properties", "Explore units for sale, investment opportunities, and properties for rent across prime developments by ASWAQ Developments, a trusted real estate developer in Egypt. Choose your unit today.");

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent font-body font-medium tracking-widest uppercase text-sm mb-3">
              Choose Your Unit
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Available Units: Explore Properties for<br />Sale, Investment & Rent
            </h1>
            <p className="text-primary-foreground/70 font-body max-w-3xl mx-auto">
              Whether you're looking for units for sale, properties for rent, or smart investment opportunities, ASWAQ Developments offers a carefully selected portfolio of commercial, administrative, and medical units in prime locations across Egypt.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Unit Types */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-16">
            {unitTypes.map((type, i) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col md:flex-row gap-8 items-center ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="md:w-1/2">
                  <div className="rounded-lg overflow-hidden aspect-[4/3]">
                    <img
                      src={unitImg}
                      alt={type.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <span className="text-3xl mb-3 block">{type.icon}</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {type.title}
                  </h2>
                  <p className="text-muted-foreground font-body leading-relaxed mb-6">
                    {type.description}
                  </p>
                  <Link
                    to="/units"
                    className="inline-block bg-accent text-accent-foreground px-6 py-2.5 font-semibold rounded hover:bg-gold-light transition-colors font-body text-sm"
                  >
                    {type.cta}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
            Why Choose ASWAQ Developments?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {whyChoose.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-3 p-6 bg-background rounded-lg"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon size={24} className="text-primary" />
                </div>
                <p className="font-semibold text-foreground font-body">{item.text}</p>
                <p className="text-sm text-muted-foreground font-body">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection faqs={faqs} />

      {/* CTA */}
      <CTASection />
    </Layout>
  );
};

export default AvailableUnits;
